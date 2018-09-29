前端架构之路 9：服务器端渲染（SSR）与 node 中间层
	
SEO 解决思路：
	
	服务器端渲染（SSR）：就是服务器端和前端共用同一个应用，然后通过构建工具及配置，确定哪些组件需要在服务器端渲染，哪些组件需要在客户端渲染；

	node 中间层：保留服务器端模板渲染的功能，但是由 node 程序来代替以往的后端语言进行模板渲染（毕竟前端更懂前端），后端语言与 node 程序只做数据交互。

2. 服务器端渲染
	
	next.js, nuxt.js

3. node 中间层

https://github.com/senntyou/blogs/blob/master/architecture/9.md