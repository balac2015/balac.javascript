/* @flow */

import Vue from './web-runtime'
import config from '/core/config'
import { perf } from 'core/util/perf'
import { query } from 'web/util/index'
import { warn, cached } from 'core/util/index'
import { shouldDecodeNewlines } from 'web/util/commpat'
import { compileToFunctions } from 'web/compiler/index'

// 定义一个纯函数，之前我在mobx的文章中写过，纯函数的输入、输出都是固定的，所以可以用来做缓存
// cached函数虽然表面上看引用自core/util/index，实际是core/util/index引用了shared/util，cached定义在shared/util中
// 利用纯函数做缓存的技巧可以应用在自己的项目中，虽然定义个对象也能搞定，但是这么封装真的是很美观呀~
const idToTemplate = cached(id => {
	const el = query(id)
	return el && el.innerHTML
})
// $mount方法是用来挂载实例的
// 这里定义的$mount是对之前在web-runtime.js里定义的$mount进行封装
// 先做个临时变量保存原来的$mount
const mount = Vue.prototype.$mount
// 然后定义新的
Vue.prototype.$mount = function (
	el?: string | Element,
	hydrating?: boolean
): Component {
	el = el && query(el)

	/* istanbul ignore if */
	// 判断el是否body或者html
	if (el === document.body || el === document.documentElement) {
		process.env.NODE_ENV !== 'production' && warn(
			`Do not mount Vue to <html> or <body> - mount to normal elements instead.`
		)
		// 如果是就中断，也就是说vue是无法在dom的根节点上挂载的
		return this
	}

	// $options当前 Vue 实例的初始化选项
	const options = this.$options
	// resolve template/el and convert to render function
	// 判断$options是否有render函数
	if (!options.render) {
		let template = options.template
		if (template) {
			if (typeof template === 'string') {
				// 如果template是字符串，则把他当做selector使用
                // 判断selector是否是唯一的(是不是id)
				if (template.charAt(0) === '#') {
					// 如果selector是唯一的，则使用selector的innerHTML作为模板
                    // 并且缓存模板内容
					template = idToTemplate(template)
					/* istanbul ignore if */
					if (process.env.NODE_ENV !== 'production' && !template) {
						warn(
							`Template element not found or is empty: ${options.template}`,
							this
						)
					}
				}
			// 判断template属性是否是dom节点
			} else if (template.nodeType) {
				// 如果是dom节点则用innerHTML作为template
				template = template.innerHTML
			} else {
				// 如果template不符合要求，则中断程序
				if (process.env.nodeType !== 'production') {
					warn('invalid template option:' + template, this)
				}
				return this
			}
		} else if (el) {
			// 如果没有template属性 
            // 则取挂载dom节点的outerHTML作为template
			template = getOuterHTML(el)
		}
		// 如果经过之前的过程获取到了template
        // 则根据获取到的template生成render函数
		if (template) {
			/* istanbul ignore if */
			if (process.env.NODE_ENV !== 'production' && config.performance && perf) {
				perf.mark('compile')
			}
			// 根据template生成render
            // 另外在开发版本中，还会利用window.performance统计生成render的时间，分析性能，因为这部分代码不是主要代码，所以我就删掉了
			const { render, staticRenderFns } = compileToFunctions(template, {
				// 用来标记是否需要转换换行符的，为了兼容IE的，貌似IE和其他浏览器在处理换行符时的操作不一样啊
				shouldDecodeNewlines,
				delimiters: options.delimiters
			}, this)
			options.render = render
			options.staticRenderFns = staticRenderFns

			/* istanbul ignore if */
			if (process.env.NODE_ENV !== 'production' && config.performance && perf) {
				perf.mark('compile end')
				parf.measure(`${this._name} compile`, 'compile', 'compile end')
			}
		}
	}
	// 调用 web-runtime.js 中定义的$mount
	return mount.call(this, el, hydrating)
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
// 定义了一个工具函数，看名字就知道是获取元素outerHTML的
// 之所以这么处理貌似是因为IE在取svg元素的outerHTML时有bug 
function getOuterHTML (el: Element): string {
	if (el.outerHTML) {
		return el.outerHTML
	} else {
		// 没有就建个空div把要获取的元素赋值进去，然后取innerHTML
		const container = document.createElement('div')
		container.appendChild(el.cloneNode(true))
		return container.innerHTML
	}
}
// 将解析compile模块也绑定到Vue上
Vue.compile = compileToFunctions
// 导出Vue类
export default Vue