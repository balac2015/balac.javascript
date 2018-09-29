框架结构


编译入口 entries

	web 编译 web-compiler.js 

	web 运行时 web-runtime.js 

	web 编译运行 web-runtime-wih-compiler.js

	web 服务器渲染 web-server-renderer.js

核心实现 core
	
	核心入口 index.js

	核心配置 config.js

	核心工具 util/

		index.js、lang.js、props.js、options.js、debug.js、env.js

	监视器接口 observe/

		index.js 数据监控器 observer、dep.js 消息订阅器、watcher.js 消息订阅者、batcher.js 刷新、array.js 数组监控

	虚拟 DOM 接口 vdom/

	核心接口 instance/

		index.js 核心实例接口、lifecycle.js 核心生命周期接口、proxy.js 核心代理接口、state.js 核心状态接口、events.js 核心事件接口、render.js 核心渲染接口	

	api 扩展接口 global-api/

		index.js 全局api入口文件、extends.js Vue.extend()扩展接口、mixin.js Vue.mixin()合并接口、use.js Vue.use()插件接口、assets.js Vue组件资源	

模板编译 compiler

web 渲染 platforms/web

服务器渲染 server