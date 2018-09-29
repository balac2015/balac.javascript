module.exports = exports = function (page) {
	var Vue = require('vue');
	var weex = require('weex-vue-render');

	weex.init(Vue);

	switch (page) {
		case 'a':
			require('./a');
			break;
		case 'b':
			require('./b');
		default:
			break;
	}
};
