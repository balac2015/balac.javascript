Redux 设计思想：

    Web 应用是一个状态机，视图与状态是一一对应的。

    所有的状态，保存在一个对象里面。

API:

    store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。

        import { createStore } from 'redux';
        const store = createStore(fn);  // Store对象包含所有数据。

    state 如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。

        const state = store.getState();

        Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。

    action

        State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。

        Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置

        Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。

        const action = {
            type: 'ADD_TODO',       // action 名称
            payload: 'Learn Redux'  // 携带信息
        };

    action creator

        View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。

        const ADD_TODO = '添加 TODO';
        function addTodo (text) {       // addTodo函数就是一个 Action Creator。
            return {
                type: ADD_TODO,
                text
            }
        }
        const action = addTodo('Learn Redux');

    store.dispatch()

        store.dispatch()是 View 发出 Action 的唯一方法。

        import { createStore } from 'redux';
        const store = createStore(fn);
        store.dispatch({            // store.dispatch接受一个 Action 对象作为参数，将它发送出去。
            type: 'ADD_TODO',
            payload: 'Learn Redux'
        });

        store.dispatch(addTodo('Learn Redux')); // 结合 action creator 的改写

    reducer

        Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

        const reducer = function (state, action) {  // Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
            return new_state;
        }

        const store = createStore(reducer);

        store.dispatch() 的调用会自动调用 reducer，得到新的 state

    纯函数：只要是同样的输入，必定得到同样的输出。纯函数是函数式编程的概念，必须遵守以下一些约束。

        1、不得改写参数。2、不能调用系统 I/O 的API。3、不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果

        Reducer 是纯函数，可以保证同样的State，必定得到同样的 View。Reducer 函数里面不能改变 State，必须返回一个全新的对象

        function reducer (state, action) {      // state 是对象
            return Object.assign({}, state, { thingToChange });
            // 或者
            return { ...state, ...newState };
        }
        function reducer (state, action) {      // state 是数组
            return [ ...state, newItem ];
        }

    store.subscribe() 设置监听函数，一旦 State 发生变化，就自动执行这个函数。

        let unsubscribe = store.subscribe(() => { console.log( store.getState() )})
        unsubscribe();  // 解除监听

store 的实现

    // 第二个参数，表示 State 的最初状态。这通常是服务器给出的。注意，如果提供了这个参数，它会覆盖 Reducer 函数的默认初始值。
    let store = createStore(reducer, window.STATE_FROM_SERVER);

    store.getState()
    store.dispatch()
    store.subscribe()

reducer 的拆分

    combineReducers()做的就是产生一个整体的 Reducer 函数。该函数根据 State 的 key 去执行相应的子 Reducer，并将返回结果合并成一个大的 State 对象。

        import { createStore, combineReducers } from 'redux'
        import * as reducers from './reducers'

        const reducer = combineReducers(reducers)
        const store = createStore(reducer)

工作流程：redux flow

    1、首先，用户发出 Action。

        store.dispatch(action);

    2、然后，Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State

        let nextState = todoApp(previousState, action);

    3、State 一旦有变化，Store 就会调用监听函数。

        store.subscribe(listener);

    listener可以通过store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。

        function listener () {
            let newState = store.getState();
            component.setState(newState);
        }
