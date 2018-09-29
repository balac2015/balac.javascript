module.exports = {
	render: {
		bundleRenderer: {
			cache: require('lru-cache')({
				max: 1000,				// 最大缓存个数
				maxAge: 1000 * 60 * 15	// 缓存 15 分钟
			})
		}
	}
}