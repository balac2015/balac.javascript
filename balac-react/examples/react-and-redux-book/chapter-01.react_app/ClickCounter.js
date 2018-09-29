import React, { Component } from 'react';

class ClickCounter extends Component {
    constructor (props) {
        super(props);
        this.state = {
            count: 0
        };
        this.onClickButton = this.onClickButton.bind(this);
    }

    render () {
        const counterStyle = {
            margin: '15px'
        };

        return (
            <div style={ counterStyle }>
                <button onClick={ this.onClickButton }>Click Me</button>
                <div>
                    Click Count: <span>{ this.state.count }</span>
                </div>
            </div>
        );
    }

    onClickButton () {
        this.setState({
            count: this.state.count + 1
        });
    }
}

export default ClickCounter;
