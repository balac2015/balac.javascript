组件 Components

	扩展 HTML 元素，封装可重用的代码


// 注册全局组件：Vue.component(tagName, options)
Vue.component('my-component', {
	// 选项
})

// 父实例模块中使用
<my-component></my-component>


/// 局部注册
var Child = {
	template: '<div>A custom component!</div>'
}
new Vue({
	components: {
		// <my-component> 将只在父模板可用
		'my-component': Child
	}
})


// DOM 模板解析说明（以下来源字符串模板，<table><tr></tr></table> 等的嵌套限制将不适用）
<script type="text/x-template">

JavaScript 内联模板字符串

.vue 组件					// <tr is="my-row">



// data 必须是函数
var data = { counter: 0 }
Vue.component('simple-counter', {
	template: '<button v-on:click="counter += 1">{{ counter }}</button>',
	// data 是一个函数，因此 Vue 不会警告，但为每一个组件返回了同一个对象引用，因此增加 counter 会影响所有组件
	data: function() {
		return data;
	},
	// 为每个组件返回新的 data 对象来解决
	data: function() {
		return {
			counter: 0
		}
	}
})
new Vue({
	el: '#example-2'
})
<div id="example-2">
	<simple-counter></simple-counter>
	<simple-counter></simple-counter>
	<simple-counter></simple-counter>
</div>



// 构成组件
// 父子组件关系：props down, events up（父组件通过 props 向下传递数据给子组件，子组件通过 events 给父组件发送消息）



// Prop
// 组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。可以使用 props 把数据传给子组件。

Vue.component('child', {
	// 子组件显示地用 props 选项声明 'prop'
	props: ['message', 'myMessage'],
	// prop 在模板内使用，在 vm 实例中 this.message 使用
	template: '<span>{{ message }}</span>'
})

// prop 是父组件用来传递数据的自定义属性，prop 名字 camelCase  转为 kabab-case
<child message="hello!" my-message="kebab-case"></child>

// 动态 prop，缩写 :my-message="parentMsg"
<child v-bind:my-message="parentMsg"></child>

// 传递字符串 "1"
<com some-prop="1"></comp>

// 传递数字 1
<comp v-bind:some-prop="1"></comp>



// 单向数据流
// （当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态）
// 每次父组件更新时，子组件的所有 prop 都会更新为最新值
// 通常有两种改变 prop 的情况：
// 1、prop 作为初始值传入，子组件之后只是将它的初始值作为本地数据的初始值使用；
props: ['initialCounter'],
data: function() {
	return {
		counter: this.initialCounter
	}
}
// 2、prop 作为需要被转变的原始值传入。
props: ['size'],
computed: {
	normalizedSize: function() {
		return this.size.trim().toLowerCase()
	}
}

如果 prop 是一个对象或数组（引用类型），在子组件内部改变它会影响父组件的状态。



// prop 验证
Vue.component('example', {
	// prop 是一个对象而不是字符串数组时，它包含验证要求：
	props: {
		propA: Number,			// 基础类型检测（'null' 意思是任何类型都可以）

		propB: [String, Number],// 多种类型

		propC: {				// 必传且是字符串
			type: String,
			required: true
		},
		propD: {				// 数字，有默认值
			type: Number,
			default: 100
		},
		propE: {				// 数组/对象的默认值应当由一个工厂函数返回
			type: Object,
			default: function() {
				return {
					message: 'hello'
				}
			}
		},
		propF: {				// 自定义验证函数
			validator: function(value) {
				return value > 10
			}
		}
	}
})


// 自定义事件 - 自定义事件让子组件把数组传递回去。父组件使用 props 传递数据给子组件

事件接口（Events interface）：
	
	$on(eventName) 监听事件，不是 addEventListener, dispatchEvent 的别名

	$emit(eventName) 触发事件

使用 v-on 绑定自定义事件：
	
	例子：./components/child-to-parrent.vue

给组件绑定原生事件
	
	<my-component v-on:click.native="doTheThing"></my-component>

使用自定义事件的表单输入组件

	<input v-model="something"> 是语法糖：<input v-bind:value="something" v-on:input="something = $event.target.value">

	组件中的简写：<custom-input v-bind:value="something" v-on:input="something = anguments[0] "></custom-input>

	要让组件中 v-model 生效，必须：

			value 属性

			有新的 value 时触发 input 事件


非父子组件通信
	
	在简单的场景下，使用一个空的 Vue 实例作为中央事件总线：

		var bus = new Vue()

		bus.$emit('id-selected', 1)					// 触发组件 A 中的事件

		bus.$on('id-selected', function (id) {...}) // 在组件 B 中创建的钩子监听事件
	
	更多复杂情况，用状态管理模式
	


