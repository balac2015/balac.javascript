import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as Actions from '../Actions.js';

function Counter ({ caption, onIncrement, onDecrement, value }) {
    const buttonStyle = {
        margin: '10px'
    };

    return (
        <div>
            <button style={ buttonStyle } onClick={ onIncrement }> + </button>
            <button style={ buttonStyle } onClick={ onDecrement }> - </button>
            <span>{ caption } count: { value }</span>
        </div>
    );
}

// Counter.propTypes = {
//     caption: PropTypes.string.isRequired,
//     onIncrement: PropTypes.func.isRequired,
//     onDecrement: PropTypes.func.isRequired,
//     value: PropTypes.number.isRequired
// }

function mapStateToProps (state, ownProps) {
    return {
        value: state[ownProps.caption]
    };
}

function mapDispatchToProps (dispatch, ownProps) {
    return {
        onIncrement: () => {
            dispatch(Actions.increment(ownProps.caption));
        },
        onDecrement: () => {
            despatch(Actions.decrement(ownProps.caption));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
