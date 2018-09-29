懒加载（按需加载）lazy loading
	
	优化网页或应用的方式：先把代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

	import(/* webpackChunkName: "print" */ './print')

框架：
	
	react: https://reacttraining.com/react-router/web/guides/code-splitting

	vue: https://alexjoverm.github.io/2017/07/16/Lazy-load-in-Vue-using-Webpack-s-code-splitting/
