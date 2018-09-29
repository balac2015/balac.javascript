import React, { Component } from 'react';
import './App.css';

import { view as TodoView } from './todos/';
import { view as FilterView } from './filter/';

class App extends Component {
	render () {
		return (
			<section className="todoapp">
                <TodoView />
                <FilterView />
            </section>
		);
	}
}

export default App;