/**
 * 要点
 * 应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。
 * 惟一改变 state 的办法是触发 action，一个描述发生什么的对象。（把要做的修改变成一个普通对象）
 * 为了描述 action 如何改变 state 树，你需要编写 reducers。（专门的函数来决定每个 action 如何改变应用的state，）
 */

import { createStore } from 'redux';
/**
* 这是一个 reducer，形式为 (state, action) => state 的纯函数。
* 描述了 action 如何把 state 转变成下一个 state。
*
* state 的形式取决于你，可以是基本类型、数组、对象、
* 甚至是 Immutable.js 生成的数据结构。惟一的要点是
* 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
*
* 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
* 根据不同的约定（如方法法映射）来判断，只要适用你的项目即可。
*/
function counter (state = 0, action) {
	switch (action.type) {
		case 'INCREMENT': return state + 1;
		case 'DECREMENT': return state - 1;
		default: return state;
	}
}
// 创建 Redux store 来存放应⽤的状态。
// API 是 { subscribe, dispatch, getState }。
lset store = createStore(counter);
// 可以⼿动订阅更新，也可以事件绑定到视图层。
store.subscribe(() => {
	console.log( store.getState() );
});
// 改变内部 state 惟⼀⽅法是 dispatch ⼀个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的式执执行
store.dispatch({ typpe: 'INCREMENT' });
store.dispatch({ typpe: 'DECREMENT' });