vue-cli#2.0 webpack 配置分析

  	https://zhuanlan.zhihu.com/p/24322005

	主要关注

	  build - 编译任务的代码

	  config - webpack 的配置文件

	  package.json - 项目的基本信息

# ---------------------------------------------------------------------
less 加载
	
	webpack.config.js 配置：

     { test   : /\.css$/,loader : 'style-loader!css-loader' },
     { test: /\.less$/, loader: 'style!css!less' }

    安装：less, style-loader, less-loader

# ------------------------------------------------------------
github 上 vuejs/vue 文件

    .babelrc 

        http://babeljs.cn/ 中文网站

        http://babeldev.dan.cx/

    .eslintignore（？静态代码检查）

        http://www.jianshu.com/p/1682b91756b1

    .eslintrc（？静态代码检查）

    .flowconfig（？静态代码检查）

        https://www.zhihu.com/question/46397274

        http://www.cnblogs.com/lvyongbo/p/5964501.html

    .gitignore （配置 git 不需要加入版本管理的文件）

        http://www.cnblogs.com/haiq/archive/2012/12/26/2833746.html

    BACKERS.md

    LICENSE

    circle.yml（持续集成工作流程）

        http://www.open-open.com/lib/view/open1425691160134.html

    package.json
        
# ---------------------------------------------------------------------

# vue-cli

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
