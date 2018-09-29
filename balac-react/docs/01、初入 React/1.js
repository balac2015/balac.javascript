第 1 章、初入 React 世界

	React 把用户界面抽象成一个组件

	不是完整的 MVC/MVVM 框架，提供 View 解决方案，包括 View 和 Controller 的库

	搭配 flux, redux, GraphQL/Relay

	Minimal API Interface 为目标，提供少量的 API

Virtual DOM --- 真实 DOM 转换成的 JavaScript 对象树
	
	方便和其他平台集成，如 react-native

	数据更新后，计算 Virtual DOM 并和上次 Virtual DOM 对比，对发生变化的部分做批量更新，shouldComponentUpdate 建设数据变化后不必要的 Virtual DOM 对比过程

函数式编程 --- React 精髓
	
	减少代码冗余，组件本身就是函数，易于测试

JSX
	
	DOM 元素，必要条件：元素类型、元素属性

		<button class="btn btn-blue">	// 页面由 HTML 元素嵌套组合而成
			<em>Confirm</em>
		</button

		{							// JavaScript 描述，表示成 JSON 对象
			type: 'button',
			props: {
				className: 'btn btn-blue',
				children: [
					{
						type: 'em',
						props: {
							children: 'Confirm'
						}
					}
				]
			}
		}

	组件元素

		const Button = ({ color, text }) => {	// 构建按钮的公共方法：对上面 button 元素的封装
			return {
				type: 'button',
				props: {
				className: 'btn btn-blue',
				children: [
					{
						type: 'em',
						props: {
							children: text
						}
					}
				]
			}
			}
		}

		Button({ color: 'blue', text: 'Confirm' })	// 生成 DOM 元素中具体的按钮

		{					// Button 作为元素而存在，自定义类型的元素（组件元素）
			type: Button,
			props: {
				color: 'blue',
				children: 'Confirm'
			}
		}

	JSX -> Babel 编译器 -> JavaScript

	定义标签时，只允许被一个标签包裹

	标签一定要闭合

	元素类型，HTML 标签首字母小写对应 DOM 元素，组件元素首字母大写

	<MUI.RaisedButton label ="" />	// 命名空间的方式使用组建元素 MUI 为包名

	注释：{/* 节点注释 */} 对应 HTML 中的 <!--- content -->

		<!--[if IE]>		// HTML 中的特殊注释：条件注释，常用于判断浏览器版本
			<p>work in ie browser</p>
		<![endif]-->

		{					// js 判断浏览器版本替代
			(!!window.ActiveXObject || 'ActiveXObject' in window) ?
				<p>work in ie browser</p> : ''
		}

	元素属性：class -> className, for -> htmlFor

		自定义属性标准写法改为驼峰写法

		Boolean 属性，常用于表单元素中：disabled, required, checked, readOnly 等

			<Checkbox checked /> // 省略则 JSX 默认为 true，<Checkbox checked={ true } /> 的简写

			<Checkbox checked={ false } />	// 传 false 时必须用属性表达式。
	
	展开属性

		const data = { name: 'foo', value: 'bar' }
		const component = <Component {...data} />

	自定义 HTML 属性

		HTML 标签使用 data- 前缀（HTML 标准），aria- 前缀（网络无障碍属性）的自定义属性，其它形式的自定义属性不支持

		自定义标签中任意属性都支持：<x-my custom-attr="foo" />

	JavaScript 属性表达式：{ ... }

	HTML 转义

		会将所有要显示到 DOM 的字符串转义，防止 XSS，如 &copy; React 会把特殊字符转移，最后不会正确显示

		解决办法：1、直接使用 UTF-8 字符 ©

			2、使用对应字符的 Unicode 编码查询编码

			3、使用数组组装：<div>{ ['cc   ', <span>&copy;</span>, '  2015'] }</div>;

			4、直接插入原始的 HTML

		<div dangerouslySetInnerHTML={ {__html: 'cc &copy; 2015'} } /> 避免 React 转义字符的 dangerouslySetInnerHTML 属性
	
组件
	
	基本的封装性，生命周期呈现，明确的数据流动

	web components 的组成：html template 定义模板的概念, custom elements 定义组件的展现形式, shadow dom 定义了组建的作用域范围, html import 提出了新的引入方式。 polymer 库的实现

	react 组件：属性 props, 状态 state, 生命周期方法

	react 组建构建方法：React.createClass, ES6 classes, stateless function 无状态函数

React 数据流
	
	自顶向下单向流动

	state 只关心每个组件自己内部的状态，这些状态只能在组件内改变

	使用 setState() 时，最大的表现行为就是该组件会尝试重新渲染。

	setState 是一个异步方法，一个生命周期内所有的 setState 方法会合并操作		

	props 是 React 用来让组件之间互相联系的一种机制

	props 本身是不可变

	props.children 代表组件的子组件集合，

	propTypes 规范 props 的类型与必需的状态

react 生命周期 life cycle

	可分成两类：
	
		当组建在挂载或卸载时

		当组件接收新的数据时，即组件更新时

	组件的挂载（组建状态的初始化过程：读取 state, props, componentWillMount, componentDidMount）

		componentWillMount 中执行 setState，则无意义的操作

		componentDidMount 中执行 setState，初始化过程渲染了两次组件，（计算组建位置或宽高时的场景，组件先渲染，再更新必要信息后，再次渲染）


	组件的卸载：	
		
		componentWillUnmout 常常会执行一些清理方法，如事件回收或是清除定时器。	

	数据更新过程：

		shouldComponentUpdate 本质是用来进行正确的组件渲染

		componentWillUpdate 提供需要更新的 props 和 state

		render

		componentDidUpdate 提供更新前的 props 和 state

	componentDidMount, componentDidUpdate 中 DOM 正真被添加到 HTML，其中可以获取真正的 DOM 元素

React 与 DOM 
	
	ReactDOM 的 API:

		findDOMNode （当组件被渲染到 DOM 中后）返回该 React 组件实例相应的 DOM 节点。它可以用于获取表单的 value 以及用于 DOM 的测量。

		unmountComponentAtNode 卸载操作

		render

	refs 组件被调用时会新建一个该组件的实例，而 refs 就会指向这个实例。
	
	react 之外的 DOM 操作

组件化实列：Tabs 组件	
