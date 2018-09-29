/**
 * DLL 动态链接
 * 第三库不是经常更新，打包的时候希望分开打包，来提升打包速度。打包dll需要新建一个webpack配置文件，在打包dll的时候，webpack做一个索引，写在manifest文件中。然后打包项目文件时只需要读取manifest文件。
 */

// webpack.vendor.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'dll/[name]_dll.js',
        library: '_dll_[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            // path : manifest文件的输出路径
            path: path.join(__dirname, './dist/dll', 'manifest.json'),
            // name : dll暴露的对象名，要跟output.library保持一致
            name: '_dll_[name]'
            // context : 解析包路径的上下文，这个要跟接下来配置的dll user一致
        })
    ]
};

// webpack.config.js
module.exports = {
    entry: {
        main: './src/index.js',
        vendor: ['react', 'react-dom']
    },
    plugin: [
        new webpack.DllReferencePlugin({
            manifest: path.join(__dirname, './dist/dll', 'manifest.json')
        })
    ]
};
