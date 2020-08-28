import React from 'react';
import Card from './card';

class Hand extends React.Component {
    render() {
        return (
            <div className="hand">
                {this.props.children}
            </div>
        )
    }
}

export default Hand;