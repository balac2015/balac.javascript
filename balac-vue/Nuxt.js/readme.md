Nuxt.js
	
	关注 UI 渲染

nuxt generate，为基于 Vue.js 的应用提供生成对应的静态站点的功能。

项目目录和别名：
	
	~

	~assets


assets 资源目录，组织未编译的静态资源如 LESS、SASS 或 JavaScript，需要 webpack 处理
	
	vue-loader自动使用 css-loader 和 Vue 模板编译器来编译处理 vue 文件中的样式和模板。所有的资源 URL 例如 <img src="...">、 background: url(...) 和 CSS 中的 @import 均会被解析成模块通过 require 引用

		url('~assets/image.png') => require('~assets/image.png')

		<img src="~assets/image.png"> => createElement('img', { attrs: { src: require('~assets/image.png')}})

	file-loader 能让你指定从什么地方拷贝资源文件以及发布后放到哪个目录去，并能让你使用版本哈希码来重命名发布后的文件来实现增量更新和更好的缓存策略。

	url-loader 能根据你指定的文件大小阈值，来判断一个文件是转换成内联的base-64码（如果该文件尺寸小于该阈值）还是使用file-loader来降级处理。小文件base-64化能有效减少HTTP请求数。	

	Nuxt.js 的默认加载器配置：

		{
			test: /\.(png|jpg?g|gif|svg)$/,
			loader: 'url-loader',
			query: {
				limit: 1000,	// 1KB，尺寸小于1K的时候，它将会被转换成 Base-64 data URL 来内联引用
				name: 'img/[name].[hash:7].[ext]' // 否则它将被拷贝至指定的子目录（在 .nuxt 目录下），并被重命名（加上7位的哈希码作为版本标识）以实现更好的缓存策略。
			}
		},
		{
			 test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			 loader: 'url-loader',
			 query: {
			 	limit: 1000,	// 1KB
			 	name: 'fonts/[name].[hash:7].[ext]'
			 }
		}

static 静态文件，不需要 webpack 处理
	
	Nuxt 服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下

	<img src="/my-image.png"/> 				引用 static 目录下的图片

	<img src="/assets/my-image-2.png"/> 	引用 assets 目录下经过 webpack 构建处理后的图片

components 组件目录，Nuxt.js 不会扩展增强该目录下 Vue.js 组件，即没有 asyncData 方法

layouts 组织应用的布局组件
	
	layouts/default.vue 文件来扩展应用的默认布局。

	在布局文件中添加 <nuxt/> 组件用于显示页面的主体内容。

	该目录名为Nuxt.js保留的，不可更改

	layouts/error.vue 文件来定制化错误页面，默认错误页面源码：https://github.com/nuxt/nuxt.js/blob/master/lib/app/components/nuxt-error.vue

	pages/posts.vue 中：export default {
		layout: 'blog'	// 指定使用 layouts/blog.vue 布局
	}

middleware 用于存放应用的中间件
	
	允许自定义函数运行在一个页面或一组页面渲染之前。

pages 组织应用的路由及视图
	
	Nuxt.js 框架读取该目录下所有的 .vue 文件并自动生成对应的路由配置。

	该目录名为Nuxt.js保留的，不可更改

plugins 组织那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件

store 组织应用的 Vuex 状态树 文件	

nuxt.config.js 组织Nuxt.js 应用的个性化配置，以便覆盖默认配置

package.json 用于描述应用的依赖关系和对外暴露的脚本接口