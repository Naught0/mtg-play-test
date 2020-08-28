import React from 'react';

class Graveyard extends React.Component {
    render() {
        return (
            <div className="graveyard">
                {this.props.children}
                <div className="cardBtnContainer">
                    <button className="cardBtn" onClick={this.props.handleSearch}>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Graveyard;