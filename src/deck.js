import React from 'react';
import Card from './card';

class Deck extends React.Component {
    render() {
        return (
            <div className="deck">
                <img src="https://i.imgur.com/or94i38.jpg" alt="" />
                <div className="cardBtnContainer">
                    <button className="cardBtn" onClick={this.props.handleDraw}>
                        <i className="fas fa-hand-paper"></i>
                    </button>
                    <button className="cardBtn" onClick={this.props.handleDiscard}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                    <button className="cardBtn" onClick={this.props.handleShuffle}>
                        <i className="fas fa-random"></i>
                    </button>
                    <button className="cardBtn" onClick={this.props.handleSearch}>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
        )
    }

}

export default Deck;