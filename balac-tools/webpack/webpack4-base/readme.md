单入口、多入口、常见 loader 的配置

初始化项目：yarn add webpack webpack-cli -D

    Webpack 启动后会从Entry里配置的Module开始递归解析 Entry 依赖的所有 Module。 每找到一个 Module， 就会根据配置的Loader去找出对应的转换规则，对 Module 进行转换后，再解析出当前 Module 依赖的 Module。 这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。最后 Webpack 会把所有 Chunk 转换成文件输出。
    在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑。    

引入 html：npm install html-webpack-plugin -D

    该插件可以给每一个chunk生成html,指定一个 template ,可以接收参数，在模板里面使用，下面来看看如何使用:

    https://github.com/jantimon/html-webpack-plugin

引入 css: npm install css-loader style-loader sass-loader node-sass -D

    css-loader : 支持css中的import

    style-loader : 把css写入style内嵌标签

    sass-loader : scss转换为css

    node-sass : scss转换依赖

如果想把css作为一个单独的文件，需要用到一个插件来做(webpack4.0.0以上版本需要next版本):

    npm i extract-text-webpack-plugin@next -D

多入口配置：mpa.config.js

js, html, css 打包：spa.config.js


常见场景：

    分离 应用程序(app) 和 第三方库(vendor) 入口（只有一个入口起点（不包括 vendor）的单页应用程序(single page application)中。）

        {
            // 允许你使用 CommonsChunkPlugin 从「应用程序 bundle」中提取 vendor 引用(vendor reference) 到 vendor bundle
            entry: {
                app: '../src/app.js',
                vendors: '../src/vendors.js'
            }
        }

        长效缓存模式（https://webpack.docschina.org/guides/caching）

        更佳 vendor 分离能力的 DllPlugin

    多页面应用程序

        {
            entry: {
                pageOne: './src/pageOne/index.js',
                pageTwo: './src/pageTwo/index.js',
                pageThree: './src/pageThree/index.js'
            }
        }

        使用 CommonsChunkPlugin 为每个页面间的应用程序共享代码创建 bundle。由于入口起点增多，多页应用能够复用入口起点之间的大量代码/模块，从而可以极大地从这些技术中受益。

        根据经验：每个 HTML 文档只使用一个入口起点。


babel-loader

    github: https://github.com/babel/babel-loader

    版本问题：
        webpack 3 - 4 | babel-loader 8.x | babel 7.x

        	npm install "babel-loader@^8.0.0-beta" @babel/core @babel/preset-env webpack

        webpack 3.x babel-loader 7.x | babel 6.x

        	npm install babel-loader babel-core babel-preset-env webpack
