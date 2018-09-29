优化实战

    1、提取公共的 js 文件: common.config.js

    2、HappyPack: happypack.config.js

    3、作用域提升：

        如果你的项目是用ES2015的模块语法，并且webpack3+，那么建议启用这一插件，把所有的模块放到一个函数里，减少了函数声明，文件体积变小，函数作用域变少。

        module.exports = {
            entry: './src/index.js',
            output: {
                path: path.join(__dirname, './dist'),
                filename: 'main.js'
            },
            plugins: [
                new webpack.optimize.ModuleConcatenationPlugin()
            ]
        };

    4、提取第三方库

        方便长期缓存第三方的库,新建一个入口，把第三方库作为一个chunk，生成vendor.js

        module.exports = {
            entry: {
                main: './src/index.js',
                vendor: ['react', 'react-dom']
            }
        };

    5、DLL 动态链接
