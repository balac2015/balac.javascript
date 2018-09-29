/* @flow */

import Vue from 'core/index'
import config from 'core/config'
import { path } from 'web/runtime/patch'
import { extend, noop } from 'shared/util'
import { mountComponent } from 'core/instance/lifecycle'
import { devtools, inBrowser, isChrome } from 'core/util/index'
import platformDirectives from 'web/runtime/directives/index'
import platformComponents from 'web/runtime/components/index'

import {
	query,
	mustUseProp,
	isReservedTag,
	getTagNamespace,
	isUnknownElement
} from 'web/util/index'

// install platform specific utils
// 添加不同平台下的功能函数，web平台下都有对应的的接口，weex平台下都是空函数
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// install platform runtime directives & components
// 添加不同平台下的组件和命令
extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)

// install platform patch function
// 安装虚拟dom的补丁函数，貌似只有在客户端下才会用到，服务端是没有的，另外weex也有自己的补丁函数，所以这里知识安装浏览器的patch函数
Vue.prototype.__path__ = inBrowser ? patch : noop;

// public mount method
// 定义$mount函数，只是对核心的mountComponent方法进行了个简单的封装
Vue.prototype.$mount = function (
	el?: string | Element,
	hydrating?: boolean
): Component {
	el = el && inBrowser ? query(el) : undefined
	return mountComponent(this, el, hydrating)
}

// devtools global hook 定义devtool的全局钩子(hook)
/* instanbul ignore next */
// vue有自己的chrome插件调试工具，下面这段代码就是启动调试工具的
setTimeout(() => { 
	// 判断是否配置了使用调试工具，其实就是看是不是生产版本……
	if (config.devtools) {
		// 判断是否安装了调试工具，是通过检查全局变量window.__VUE_DEVTOOLS_GLOBAL_HOOK__来判断的
		if (devtools) {
			// 如果有就触发调试工具的init事件，所以如果项目中使用了生产版本的vue或者没有使用vue，调试工具都不会启动的
			devtools.emit('init', Vue)
		} else if (process.env.NODE_ENV !== 'production' && isChrome) {
			// 如果没有安装调试工具，并且使用的不是生产版本的vue，用的还是chrome浏览器，就提示用户下载调试工具
			console[console.info ? 'info' : 'log'](
				'Download the Vue Devtools extension for a better development experience:\n' +
        		'https://github.com/vuejs/vue-devtools'
			)
		}
	}
	// 如果不是生产版本，提示用户现在使用的是开发版本，正式部署的时候用生产版本
	// config中的productionTip和devtools其实都是process.env.NODE_ENV，貌似在开发过程中应该可以配置的说
	if (process.env.NODE_ENV !== 'production' &&
		config.productionTip !== false &&
		inBrowser && typeof console !== 'undefined'
	) {
		console[console.info ? 'info' : 'log'](
	      `You are running Vue in development mode.\n` +
	      `Make sure to turn on production mode when deploying for production.\n` +
	      `See more tips at https://vuejs.org/guide/deployment.html`
    	)
	}
}, 0)

// 最后导出Vue模块
export default Vue