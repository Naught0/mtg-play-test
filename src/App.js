import React from 'react';
import Card from './card';
import Deck from './deck';

import './App.css';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Card cardName="mox jet"></Card>
                <Deck></Deck>
            </div>
        );
    }


}

export default App;
