import React from 'react';
// import allCards from './all-cards.json';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.cardName = props.cardName;

        this.state = {
            isFaceDown: props.isFaceDown ? props.isFaceDown : false,
            isMagnified: false,
            cardLocation: 'hand',
            isTapped: false, canTap: props.canTap ? props.canTap : true,
            cardData: null
        }

        this.toggleMagnify = this.toggleMagnify.bind(this);
        this.toggleTap = this.toggleTap.bind(this);
        this.onDrag = this.onDrag.bind(this);
    }

    componentDidMount() {
        fetch(`https://api.scryfall.com/cards/search?q=${encodeURIComponent(this.cardName)}`).then(resp => resp.json()).then((data) => this.setState({ cardData: data }));
    }

    onMouseUp() {
        // Tap the card i.e. rotate 90deg
        // notify() tapped X card
    }

    toggleMagnify(e) {
        // Set position to be absolute
        if (this.state.isFaceDown) return;

        if (this.state.isMagnified) {
            e.target.style.transformOrigin = "top left";
            this.setState({
                isMagnified: false
            })
            e.target.style.transformOrigin = "center";
        }
        else {
            this.setState({
                isMagnified: true
            })
        }
    }

    toggleTap(e) {
        if (this.state.isTapped) {
            this.setState({
                isTapped: false
            })
        }
        else {
            this.setState({
                isTapped: true,
                isMagnified: false
            })
        }
    }

    displayButtons() {
        let buttonArray = [];
        if (this.state.isFaceDown) {
            return;
        }
        else {
            buttonArray.push(
                <button className="cardBtn" onClick={this.toggleMagnify}>
                    <i className={this.state.isMagnified ? "fas fa-search-minus" : "fas fa-search-plus"}></i>
                </button>
            )
        }
        if (this.state.canTap) {
            buttonArray.push(
                <button className="cardBtn" onClick={this.toggleTap}>
                    <i className={"fas fa-redo"}></i>
                </button>
            )
        }

        return (
            <div className="cardBtnContainer">
                {buttonArray}
            </div>
        )
    }

    getClass() {
        let classList = ['card'];
        if (this.state.isMagnified) {
            classList.push('expanded');
        }
        if (this.state.isTapped) {
            classList.push('tapped')
        }
        return classList.join(' ');
    }

    onDrag() {
        // Set position absolute
        // Magnify card UNLESS dropzone
        // Transition ~0.3s width/height
    }

    render() {
        return (
            <div className={this.getClass()}>
                <img src={this.state.cardData ? this.state.cardData.data[0].image_uris.png : "https://c1.scryfall.com/file/scryfall-card-backs/large/59/597b79b3-7d77-4261-871a-60dd17403388.jpg?1562196890"} alt="" />
                {this.displayButtons()}
            </div>
        )
    }
}

export default Card;