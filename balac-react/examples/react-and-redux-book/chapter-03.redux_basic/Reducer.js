import * as ActionTypes from './ActionTypes.js';

/**
 * reducer 是一个纯函数
 * 绝对不能去修改参数中的 state 
 */
export default (state, action) => {
    const { counterCaption } = action;

    switch (action.type) {

        case ActionTypes.INCREMENT:
            return {...state, [counterCaption]: state[counterCaption] + 1};

        case ActionTypes.DECREMENT:
            return {...state, [counterCaption]: state[counterCaption] - 1};

        default:
            return state;
    }
};
/**
扩展操作符 spread operator（...state）表示把 state 中所有字段扩展开，后面对 counterCaption 值对应的字段会赋上新值
return {...state, [counterCaption]: state[counterCaption] + 1}; 等价于 =>
const newState = Object.assign({}, state);
newState[counterCaption] ++;
return newState;
*/
