import React from 'react';

class Exile extends React.Component {
    render() {
        return (
            <div className="exile">
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

export default Exile;