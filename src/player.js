import React, { Component } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import '../node_modules/fuzzysearch/index';

import Deck from './deck';
import Hand from './hand';
import Card from './card';
import Exile from './exile';
import Search from './search';
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
            search: {
                id: `search-${this.props.playerID}`,
                toSearch: [],
                searchResults: [],
                visible: false
            },
            // toSearch: [],
            // searchResults: [],
            // searchVisible: false
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

        this.setState((state, props) => ({
            search: {
                ...this.state.search,
                visible: true,
                toSearch: state.graveyard
            }
        }));
    }

    handleLibrarySearch = () => {
        if (this.state.library.length === 0) { return; }

        this.setState((state, props) => ({
            search: {
                ...state.search,
                visible: true,
                toSearch: state.library
            }
        }));
    }

    handleExileSearch = () => {
        if (this.state.exile.length === 0) { return; }

        this.setState((state, props) => ({
            search: {
                ...state.search,
                visisble: true,
                toSearch: state.exile
            }
        }));
    }

    closeSearch = () => {
        this.setState((state, props) => ({
            search: {
                ...state.search,
                searchResults: [],
                toSearch: [],
                visible: false
            }
        }));
    }

    onSearch = e => {
        e.persist();
        this.setState((state, props) => ({
            search: {
                ...state.search,
                searchResults: state.search.toSearch.filter(c => fuzzysearch(e.target.value.toLowerCase(), c.name.toLowerCase()))
            }
        }));
    }

    // React Beautiful DND stuff
    onDragEnd = result => {
        console.log(result);
        const { destination, source, draggableId } = result;
        if (!destination) { return; }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // TODO: Implement between list logic
        // TODO: Restructure data / state to allow for 
        //       dropping between lists based on destination.droppableId & source.droppableId

        // const newCards = Array.from(this.state.hand.cards);
        // // Remove dragged element
        // newCards.splice(source.index, 1);
        // // Insert the card at new index
        // newCards.splice(
        //     destination.index,
        //     0,
        //     this.state.hand.cards.filter((elem) => elem.id == draggableId)[0]);

        // this.setState((state, props) => ({
        //     hand: {
        //         ...state.hand,
        //         cards: newCards
        //     }
        // }));
    }

    onDragStart = () => {
        // TODO: increase size of dragged component
        // this.closeSearch();
        // potentially just add a class / switch in a styled component props
    }

    render() {
        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
            >
                <Hand
                    cards={this.state.hand.cards}
                    handID={this.state.hand.id}
                />

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

                {this.state.search.visible &&
                    <Search
                        searchID={this.state.search.id}
                        show={this.state.search.visible}
                        onSearch={this.onSearch}
                        closeSearch={this.closeSearch}
                    >
                        {
                            this.state.search.searchResults.length > 0
                                ? this.state.search.searchResults.map((data, index) =>
                                    <Card
                                        key={data.id}
                                        cardData={data}
                                        index={index}
                                    />)
                                : this.state.search.toSearch.map((data, index) =>
                                    <Card
                                        key={data.id}
                                        cardData={data}
                                        index={index}
                                    />)
                        }
                    </Search>
                }
            </DragDropContext >
        )
    }

}

export default Player;