import Vue from 'vue';
import Vuex from 'vuex';

import profile from './modules/profile';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const state = {
  count: 0
};


const store = new Vuex.Store({
  /* 单一状态树：用一个对象包含全部的应用层级状态，作为唯一数据源而存在 */
  state,
  
  /** 在store 的 state 中派生出一些状态（相当于 store 的计算属性），例如对列表进行过滤并计数 */
  getters,
  
  /** 提交 mutation，不直接变更状态。可以包含任意异步操作 */
  actions,

  /** 更改 Vuex 的 store 中的状态 state 的唯一方法是提交 mutation。必须是同步函数 */
  mutations,

  /**
   * 模块内部的 action, mutation, getter 仍然注册在全局命名空间：保证了多个模块能够响应同一 mutation 或 action
   * 内部模块 getter 的第三个参数将对应根几点的 state。内部模块的 action, mutation, getters 中的其它 state 只对应模块内部 state
   */
  modules: {
      profile
  }
});

/**
 * 模块的动态创建
 * 模块的状态：store.state.myModule
 * 模块动态注册功能可以让其他 Vue 插件为了应用的 store 附加新模块，以此来分割 Vuex 的状态管理（如 vuex-router-sync 插件可以集成 vue-router 与 vuex，管理动态模块的路由状态）
 * 可以使用 store.unregisterModule(moduleName) 动态地卸载模块。（不能使用此方法卸载静态模块-在创建 store 时声明的模块）
 */
store.registerModule('myModule', {});

export default store;