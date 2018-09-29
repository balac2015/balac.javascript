import React, { Component, PropTypes } from 'react';

class Counter extends Component {

    constructor (props) {
        super(props);

        this.onClickDecrementButton = this.onClickDecrementButton.bind(this);
        this.onClickIncrementButton = this.onClickIncrementButton.bind(this);

        this.state = {
            count: props.initValue
        };
    }

    render () {
        const { caption } = this.props
        const buttonStyle = {
            margin: '10px'
        };

        return (
            <div>
                <button style={ buttonStyle } onClick={ this.onClickIncrementButton }> + </button>
                <button style={ buttonStyle } onClick={ this.onClickDecrementButton }> - </button>
                <span>{ caption } count: { this.state.count }</span>
            </div>
        );
    }

    onClickIncrementButton () {
        this.updateCount(true);
    }

    onClickDecrementButton () {
        this.updateCount(false);
    }

    updateCount (isIncrement) {
        const previousValue = this.state.count;
        const newValue = isIncrement ? previousValue + 1 : previousValue - 1;

        this.setState({
            count: newValue
        });
        this.props.onUpdate(newValue, previousValue);
    }
}

// Counter.propTypes = {
//     caption: PropTypes.string.isRequired,
//     initValue: PropTypes.number,
//     onUpdate: PropTypes.func
// };

Counter.defaultProps = {
    initValue: 0,
    onUpdate: f => f    // 什么都不做的函数
};

export default Counter;
