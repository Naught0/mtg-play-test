import React from 'react';
import Card from './card';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Card imageURL="https://c1.scryfall.com/file/scryfall-cards/png/front/8/6/86bf43b1-8d4e-4759-bb2d-0b2e03ba7012.png?1562242171"></Card>
        <Card imageURL="https://c1.scryfall.com/file/scryfall-cards/png/front/8/9/89936685-8647-4a65-b764-62fc4b49293a.png?1593813255"></Card>
        <Card imageURL="https://c1.scryfall.com/file/scryfall-cards/png/front/0/d/0d995382-57a6-40a4-9050-31f57cb8dae3.png?1562450532"></Card>
        <Card imageURL="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/513b7bfa-42c9-4d08-ad6c-8e5d478c42d3/dalfpib-83f22b02-5802-40b4-901b-3eecf0ca2058.png/v1/fill/w_1024,h_1463,q_80,strp/magic__the_gathering_six_color_card_back_by_lordnyriox_dalfpib-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xNDYzIiwicGF0aCI6IlwvZlwvNTEzYjdiZmEtNDJjOS00ZDA4LWFkNmMtOGU1ZDQ3OGM0MmQzXC9kYWxmcGliLTgzZjIyYjAyLTU4MDItNDBiNC05MDFiLTNlZWNmMGNhMjA1OC5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.2eyv_C58yxnjkkQZmnvx7UR7ErxADFv2vmngDx5JY3g" isFaceDown={true}></Card>
      </div>
    );
  }
}

export default App;
