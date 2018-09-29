前端路由：本质就是监听 URL 的变化，然后匹配路由规则，显示相应的页面，并且无须刷新

单页面路由的两种实现方式：
	
	hash 模式

		www.test.com/#/ 是 Hash URL，当 # 后面的哈希值发生变化时，不会向服务器请求数据，可以通过 hashchange 事件来监听到 URL 的变化，从而进行跳转页面。

		hashchange 事件 --- 监听哈希变化触发

	history 模式: https://developer.mozilla.org/zh-CN/docs/Web/API/History

		History 模式是 HTML5 新推出的功能，比之 Hash URL 更加美观

		history.pushState(), history.replaceState()