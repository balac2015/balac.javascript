
总体架构：
	
	设计理念

	总体架构

	自调用匿名函数

	总结



构造 jQuery 对象：
	
	构造函数 jQuery()

	总体架构

	jQuery.fn.init( selector, context, rootjQuery )

	jQuery.buildFragment( args, nodes, scripts )

	jQuery.clean( elems, context, fragment, scripts )

	jQuery.extend()、jQuery.fn.extend()

	原型属性和方法

	静态属性和方法

	总结


底层支持模块
	
	选择器 Sizzle

		总体架构

		选择表达式

		设计思路

		Sizzle( selector, context, results, seed )

		正则 chunker

		Sizzle.find( expr, context, isXML )

		Sizzle.filter( expr, set, inplace, not )

		Sizzle.selectors.relative

		Sizzle.selectors

		工具方法

		便捷方法

		jQuery 扩展

		总结

	异步队列 Deferred Object

		jQuery.Callbacks( flags )

		jQuery.Deferred( func )

		jQuery.when( deferreds )

		异步队列在 jQuery 中的应用

		总结

	数据缓存 Data

		实现原理

		总体架构

		jQuery.acceptData( elem )

		jQuery.data( elem, name, data, pvt )、jQuery._data( elem, name, data, pvt )

		.data( key, value )

		jQuery.removeData( elem, name, pvt )、.removeData( key )

		.removeData( key )

		jQuery.cleanData( elems )

		jQuery.hasData( elem )

	队列 Queue

		如何使用

		实现原理

		总体架构

		jQuery.queue( elem, type, data )

		jQuery.dequeue( elem, type )

		.queue( type, data )

		.dequeue( type )

		.delay( time, type )

		.clearQueue( type )

		jQuery._mark( elem, type )、jQuery._unmark( force, elem, type )

		.promise( type, object )

		总结

	浏览器功能测试 Support

		总体结构

		DOM 测试

		样式测试

		盒模型测试

		事件测试

		Ajax 测试

		总结
	

功能模块

	属性操作 Attributes

		总体结构

		jQuery.attr( elem, name, value, pass )

		.attr( name, value )

		jQuery.removeAttr( elem, value )

		.removeAttr( name )

		jQuery.prop( elem, name, value )

		.prop( name, value )

		.removeProp( name )

		.addClass( className )

		.removeClass( [className] )

		.toggleClass( [className][, switch] )

		.hasClass( selector )

		.val( [value] )

		.val( [value] )

		总结

	事件系统 Events

	DOM 遍历 Traversing

	DOM 操作 Manipulation

	样式操作 CSS

	异步请求 Ajax

	动画 Effects