/**
 * Action 是把数据从应用传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。
 * （译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）
 * 应该尽量减少在 action 中传递的数据。
 */

// Action 本质上是 JavaScript 普通对象
{
    type: ADD_TODO,
    text: ''
}

// 当应用规模越来越大时，建议使用单独的模块或文件来存放 action。
import { ADD_TODO, REMOVE_TODO } from '../actionTypes';

// action 类型，对于小应用来说，使用字符串做 action type 更方便些。
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

// action 创建函数，负责返回 action
export function addTodo (text) {
    return {
        type: ADD_TODO,
        text
    };
}
export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
}

// dispatch 过程
dispatch(addTodo(text)); 或 const boundAddTodo = text => dispatch(addTodo(text));
boundAddTodo(text);
store.dispatch();
