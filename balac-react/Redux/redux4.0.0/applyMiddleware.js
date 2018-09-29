import compose from './compose'

// 1.applyMiddleware
export default function applyMiddleware(...middlewares) {

    // createStore 就是 redux 公布的方法 createStore
    return createStore => (...args) => {
        const store = createStore(...args)
        let dispatch = () => {
            throw new Error(
                `Dispatching while constructing your middleware is not allowed. ` +
                `Other middleware would not be applied to this dispatch.`
            )
        }
        // 中间件格式：const logger = ({ dispatch, getState }) => next => action => { ... }
        const middlewareAPI = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }
        const chain = middlewares.map(middleware => middleware(middlewareAPI))
        dispatch = compose(...chain)(store.dispatch)

        return {
            ...store,
            dispatch
        }
    }
}

// 1.applyMiddleware
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 * 创建一个将中间件应用于调度方法的商店增强器Redux商店。这对于各种任务很方便，例如表达以简洁的方式进行异步操作，或记录每个操作有效负载。
 *
 * See `redux-thunk` package as an example of the Redux middleware.请参阅`redux-thunk`包作为Redux中间件的示例。
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain. 因为中间件可能是异步的，所以这应该是第一个在组合链中存储增强器。
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.请注意，每个中间件都将被赋予`dispatch`和`getState`函数作为命名参数。
 *
 * @param {...Function} middlewares The middleware chain to be applied. 要应用的中间件链。
 * @returns {Function} A store enhancer applying the middleware. 应用中间件的商店增强器。
 */
