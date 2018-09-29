vue-router 路由的三种模式：
	
	hash: 使用 URL hash 值来作为路由。支持所有浏览器，包括不支持 HTML5 History API 的浏览器

	history: 依赖 HTML5 History API 和服务器配置。查看 HTML5 History 模式。

	abstract: 支持所有 JavaScript运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。

<router-view>

<router-link :to="{ name: 'Home' }">

不直接引用路由定义，通过路由名称引用取代 URL 的直接引用

path: '/book/:id' 动态路由，$router.params.id，组件的复用（页面第二次加载，组件的生命周期钩子不再被调用，watch '$route' 的追踪）

转场动画，
	
	className-enter --- 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。

	className-enter-active --- 定义进入过渡的结束状态。在元素被插入时生效，在 transition/animation 完成之后移除。

	className-leave --- 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。

	className-leave-active --- 定义离开过渡的结束状态。在离开过渡被触发时生效，在 transition/animation 完成之后移除。

	<transition name="slide-fade">
		<router-view />
	</transition>

	.slide-fade-enter-active {
		transition: all .3s ease;
	}
	.slide-fade-leave-active {
		transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .lide-fade-leave-active {
		transition: translateX(-430px);
		opacity: 0;
	}

导航状态样式：
	
	new VueRouter({
		linkkActiveClass: 'active',
		...
	})

History 的控制
	
	$router.push(), $router.append(), $router.replace()

	直接控制访问路由在History上历史记录的插入和更新方式的，如果用户点击浏览器的前进与后退，就会激发浏览器从这个History中查找下一个路由的位置是什么。

所有发到服务端的请求利用服务端的URLRewrite模板重新转发给/index.html

单元测试：mocha

断言 assertion