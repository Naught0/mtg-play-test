import React from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './Sass/App.sass';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route to="/" component={Home} />
            {/* <Player playerID="0" deckList="1 Adamant Will\n1 Ajani's Presence\n1 Apostle's Blessing\n1 Arcane Signet\n1 Assault Strobe\n1 Balduvian Rage\n1 Duress\n1 Smothering Tithe"></Player> */}
          </Switch>
        </Router>
      </div>
    );
  }


}

export default App;
