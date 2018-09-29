import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/evn'

initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
	get: isServerRendering
})

Vue.version = '_VERSION_'

export default Vue