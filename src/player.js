import React, { Component } from 'react';
import Deck from './deck';
import Card from './card';
import Graveyard from './graveyard';
import Search from './search';

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
            life: props.life
        }

        this.handleDraw = this.handleDraw.bind(this);
        this.handleShuffle = this.handleShuffle.bind(this);
        this.handleDiscard = this.handleDiscard.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
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
            arr.push(<Card cardData={card}></Card>)
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

    handleSearch(where) {

    }

    render() {
        return (
            <React.Fragment>
                <div className="hand">
                    {this.state.hand}
                </div>
                <Deck
                    handleDraw={this.handleDraw}
                    handleDiscard={this.handleDiscard}
                    handleShuffle={this.handleShuffle}
                    handleSearch={this.handleSearch}>
                </Deck>
                <Graveyard handleSearch={this.handleSearch}>{this.state.graveyard}</Graveyard>
                <Search></Search>
            </React.Fragment>
        )
    }

}

export default Player;