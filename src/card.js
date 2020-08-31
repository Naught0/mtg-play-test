import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';

const Container = styled.div``;

// TODO: Implement +1/+1 counters
class Card extends React.Component {
    state = {
        isFaceDown: this.props.isFaceDown ? this.props.isFaceDown : false,
        name: this.props.cardData.name,
        image: this.props.cardData.image_uris.png,
        isMagnified: false,
        isTapped: false
    }

    toggleMagnify = () => {
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

    toggleTap = () => {
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

    displayButtons = () => {
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

    getClass = () => {
        let classList = ['card'];
        if (this.state.isMagnified) {
            classList.push('expanded');
        }
        if (this.state.isTapped) {
            classList.push('tapped')
        }
        return classList.join(' ');
    }

    render() {
        return (
            <Draggable draggableId={this.props.cardData.id} index={this.props.index}>
                {(provided) => (
                    <Container
                        className={this.getClass()}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <img src={this.state.image} />
                        {this.displayButtons()}
                    </Container>
                )}
            </Draggable>
        )
    }
}

export default Card;