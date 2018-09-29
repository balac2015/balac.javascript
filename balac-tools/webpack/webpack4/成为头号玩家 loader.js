loader 的开发

loader是一个模块导出函数，在正则匹配成功的时候调用，webpack把文件数组传入进来，在this上下文可以访问loader API

this.context : 当前处理文件的所在目录，假如当前 Loader 处理的文件是 /src/main.js，则 this.context 就等于 /src。
this.resource : 当前处理文件的完整请求路径，包括 querystring，例如 /src/main.js?name=1。
this.resourcePath : 当前处理文件的路径，例如 /src/main.js。
this.resourceQuery : 当前处理文件的 querystring。
this.target : 等于 Webpack 配置中的 Target
this.loadModule : 但 Loader 在处理一个文件时，如果依赖其它文件的处理结果才能得出当前文件的结果时， 就可以通过 – – – this.loadModule(request: string, callback: function(err, source, sourceMap, module)) 去获得 request 对应文件的处理结果。
this.resolve : 像 require 语句一样获得指定文件的完整路径，使用方法为 resolve(context: string, request: string, callback: function(err, result: string))。
this.addDependency : 给当前处理文件添加其依赖的文件，以便再其依赖的文件发生变化时，会重新调用 Loader 处理该文件。使用方法为 addDependency(file: string)。
this.addContextDependency : 和 addDependency 类似，但 addContextDependency 是把整个目录加入到当前正在处理文件的依赖中。使用方法为 addContextDependency(directory: string)。
this.clearDependencies : 清除当前正在处理文件的所有依赖，使用方法为 clearDependencies()。
this.emitFile : 输出一个文件，使用方法为 emitFile(name: string, content: Buffer|string, sourceMap: {…})。
this.async : 返回一个回调函数，用于异步执行。

下面来看看 less-loader 和 style-loader 如何实现:

let less = require('less');
module.exports = function (source) {
    const callback = this.async();
    less.render(source, (err, result) => {
        callback(err, result.css);
    });
}
module.exports = function (source) {
    let script = (`
      let style = document.createElement("style");
      style.innerText = ${JSON.stringify(source)};
      document.head.appendChild(style);
   `);
    return script;
}
