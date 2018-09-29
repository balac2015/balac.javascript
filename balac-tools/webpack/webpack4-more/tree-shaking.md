tree shaking

    术语，移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export。

    package.json 的 "sideEffects" 属性作为标记

    webpack 本身并不会执行 tree-shaking。它需要依赖于像 UglifyJS 这样的第三方工具来执行实际的未引用代码(dead code)删除工作。

    其它工具：UglifyJS: https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin/

        webpack-rollup-loader: https://github.com/erikdesjardins/webpack-rollup-loader

        BabelMinifyWebpackPlugin: https://github.com/webpack-contrib/babel-minify-webpack-plugin

        ClosureCompilerPlugin: https://github.com/roman01la/webpack-closure-compiler

1、使用 ES2015 模块语法（即 import 和 export）

2、 引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）。
