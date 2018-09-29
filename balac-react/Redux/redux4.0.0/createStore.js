// 1.symbol-observable
import $$observable from 'symbol-observable'
// 私有 action
import ActionTypes from './utils/actionTypes'
import isPlainObject from './utils/isPlainObject'

// 2.createStore
export default function createStore (reducer, preloadedState, enhancer) {
	// 判断接受的参数个数，来指定 reducer 、 preloadedState 和 enhancer
	if (typeof preloadedState === 'function' && enhancer === 'undefined') {
		enhancer = preloadedState
		preloadedState = undefined
	}
	// 如果 enhancer 存在并且适合合法的函数，那么调用 enhancer，并且终止当前函数执行
	if (typeof enhancer !== 'undefined') {

		if (typeof enhancer !== 'function') {
			throw new Error('Expected the enhancer to be a function.')
		}

		enhancer(createStore)(reducer, preloadedState)
	}

	if (typeof reducer !== 'function') {
		throw new Error('Expected the reducer to be a function')
	}

	// 初始化参数
	let currentReducer = reducer			// 整个 reducer
	let currentState = preloadedState		// 储存当前状态
	let currentListeners = []				// 储存当前监听函数列表
	let nextListeners = currentListeners	// 储存下一个监听函数列表
	let isDispatching = false				// 是否正在执行 reducer(是否处于 dispatch action 状态中)

	// 内部方法
	function ensureCanMutateNextListeners() {// 确保currentListeners 和 nextListeners 是不同的引用
		if (nextListeners === currentListeners) {
			nextListeners = currentListeners.slice()	// 使 nextListeners !== currentListeners
		}
	}

	// 3.getState
	function getState() {
		if (isDispatching) {
			throw new Error(
				'You may not call store.getState() while the reducer is executing. ' +
		          'The reducer has already received the state as an argument. ' +
		          'Pass it down from the top reducer instead of reading it from the store.'
			)
		}

		return currentState
	}

	// 4.subscribe
	function subscribe(listener) {
		if (typeof listener !== 'function') {
			throw new Error('Expected the listener to be a function.')
		}

		if (isDispatching) {
			throw new Error(
				'You may not call store.subscribe() while the reducer is executing. ' +
	          'If you would like to be notified after the store has been updated, subscribe from a ' +
	          'component and invoke store.getState() in the callback to access the latest state. ' +
	          'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
			)
		}

		let isSubscribed = true

		ensureCanMutateNextListeners()
		nextListeners.push(listener)

		return function unsubscribe() {
			if (!isSubscribed) {
				return
			}

			if (isDispatching) {
				throw new Error(
					'You may not unsubscribe from a store listener while the reducer is executing. ' +
            		'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
				)
			}

			isSubscribed = false

			ensureCanMutateNextListeners()
			const index = nextListeners.indexOf(listener)
			nextListeners.splice(index, 1)
		}
	}

	// 5.dispatch
	function dispatch(action) {
		if (!isPlainObject(action)) {
			throw new Error(
				'Actions must be plain objects. ' +
          		'Use custom middleware for async actions.'
			)
		}
		if (typeof action.type === 'undefined') {
			throw new Error(
				'Actions may not have an undefined "type" property. ' +
          		'Have you misspelled a constant?'
			)
		}
		if (isDispatching) {
			throw new Error('Reducers may not dispatch actions.')
		}
		try {
			isDispatching = true
			currentState = currentReducer(currentState, action)
		} finally {
			isDispatching = false
		}
		const listeners = (currentListeners = nextListeners)
		for (let i = 0; i < listeners.length; i++) {
			const listener = listeners[i]
			listener()
		}
		return action
	}

	// 6.replaceReducer
	function replaceReducer(nextReducer) {
		if (typeof nextReducer !== 'function') {
			throw new Error('Expected the nextReducer to be a function.')
		}
		currentReducer = nextReducer
		dispatch({ type: ActionTypes.REPLACE })
	}

	// 7.observable
	function observable() {
		const outerSubscribe = subscribe

		return {
			// 8.observable.subscribe
			subscribe(observable) {
				if (typeof observer !== 'object' || observer === null) {
					throw new TypeError('Expected the observer to be an object.')
				}

				function observeState() {
					if (observer.next) {
						observer.next(getState())
					}
				}

				observeState()
				const unsubscribe = outerSubscribe(observeState)
				return { unsubscribe }
			},
			[$$observable]() {
				return this
			}
		}
	}

	dispatch({
		type: ActionTypes.INIT
	})

	return {
		dispatch,
		subscribe,
		getState,
		replaceReducer,
		[$$observable]: observable
	}
}

