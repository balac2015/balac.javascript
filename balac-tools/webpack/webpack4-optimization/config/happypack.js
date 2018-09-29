/**
 * HappyPack
 * 在webpack运行在node中打包的时候是单线程去一件一件事情的做，HappyPack可以开启多个子进程去并发执行，子进程处理完后把结果交给主进程
 * npm i happypack -D
 * https://github.com/amireh/happypack
 */

const HappyPack = require('happypack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            // 需要改造一下loader配置，此loader用子进程去处理
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: 'happypack/loader?id=babel'
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: 'babel',                // id值，与loader配置项对应
            threads: 4,                 //  配置多少个子进程
            loaders: ['babel-loader']   // 用什么loader处理
        })
    ]
};
