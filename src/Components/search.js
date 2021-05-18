import React, { Component } from 'react';
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    position: fixed;
    background: rgba(0,0,0,0.5);
    transition: ease all 0.3s;
    & .tap {
      display: none;
    }
`;

const SearchHeader = styled.div`
    position: relative;
    height: 20%;
`;

const SearchBar = styled.input`
    font-size: 12pt;
    position: absolute;
    top: 0; left: 0;
    margin: var(--padding);
    padding: calc(var(--padding) / 2);
    outline: 0;
    border: 0;
`;

const ExitBtn = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    margin: var(--padding);
    font-size: 20pt;
    background: transparent;
    box-shadow: 0;
    border: 0;
    outline: 0;
    color: white;
`;

const SearchResults = styled.div`
    position: relative;
    top: 10vh;
    max-height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

class Search extends Component {
    render() {
        return (
            <Droppable direction="horizontal" droppableId={this.props.searchID}>
                {(provided) => (
                    <Container
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <SearchHeader>
                            <SearchBar
                                ref={input => input && input.focus()}
                                onChange={this.props.onSearch}
                                type="text"
                            />
                            <ExitBtn onClick={this.props.closeSearch}>
                                <i className="fas fa-times"></i>
                            </ExitBtn>
                        </SearchHeader>
                        <SearchResults>
                            {this.props.children}
                        </SearchResults>
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        );
    }
}

export default Search;