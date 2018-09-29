<!-- HTML -->
<div id="app">
	<h1>Hello App!</h1>

	<!-- 通过 router-link 组件来导航 -->
	<!-- 通过传入 `to` 属性指定链接 -->
	<!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
	<!-- <router-link> 对应的路由匹配成功， class 将自动设置为 .router-link-active -->
	<p>
		<router-link to="/foo">Go to Foo</router-link>
		<router-link to="/bar">Go to Bar</router-link>
	</p>
	
	<!-- 路由出口 -->
	<!-- 路由匹配到的组件将渲染在这里 -->
	<router-view></router-view>
</div>