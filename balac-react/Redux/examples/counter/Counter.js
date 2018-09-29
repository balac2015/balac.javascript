import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Counter extends Component {
    constructor (props) {
        super(props)
        this.handlerIncrementAsync = this.handlerIncrementAsync.bind(this)
        this.handlerIncrementOdd = this.handlerIncrementOdd.bind(this)
    }

    render () {
        const { value, onIncrement, onDecrement } = this.props

        return (
            <p>Clicked: { value } times
				{' '}<button onClick={ onIncrement }> + </button>
				{' '}<button onClick={ onDecrement }> - </button>
				{' '}<button onClick={ this.handlerIncrementOdd }> Increment if odd </button>
				{' '}<button onClick={ this.handlerIncrementAsync }> Increment async </button>
			</p>
        )
    }

    handlerIncrementOdd () {
        if (this.props.value % 2 !== 0) {
            this.props.onIncrement()
        }
    }

    handlerIncrementAsync () {
        setTimeout(this.props.onIncrement, 1000)
    }
}

Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
}

export default Counter
