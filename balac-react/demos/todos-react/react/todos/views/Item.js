import React, { Component } from 'react';

class Item extends Component {
	render () {
		return (
            <li className="completed">
                <div className="view">
                    <input className="toggle" type="checkbox" checked onChange={ () => {} } />
                    <label>a</label>
                    <button className="destory"></button>
                </div>
            </li>
		);
	}
}

export default Item;