// 2.createStore
/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * Redux 最主要的一个 API 了，它创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 * reducer：是一个函数，返回下一个状态，接受两个参数：当前状态 和 触发的 action；
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 * preloadedState：初始状态对象，可以很随意指定，比如服务端渲染的初始状态，但是如果使用 combineReducers 来生成 reducer，那必须保持状态对象的 key 和 combineReducers 中的 key 相对应；
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 * enhancer：store 的增强器函数，可以指定为 第三方的中间件，时间旅行，持久化 等等，但是这个函数只能用 Redux 提供的 applyMiddleware 函数来生成；
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

// 3.getState
 /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */

// 4.subscribe
/**
 * Adds a change listener. It will be called any time an action is dispatched,
 * and some part of the state tree may potentially have changed. You may then
 * call `getState()` to read the current state tree inside the callback.
 *
 * You may call `dispatch()` from a change listener, with the following
 * caveats:
 *
 * 1. The subscriptions are snapshotted just before every `dispatch()` call.
 * If you subscribe or unsubscribe while the listeners are being invoked, this
 * will not have any effect on the `dispatch()` that is currently in progress.
 * However, the next `dispatch()` call, whether nested or not, will use a more
 * recent snapshot of the subscription list.
 *
 * 2. The listener should not expect to see all state changes, as the state
 * might have been updated multiple times during a nested `dispatch()` before
 * the listener is called. It is, however, guaranteed that all subscribers
 * registered before the `dispatch()` started will be called with the latest
 * state by the time it exits.
 *
 * @param {Function} listener A callback to be invoked on every dispatch.
 * @returns {Function} A function to remove this change listener.
 */

// 5.dispatch
/**
 * Dispatches an action. It is the only way to trigger a state change.
 *
 * The `reducer` function, used to create the store, will be called with the
 * current state tree and the given `action`. Its return value will
 * be considered the **next** state of the tree, and the change listeners
 * will be notified.
 *
 * The base implementation only supports plain object actions. If you want to
 * dispatch a Promise, an Observable, a thunk, or something else, you need to
 * wrap your store creating function into the corresponding middleware. For
 * example, see the documentation for the `redux-thunk` package. Even the
 * middleware will eventually dispatch plain object actions using this method.
 *
 * @param {Object} action A plain object representing “what changed”. It is
 * a good idea to keep actions serializable so you can record and replay user
 * sessions, or use the time travelling `redux-devtools`. An action must have
 * a `type` property which may not be `undefined`. It is a good idea to use
 * string constants for action types.
 *
 * @returns {Object} For convenience, the same action object you dispatched.
 *
 * Note that, if you use a custom middleware, it may wrap `dispatch()` to
 * return something else (for example, a Promise you can await).
 */

// 6.replaceReducer
/**
 * Replaces the reducer currently used by the store to calculate the state.
 *
 * You might need this if your app implements code splitting and you want to
 * load some of the reducers dynamically. You might also need this if you
 * implement a hot reloading mechanism for Redux.
 *
 * @param {Function} nextReducer The reducer for the store to use instead.
 * @returns {void}
 */

// 7.observable
/**
 * Interoperability point for observable/reactive libraries.
 * @returns {observable} A minimal observable of state changes.
 * For more information, see the observable proposal:
 * https://github.com/tc39/proposal-observable
 */

// 8.observable.subscribe
 /**
  * The minimal observable subscription method.
  * @param {Object} observer Any object that can be used as an observer.
  * The observer object should have a `next` method.
  * @returns {subscription} An object with an `unsubscribe` method that can
  * be used to unsubscribe the observable from the store, and prevent further
  * emission of values from the observable.
  */
