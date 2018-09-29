第 2 章、漫谈 React

	事件系统，样式处理，表单，组件间抽象，组件性能优化，动画与动画测试

事件系统
	
	基于 Virtual DOM 实现了 SyntheticEvent（合成事件）层，不存在兼容性问题，与原生事件有同样的接口，支持 stopPropagation(), preventDefault()

		.nativeEvent 属性，可访问原生事件对象

	合成事件的实现机制：

		事件委派，把所有事件绑定到 Virtual dom 结构的最外层，用统一的事件监听器维持保存所有组件内部事件监听和处理函数映射

		自动绑定,

			bind 方法：<button onClick={ this.handleClick.bind(this, 'test') } />

				handleClick (e, arg) { console.log(e, arg) }

			只绑定，不传参，使用双冒号语法: <button onClick={ ::this.handleClick } />

				handleClick (e) { console.log(e) }

			构造器内声明：constructor () { this.handleClick = this.handleClick.bind(this) }

				<button onClick={ this.handleClick } />

				handleClick (e) { console.log(e) }

			箭头函数，<button onClick={ this.handleClick } />

				const handleClick = (e) => { console.log(e) }

				或：<button onClick={ () => this.handleClick() } //>

					handleClick (e) { console.log(e) }

	在 React 中使用原生事件，一定要在组件卸载时手动移除，否则很可能出现内存泄漏的问题。

	尽量避免在 React 中混用合成事件和原生 DOM 事件		

		componentDidMount () {
			document.body.addEventListener('click', e => {
				if (e.target && e.target.matches('div.code')) {	// 合成事件的冒泡解决
					return
				}
				this.setState({
					active: false
				})
			})
		}

	React 合成事件的事件类型是 JavaScript 原生事件类型的一个子集

表单
	
	文本框：input, textarea

	单选按钮与复选框

	select 组件（单选、多选）

	受控组件 controlled component

		组件渲染的状态与它的 value 或 checked prop 相对应，消除组件的局部状态，使应用的整个状态更加可控

		React 受控组件更新 state 的流程：

			1、可以通过在初始 state 中设置表单的默认值

			2、每当表单的值发生变化时，调用 onChange 事件处理器。（可对表单值进行清洗和校验）

			3、事件处理器通过合成事件对象 e 拿到改变后的状态，并更新应用的 state

			4、setState 触发视图的重新渲染，完成表单组件值的更新

		react 数据是单向流动的，表单数据源于组件的 state，通过 props 传入。通过 onChange 将新的表单数据写回到组件的 state，完成双向数据绑定

	非受控组件 uncontrolled component

		表单组件没有 value, checked props 时，onChange 不是必需

		可以使用 defaultValue, defaultChecked prop 来表示组件的默认状态

		<form onSubmit={ this.handleSubmit }>
			<input ref="name" type="text" defaultValue="Tianshui" />
			<button type="submit">submit</button>
		</form>

		handleSubmit (e) {
			e.preventDefault()
			const { value } = this.refs.name	// ref prop 操作 DOM，或 document.querySelector 接口操作

			console.log( value )
		}

	flux/redux 方式可达到统一组件状态的目的，不提倡 react 中使用非控组件。

		handleChange (name, e) {
			const { value } = e.target
			this.setState({
				[name]: value
			})
		}
		<input value={ this.state.age } onChange={ this.handleChange.bind(this, 'age') }

	表单组件的几个重要属性

		状态属性：value --- input, textarea, select 借助 value prop 展示状态

			checked --- radio, checkbox 组件借助 boolean 类型的 selected prop 展示状态

			selected --- 可作用于 select 的 option 上，不建议该种方式表示状态，推荐使用 value 方式

		事件属性：react 支持 DOM Level3 中定义的所有表单事件

	样式处理

		className，行内样式使用对象，样式中的像素值，classnames 库，

		CSS 模块化：

			inline style 方案：radium, jsxstyle

			CSS Modules: css-loader

	组件间通信

		父组件向子组件通信：props

		子组件向父组件通信：利用回调函数、利用自定义事件机制

			跨级组件通信：context（不建议使用，全局变量，比较好的场景：全局信息不会更改，如界面主题、用户信息等）

		没有嵌套关系的组件通信：影响全局的机制

			import { EventEmitter } from 'events'
			export default new EventEmitter() // 只需要单例，所以单独初始化实例

