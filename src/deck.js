import React from 'react';
import Card from './card';

class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deckListRaw: props.deckList,
            deck: []
        }
    }

    componentDidMount() {
        // Load up deck
        // for (let i of this.state.deckListRaw.split('\\n')) {
        //     let numToAdd = parseInt(i[0]);
        // }
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
                deck: this.jsonToCardArr(data)
            }))
    }

    drawCard(num) {

    }

    render() {
        return (
            <div className="card">
                <img src="https://c1.scryfall.com/file/scryfall-card-backs/large/59/597b79b3-7d77-4261-871a-60dd17403388.jpg?1562196890" alt="" />
            </div>
        )
    }

}

export default Deck;