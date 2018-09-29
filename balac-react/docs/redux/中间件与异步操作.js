/**
 * Reducer 纯函数，只承担计算 State 的功能，不合适承担其他功能，也承担不了，因为理论上，纯函数不能进行读写操作。
 * View 与 State 一一对应，可以看作 State 的视觉层，也不合适承担其他功能。
 * Action 存放数据的对象，即消息的载体，只能被别人操作，自己不能进行任何操作。
 * 思考：添加新功能，应添加在那个环节。 -> 想来想去，只有发送 Action 的这个步骤，即store.dispatch()方法，可以添加功能
 */

 // Action 发出以后，Reducer 立即算出 State，这叫做同步；Action 发出以后，过一段时间再执行 Reducer，这就是异步。

// 新功能：要添加日志功能，把 Action 和 State 打印出来，可以对store.dispatch进行如下改造。
let next = store.dispatch;
store.dispatch = function dispatchAndLog (action) {
    console.log('dispatching', action);
    next(action);
    console.log('next state', store.getState());
}

// 中间件
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';    // 中间件
const logger = createLogger();
const store = createStore(
    reducer,
    initial_state,      // 有初始状态参数，则中间件为第3个参数，否则为第2个参数
    applyMiddleware(logger, thunk, promise) // 中间件有次序讲究
);

/**
 * 异步操作的基本思路
 * 同步操作只要发出一种 Action 即可，异步操作的差别是它要发出三种 Action：操作发起时的 action、成功的 action、失败的 action
 * 三种 action 的不同写法：
 *      写法一：名称相同，参数不同
 *      写法二：名称不同
 * 操作开始时，送出一个 Action，触发 State 更新为"正在操作"状态，View 重新渲染
 * 操作结束后，再送出一个 Action，触发 State 更新为"操作结束"状态，View 再一次重新渲染
 */
// 写法一：名称相同，参数不同
{ type: 'FETCH_POSTS' }
{ type: 'FETCH_POSTS', status: 'error', error: 'ops' }
{ type: 'FETCH_POSTS', status: 'success', response: {} }
// 写法二：名称不同
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }

// redux-thunk 中间件，改造 store.dispatch 可以接受函数作为参数。

// 返回函数，普通的 action creator 默认返回对象
const fetchPosts = postTitle => (dispatch, getState) => {
    // 操作开始
    dispatch(requestPosts(postTitle));
    return fetch('/some/API/' + postTitle + '.json')
        .then(response => response.json())
        // 异步操作的结束
        .then(json => dispatch(receivePosts(postTitle, json)));
}
// 1
store.dispatch(fetchPosts('reactjs'));
// 2
store.dispatch(fetchPosts('reactjs')).then(() =>
    console.log( store.getState() )
)

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

// redux-promise 中间件，改造 store.dispatch 可接受 Promise 对象作参数，就是让 Action Creator 返回一个 Promise 对象。
// 写法1
const fetchPosts = (dispatch, postTitle) => new Promise((resolve, reject) => {
    dispatch(requestPosts(postTitle));

    return fetch('/some/API/' + postTitle + '.json')
        .then(response => {
            type: 'FETCH_POSTS',
            payload: response.json()
        })
})
// 写法2
import { createAction } from 'redux-actions'
class AsyncApp extends Component {
    componentDidMount () {
        const { dispatch, selectedPost } = this.props;
        // 发布同步 actions
        dispatch(requestPosts(selectedPost));
        // 发出异步 action
        dispatch(createAction(
            'FETCH_POSTS',
            fetch('/some/API/' + postTitle + '.json')
                .then(response => response.json())
        ))
    }
}
