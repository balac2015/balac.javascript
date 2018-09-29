// redux 的 createStore() 就能完成数据控制了，combineReducers，bindActionCreators，applyMiddleware，compose 都只是对redux的增强。

// 简化代码（无视 enhancer, 中间件）
export const ActionTypes = {
    INIT: '@@redux/INIT'
}
export default function createStore(reducer, preloadedState, enhance) {

    // 初始化参数
    let currentReducer = reducer      // 整个reducer
    let currentState = preloadedState //当前的state, getState返回的值就是他，
    let currentListeners = []         // 当前的订阅，搭配 nextListeners
    let nextListeners = currentListeners  //下一次的订阅 ,搭配currentListeners
    let isDispatching = false  //是否处于 dispatch action 状态中

    // 内部方法
    function ensureCanMutateNextListeners() { }  // 确保currentListeners 和 nextListeners 是不同的引用
    function getState() { }    // 获得当前的状态，返回的就是currentState
    function subscribe(listener) { }  //订阅监听，返回一个函数，执行该函数，取消监听
    function dispatch(action) { }    // dispacth action
    function replaceReducer(nextReducer) { }  // 替换 reducer
    function observable() { }   //不知道哈哈

    // 初始化 state
    dispatch({ type: ActionTypes.INIT })

    // 返回方法
    return {
        dispatch,
        subscribe,
        getState,
        replaceReducer,
        [$$observable]: observable
    }
}

ensureCanMutateNextListeners() --- 这个方法主要用在 subscribe里面

    在每次订阅和取消订阅的时候，会让 nextListeners 和 currentListeners 不是同一个引用，

    在每次 dispatch的时候，当 reducer执行完毕，订阅执行前，让 nextListeners 和 currentListeners 是同一个引用

    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice()
      }
    }

　　为什么这么设计，在subscribe方法上有很详细的注解，我的理解是假如订阅在执行过程中，这里说的是订阅执行过程，不是reducer执行过程

       有新加的订阅添加的时候，新的订阅是不会被执行的，因为是一份拷贝

       有新的订阅删除的时候，被删除的还是会执行的。

       简单说，就是新的删除和添加，下次生效。

getState() --- 返回利用闭包存的currentState

    function getState() {
        return currentState
    }

subscribe() --- 添加订阅

    每次添加前，如果 nextListeners 和 currentListeners 是一个引用，重新复制一个，并存入 nextListeners

    返回一个函数，执行该函数取消订阅，

    function subscribe(listener) {
        if (typeof listener !== 'function') {
            throw new Error('Expected listener to be a function.')
        }

        let isSubscribed = true

        ensureCanMutateNextListeners() //复制新的
        nextListeners.push(listener)

        return function unsubscribe() {
            if (!isSubscribed) {
              return
            }

            isSubscribed = false

            ensureCanMutateNextListeners() // 复制新的
            const index = nextListeners.indexOf(listener)
            nextListeners.splice(index, 1) // 从nextListeners里面删除，下次dispatch会生效
        }
    }

dispatch() --- 派发一个action，让reducer更新数据,

    　如果上一次派发没完毕，接着派发是会出异常的，对于单线程的js来说倒是没啥大问题

    function dispatch(action) {
      if (!isPlainObject(action)) { // action 必须是对象
        throw new Error(
          'Actions must be plain objects. Use custom middleware for async actions.'
        )
      }

      if (typeof action.type === 'undefined') {  // 必须有type属性
        throw new Error(
          'Actions may not have an undefined "type" property. Have you misspelled a constant?'
        )
      }

      if (isDispatching) {  // 正在派发，抛出异常
        throw new Error('Reducers may not dispatch actions.')
      }

      try {
        isDispatching = true  // 标记，正在派发
        currentState = currentReducer(currentState, action)
      } finally {
        isDispatching = false  //标记派发完毕
      }

      const listeners = currentListeners = nextListeners  // 让nextListeners生效
      for (let i = 0; i < listeners.length; i++) {  // 挨个执行订阅
        const listener = listeners[i]
        listener()
      }

      return action // 返回action
    }

replaceReducer()

    function replaceReducer(nextReducer) {
       if (typeof nextReducer !== 'function') {  // 不是函数，抛出异常
         throw new Error('Expected the nextReducer to be a function.')
       }

       currentReducer = nextReducer  // 替换reducer
       dispatch({ type: ActionTypes.INIT }) // 重新初始化
     }
