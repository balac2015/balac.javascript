前端架构之路 1：前后端分离、web 与 static 服务器
	
1. 为什么需要 “前后端分离、web与static服务器分离”

	web前端的发展历史大致可以分为两个阶段：node 之前与 node 之后

	node 拓展了 javascript 的运行环境，并且能够开发服务器端程序，这让前端的开发和运行摆脱对浏览器和后端语言的依赖，让它们成为了可选项；

	node 使 javascript 拥有了操作本地文件、IO等权限，于是前端开发人员便可编写各类工具，前端便可做到自动化和工程化；
	
	再结合 npm，前端代码的模块化、组件化，项目版本化，项目间共享代码也就不是问题了。

	nodejs 出现了之后，又陆续出现了扩展前端运行领域的工具，如: https://github.com/nodejs/node

		electron, nw.js: 让前端可以开发桌面软件；https://github.com/electron/electron, https://github.com/nwjs/nw.js

		react-native: 让前端可以开发原生app。https://github.com/facebook/react-native

2. 前后端分离
	
	工程分离、数据流分离（json, ajax）

3. web与static服务器分离
	
	web 服务器：存放运行后端 web 应用的程序，以及前端 html 文件（入口文件）
	
	static 服务器：静态资源服务器，存放前端除 html 文件之外的其他资源文件，包括 js， css， images...	


前端架构之路 2：本地化接口模拟、前后端并行开发

前端架构之路 3：前端开发规范
	
	编码规范：html, css, js（codeGuide: http://imweb.github.io/CodeGuide/）

	项目结构规范:包括文件、目录命名规范，模块化分组规范，组件化规范等

	框架、工具规范：框架和 UI 库（ react + ant-design|material-ui|Semantic-UI）、构建工具（eslint, stylelint, csslint）

	其他约定：每个 js 文件不应该超过 400 行，超过就应该分块、每个 css 文件不应该超过 200 行，超过就应该分块

前端架构之路 4：前端开发文档
	
	JSDoc 是一个根据 javascript 文件中注释信息，生成 JavaScript 应用程序或库、模块的 API 文档 的工具。你可以使用他记录如：命名空间，类，方法，方法参数等，并且很多编辑器和 IDE 都是直接支持智能提示的。
	
	http://usejsdoc.org/	

	http://www.css88.com/doc/jsdoc/

	把注释生成文档的工具：

		jsdoc: 官方提供的工具 https://github.com/jsdoc3/jsdoc

		documentation.js: （https://github.com/documentationjs/documentation）另外一个可供选择的工具，支持生成 html，markdown， json
		
		dox: tj 大神的作品 https://github.com/tj/dox

	/**
	 * JSDoc 注释示例
	 * JSDoc 注释一般应该放置在方法或函数声明之前，它必须以 /** 开始
	 * 其他任何以 /*，/*** 或者超过3个星号的注释，都将被JSDoc解析器忽略
	 */ 