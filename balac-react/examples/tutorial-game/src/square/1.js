import React, { Component } from 'react';

class Square1 extends Component {

	render () {
		return (
			<button className="square">
				{ this.props.value }
			</button>
		);
	}
}

class Square extends Component {

	constructor () {
		// 在 JavaScript classes(类)中，当定义子类的构造函数时，你需要显式调用 super();
		super();
		this.state = {
			value: null
		};
	}

	render () {
		return (
			// 每当 this.setState 被调用时，都会计划对组件的更新，导致 React 合并传递的 state(状态) ，更新和渲染组件及其子组件
			<button className="square" onClick={ () => this.setState({value: 'X'}) }>
				{ this.state.value }
			</button>
		);
	}
}

export default Square;
