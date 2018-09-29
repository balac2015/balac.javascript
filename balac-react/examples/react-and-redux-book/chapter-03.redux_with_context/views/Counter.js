import React, { Component, PropTypes } from 'react';

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

class CounterContainer extends Component {

    // constructor (props, context) {
        // 初始化实例中的 context
        // super(props, context);
    constructor () {
        super(...arguments);    // 通过扩展标示符就能把 arguments 彻底变成传递给 super 的参数
console.log( this.props )
        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getOwnState = this.getOwnState.bind(this);

        this.state = this.getOwnState();
    }

    getOwnState () {
        return {
            value: this.context.store.getState()[this.props.caption]
        };
    }

    onIncrement () {
        this.context.store.dispatch(Actions.increment(this.props.caption));
    }

    onDecrement () {
        this.context.store.dispatch(Actions.decrement(this.props.caption));
    }

    onChange () {
        this.setState(this.getOwnState());
    }

    shouldComponentUpdate (nextProps, nextState) {
        return (nextProps.caption !== this.props.caption) ||
            (nextState.value !== this.state.value);
    }

    componentDidMount () {
        this.context.store.subscribe(this.onChange);
    }

    componentWillUnmount () {
        this.context.store.unsubscribe(this.onChange);
    }

    render () {
        return <Counter caption={ this.props.caption }
            onIncrement={ this.onIncrement }
            onDecrement={ this.onDecrement }
            value={ this.state.value }
        />;
    }
}

// CounterContainer.propTypes = {
//     caption: PropTypes.string.isRequired
// };

// CounterContainer.contextTypes = {
//     store: PropTypes.object
// };

export default CounterContainer;
