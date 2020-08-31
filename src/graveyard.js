import React from 'react';
import Card from './card';
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
    position: absolute;
    width: 150px;
    height: 209px;
    bottom: 0; left: 0;
    background: grey;

    & .card { 
        position: absolute;
        width: 150px;
        height: 209px
    }

    & .card .cardBtnContainer {
        display: none;
    }
`;

class Graveyard extends React.Component {
    render() {
        return (
            <Droppable droppableId={this.props.graveID}>
                {(provided) => (
                    <Container
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {this.props.cards.map((data, index) =>
                            <Card
                                key={data.id}
                                cardData={data}
                                index={index}
                            />
                        )}
                        <div className="cardBtnContainer">
                            <button className="cardBtn" onClick={this.props.handleSearch}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>

                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        )
    }
}

export default Graveyard;