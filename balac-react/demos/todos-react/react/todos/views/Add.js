import React, { Component } from 'react';

class Add extends Component {
	render () {
		return (
            <header className="header">
                <h1>todos</h1>
                <input className="new-todo" placeholder="what needs to be done?" />
            </header>
		);
	}
}

export default Add;