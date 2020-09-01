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
        const pid = this.props.playerID;
        this.state = {
            deckListRaw: props.deckList,
            life: props.life,
            // store all cards by IDs with data in byId
            // Each zone would filter by IDs then map
            allCards: {
                byId: {
                    "id": "dataHere"
                },
                allIds: []
            },
            library: { id: `library${pid}`, cardIds: [] },
            hand: { id: `hand${pid}`, cards: [] },
            graveyard: { id: `graveyard${pid}`, cardIds: [] },
            exile: { id: `exile${pid}`, cardIds: [] },
            battlefield: { id: `battlefield${pid}`, cardIds: [] },
            search: {
                id: `search${pid}`,
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
            .then(data => this.setState({
                library: {
                    ...this.state.library,
                    cards: data.data
                }
            }));
    }

    handleDraw = () => {
        if (this.state.library.length === 0) { return; }
        this.setState((state, props) => ({
            hand: {
                ...state.hand,
                cards: state.hand.cards.concat([state.library.cards[0]])
            },
            library: {
                ...state.library,
                cards: state.library.cards.slice(1)
            }
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

        this.setState((prev, props) => ({
            library: {
                ...prev.library,
                cards: shuffle(prev.library.cards)
            }
        }));
    }

    handleDiscard = () => {
        let numToDiscard = parseInt(window.prompt('Discard how many cards?'));
        this.setState((state, props) => ({
            library: {
                ...state.library,
                cards: state.library.cards.slice(numToDiscard)
            },
            graveyard: {
                ...state.graveyard,
                cards: state.graveyard.cards.concat(state.library.cards.slice(0, numToDiscard))
            }
        }));
    }

    handleGraveyardSearch = () => {
        if (this.state.graveyard.length === 0) { return; }

        this.setState((state, props) => ({
            search: {
                ...state.search,
                visible: true,
                toSearch: state.graveyard.cards
            }
        }));
    }

    handleLibrarySearch = () => {
        if (this.state.library.cards.length === 0) { return; }

        this.setState((state, props) => ({
            search: {
                ...state.search,
                visible: true,
                toSearch: state.library.cards
            }
        }));
    }

    handleExileSearch = () => {
        if (this.state.exile.length === 0) { return; }

        this.setState((state, props) => ({
            search: {
                ...state.search,
                visisble: true,
                toSearch: state.exile.cards
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
                    handleSearch={this.handleLibrarySearch}
                />

                <Graveyard
                    cards={this.state.graveyard.cards}
                    handleSearch={this.handleGraveyardSearch}
                />

                <Exile handleSearch={this.handleExileSearch}>
                    {this.state.exile.cards.map((data, index) =>
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