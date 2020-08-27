import React from 'react';
import Card from './card';

class Hand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardList: []
        }
    }

    componentDidMount() {

    }

    handleDraw(num) {

    }

    render() {
        return (
            <div className="hand">
                {this.props.children}
            </div>
        )
    }
}

export default Hand;