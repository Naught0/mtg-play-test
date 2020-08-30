import React from 'react';
import Card from './card';
import { Droppable } from "react-beautiful-dnd";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    width: auto;
    max-width: 60vw;
    max-height: 25vh;
    padding: 1em;
    background: grey;
    bottom: 0; left: 0; right: 0;
    margin: auto;
`;

class Hand extends React.Component {

    render() {
        return (
            <Droppable droppableId={this.props.handID}>
                {(provided) => (
                    <Container
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="hand"
                    >
                        {this.props.children}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        )
    }
}

export default Hand;