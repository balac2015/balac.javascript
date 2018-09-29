var config = {
    module: {
        rules: [
            // 处理 js
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // include: path.join(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    // query: {
                    //     presets: ['env', 'stage-0', 'react'] // env转换es6 stage-0转es7 react转react
                    // }
                    // 可以把babel配置写到.babelrc中
                }
            }
        ]
    }
};

module.exports = config;
