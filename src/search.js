import React from 'react';
import Card from './card';
import Fuse from '../node_modules/fuse.js/dist/fuse';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.fuse = null;
    this.state = {
      show: false,
      query: null,
      pool: [
        <Card cardData={{ name: 'test', image_uris: { png: 'https://i.imgur.com/or94i38.jpg' } }} ></Card >,
        <Card cardData={{ name: 'test', image_uris: { png: 'https://i.imgur.com/or94i38.jpg' } }} ></Card >,
        <Card cardData={{ name: 'test', image_uris: { png: 'https://i.imgur.com/or94i38.jpg' } }} ></Card >,
        <Card cardData={{ name: 'test', image_uris: { png: 'https://i.imgur.com/or94i38.jpg' } }} ></Card >,
      ],
      results: null
    }

    this.getResults = this.getResults.bind(this);
  }

  componentDidMount() {
    this.fuse = new Fuse(this.state.pool, {
      keys: ['name']
    })

    for (let x of this.state.pool) {
      console.log(x.state);
    }
  }

  getResults(e) {
    this.setState({
      results: this.fuse.search(e.target.value)
    });
  }

  render() {
    return (
      <div className={this.state.show ? "search show" : "search"}>
        <input type="text" onChange={this.getResults} />
        <hr />
        {this.state.results ? this.state.results : this.state.pool}
      </div>
    )
  }
}

export default Search;