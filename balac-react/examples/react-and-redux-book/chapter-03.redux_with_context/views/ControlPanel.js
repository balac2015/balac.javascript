import React, { Component } from 'react';
import Counter from './Counter.js';
// import Summary from './Summary.js';

class ControlPanel extends Component {

    render () {
        const style = {
            margin: '20px'
        };

        return (
            <div style={ style }>
                <Counter caption="First" />
                <Counter caption="Second" />
                <Counter caption="Third" />
                <hr />
            </div>
        );
    }
}

export default ControlPanel;
