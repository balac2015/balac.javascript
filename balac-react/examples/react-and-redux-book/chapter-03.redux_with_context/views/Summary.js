import React, { Component } from 'react';

function Summary ({ sum }) {
    return (
        <div>
            Total Count: { sum }
        </div>
    );
}

class SummaryContainer extends Component {

    constructor () {
        super(...arguments);

        this.onChange = this.onChange.bind(this);
        this.state = this.getOwnState();
    }

    onChange () {
        this.setState(this.getOwnState());
    }

    getOwnState () {
        const state = this.context.store.getState();
        let sum = 0;

        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                sum += state[key];
            }
        }

        return { sum: sum };
    }

    shouldComponentUpdate (nextProps, nextState) {
        return nextState.sum !== this.state.sum;
    }

    componentDidMount () {
        this.context.store.subscribe(this.onChange);
    }

    componentWillUnmount () {
        this.context.store.unsubscribe(this.onChange);
    }

    render () {
        return <Summary sum={ this.state.sum } />
    }
}

export default SummaryContainer;
