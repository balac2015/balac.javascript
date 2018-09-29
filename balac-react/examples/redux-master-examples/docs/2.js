Action
	
	把数据从应用传到 store 的有效载荷，是 stoe 数据的唯一来源。通过 store.dispatch() 将 action 传到 store

	{
		type: ADD_TODO,			// 表示将要执行的动作，通常定义成字符串常量
		text: 'Build my first Redux app'	// 应该尽量减少在 action 中传递的数据
	}

	import { ADD_TODO, REMOVE_TODO } from '../actionTypes';

	Action 创建函数：
		function addTodo (text) {
			return {
				type: ADD_TODO,
				text
			};
		}

		dispatch(addTodo(text));

		const boundAddTodo = (text) => dispatch(addTodo(text));
		boundAddTodo(text);

Reducer

	设计 state 结构

	(previousState, action) => newState;

	只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。	

	// 指定 state 的初始状态
	function todoApp (state = initialState, action) {
		return state;
	}

	不要修改 state、在 default 情况下返回旧的 state

	import * as reducers from './reducers.js'
	const todoApp = combineReducers(reducers);

Store
	
	维持 state, .getState() 获取 state, .dispatch(action) 更新 state, .subscribe(listener) 注册监听器, .subscribe(listener) 注销监听器

	redux 应用只有一个单一的 store

	let store = createStore(reducers, window.STATE_FROM_SERVER);	// 第二个参数是可选的, 用于设置 state 初始状态	

数据流：严格的单向数据流的结构设计核心

搭配 react
	
	Deku: https://github.com/anthonyshort/deku	