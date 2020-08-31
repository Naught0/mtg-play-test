import React, { Component } from 'react';
import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    position: fixed;
    background: rgba(0,0,0,0.5);
    display: none;
    opacity: 0;
    transition: opacity 0.3s;
`;

const SearchHeader = styled.div`
    position: relative;
    height: 20%;
`;

class Search extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Search;