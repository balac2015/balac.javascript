深入 React 技术栈，主要内容：

	01、React 基本概念，API，熟悉 React 的编码过程

		React 简介、JSX 语法、React 组件、React 数据流、React 生命周期、React 与 DOM

		demos: 组件化实例：Tabs 组件

	02、深入 React，实列的实现到自动化测试过程讲述 React 组件化的过程和思路

		事件系统、表单样式处理、组件间通信、组件间抽象、组件性能优化、动画、自动化测试

		demos: 组件化实例：优化 Tabs 组件

	03、React 源码，背后实现原理：Virtual DOM, diff 算法，生命周期管理，setState 机制

		初探 React 源码、Virtual DOM 模型、生命周期的管理艺术、解密 setState 机制、diff 算法、React Patch 方法

	04、flux 基本概念，与 MV* 架构的不同，flux 核心思想

		React 独立架构、MV* 与 Flux、Flux 基本概念、Flux 应用实例、解读 Flux

	05、redux，从构建 spa 到背后的实现逻辑，扩展 redux 生态圈的 middleware、utils

		Redux 简介、Redux middleware、Redux 异步流、Redux 与路由、Redux 与组件、Redux 应用实例

	06、redux 高阶运用，高阶 reducer、表单中的运用和性能优化，redux 源码解读

		高阶 Redux、Redux 与表单、Redux CRUB 实战、Redux 性能优化、解读 Redux、解读 react-redux

	07、react 在服务端的渲染，实列 + koa 讲述同构实现

		React 与服务端模板、React 服务端渲染

		资料：https://segmentfault.com/a/1190000007512055

	08、可视化图形图表，结合 react 的方法

		React 结合 Canvas 和 SVG、React 与可视化组件、Recharts 组件化的原理


单页应用：单向绑定、声明式 UI

React: 2013 年开源、dom 当成纯函数、不可变性（immutability）和单向数据流

react 核心思想和实现机制

作为 view 库，怎么实现组件化，及背后的实现原理

flux, redux 怎么与 react 结合开发

与 server，可视化


virtual dom: 虚拟 dom, state: 状态, props: 属性, action: 动作, reducer, store

middleware: 中间件, dispatcher: 分发器, action creator: action 构造器

currying: 柯里化


	react.js 				核心代码，必须

	react-dom.js 			DOM 渲染

	react-dom-fiber.js 		虚拟调用栈，做任务调度的

	react-dom-server.js 	DOM 服务器端渲染

	react-with-addons.js 	拓展功能


react:
	
	create-react-app: https://github.com/facebook/create-react-app

		$ create-react-app project-name

	浏览器兼容：https://segmentfault.com/a/1190000005794242		

	富文本编辑器：https://github.com/ianstormtaylor/slate