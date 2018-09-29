// 1、创建 vue 实例
var Vue = require('vue');
var app = new Vue({
    render: function (h) {
        return h('p', 'hello world');
    }
});

// 2、创建一个渲染器
var render = require('vue-server-renderer');

// 3、将 vue 实例渲染成 html
render.renderToString(app, function (error) {
    if (error) {
        throw error;
    }
    console.log( html ) // => => <p server-rendered="true">hello world</p>
})
