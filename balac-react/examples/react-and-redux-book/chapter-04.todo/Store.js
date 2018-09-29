import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { reducer as todoReducer } from './todos';
import { reducer as filterReducer } from './filter';

import Perf from 'react-addons-perf';

const win = window;
win.Perf = Perf;

// 把多个 reducer 函数合成为一reducer 函数。
// 参数对象的每个字段名对应了 State 状态上的宇段名
const reducer = combineReducers({
    todos: todoReducer,
    filter: filterReducer
});

const middlewares = [];

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(
        require('redux-immutable-state-invariant')()
    );
}

const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f
);

export default createStore(reducer, {}, storeEnhancers);
