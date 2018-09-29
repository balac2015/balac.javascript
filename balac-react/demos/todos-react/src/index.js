import React from 'react'
import ReactDOM from 'react-dom'
// import { List, Map } from 'immutable'
import { compose, createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducer'
import { TodoAppContainer } from './components/TodoApp'

import 'todomvc-app-css/index.css'

const createStoreDevTools = compose(
    // Redux dev工具Chrome扩展程序 (https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const store = createStoreDevTools(reducer)
store.dispatch({
    type: 'SET_STATE',
    state: {
        todos: [
            {id: 1, text: 'React', status: 'active', editing: false},
            {id: 2, text: 'Redux', status: 'active', editing: false},
            {id: 3, text: 'Immutable', status: 'active', editing: false}
        ],
        filter: 'all'
    }
})

ReactDOM.render(
    <Provider store={ store }>
        <TodoAppContainer />
    </Provider>,
    document.querySelector('#root')
)