组件间抽象，功能被不同的组件公用
	
	mixin（反模式，不建议使用）

		类似多重继承的效果，接口 interface，组合，mixin 混用模块

		decorator 解决 class 组件中 @mixin 问题，core-decorators 库 

		问题：1、破坏了组件的封装（带来了很多不可知的 state, props, 方法, mixin 依赖链等问题）

			2、命名冲突

	高阶组件 higher-order component：接受 React 组件作为输入，输出一个新的 React 组件

		高阶函数 higher-order function：接受函数作为输入，或是输出的一个函数，如 map, reduce, sort 等

		复用性、逻辑性、抽象性，可对 render() 作劫持，可控制 props, state。被包裹 wrapped，增强 enhanced

		高阶组件实现的方法：************************** 重点

			属性代理 props proxy：高阶组件通过被包裹的 react 组件来操作 props

			反向继承 inheritance inversion：高阶组件继承于被包裹的 react 组件

	组合式组件开发实践

	写 React 时应首先考虑：单一功能，简洁的设计和逻辑，当加入功能时刻继续控制组件的输入和输出

组件性能优化
	
	影响网页性能最大的因素：浏览器的重绘（reflow）和重排版（repaint）

	纯函数的三大原则：（纯函数是函数式编程的基础）

		给定相同的输入，总是返回相同的输出

		过程没有副作用（side effect）。（纯函数中不能改变外部状， Immutable 概念，lodash 的 cloneDeep() ）

		没有额外的状态依赖。（不能在方法内使用其它作用域的变量，会带来不可知因素）

	更专注 focused、体积更小 small、更独立 independent、更具复用性 reusability、可测试性 testability

	PureRender --- Pure 指满足纯函数的条件（组件的渲染被相同的 props, state 渲染进而得到相同的结果）

		PureRender 本质：重新实现了 shouldComponentUpdate 生命周期方法

		react-addons-pure-render-mixin 插件

	Immutable

		可变的 mutable，浅拷贝 shallowCopy，深拷贝 deepCopy

		Immutable Data 是一旦创建，就不能再更改的数据。对 Immutable 对象的修改、添加、删除都会返回一个新的 Immutable 对象

		Immutable 实现原理：持久化的数据结构（persistent data structure）

			使用旧数据创建新数据时，要保证数据同时可用且不可变。同时为了避免深拷贝把所有节点都复制一遍带来的性能损耗，Immutable 使用了结构共享（structural sharing），即如果对象树中一个节点发生变化，只修改这个节点和受他影响的父节点，其他节点则进行共享

		易用的数据类型：Collection, List, Map, Set, Record, Seq

		Map --- 键值对集合，对应于 Object，ES6 有专门的 Map 对象

		List --- 有序可重复的列表，对应于 Array

		ArraySet --- 无序且不可重复的列表

		Immutable 优点：降低了“可变”带来的复杂度、节省内存、撤销/重做，复制/粘贴，时间旅行等功能、并发安全、函数式编程

		Immutable 缺点：容易与原生对象混淆（避免方法：TypeScript、约定变量命名规则，如 $$ 开头）

		Immutable.js，类似库：mori, cortex 等 

		Immutable 与 PureRendre 

		Immutable 与 setState

	key

		独一无二，能不用遍历或随机值就不用

		react-addons-create-fragment 插件

	react-addons-perf 插件，性能检测工具

	整个 React 组件的优化逻辑都是针对 Virtual DOM 的更新优化

动画
	
	CSS 动画与 JavaScript 动画
	
		变化要慢，用逐渐变化的过程过渡，帮用户理解页面

		界面的变化分为 DOM 节点（或组件）的增与减、DOM 节点（或组件）属性的变化

		TransitionnGroup 

		CSS 动画的局限性：

		CSS animation

		用 JavaScript 包装过的 CSS 动画

		react-smooth 库：提供定制化缓动函数的插件入口，支持 CSS 动画，支持各种缓动类型的 JavaScript 动画

		JavaScript 动画：缓动函数部分、渲染部分（在缓动函数中执行 setState 来更新动画进度）

		SVG 线条动画：vivus.js（巧妙的利用了 SVG path 的 stroke-dasharray 属性和 getTotalLength 方法）

	React Transition 

		react 渲染结果的任何变化，无非是组件节点的增、添、删和组件属性的变化

		ReactCSSTransitionGroup 插件

		React Transition 的设计及用法

自动化测试
	
	jest，内部 DOM 操作基于 JSDOM，语法和断言基于 Jasmine 框架

		react-addons-test-utils 插件，模拟浏览器事件和对 DOM 进行校验

	Enzyme，Airbnb 开源

	Mocha 流行的测试执行器之一，Chai 等库做测试断言，搭建完整的测试环境	

	模拟 DOM 环境，流行的做法：

		使用 JSDOM --- 使用 JavaScript 模拟 DOM 环境，满足 90% 使用场景，Jest 内部使用的全渲染框架

		使用 Cheerio --- 类型 JSDOM，更轻的实现，类型 jQuery 语法，Enzyme 内部使用的全渲染框架

		使用 Karma --- 在真实的浏览器中执行测试，支持多个浏览器依次执行测试，使用真实 DOM 环境，速度稍慢