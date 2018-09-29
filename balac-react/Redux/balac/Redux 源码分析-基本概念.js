rootReducer: reducer1, reducer2, ..., reducerN

	combineReducers

state: previousState, newState

	store

store ---notify state change---> Views ---user interactions---> Action Creator ------> Action ---store.dispatch(action)---> store

// action 一个操作的定义，大概是这个样子, 本身是一个对象
{
	type: 'add',
	todo
}

// actionCreater: 一个函数，返回结果是一个action
function add(todo) {
	return {
		type: 'add',
		todo
	}
}

// reducer： 真正更新数据操作的函数
let todoReducer = function (state = 0, action) { ... }

/**
 * 示例
 */
let { createStore } = window.Redux
// state
let todoList = []
// reducer
let todoReducer = function (state = todoList, action) {
	switch (action.type) {
		case 'add': return [...state, action.todo]
		case 'delete': return state.filter(todo => todo.id !== action.id)
		default: return state
	}
}
let store = createStore(todoReducer)
// 订阅
function subscribe1Fn() {
	console.log( store.getState() )
}
let sub = store.subscribe(subscribe1Fn)
store.dispatch({
    type: 'add',
    todo: {
        id: 1,
        content: '学习redux'
    }
})

store.dispatch({
    type: 'add',
    todo: {
        id: 2,
        content: '吃饭睡觉'
    }
})

store.dispatch({
    type: 'delete',
    id: 2
})

// 取消订阅
sub()

console.log('取消订阅后：')
store.dispatch({
    type: 'add',
    todo: {
        id: 3,
        content: '打游戏'
    }
})
