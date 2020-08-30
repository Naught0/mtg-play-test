import React, { Component } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import '../node_modules/fuzzysearch/index';

import Deck from './deck';
import Hand from './hand';
import Card from './card';
import Exile from './exile';
import Graveyard from './graveyard';
import fuzzysearch from '../node_modules/fuzzysearch/index';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deckListRaw: props.deckList,
            library: [],
            hand: { id: `hand-${this.props.playerID}`, cards: [] },
            graveyard: [],
            exile: [],
            battlefield: [],
            life: props.life,
            toSearch: [],
            searchResults: [],
            searchVisible: false
        }
    }

    componentDidMount() {
        this.getDeckListData();
    }

    deckListRawToJson() {
        let arr = [];
        for (let item of this.state.deckListRaw.split("\\n")) {
            arr.push({ 'name': item.slice(2) })
        }
        return JSON.stringify({ 'identifiers': arr });
    }

    jsonToCardArr(data) {
        let arr = [];
        for (let card of data.data) {
            arr.push(card)
        }
        return arr;
    }

    getDeckListData() {
        let URL = 'https://api.scryfall.com/cards/collection';

        fetch(URL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: this.deckListRawToJson()
        })
            .then(resp => resp.json())
            // .then(data => console.log(data.data))
            .then(data => this.setState({
                library: this.jsonToCardArr(data)
            }))
    }

    handleDraw = () => {
        if (this.state.library.length === 0) { return; }
        this.setState((state, props) => ({
            hand: {
                ...state.hand,
                cards: state.hand.cards.concat([state.library[0]])
            },
            library: state.library.slice(1)
        }));
    }

    handleShuffle = () => {
        if (!window.confirm('Are you sure you want to shuffle your library?')) { return; }

        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        this.setState((state, props) => ({
            library: shuffle(state.library)
        }));
    }

    handleDiscard = () => {
        let numToDiscard = parseInt(window.prompt('Discard how many cards?'));
        this.setState((state, props) => ({
            library: state.library.slice(numToDiscard),
            graveyard: state.graveyard.concat(state.library.slice(0, numToDiscard))
        }))
    }

    handleGraveyardSearch = () => {
        if (this.state.graveyard.length === 0) { return; }

        this.setState({
            searchVisible: true,
            toSearch: this.state.graveyard,
        });
    }

    handleLibrarySearch = () => {
        if (this.state.library.length === 0) { return; }

        this.setState({
            searchVisible: true,
            toSearch: this.state.library,
        });
    }

    handleExileSearch = () => {
        if (this.state.exile.length === 0) { return; }

        this.setState({
            searchVisible: true,
            toSearch: this.state.exile
        });
    }

    closeSearch = () => {
        this.setState({
            searchResults: [],
            toSearch: [],
            searchVisible: false
        })
    }

    onSearch = e => {
        e.persist();
        console.log(`Searching: ${e.target.value}`)
        console.log(`Matched: ${this.state.toSearch.filter(thing => fuzzysearch(e.target.value, thing.name))}`)
        this.setState((state, props) => ({
            searchResults: state.toSearch.filter(c => fuzzysearch(e.target.value.toLowerCase(), c.name.toLowerCase()))
        }))
    }

    // React Beautiful DND stuff
    onDragEnd = result => {
        const { destination, source, draggableId } = result;
        if (!destination) { return; }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newCards = Array.from(this.state.hand.cards);
        newCards.splice(source.index, 1);
        newCards.splice(destination.index, 0, 
            this.state.hand.cards.filter((elem) => elem.id == draggableId)[0]);
        console.log(this.state.hand.cards);
        console.log(newCards);

        this.setState((state, props) => ({
            hand: {
                ...state.hand,
                cards: newCards
            }
        }));
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Hand handID={this.state.hand.id}>
                    {this.state.hand.cards.map((data, index) =>
                        <Card
                            key={data.id}
                            cardData={data}
                            index={index}
                        />
                    )}
                </Hand>

                <Deck
                    handleDraw={this.handleDraw}
                    handleDiscard={this.handleDiscard}
                    handleShuffle={this.handleShuffle}
                    handleSearch={this.handleLibrarySearch}>
                </Deck>

                <Graveyard handleSearch={this.handleGraveyardSearch}>
                    {this.state.graveyard.map((data, index) =>
                        <Card
                            key={data.id}
                            cardData={data}
                            index={index}
                        />
                    )}
                </Graveyard>

                <Exile handleSearch={this.handleExileSearch}>
                    {this.state.exile.map((data, index) =>
                        <Card
                            key={data.id}
                            cardData={data}
                            index={index}
                        />
                    )}
                </Exile>

                <div className={this.state.searchVisible ? "search show" : "search"}>
                    <div className="searchHeader">
                        <input ref={input => input && input.focus()} className="searchBar" type="text" onChange={this.onSearch} />
                        <button className="exit" onClick={this.closeSearch}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="searchResults">
                        {
                            this.state.searchResults.length > 0
                                ? this.state.searchResults.map((data, index) =>
                                    <Card
                                        key={data.id}
                                        cardData={data}
                                        index={index}
                                    />)
                                : this.state.toSearch.map((data, index) =>
                                    <Card
                                        key={data.id}
                                        cardData={data}
                                        index={index}
                                    />)
                        }
                    </div>
                </div>
            </DragDropContext >
        )
    }

}

export default Player;