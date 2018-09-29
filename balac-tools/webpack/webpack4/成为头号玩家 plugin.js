plugin 开发

webpack整个构建流程有许多钩子，开发者可以在指定的阶段加入自己的行为到webpack构建流程中。插件由以下构成:

    一个 JavaScript 命名函数。
    在插件函数的 prototype 上定义一个 apply 方法。
    指定一个绑定到 webpack 自身的事件钩子。
    处理 webpack 内部实例的特定数据。
    功能完成后调用 webpack 提供的回调。

整个webpack流程由compiler和compilation构成,compiler只会创建一次，compilation如果开起了watch文件变化，那么会多次生成compilation. 那么这2个类下面生成了需要事件钩子

    compiler hooks 文档：https://webpack.js.org/api/compiler-hooks/

    compilation hooks 文档

写一个小插件，生成所有打包的文件列表(webpack4不推荐使用compiler.plugin来注册插件，webpack5将不支持):

class FileListPlugin{
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.emit.tap('FileListPlugin',function (compilation) {
            let fileList = 'filelist:nn';
            for (let filename in compilation.assets) {
                fileList += ('- '+filename+'n');
            }
            compilation.assets['filelist.md']={
                source() {
                    return fileList;
                },
                size() {
                    return fileList.length
                }
            }
        });
    }
}
module.exports = FileListPlugin;
