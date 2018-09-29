CSS的缺陷

	CSS自身的弱编程能力：不支持嵌套、运算、变量、复用等

	浏览器兼容问题、CSS 规范，实现程度和方案不一

	CSS预编译器是第一种顺势而生的革命性方案。


目前普遍的方案是将CSS预编译与PostCSS综合在一起：（PostCSS支持的“未来CSS语法”也并不能完全弥补CSS的缺陷）

	使用CSS预编译弥补CSS源码的弱编程能力，比如变量、运算、继承、模块化等；

	使用PostCSS处理针对浏览器的需求，比如autoprefix、自动css sprites等。

CSS预编译

	工作原理是提供便捷的语法和特性供开发者编写源代码，随后经过专门的编译工具将源码转化为CSS语法。
	SASS、Less、Stylus

	增强编程能力；

	增强可复用性；

	增强可维护性；

	更便于解决浏览器兼容性。

	不同的预编译器特性虽然有所差异，但核心功能均围绕这些目标打造，比如：

		嵌套；嵌套是所有预编译器都支持的语法特性，也是原生CSS最让开发者头疼的问题之一；

		变量、运算；变量和运算增强了源码的可编程能力；

		mixin/继承；mixin/继承是为了解决hack和代码复用

		模块化；模块化的支持不仅更利于代码复用，同时也提高了源码的可维护性。


PostCSS
	
	提供了用 javascript 代码处理 css 的方式。

	负责把 CSS 代码解析成抽象语法树结构（Abstract Syntax Tree，AST），再交由插件来进行处理。

	插件基于 CSS 代码的 AST 所能进行的操作是多种多样的：变量、mixin 混入、浏览器前缀声明、transpile 转译成当前 css 规范支持的格式。

	
	鼓励开发者使用规范的 CSS 原生语法编写源代码，然后配置编译器需要兼容的浏览器版本，最后经过编译将源码转化为目标浏览器可用的CSS代码。

	提供了丰富的插件用于实现不同场景的编译需求，最常用的比如autoprefixer、sprites等，编译流程如下图所示：


	一般与构建工具进行集成使用。（webpack, grunt, gulp）


	自身只包括：CSS分析器，CSS节点树API，source map生成器，CSS节点拼接器

	基于 PostCSS 的插件都是使用了 CSS 节点树 API 来实现的。


	PostCSS 的执行过程：
		
		1、Parser 利用CSS分析器读取CSS字符内容，得到一个完整的节点树

		2、Plugin 对上面拿到的节点树利用CSS节点树API进行一系列的转换操作

		3、Plugin 利用CSS节点拼接器将上面转换之后的节点树重新组成CSS字符

		4、Stringifier 在上面转换期间可利用source map生成器表明转换前后字符的对应关系


### 资源
	
	postcss 官网：http://postcss.org/

	autoprefixer: https://github.com/postcss/autoprefixer

	cssnext: http://cssnext.io/

	css 自定义变量：https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables

	css 自定义选择器：https://drafts.csswg.org/css-extensions/#custom-selectors

	css 嵌套规则：http://tabatkins.github.io/specs/css-nesting/





