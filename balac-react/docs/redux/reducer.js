/**
 * Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。
 */


 import { VisibilityFilters } from './actions'

// 设计 state 结构 - 以最简的形式把应用的 state 用对象描述出来。
// 尽可能地把 state 范式化，不存在嵌套
const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,   // UI 相关 state
    todos: []                                       // state 数据
};

// action 处理
function todoApp (state = initialState, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            // 不修改 state，Object.assign(state, {...}) 的话会修改 state 
            return Object.assign({}, state, {
                visibilityFilter: action.filter
            });
        default:
            return state;
    }
}
