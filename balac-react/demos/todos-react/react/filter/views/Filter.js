import React, { Component } from 'react';
import Count from './Count.js';
import Link from './Link.js';
import Clear from './Clear.js';

class Filter extends Component {
	render () {
		return (
			<footer className="footer">
				<Count />
	            <ul className="filters">
	                <li><a href="#">All</a></li>
	                <li><a href="#">Active</a></li>
	                <li><a href="#" className="selected">Completed</a></li>
	            </ul>
	            <Clear />
            </footer>
		);
	}
}

export default Filter;