Autoprefixer
	
	作用是为 CSS 中的属性添加浏览器特定的前缀。-webkit-, -ms- 等

	#content { display: flex; } => #content { display: -webkit-box; display: -webkit-flex; display: flex;}

	使用 Can I Use 网站提供的数据来确定所要添加的不同浏览器的前缀

	配置 Autoprefixer 插件:

	require('autoprefixer')({
		browsers: [
			'last 2 versions',	// 表示主流浏览器的最近两个版本
			'ie 6-8',			// 表示 IE 6 到 8
			'> 1%'				// 表示全球使用率大于 1%的浏览器版本
		]
	});

	可以移除 CSS 代码中冗余的属性名称前缀（配置对象中的 remove 属性来配置该行为）


cssnext
	
	允许在当前的项目中使用 CSS 将来版本中可能会加入的新特性。cssnext 负责把这些新特性转译成当前浏览器中可以使用的语法。	

	cssnext 是一系列与 CSS 将来版本相关的 PostCSS 插件的组合。

	cssnext 中已经包含了对 Autoprefixer 的使用，因此使用了 cssnext 就不再需要使用 Autoprefixer。

	自定义属性和变量：

		CSS 的层叠变量的自定义属性规范（CSS Custom Properties for Cascading Variables）

		CSS 扩展规范（CSS Extensions）中允许创建自定义选择器，

		CSS 嵌套模块规范（CSS Nesting Module）中定义了标准的样式规则嵌套方式。





