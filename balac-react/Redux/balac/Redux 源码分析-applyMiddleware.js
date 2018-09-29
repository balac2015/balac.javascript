
applyMiddleware 内外层的参数传递都是围绕着 createStore来的。

// store = createStore(todoReducer, applyMiddleware(thunk, logger))
let store = applyMiddleware(thunk, logger)(createStore)(todoReducer)

中间件是通过next来进入下一个中间件的，执行完毕后，会调用最原始的store.disptach，reducer执行完毕后，该次操作并没有完毕， 还会依次返回到中间件。

任何一个中间件不next ，其后面的中间件都不会执行，（不等于return next(action)，return next(action)一般情况都是返回原始的action, 只要你调用了next(action)就行），redux-thunk就是这么干的（检查到action是函数的时候，没有执行next()）



// thunk 中间件，调用：thunk({ dispatch, getState })(next)(action)
let thunk = ({ dispatch, getState }) => next => action => {

    if (typeof action === 'function') {

        return action(dispatch, getState)
    }

    return next(action)
}

// logger 中间件
let logger = ({ dispatch, getState }) => next => action => {
    console.log('next- 之前 state: %o', getState())
    let result = next(action)
    console.log('next- 之后 state %o', getState())

    return result
}

let { createStore, applyMiddleware } = window.Redux
let todoList = []
let todoReducer = function (state = todoList, action) {
    switch (action.type) {
        case 'add':
            return [...state, action.todo]
        case 'delete':
            return state.filter(todo => todo.id !== action.id)
        default:
            return state
    }
}
let store = createStore(todoReducer, applyMiddleware(thunk, logger))
let subscribelFn = () => console.log(store.getState())
let sub = store.subscribe(subscribelFn)

let addAsync = content => (dispatch) => {
    setTimeout(function () {
        dispatch({
            type: 'add',
            todo: {
                id: new Date().getTime(),
                content
            }
        })
    }, 1000)
}
store.dispatch(addAsync('异步添加的 todo 哦'))
store.dispatch({
    type: 'add',
    todo: {
        id: 1,
        content: '============'
    }
})
