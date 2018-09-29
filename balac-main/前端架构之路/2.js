前端架构之路 5：构建工具 for teamwork

2. 适合团队的构建工具应当具有的一些特性（这里只涉及团队开发的特性，不涉及前端构建的基本特性，如：合并压缩代码，去缓存，提取公共文件等。）

	有良好的项目结构（目录结构，文件结构，模块化分组结构，组件化结构），并对其具有一定的约束力；

	页面之间、组件之间应该是相互隔离、解耦的，更新其中的一个页面（或组件）不会影响到其他的页面（或组件）；

	对多页面和单页面应用都有完备的支持；

	对扩展语言的支持（可选）：TypeScript、coffeescript、less、sass、ejs、jade；

	对框架的支持（可选）：react、vue、angular；

	自动化构建，以尽量少的命令做尽量多的事情（一条命令搞定所有事情当然是做好的啦，嘻嘻）；

	扩展性好，能够很方便的扩展工具的功能；

	可配置性好，可以通过配置来启用或禁用一些功能；

	支持多个页面一起构建，支持多服务器环境，支持 web、static 分离，支持适配任何后端语言，支持命令行配置，支持个人本地化配置（每个人自己独有的配置），支持页面本地化配置（每个页面独有的配置）；

	文件构建记录，每次只上传服务器不存在的文件；

	能够快速创建新项目，并能方便的在多个项目之间共享组件；

3. 命令：
	
	本地服务器、热更新、热替换的实现库：browser-sync、webpack-dev-middleware、webpack-hot-middleware

前端架构之路 6：组件化

前端架构之路 7：私有 npm 仓库

前端架构之路 8：单页面应用（SPA）、按需加载
	
	单页面应用（single page application），只有一个页面的应用，页面的刷新和内部子页面的跳转完全由 js 来控制。

	一般单页面应用都有以下几个特点：

		本地路由，由 js 定义路由、根据路由渲染页面、控制页面的跳转，这是单页面应用最基本的特点；
		
		所有文件只会加载一次，最大限度重用文件，并且极大提升加载速度，让 web app 有了 native app 的流畅体验；
		
		按需加载：单页面应用一般都会加上这个特性。	

	Hash Router（哈希路由）：通过 location hash（https://developer.mozilla.org/zh-CN/docs/Web/API/Location） 定义路由。

		好处是后端只需要给一个 url 就可以了，因为路由完全是由前端实现的。

	Browser Router（浏览器路由）

		这种路由需要后端配合，就是把所有需要路由的 url 都指定同一个 html 文件，由前端来根据 url 判断怎样渲染页面。

		好处是对搜索引擎友好，对浏览器的表现就像正常的 url 一样。

	常见路由组件：

		react-router

		vue-router

		page.js https://github.com/visionmedia/page.js

		director https://github.com/flatiron/director

	按需加载，需要构建工具的支持，dynamic-imports（https://webpack.js.org/guides/code-splitting/#dynamic-imports），比如：

		register('page1', () => {
			import('filesOfPage1').then(() => {
				// 渲染 page1
			});
		});

		register('page2', () => {
			import('filesOfPage2').then(() => {
				// 渲染 page2
			});
		})

	react 全家桶：react + react-router + redux + redux-saga + react-redux + dva

	ant-design-pro, antd-admin