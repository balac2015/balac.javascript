import React, { Component } from 'react';
import { connext } from 'react-redux';

function Summary ({ sum }) {
    return (
        <div>
            Total Count: { sum }
        </div>
    );
}

Summary.PropTypes = {
    value: PropTypes.number.isRequired
};

function mapStateToProps (state) {
    let sum = 0;

    for (const key in state) {

        if (state.hasOwnProperty(key)) {
            sum += state[key];
        }
    }

    return {
        value: sum
    };
}

export default connect(mapStateToProps)(Summary);
