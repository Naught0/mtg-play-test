import React from 'react';
import Card from './card';
import Deck from './deck';
import Hand from './hand';
import Player from './player';

// import './bulma.css';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Player playerID="0" deckList="1 Adamant Will\n1 Ajani's Presence\n1 Apostle's Blessing\n1 Arcane Signet\n1 Assault Strobe\n1 Balduvian Rage\n1 Duress\n1 Smothering Tithe"></Player>
      </div>
    );
  }


}

export default App;
