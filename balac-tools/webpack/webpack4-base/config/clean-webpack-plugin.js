const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const plugins = {
    // 因为在文件名中加入hash值，打包多次后dist目录变得非常多文件，没有删除或覆盖，可以引入一个插件 clean-webpack-plugin
    // 在打包前自动删除dist目录，保证dist目录下是当前打包后的文件:
    new CleanWebpackPlugin(
        // 需要删除的文件夹或文件
        [path.join(__dirname, './dist/*.*')],
        {
            // root 目录
            root: path.join(__dirname, './')
        }
    )
};
