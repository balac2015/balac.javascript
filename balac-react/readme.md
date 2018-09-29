React

    https://segmentfault.com/a/1190000005136764
	
node_modules/.bin/create-react-app demo01

学习：https://www.jianshu.com/p/2f744954e2d2

http://www.react-china.cn/news/show-269.html

react-router:
	
	http://reacttraining.cn/web/guides/quick-start

React

    一个用于构建用户界面的 JavaScript 库。它是Web应用程序的视图层。

    核心是组件(components)。组件是一个自包含的模块，它提供一些输出

    组件遵守严格的数据管理原则。复杂的交互式用户界面通常涉及复杂的数据和应用程序状态。

React不是直接在浏览器的文档对象模型（DOM）上运行，而是在虚拟DOM(virtual DOM)上运行。在更新虚拟DOM之后，React会智能地确定对实际DOM所做的更改。

虚拟DOM 完全存在于内存中，并且是网络浏览器的DOM的表示。因此，当我们写一个React组件时，我们不是直接写入DOM，而是写一个虚拟组件，React将变成DOM。



https://www.zcfy.cc/@jiaxianhua/article

http://www.react-china.cn/news/show-276.html


https://juejin.im/entry/5af0e776518825670c45ddba

react 富文本编辑器：https://doodlewind.github.io/slate-doc-cn/、https://github.com/facebook/draft-js

slate: https://juejin.im/post/59e6fc9951882578d503952c


为什么要用框架：
	
	UI、状态同步

	问题：更新效率，同步

	保持 UI 与状态的同步思路：

		1、组件级重渲染：比如 React，当状态改版后，映射出改变后的虚拟 DOM，最终改变当前组件映射的真实 DOM，这个过程被称为 reconciliation。

		2、监听修改：比如 Angluar 和 Vue.js，状态改变直接触发对应 DOM 节点中 value 值的变化。

		虚拟 dom 的整体渲染、observable 

最后给出了四点总结：

	现代 js 框架主要在解决 UI 与状态同步的问题。
	仅使用原生 js 难以写出复杂、高效、又容易维护的 UI 代码。
	Web components 没有解决这个主要问题。
	虽然使用虚拟 DOM 库很容易造一个解决问题的框架，但不建议你真的这么做！

jquery 解决标准化问题的库

react 解决 web 规范与实践的冲突

service worker，它是凌驾于 html 执行时机之上的 js 脚本，甚至可以拦截 html 请求。

最后总结一下观点：

	也是原作者的，现代 js 框架主要在解决 UI 与状态同步的问题。
	传统的前端三剑客正面临着进一步发展乏力的危机。
	现代前端框架正在告诉我们新的三剑客：js（虚拟 dom、虚拟 css）。