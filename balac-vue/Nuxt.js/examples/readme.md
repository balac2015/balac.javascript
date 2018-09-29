SEO HTML 头部：seo-html-head




自定义页面加载进度条、自定义路由：custom-loading

全局 CSS：global-css

布局：layouts

中间件：middleware

插件：plugins


路由过渡动效：routes-transition

路由鉴权：auth-routes

Vuex 状态树：vuex-store

国际化：i18n

测试：testing


异步数据：async-data ---- asyncData

异步组件注入 async-component-injection
	
	对于非页面组件，有两种方式可以实现数据的异步获取：

	1、在组件的 mounted 方法里面实现异步获取数据的逻辑，之后设置组件的数据，限制是：不支持服务端渲染。

	2、在页面组件的 data 方法中把子组件的数据一并获取，并通过设置子组件的属性将数据传递给子组件。这种方法支持服务端渲染，但是在父组件中获取子组件的异步数据，一方面影响代码的可读性，另一方面破坏了组件之间的独立性。

缓存组件：cached-components
	
	https://ssr.vuejs.org/guide/caching.html#page-level-caching

	https://nuxtjs.org/faq/cached-components
	
	http://www.111cn.net/wy/162755.htm

	http://www.cnblogs.com/stealth7/p/7372403.html

动态组件：dynamic-components	