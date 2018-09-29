import React, { Component } from 'react';

import Add from './Add.js';
import List from './List.js';
import Toggle from './Toggle.js';

class Todo extends Component {
	render () {
		return (
            <div>
                <Add />
                <section className="main">
                    <Toggle />
                    <List />
                </section>
            </div>
		);
	}
}

export default Todo;