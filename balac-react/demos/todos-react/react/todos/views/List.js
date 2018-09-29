import React, { Component } from 'react';

import Item from './Item.js';

class List extends Component {
	render () {
		return (
            <ul className="todo-list">
                <Item />
            </ul>
		);
	}
}

export default List;