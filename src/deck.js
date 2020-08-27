import React from 'react';
import Card from './card';

class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deckListRaw: props.deckList,
            cardList: []
        }
    }

    componentDidMount() {
        // Load up deck
        // for (let i of this.state.deckListRaw.split('\\n')) {
        //     let numToAdd = parseInt(i[0]);
        // }
        // this.getDeckListData();
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
                cardList: this.jsonToCardArr(data)
            }))
    }

    drawCard(num) {

    }

    discardCard(num, where) {
        // where = graveyard vs exile
    }

    shuffleDeck() {

    }

    revealCards(num) {

    }

    searchForCards() {

    }

    render() {
        return (
            <div className="deck">
                <img src="https://lh3.googleusercontent.com/proxy/YlGyxQ5BkCx0kVGyrAc5-rhDYJm3V52zBv6FrdKSeTm3W8pvhWaQR_ZTBNcPHsQMVCKFZbImnVMCHFMgXbg" alt="" />
                <div className="cardBtnContainer">
                    <button className="cardBtn" onClick={this.drawCard}>
                        <i className="fas fa-hand-paper"></i>
                    </button>
                    <button className="cardBtn" onClick={this.discardCard}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                    <button className="cardBtn" onClick={this.shuffleDeck}>
                        <i className="fas fa-random"></i>
                    </button>
                    <button className="cardBtn">
                        <i className="fas fa-eye"></i>
                    </button>
                    <button className="cardBtn">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
        )
    }

}

export default Deck;