module.exports = [
	{
		title: '掘金',
		logo: '',
	},
	{
		title: 'segmentfault',
		logo: '',
		proxy: ''
		// 首页服务端渲染，后面分页则调接口
		url: 'https://segmentfault.com/api/timelines/channel/1490000006201494',
		params: '?offset={offset}',	// 前一个请求最后一条数据的 offset，第一个接口的 offset: 1533596400109
	}
];