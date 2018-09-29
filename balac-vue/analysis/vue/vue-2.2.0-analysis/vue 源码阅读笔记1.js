vue 源码阅读笔记 1
	
	大概流程、函数细节、思路

	分支：master

	commitid: 2a19f911dc8631d44b7c7e63c4db57ef28ac5e69

	版本：2.2.0release

目录结构：
	|
	|-- + benchmarks 基准测试，用来测性能的
	|-- + build 构建脚本主要都放这里
	|-- + dist 构建后的web端版本的输出目录
	|-- + examples 各种vue使用的例子
	|-- + flow flow的规则文件，flow是facebook出的一套检验js变量类型的框架
	|-- + packages 构建后server side render和weex版本的输出目录
	|-- + src 构建前的源码
	|-- + test 各种测试用例
	|-- + types 类型检查测试的部分，用typescript写的
	|-- .babelrc 转es5的配置，vue用的不是babel用的bubble
	|-- .eslintrc eslint的配置
	|-- .eslintignore eslint忽略的文件夹
	|-- .flowconfig flowtype的配置文件
	|-- BACKERS.md 捐款列表，二百五那栏还没人捐，想排前排的土豪赶紧行动吧
	|-- circle.yml CircleCI集成测试平台的配置文件
	|-- package.json 所有工作流的命令都定义在scripts里面
	|-- yarn.lock yarn生成的依赖文件，估计开发过程中用的yarn替换了npm	

	flow(https://flowtype.org/)

	benchmarks(http://www.blogjava.net/qileilove/archive/2012/07/05/382241.html)

	rollup(http://rollupjs.org/)

	tree-shaking (http://2ality.com/2015/12/webpack-tree-shaking.html)

打包构建：
	
	用 npm 的 scripts 定义工作流命令。构建命令大体分了四类：dev, build, test, release

	"scripts": {
		/*----- develop -----*/
	    "dev": "TARGET=web-full-dev rollup -w -c build/config.js",
	    "dev:cjs": "TARGET=web-runtime-cjs rollup -w -c build/config.js",
	    "dev:test": "karma start build/karma.dev.config.js",
	    "dev:ssr": "TARGET=web-server-renderer rollup -w -c build/config.js",
	    "dev:compiler": "TARGET=web-compiler rollup -w -c build/config.js",
	    "dev:weex": "TARGET=weex-framework rollup -w -c build/config.js",
	    "dev:weex:compiler": "TARGET=weex-compiler rollup -w -c build/config.js",
	    
	    /*----- build -----*/
	    "build": "node build/build.js",
	    "build:ssr": "npm run build -- vue.runtime.common.js,vue-server-renderer",
	    "build:weex": "npm run build -- weex-vue-framework,weex-template-compiler",
	    
	    /*----- test -----*/
	    "test": "npm run lint && flow check && npm run test:types && npm run test:cover && npm run test:e2e -- --env phantomjs && npm run test:ssr",
	    "test:unit": "karma start build/karma.unit.config.js",
	    // 单元测试
	    "test:cover": "karma start build/karma.cover.config.js",
	    // 覆盖率测试
	    "test:e2e": "npm run build -- vue.min.js && node test/e2e/runner.js",
	    // e2e(end to end，用户真实场景)测试
	    "test:weex": "npm run build:weex && jasmine JASMINE_CONFIG_PATH=test/weex/jasmine.json",
	    // weex 的单元测试
	    "test:ssr": "npm run build:ssr && jasmine JASMINE_CONFIG_PATH=test/ssr/jasmine.json",
	    // server side render 的单元测试
	    "test:sauce": "npm run sauce -- 0 && npm run sauce -- 1 && npm run sauce -- 2",
	    "test:types": "tsc -p ./types/test/tsconfig.json",
	    // 类型校验
	    "lint": "eslint src build test",
	    // 规范校验
	    "flow": "flow check",
	    // 类型校验
	    "sauce": "SAUCE=true karma start build/karma.sauce.config.js",
	    // 兼容性测试
	    "bench:ssr": "npm run build:ssr && NODE_ENV=production node benchmarks/ssr/renderToString.js && NODE_ENV=production VUE_ENV=server node benchmarks/ssr/renderToStream.js",
	    // 基准测试，用来测试性能的

	    /*----- realease -----*/
	    "release": "bash build/release.sh",
	    "release:weex": "bash build/release-weex.sh",
	    "install:hooks": "ln -fs ../../build/git-hooks/pre-commit .git/hooks/pre-commit"
	}	

	dev 系列命令：开发框架的时候用的，总结的知识：

		都是 TARGET=XXX rollup -w -c build/config.js 的形式，用 rollup 打包 

		-w 是watch，-c 是指定config文件，build/config.js是rollup的配置文件。build/config.js 内部根据 TARGET 参数获取不同的构建配置。

		rollup 插件：

			rollup-plugin-flow-no-whitespace 插件用来去掉flow使用的类型检查代码

			rollup-plugin-buble 替代babel，用来转换es5用的。

			rollup-plugin-alias 配置打包过程中各个模块的路径映射，具体的配置写在 build/alias.js 中。这样代码中就可以用src作为根目录引用模块了。值得注意的是，src/platforms 目录下的 web 模块和 weex 模块，也都做了映射，所以在看代码时有 import xxx from ‘web/xxx’的引用，就都是从 platforms 下引用的。貌似这是缩短引用路径、区分目录结构和代码逻辑的好方法呢，实际开发中也可以借鉴。

		rollup 特性：

			打包后的代码没有 require，import的，而是直接插入到文件中

			可以生成 AMD，CMD，UMD 甚至 ES6 模块文件

			tree-shaking，会移除未使用到的 ES6 exports模块，打包后的文件体积更小

			配置简单

			没有自带的模块机制，使用es6原生的模块依赖机制	
			
		webpack2也支持tree-shaking，但是从rollup的配置简单、功能单一、打包文件没有多余代码这些特点俩看，感觉很适合用来打包独立库或者框架这种都是js并且结构相对简单的项目呢。		

	build 系列命令用来打包所有配置。总结下看到的知识：	

		build系列命令都是运行 build/build.js 这个文件。这个文件中的逻辑就是通过 build/config.js 获取所有的配置，然后串行用rollup打包。

		后面的参数可以用来过滤要打包的配置，获取参数和过滤的逻辑也是写在 build/config.js 里面的

		编写串行执行任务和获取参数做过滤一类的工作流脚本，不借助 grunt, gulp 类的任务管理库，build/build.js 可作为很好的参考

	test系列命令是用来搞自动化测试的，具体的分析：		

		搞自动化测试的，自动自动化测试的命令配置在 build/ci.sh 这个脚本文件里面。这个脚本会在CircleCI的hook中被调用。话说想搞持续集成的可以参考这个配置呢。

		同时使用了facebook的flow和typescript做类型检查

	release系列命令是用来发布rlease版本的：

		调用了build文件下对应的sh文件，对于windows用户还真是不友好

		脚本里主要做了设置版本、自动化测试、构建、打tag、提交、npm推送这几件事

		为weex做了独立的发布脚本

		其实如果团队都是用mac或者linux，或者都用开发机，可以用这套脚本作为工作流中的一个环节，自动发布提交。那句话怎么说的来着，“重复七次以上的工作都应该自动化”？大概吧…

源码 src 
	|
	|-- + compiler 解析模板用的？
	|-- + core vue的核心，
	|-- + entries 各种入口的封装
	|-- + platforms 不同平台下自己独特的模块
	|-- + server server side render的
	|-- + sfc 用来将.vue文件转坏为sfc(可识别组件)对象的
	|-- + shared 共享的模块，一个工具集	

	build/config.js 标记了所有的打包配置，入口都在 src/entries 文件夹中

入口 src/entries
	|
	|-- web-compiler.js 只包含vue的模板解析器和.vue解析器
	|-- web-runtime.js 只包含vue的运行时部分的代码
	|-- web-runtime-with-compiler.js 这个模块既包含解析器又包含运行时
	|-- web-server-renderer.js server side render 用的模块，和客户端的不一样，不分解析器和运行时
	|-- weex-compiler.js weex的解析器
	|-- weex-factory.js weex的运行时
	|-- weex-framework.js 这个貌似是weex的框架？因为不了解weex，所以只能靠猜的了	

	web-compiler.js 

		导出了解析sfc模块和compiler模块的接口

		compiler模块的作用是用来解析模板的，对应的是 src/compiler 模块

		使用new Function将字符串转换为js代码，所以对于不支持或者认为这样不安全的环境，vue会给出错误提示。具体的源码后续再继续详细读。

	web-runtime.js
		
		感觉web-runtime是对core的vue模块做了再加工

	web-runtime-with-compiler.js

		将已经整合好的compiler和runtime再一次整合封装，最终导出浏览器用的vue构造函数。

	web-server-render.js

		server side render的入口，所以与brower端用到的方法差别很大

		server端只是做初步的渲染，所以只有一个生成render的函数

	weex-compiler.js 

		对应web-compiler.js，导出对应平台下的compiler模块

	weex-factory.js 

		对应web-runtime.js，只不过这里没有添加独特的函数，直接导出的对应平台下的runtime模块

	weex-framework.js

		导出了weex/framework这个模块下的所有方法，貌似是给weex提供基础支持用的？具体的还没开始仔细看。		
		
总结：
	
	记录了整个项目的入口部分的代码，可以了解所有主要的模块的用途，项目的结构等等基础信息

	npm script的定义规则和分类
	
	flow和typescript做类型检查的方法

	打包测试发布整套的工作流定义

	通过封装重写的方式不断扩展接口

	通过纯函数的特性做缓存

	通过高阶函数拆分模块(具体模块的划分思想我还没看出来……)





