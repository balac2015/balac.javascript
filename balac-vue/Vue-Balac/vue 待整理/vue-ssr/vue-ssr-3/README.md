
/tools/webpack.server.js

/src/server-index.js

关键：如何把bundle.server.js里面的内容，转成HTML
	

总结下生成HTML的步骤
	1.有一个你想打包.vue文件的入口文件，就是src/server-index.js
	2.在webpack的配置文件中，把入口文件指向他
	3.使用webpack对文件进行打包，会生成build/bundle.server.js文件
	4.使用vue-server-renderer包解析这个文件，最终渲染成HTML