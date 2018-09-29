import React, { Component } from 'react';

class Toggle extends Component {
	render () {
		return (
			<div>
            	<input id="toggle-all" className="toggle-all" type="checkbox" />
                <label htmlFor="toggle-all">Mark all as complete</label>
            </div>
		);
	}
}

export default Toggle;