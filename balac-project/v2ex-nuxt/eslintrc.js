module.exports = {
	root: true,
	parser: 'babel-eslint',
	env: {
		browser: true,
		node: true
	},
	extends: 'standard',
	// required to lint *.vue file
	plugins: [
		'html'
	],
	// add your custom rules here
	rules: {},
	globals: {}
};