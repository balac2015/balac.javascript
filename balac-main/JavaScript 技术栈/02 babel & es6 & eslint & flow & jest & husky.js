Babel, ES6, ESLint, Flow, Jest, and Husky

Babel: https://babeljs.io/en/setup/
	
	Babel 是一个将 ES6 代码 转换为 ES5 代码的编译器（一些其他语法，比如 JSX 语法也能够被编译）

	yarn add --dev babel-cli 安装 Babel CLI（命令行工具）。

		Babel CLI 有 两种执行方式: babel，将 ES6 文件转换为 ES5 文件；babel-node 可以替换 node，用来轻量级地直接执行 ES6 文件。

		babel-node 适用于开发，但对于生产环境来说，它太笨重了

	yarn add --dev babel-preset-env 安装 env 的 Babel preset 包，包含了大部分 Babel 支持转化的 ECMAScript 语法配置。

		.babelrc 文件，用来配置 Babel 的 JSON 文件

ES6: http://es6-features.org/#Constants

ESLint: http://eslint.org/
	
	ESLint 是 ES6 代码的检查器。它会根据代码规范，给出合理的提示。ESLint 给出的提示，也能帮你更好地学习 JavaScript。

 	规范：https://eslint.org/docs/rules/，Airbnb 规范：https://www.npmjs.com/package/eslint-config-airbnb

 	.eslintrc.json 文件

 		{
 			"extends": "airbnb",
 			"rules": {
 				"semi": [2, "never"],
 				"no-unexpected-multiline": 2	// 分号问题
 			},
 			"plugins": [
 				"compat"						// eslint compat
 			]
 		}

 	Compat: https://github.com/amilajack/eslint-plugin-compat

 		想让项目支持更多的浏览器，但不知道要支持的浏览器是否支持某个 API

 		Can I Use: https://caniuse.com/

 		浏览器列表：https://github.com/browserslist/browserslist

 		运行 yarn add --dev eslint-plugin-compat

 		"browserslist": ["> 1%"]	// package.json 中，告诉插件，只要是市场占有率超过百分之一的浏览器，我们都想支持


 Flow: https://flowtype.org/

 	 Flow: Facebook 提供的一个静态类型检查器。举个例子，如果你把一个字符串类型的值赋值给一个数值类型的变量，它就会报错。

 	 运行 yarn add --dev flow-bin babel-preset-flow babel-eslint eslint-plugin-flowtype

 	 low-bin 是在 scripts 任务中用的, babel-preset-flow 帮助 Babel 理解 Flow 注释， babel-eslint 让 ESLint 依赖于 Babel 解析器， eslint-plugin-flowtype 是一个用来检查注释错误的 ESLint 插件。

 	 .eslintrc.json 中的 plugin:flowtype/recommended 已经告诉 Babel 该用什么解析器了

Jest: https://facebook.github.io/jest/
	
	 JS 测试库，配置简单，一步到位，甚至还能用来测试 React 组件。

	 运行 yarn add --dev jest babel-jest 安装 Jest 以及对应的 Babel 包。

	 // .eslintrc.json
	 "env": {
	 	"jest" true	// 不用再在测试文件里引用 Jest 包了。
	 }

	 // package.json
	 "test" "eslint src && flow && jest --coverage" // --coverage 让 Jest 自动生成测试覆盖率信息。观察覆盖率信息，就能知道哪些文件缺乏测试了。覆盖率信息保存在 coverage 文件夹下。

用 Husky 添加 Git 钩子
	
	git hooks: https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks

		在特定操作（例如 push 或者 commit 操作）前会被执行的操作。

	Husky: https://github.com/typicode/husky

		Husky 一个便捷的设置 Git 钩子的包。

		yarn add --dev husky

	// scripts
	{
		"test": "....",
		"precommit": "yarn test",	// 现在试着 commit 或者 push 代码， test 任务就会自动执行。
		"prepush": "yarn test"		// git push --no-verify 命令，在 commit 之后执行 push 操作，为了避免重复测试
	}

编辑器中配置 ESLint、Flow