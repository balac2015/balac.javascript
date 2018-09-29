	总体架构
	
	架构梳理，模块的分类、功能、主要依赖关系的介绍


设计理念：
	
	write less, do more

	核心特性：兼容主流浏览器、链式语法和多功能接口、灵活可扩展的 CSS 选择器、丰富可扩展的插件机制	


总体架构：
	
	jQuery 模块可分：入口模块、底层支持模块、功能模块
	
	入口模块

			构造 jQuery 对象

			jQuery()  

	底层支持模块

			工具方法 Utilities --- 提供编程辅助方法，用于简化对象、DOM 等的操作

			回调函数列表 Callbacks Object --- 增强对回调函数的管理

			异步队列 Deferred --- 用于解耦异步任务、回调函数

			浏览器功能测试 Support --- 针对不同浏览器功能和 bug 的测试，解决浏览器之间的兼容性问题

			数据缓存 Data --- 以安全的方式为 DOM 元素、JavaScript 对象附加任意类型的数据

			队列 Queue --- 用于管理一组函数，确保函数顺序执行

			选择器 Sizzle --- 纯 JS 实现的 CSS 选择器引擎：用于查找与选择器表达式匹配的元素集合

	功能模块

			属性操作 Attributes --- HTML、DOM 属性操作

			事件系统 Events --- 灵活的事件绑定、移除、触发机制

			DOM 遍历 Traversing --- 模板模式实现对父、祖先、兄弟、子、后代元素的遍历

			DOM 操作 Manipulation --- DOM 元素的插入、删除、复制、替换、包裹

			样式操作 CSS --- 计算样式 & 内联央视、坐标 Offset、尺寸 Dimensions

			异步请求 Ajax --- 异步 HTTP 请求的执行过程、前置过滤器、请求发送器、数据转换器

			动画 Effects --- 执行和停止动画


// jquery-1.7.1 总体结构
(function( window, undefined ) {

	// 构造 jQuery 对象
	var jQuery = (function() {
		var jQuery = function( selector, context ) {
			return new jQuery.fn.init( selector, context, rootjQuery );
		};
		return jQuery;
	})();

	// 工具方法 Utilities

	// 回调函数列表 Callbacks Object

	// 异步队列 Deferred Object

	// 浏览器功能测试 Support

	// 数据缓存 Data

	// 队列 Queue

	// 属性操作 Attributes

	// 事件系统 Events

	// 选择器 Sizzle

	// DOM 遍历 Traversing

	// DOM 操作 Manipulation

	// 样式操作 CSS （计算样式、内联样式）

	// 异步请求 Ajax

	// 动画 Effects

	// 坐标 Offset、尺寸 Dimensions

	window.jQuery = window.$ = jQuery;

})(window);


undefined 可被重新的浏览器：IE8、Chrome16.0.912.77、Firefox3.6.28、Safari4.0.2、Opera11.52


自调用匿名函数（self-invoking anonymous function）：（注意前后的分号）

	( function() {} )();

	( function() {}() );

	!function() {}();


	在使用自调用匿名函数时，最后不要省略自调用匿名函数之前和之后的分号

		var n = 1
		( function() {} )()		// TypeError: number is not function

		( function() { } )()
		( function() { } )()	// TypeError: undefined is not a function