function bindActionCreator(actionCreator, dispatch) {

    return function() {

        return dispatch(actionCreator.apply(this, arguments))
    }
}

// 1.bindActionCreators
export default function bindActionCreators(actionCreators, dispatch) {

    if (typeof actionCreators === 'function') {

        return bindActionCreator(actionCreators, dispatch)
    }

    if (typeof actionCreators !== 'object' || actionCreators === null) {
        throw new Error(
            `bindActionCreators expected an object or a function, instead received ${
                actionCreators === null ? 'null' : typeof actionCreators
              }. ` +
                `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
        )
    }

    const keys = Object.keys(actionCreators)
    const boundActionCreators = {}
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const actionCreator = actionCreators[key]

        if (typeof actionCreator === 'function') {
            boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
        }
    }

    return boundActionCreators
}

// 1.bindActionCreators
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 * 将值为动作创建者的对象转换为具有该对象的对象相同的键，但每个函数都包含在`dispatch`调用中，所以它们
 * 可以直接调用。这只是一种方便的方法，你可以打电话`store.dispatch（MyActionCreators.doSomething（））`你自己就好了。
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.为方便起见，您还可以将单个函数作为第一个参数传递，并获得一个功能作为回报。
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 * actionCreators值为action的对象创作者功能。获得它的一个方便方法是使用ES6`import *作为`句法。您也可以传递一个函数。
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.  dispatch Redux上提供的`dispatch`函数商店。
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 * 模仿原始对象的对象，但是带有每个动作创建者都包含在`dispatch`调用中。如果你通过了作为`actionCreators`的函数，返回值也将是单个功能。
 */
