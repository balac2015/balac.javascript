var path = require('path');

module.exports = {
	devServer: {
		// https://cli.vuejs.org/zh/config/#devserver-proxy
		proxy: 'https://timeline-merger-ms.juejin.im'
	},
	lintOnSave: false
};