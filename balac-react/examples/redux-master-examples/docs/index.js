Redux

	是 JavaScript 状态容器，提供可预测化的状态管理。

	日志打印、热加载、时间旅行、同构应用、录制和重放

	Redux: https://github.com/reduxjs/react-redux

	工具：https://github.com/reduxjs/redux-devtools

	Flux 演变: http://facebook.github.io/flux/，(state, action) => state

	Elm 启发: https://github.com/evancz/elm-architecture-tutorial/

只有一个单一的 store 和一个根级的 reduce 函数（reducer），随着应用不断变大，你应该把根级的 reducer 拆成多个小的 reducers，分别独立地操作 state 树的不同部

做复杂应用、庞大系统时优秀的扩展能力

示例：
	原生 Counter, Counter, Todos, 可撤销的 Todos, TodoMVC, 购物车，Tree View, 异步，Universal, Real World

Elm 架构 介绍了使⽤ reducers 来操作 state 数据；语言

Turning the database inside-out 大开脑洞;
	
ClojureScript ⾥使⽤ Figwheel for convincing me that re-evaluation

should “just work”;

Webpack 热模块替换;

Flummox 教我在 Flux ⾥去掉样板⽂件和单例对象；

disto 演示使⽤热加载 Stores 的可⾏性；

NuclearJS 证明这样的架构性能可以很好；

Om 普及 state 惟一原子化的思想。

Cycle 介绍了 function 是如何在很多场景都是最好的⼯具；

React 实践启迪。

