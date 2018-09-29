Vue
	
	vue.js 集中在 MVVM 模式上的视图模型层，并通过双向数据绑定连接视图和模型。数据绑定和可组合、复用的视图组件。

	实际的 DOM 操作和输出格式被抽象出来成 Directives 和 Filters。

	View（DOM）    <------>    DOM Listeners、Directives （Vue）      <---------->    Model（Plain JavaScript Objects）


	ViewModel

	    一个同步 Model 和 View 的对象。在 Vue.js 中，每个 Vue 实例都是一个 ViewModel。它们是通过构造函数 Vue 或其子类被创建出来的。

	    var vm = new Vue({ /* options */ });

	View

	    被 Vue 实例管理的 DOM 节点。

	    vm.$el  // the view

	    Vue.js 使用基于 DOM 的模板。每个 Vue 实例都关联着一个相应的 DOM 元素。当一个 Vue 实例被创建时，它会递归遍历根元素的所有子结点，同时完成必要的数据绑定。当这个视图被编译之后，它就会自动响应数据的变化。

	
