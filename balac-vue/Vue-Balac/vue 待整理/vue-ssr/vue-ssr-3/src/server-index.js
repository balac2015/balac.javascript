// 这个文件里面除了定义入口的.vue，其他的都不用配置

// server-entry.js
import Vue from 'vue';
// 引入 .vue 入口文件
import App from './component/List.vue';

const app = new Vue(App);

// the default export should be a function
// which will receive the context of the render call
// 你问我这块代码是啥意思，其实我也不知道，想要打包server端代码，这个代码块是必须的
// 以后会在这段代码里面加入其他一些配置信息
export default function (context) {
	return new Promise((resolve, reject) => {
		resolve(app);
	});
}