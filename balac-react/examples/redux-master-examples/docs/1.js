动机、三大原则、先前技术、生态系统

可能的 state: 服务器响应、缓存数据、本地生成尚未持久化到服务器的数据，UI 状态、激活的路由、被选中的标签、是否显示加载动效或者分页器等

变化、异步
	
核心概念
	
	// state
	{
		todos: [
			{
				text: 'Eat-food',
				completed: true
			},
			{
				text: 'Exercise',
				completed: false
			}
		],
		visibilityFilter: 'SHOW_COMPLETED'
	}

	// action, 描述发生了什么的对象
	{ type: 'ADD_TODO', text: 'Go to swimming pool' }
	{ type: 'TOGGLE_TODO', index: 1 }
	{ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }

	// reducer, 关联 action 和 state。只接受 state, action，返回新的 state
	function visibilityFilter(state = 'SHOW_ALL', action) {

		if (action.type === 'SET_VISIBILITY_FILTER') {

			return action.filter;
		} else {
			return state;
		}
	}
	// 多个小函数分别管理 state 的一部分
	function todos(state = [], action) {
		switch (action.type) {
			case 'ADD_TODO':
				return state.concat([{ text: action.text, completed: false }]);
			case 'TOGGLE_TODO':
				return state.map((todo, index) => {
					action.index === index ?
						{ text: todo.text, completed: !todo.completed } :
						todo
				});
			default:
				return state;
		}
	}
	// 管理整个应用的 state
	function todoApp(state = {}, action) {
		return {
			todos: todos(state.todos, action),
			visibilityFilter: visibilityFilter(state.visibilityFilter, action)
		};
	}

三大原则：
	
	单一数据源：整个应用的 state 被储存在一颗 object tree 中，并且这个 object tree 只存在于唯一一个 store 中

		console.log( store.getState() );
		{// 输出
			visibilityFilter: '...',
			todos: [ ... ]
		}

	State 是只读的：唯一改变 state 的方法就是触发 action, action 是一个用于描述已发生事件的普通对象

		store.dispatch({ type: 'COMPLETE_TODO', index: 1 })

	使用纯函数来执行修改：为了描述 action 如何修改 state tree，需要编写 reducers

		function visibilityFilter(state, action) {...}
		function todos(state, action) { ... }
		import { combineReducers, createStore } from 'redux';
		let reducer = combineReducers({ visibilityFilter, todos });
		let store = createStore(reducer);

先前技术 

生态系统

示例		