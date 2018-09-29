/**
 * action 来描述“发生了什么”
 * reducers 来根据 action 更新 state
 * store 把 action, reducers 联系到一起的对象，职责：
 * 维持 state, getState() 获取 state, dispatch(action) 更新 state, subscribe(listener) 注册监听器, subscribe(listener) 返回的函数注销监听器。
 */

// Redux 应用只有一个单一的 store。当需要拆分数据处理逻辑时，你应该使用 reducer 组合 而不是创建多个 store。
