每个插件本质只是一个 JavaScript 方法，用来对由 PostCSS 解析的 CSS AST 进行处理。

每个 PostCSS 插件都是一个 NodeJS 的模块。使用 postcss 的 plugin 方法来定义一个新的插件。

PostCSS 插件一般通过不同的方法来对当前的 CSS 样式规则进行修改。如通过 insertBefore 和 insertAfter 方法来插入新的规则

var postcss = require('postcss');

/**
 * postcss-checkco 插件名称，一般以“postcss-”作为前缀。
 * fn: 一个进行初始化的方法。
 * fn 的 options 参数：插件所支持的配置选项
 * fn 的返回值：是另外一个方法，用来进行实际的处理。
 */
module.exports = postcss.plugin('postcss-checkco', function (options) {

	/**
	 * 用来进行实际的处理。
	 * css: 代表的是表示 CSS AST 的对象
	 * result: 代表的是处理结果。
	 */
	return function (css, result) {
		// 遍历所有的“color”属性声明，并对“color”属性值进行检查。
		css.walkDecls('color', function (decl) {
			// 如果属性值为 black，就使用 result 对象的 warn 方法添加一个警告消息
			if (decl.value == 'black') {
				result.warn('No black color.', {
					decl: decl
				});
			}
		});
	};
});