http://cn.redux.js.org/

Counter: redux + react 最基本示例额，store 变化后，react 组件手动重新渲染

Todos: state 的更新与组件的共同运作、reducer 如何委派 action 给其它 reducer、 react redux

todos-with-undo: 支持撤销的 todos

	redux-undo 打包 reducer, https://github.com/omnidan/redux-undo

TodoMVC: 与 todos 相同目的

shopping cart 购物车: 展示了随着应⽤升级变得愈发重要的常⽤的 Redux 模式。尤其展示了，如何使⽤ ID 来标准化存储数据实体，如何在不同层级将多个 reducer 组合使⽤，如何利⽤ reducer 定义选择器以封装 state 的相关内容。

	redux logger 生成日志：https://github.com/evgenyrodionov/redux-logger

	redux thunk 进行 action 条件性分发: https://github.com/reduxjs/redux-thunk

tree view: 展示了深层嵌套树状视图的渲染、方便 redux 更新 state 的标准化写法、

async: 异步 API 的读取、基于用户的输入获取数据、显示正在加载提示、缓存响应、缓存过期失效

	redux thunk 封装异步带来的附带作用

universal 同构: redux + react 的 server rendering、在服务器端准备 store 中的初始 state 并传递到客户端，使客户端中的 store 可以从现有的 state 启动

real world 真是场景: 持续性地从标准化缓存中批量获取数据实例、针对 API 调用的自定义中间件的实现、逐步渲染已加载的数据、分页器、缓存响应、展示错误信息、路由、redux devtools 的使用
