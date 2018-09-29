/**
 * Vue 公共接口
 */
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'

// 初始化 Vue 的公共接口
initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
    get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
    get () {
        /* istanbul ignore next */
        return this.$vnode && this.$vnode.ssrContext
    }
})

Vue.version = '__VERSION__'

export default Vue