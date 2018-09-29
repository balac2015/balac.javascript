postcss as babel for css

npm install 
	
	postcss-cli		# 以下命令运行都在此工具的 postcss 下

	autoprefixer

$ postcss styles.css -u autoprefixer -c postcss.json -d -m dist
	
	-m 或 --map # 启用源映射

	-w 	# 启动一个观察程序进程，并在styles.css每次修改文件时自动重建。
	
// 插件配置
postcss.json
	{
		"autoprefixer": {
			"browsers": ["last 2 versions"]
		}
	}

postcss 插件：https://www.postcss.parts/

CSS变量的自定义属性插件

	https://github.com/postcss/postcss-custom-properties

	实现对支持W3C自定义属性规范（https://www.w3.org/TR/css-variables/）

自定义选择规范插件

	https://github.com/postcss/postcss-custom-selectors

	实现自定义选择规范（https://drafts.csswg.org/css-extensions/#custom-selectors）

css 问题：新功能、模块化、灵活的构建	