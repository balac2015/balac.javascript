import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducers from './reducers.js'
import Counter from './Counter.js'

const store = createStore(reducers)

const render = () => ReactDOM.render(
    <Counter
        value={ store.getState() }
        onIncrement={ () => (store.dispatch({ type: 'INCREMENT'})) }
        onDecrement={ () => store.dispatch({ type: 'DECREMENT' }) }
        />,
    document.querySelector('#root')
)

render()
store.subscribe(render)
