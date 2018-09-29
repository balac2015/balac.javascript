// applyMiddlewares 实现，作用是将所有中间件组成一个数组，依次执行。

// 所有中间件被放进了一个数组chain，然后嵌套执行，最后执行store.dispatch。
export default function applyMiddleware(...middleware) {

    return (createStore) => (reducer, preloadeState, enhancer) => {

        var store = createStore(reducer, preloadeState, enhancer);
        var dispatch = store.dispatch;
        var chain = [];

        // 中间件内部（middlewareAPI）可以拿到getState和dispatch这两个方法。
        var middlewareAPI = {
            getState: store.getState,
            dispatch: (action) => dispatch(action)
        };
        chain = middlewares.map(middleware => middleware(middlewareAPI));
        dispatch = compose(...chain)(store.dispatch);

        return {...store, dispatch};
    };
};
