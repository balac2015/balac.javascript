/**
 * 模块的动态创建
 * 模块的状态：store.state.myModule
 * 模块动态注册功能可以让其他 Vue 插件为了应用的 store 附加新模块，以此来分割 Vuex 的状态管理（如 vuex-router-sync 插件可以集成 vue-router 与 vuex，管理动态模块的路由状态）
 * 可以使用 store.unregisterModule(moduleName) 动态地卸载模块。（不能使用此方法卸载静态模块-在创建 store 时声明的模块）
 */
store.registerModule('myModule', {});