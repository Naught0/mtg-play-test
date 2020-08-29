import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isFaceDown: props.isFaceDown ? props.isFaceDown : false,
            name: props.cardData.name,
            image: props.cardData.image_uris.png,
            isMagnified: false,
            isTapped: false,
        }

        this.toggleMagnify = this.toggleMagnify.bind(this);
        this.toggleTap = this.toggleTap.bind(this);
        this.onDrag = this.onDrag.bind(this);
    }

    onMouseUp() {
        // Tap the card i.e. rotate 90deg
        // notify() tapped X card
    }

    toggleMagnify(e) {
        // Set position to be absolute
        if (this.state.isFaceDown) return;

        if (this.state.isMagnified) {
            this.setState({
                isMagnified: false
            })
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
        buttonArray.push(
            <button className="cardBtn tap" onClick={this.toggleTap}>
                <i className={"fas fa-redo"}></i>
            </button>
        )

        return (
            <div className="cardBtnContainer" >
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
                <img src={this.state.image} />
                {this.displayButtons()}
            </div>
        )
    }
}

export default Card;