Node
	
	Node.js: https://nodejs.org/en/

	Node.js 是一个 JavaScript 运行环境。它多用于后端开发，但也可用于脚本。在前端开发环境中，它被用来做一大堆事情，比如：检查代码规范、测试以及组合文件。

Node 版本管理工具
	
	NVM: https://github.com/creationix/nvm

	tj/n: https://github.com/tj/n	

NPM
	
	Node 默认的包管理器，包管理器用来安装和管理包

Yarn: https://yarnpkg.com/zh-Hans/
	
	Yarn 是一个 Node.js 的包管理器，与 NPM 相比，它更快，提供离线支持，依赖关系确定性 更多.

	yarn add ----> npm install --save

	yarn add --dev ---> npm install --save-dev

package.json: https://yarnpkg.com/en/docs/package-json
	
	package.json 用来描述和配置你的 JavaScript 项目。它包含了项目的基本信息（项目名、版本号、贡献者、证书等等），工具的配置以及一系列可运行的 任务。

	$ node . 	// Node 默认执行 index.js

	"scripts": {	// package.json 的 scripts 对象，yarn start, npm start
		"start": "node ."	// 一般来说， start 是一个应用的默认任务名；其他标准的任务名称有 stop 和 test。
	}

Git 和 .gitignore
	
	$ git init 	// 初始化 git 仓库

	.gitignore // /*.log 不需要提交的文件

两种不同的依赖：
	
	Dependencies 是那些在应用中被直接使用的包 (例如 React, Redux, Lodash, jQuery, 等等)。

		yarn add [package]

	Dev Dependencies 是那些开发时或者是打包时要用到的包 (例如 Webpack, SASS, linters, testing frameworks, 等等)

		yarn add --dev [package]