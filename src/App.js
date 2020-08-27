import React from 'react';
import Card from './card';
import Deck from './deck';
import Hand from './hand';

// import './bulma.css';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/* <Card cardName="mox jet"></Card>
                  <Card cardName="Ad nauseam"></Card> */}
        <Deck deckList="1 Adamant Will\n1 Ajani's Presence\n1 Apostle's Blessing\n1 Arcane Signet\n1 Assault Strobe\n1 Balduvian Rage"></Deck>
        <Hand></Hand>
      </div>
    );
  }


}

export default App;
