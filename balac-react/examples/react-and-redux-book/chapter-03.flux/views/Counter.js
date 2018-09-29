import React, { Component } from 'react';

const buttonStyle = {
    margin: '10px'
};

class Counter extends Component {

    constructor (props) {
        super(props);

        this.state = {
            count: ''
        };
    }

    render () {
        const { caption } = this.props;

        return (
            <div>
                <button style={ buttonStyle }> + </button>
                <button style={ buttonStyle }> - </button>
                <span>{ caption } count: { this.state.count }</span>
            </div>
        );
    }
}

export default Counter;
