import pager from './pager.vue';

// pager 分页基础用法
// pagination 附加功能：total, sizes, prev, next, jumper

// layout: total 总条数, sizes 显示条数, prev 上一页, pager 分页, next 下一页, jumper 跳页, slot, ->

export { pager }

// 接口

Slot = {
	name: '自定义内容，需要在 layout 中列出 slot'
}

Events = {
	'size-change': 'sizes 改变时触发',
	'current-change': 'currentPage 改变时触发',
	'prev-click': '',
	'next-click': ''
}

Attributes = {
	small: Boolean | false, 		// 是否使用小型分页样式
	background: Boolean | false, 	// 是否为分页按钮添加背景色
	'page-size': Number | 10, 		// 每页显示条目个数
	total: Number,					// 总条目数
	'page-count': Number,			// 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性
	'pager-count': Number | 7,		// 	页码按钮的数量，当总页数超过该值时会折叠
	'current-page': Number | 1,		// 当前页数，支持 .sync 修饰符
	layout: String | 'prev, pager, next, jumper, ->, total',
	'page-sizes': Number[] | [10, 20, 30, 40, 50, 100],
	'poper-class': String,
	'prev-text': String,
	'next-text': String,
	disabled: Boolean

}