使用 Slot 分发内容 transclusion
	
	<app>			// 1、app 组件不知道它的挂载点会有什么内容。挂载点的内容是由<app>的父组件决定的。
		<app-header></app-header>
		<app-footer></app-footer>
	</app>			/// 2、app 组件很可能有它自己的模版。

	内容分发：为了让组件可以组合，需要混合父组件的内容与子组件自己的模板

	组件作用域：父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。

		<child-component v-show="someChildProperty"></child-component> /// 无效示例，解决如下

			父组件模板不应该知道子组件的状态。

		Vue.component('child-component', {
			// 有效，因为在正确的作用域内
			template: '<div v-show="someChildProperty">Child</div>',
			data: function() {
				return {
					someChildProperty: true
				}
			}
		})

	分发内容是在父组件作用域内编译


单个 Slot

	// my-component 模板
	<div>
		<h2>子组件至少有一个 slot 插口，否则父组件的内容将会被丢弃</h2>
		<slot>						
			子组件模板只有一个没有属性的 slot 时，父组件整个内容片段将插入到 slot 所在的 DOM 位置，并替换掉 slot 标签本身。
			最初的 slot 中的内容被视为备用内容
		</slot>
	</div>

	// 父组件模板 
	<div>
		<h1>父组件</h1>
		<my-component>
			<p>这是一些初始内容</p>
			<p>这是更多的初始内容</p>
		</my-component>
	</div>

	// 渲染结果


具名 Slot
	
	<slot> 的 name 属性配置，对应匹配插槽

	匿名 slot，默认的 slot，找不到匹配内容片段时的备用插槽。否则找不到匹配的会被抛弃

	// app-layout 组件模板
	<div class="container">
		<header>
			<slot name="header"></slot>
		</header>
		<main>
			<slot></slot>
		</main>
		<footer>
			<slot name="footer"></slot>
		</footer>
	</div>

	// 父组件模板 
	<app-layout>
		<h1 slot="header">这里可能是一个页面标题</h1>

		<p>主要内容的段落</p>
		<p>另一个主要段落。</p>

		<p slot="footer">这里有一些联系信息</p>
	</app-layout>

	// 渲染结果：
	<div class="container">
		<header>
			<h1>这里可能是一个页面标题</h1>
		</header>
		<main>
			<p>主要内容的段落</p>
			<p>另一个主要段落。</p>
		</main>
		<footer>
			<p>这里有一些联系信息</p>
		</footer>
	</div>


作用域插槽（2.1.0 新增）
	
	特殊类型的插槽，用作使用一个（能够传递数据到）可重用模板替换已渲染元素。

	// 子组件
	<div class="child">
		<slot text="hello from child"></slot>	// 子组件中将数据传递到插槽
	</div>	

	// 父组件
	<div class="parent">
		<child>
			<template scope="props">		// 特殊属性 scope 的 <template> 元素，表示作用域插槽的模板
				<span>hello from parent</span>
				<span>{{ props.text }}</span>	// props 值对应临时变量名
			</template>
		</child>
	</div>

	// 渲染为
	<div class="parent">
		<div class="child">
			<span>hello from parent</span>
			<span>hello from parent</span>
		</div>
	</div>/


动态组件：

	多个组件可以使用同一个挂载点，然后动态地在它们之间切换，<component> 元素动态绑定到 is 特性
	
		var vm = new Vue({
			el: '#example',
			data: {
				currentView: 'home'
			},
			components: {
				home: { /* ... */ },
				posts: { /* ... */ },
				archive: { /* ... */ }
			}
		})

		<component v-bind:is="currentView"></component> // 组件在 vm.currentView 变化时改变

	直接绑定到组件对象上：

		var Home = {
			template: '<p>Welcome home!</p>'
		}
		var vm = new Vue({
			el: '#example',
			data: {
				currentView: Home
			}
		})


keep-alive
	
	把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。

	<keep-alive>
		<component :is="currentView">
			<!-- 非活动组件将被缓存！-->
		</component>
	</keep-alive>


杂项：
	
	编写可复用组件，Vue 组件的 API 来自：props, events, slots

		Props 允许外部环境传递数据给组件

		Events 允许组件触发外部环境的副作用

		Slots 允许外部环境将额外的内容组合在组件中。

		<my-component
			:foo="baz"
			:bar="qux"
			@event-a="doThis"
			@event-b="doThat">
			<img slot="icon" src="...">
			<p slot="main-text">Hello</p>
		</my-component>


	子组件索引（$refs 仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs）

		<div id="parent">
			<user-profile ref="profile"></user-profile>
		</div>

		var parent = new Vue({ el: '#parent '})

		var child = parent.$refs.profile 	// 访问子组件

		当 ref 和 v-for 一起使用时， ref 是一个数组或对象，包含相应的子组件。


	异步组件

			



