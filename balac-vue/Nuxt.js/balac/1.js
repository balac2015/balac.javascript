ajax 调用 github：https://api.github.com/repos/nuxt/nuxt.js/contents/examples/hello-world/package.json
	
		https://api.github.com/repos/{repos}/contents/{content}

	返回 json 数据，res.content 为对应的文件内容，如 package.json