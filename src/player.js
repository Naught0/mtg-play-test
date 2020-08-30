import React, { Component } from 'react';
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
            hand: [],
            graveyard: [],
            exile: [],
            battlefield: [],
            life: props.life,
            toSearch: [],
            searchResults: [],
            searchVisible: false
        }

        this.handleDraw = this.handleDraw.bind(this);
        this.handleShuffle = this.handleShuffle.bind(this);
        this.handleDiscard = this.handleDiscard.bind(this);
        this.handleLibrarySearch = this.handleLibrarySearch.bind(this);
        this.handleGraveyardSearch = this.handleGraveyardSearch.bind(this);
        this.handleExileSearch = this.handleExileSearch.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
        this.onSearch = this.onSearch.bind(this);
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

    handleDraw() {
        if (this.state.library.length === 0) { return; }
        this.setState((state, props) => ({
            hand: state.hand.concat([state.library[0]]),
            library: state.library.slice(1)
        }));
    }

    handleShuffle() {
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

    handleDiscard() {
        let numToDiscard = parseInt(window.prompt('Discard how many cards?'));
        this.setState((state, props) => ({
            library: state.library.slice(numToDiscard),
            graveyard: state.graveyard.concat(state.library.slice(0, numToDiscard))
        }))
    }

    handleGraveyardSearch() {
        if (this.state.graveyard.length === 0) { return; }

        this.setState({
            searchVisible: true,
            toSearch: this.state.graveyard,
        });
    }

    handleLibrarySearch() {
        if (this.state.library.length === 0) { return; }

        this.setState({
            searchVisible: true,
            toSearch: this.state.library,
        });
    }

    handleExileSearch() {
        if (this.state.exile.length === 0) { return; }

        this.setState({
            searchVisible: true,
            toSearch: this.state.exile
        });
    }

    closeSearch() {
        this.setState({
            searchResults: [],
            toSearch: [],
            searchVisible: false
        })
    }

    cardDragStart = (event, data) => {
        event.dataTransfer.setData('cardData', data);
    }

    onDragOver = (e) => {
        e.preventDefault();
    }

    onGraveyardDrop = (e) => {
        let cardData = e.dataTransfer.getData('cardData');

    }

    onSearch(e) {
        e.persist();
        console.log(`Searching: ${e.target.value}`)
        console.log(`Matched: ${this.state.toSearch.filter(thing => fuzzysearch(e.target.value, thing.name))}`)
        this.setState((state, props) => ({
            searchResults: state.toSearch.filter(c => fuzzysearch(e.target.value.toLowerCase(), c.name.toLowerCase()))
        }))
    }



    render() {
        return (
            <React.Fragment>
                <Hand>
                    {this.state.hand.map((data) =>
                        <Card
                            onDragStart={(e) => this.cardDragStart(e, data)}
                            key={data.id}
                            cardData={data}>
                        </Card>
                    )}
                </Hand>

                <Deck
                    handleDraw={this.handleDraw}
                    handleDiscard={this.handleDiscard}
                    handleShuffle={this.handleShuffle}
                    handleSearch={this.handleLibrarySearch}>
                </Deck>

                <Graveyard handleSearch={this.handleGraveyardSearch}>
                    {this.state.graveyard.map((data) =>
                        <Card
                            onDragStart={(e) => this.cardDragStart(e, data)}
                            key={data.id}
                            cardData={data}>
                        </Card>
                    )}
                </Graveyard>

                <Exile handleSearch={this.handleExileSearch}>
                    {this.state.exile.map((data) =>
                        <Card
                            onDragStart={(e) => this.cardDragStart(e, data)}
                            key={data.id}
                            cardData={data}>
                        </Card>
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
                                ? this.state.searchResults.map(data =>
                                    <Card onDragStart={(e) => this.cardDragStart(e, data)} key={data.id} cardData={data}></Card>)
                                : this.state.toSearch.map(data =>
                                    <Card onDragStart={(e) => this.cardDragStart(e, data)} key={data.id} cardData={data}></Card>)
                        }
                    </div>
                </div>
            </React.Fragment >
        )
    }

}

export default Player;