import React, { Component } from 'react';

class Count extends Component {
	render () {
		return (
            <span className="todo-count">
                <strong>0</strong>
                items left
            </span>
		);
	}
}

export default Count;