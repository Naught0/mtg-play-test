import React from 'react';
import Card from './card';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Card cardName="Duress"></Card>
        <Card cardName="Liliana"></Card>
        <Card cardName="Chaos Orb"></Card>
        <Card cardName="Static Orb"></Card>
        <Card cardName="swamp"></Card>
        <Card cardName="Erayo, Soratami Ascendant // Erayo's Essence"></Card>
      </div>
    );
  }
}

export default App;
