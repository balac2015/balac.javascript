代码分离：

    把代码分离到不同的 bundle 中，按需加载或并行加载 bundle 文件。
    

1、入口起点 entry points
    
    最简单、最直观的分离代码方式。（使用 entry 配置手动地分离代码）
    
    问题：1、如果入口 chunks 之间包含重复的模块，那些重复模块都会被引入到各个 bundle 中。

        2、不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码。


2、防止重复(prevent duplication)

    splitChunks 将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。（4.0 以前使用 CommonsChunkPlugin）
    
    其它分离插件：
    
      mini-css-extract-plugin 将 CSS 从主应用程序中分离。（https://webpack.js.org/plugins/mini-css-extract-plugin/）
    
      bundle-loader 用于分离代码和延迟加载生成的 bundle。（https://webpack.js.org/loaders/bundle-loader/）
    
      promise-loader 类似于 bundle-loader ，但是使用的是 promises。（https://github.com/gaearon/promise-loader） 


3、动态导入 dynamic imports：（通过模块的内联函数调用来分离代码。）
    
    1、使用符合 ECMAScript 提案 的 import() 语法（优先）
 
    2、使用 webpack 特定的 require.ensure

    import() 调用会在内部用到 promises，旧浏览器用 polyfill 库：es6-promise 或 promise-polyfill 来 shim Promise

        es6-promise:  https://github.com/stefanpenner/es6-promise

        promise-polyfill: https://github.com/taylorhakes/promise-polyfill

    output 配置的 chunkFilename


4、预取、预加载 prefetching/preloading modules（webpack4.6.0 +）
    
    import(/* webpackPrefetch: true */ "LoginModal");

        告诉浏览器 prefetch 资源需要预取。如登录按钮，点击后需要加载 LoginModal 组件

        <link rel="prefetch" href="login-modal-chunk.js" /> 将被追加

        预取块在父块完成后加载。（浏览器空闲时间下载，将来随时使用）

    import(/* webpackPreload: true */ "ChartingLibrary");

        预加载块与父块并行加载，父块应立即调用预加载的块。（插件库等）

        <link rel="preload"> 被追加

    资源：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Preloading_content


4、bundle 分析(bundle analysis)：

    官方分析工具：https://github.com/webpack/analyse

    webpack-chart: webpack 数据交互饼图。

        https://alexkuz.github.io/webpack-chart/

    webpack-visualizer: 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。

        https://chrisbateman.github.io/webpack-visualizer/

    webpack-bundle-analyzer: 一款分析 bundle 内容的插件及 CLI 工具，以便捷的、交互式、可缩放的树状图形式展现给用户。

        https://github.com/webpack-contrib/webpack-bundle-analyzer


内联指令：
    
    import(/* webpackChunkName: "lodash" */ 'lodash')       // 动态导入

    import(/* webpackPrefetch: true */ "LoginModal")        // 预取 prefetching

    import(/* webpackPreload: true */ "ChartingLibrary")    // 预加载 preloading