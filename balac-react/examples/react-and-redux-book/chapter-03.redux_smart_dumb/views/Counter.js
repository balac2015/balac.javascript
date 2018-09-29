/**
 * 让每个组件只专注做一件事的原则，拆分 redux 框架下的组件
 * 容器组件（container component），负责和 redux store 打交道，处于外层。聪明组件 smart component
 *      涉及状态转换，（有套路，可抽取共同代码）
 * 展示组件（presentational component），负责渲染界面，处于内层。傻瓜组件 dumb component
 *      纯函数，根据 props 产生结果，无状态

 * 拆分容器、展示组件，是设计 react 组件的一种模式，和 redux 没有直接关系
 */

import React, { Component, PropTypes } from 'react';

import store from '../Store.js';
import * as Actions from '../Actions.js';

/**
 * 傻瓜组件、无状态组件
 * 没有 state，只有 render 方法，所有数据都来自于 props
 */
/*
class Counter extends Component {

    render () {
        const { caption, onIncrement, onDecrement, value } = this.props;
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
}
*/
// 只有 render 方法的组件，缩略为一个函数足矣
function Counter (props) {
// function Counter ({ caption, onIncrement, onDecrement, value }) { // 把解构赋值（destructuring assignment）直接放在参数部分
    const { caption, onIncrement, onDecrement, value } = props;
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
// };

/**
 * 容器组件
 * 承担所有和 Store 的关联，render 所做的就是渲染傻瓜钻剑 Counter，只负责传递必要的 prop
 */
class CounterContainer extends Component {

    constructor (props) {
        super(props);

        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getOwnState = this.getOwnState.bind(this);

        this.state = this.getOwnState();
    }

    getOwnState () {
        return {
            value: store.getState()[this.props.caption]
        };
    }

    onIncrement () {
        store.dispatch(Actions.increment(this.props.caption));
    }

    onDecrement () {
        store.dispatch(Actions.decrement(this.props.caption));
    }

    onChange () {
        this.setState(this.getOwnState());
    }

    shouldComponentUpdate (nextProps, nextState) {
        return (nextProps.caption !== this.props.caption) ||
            (nextState.value !== this.state.value);
    }

    componentDidMount () {
        store.subscribe(this.onChange);
    }

    componentWillUnmount () {
        store.unsubscribe(this.onChange);
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

export default CounterContainer;
