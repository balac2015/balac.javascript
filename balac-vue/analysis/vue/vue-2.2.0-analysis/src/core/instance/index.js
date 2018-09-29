/**
 * Vue 构造函数
 * Vue 原型对象的声明分散在当前目录的多个文件中：
 * 对于 Vue.prototype 对象的定义，通过 mixin 的方式在入口文件 core/index.js 中依次调用。对于实例对象（代码中通常称为 vm）则通过 init 函数在 vm._init() 中依次调用。
 */
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
    if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
        warn('Vue is a constructor and should be called with the `new` keyword')
    }

    // 。_init() 中进行初始化，其中会依次调用 lifecycle、events、render、state 模块中的初始化函数
    this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)

export default Vue