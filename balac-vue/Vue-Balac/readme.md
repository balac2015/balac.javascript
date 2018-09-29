vue 技术内幕：http://hcysun.me/vue-design/art/2vue-constructor.html（**************）

http://blog.csdn.net/fungleo/article/details/53199436


http://www.infoq.com/cn/articles/source-code-vuex2


github 搜 vue 仿

	https://github.com/wendaosanshou/mi-by-vue

	https://github.com/Loogeek/douban-Vue

	https://github.com/andylei18/vue-shopping


http://www.ycwalker.com/2016/09/03/blog-cms/

https://juejin.im/post/5b2df500f265da597c772b0d

https://github.com/berwin/Blog/issues/22

https://github.com/berwin/Blog/issues

vue 内部原理：变化侦测、模板编译、VirtualDOM、整体运行流程
// 侦测变化的方法：Object.defineProperty, esy 的 proxy

// getter中，收集依赖，setter中，触发依赖。
--------------------------------------------------------------
需求复杂，运行时（runtime）的交互

jQuery: 命令式，局部重新渲染，两个行为：对状态的判断、操作 DOM，关注状态、DOM

	$('.box')
		.append('<p>.....</p>')
		.xxx()
		.yyy()
		.....

声明式：描述状态与视图之间的映射关系，通过映射关系操作 DOM，只用关注状态

应用在运行时，内部状态会不断的变化，造成局部区域不停的重新渲染

框架的局部渲染：VirtualDom、脏检测流程、变化侦测（vue1.0）、变化侦测+VirtualDOM（vue2）


NUXT.js: https://zh.nuxtjs.org/guide/development-tools