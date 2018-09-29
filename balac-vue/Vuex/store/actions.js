import * as types from './mutation-types';

const actions = {
  incrementAsync ({ commit, dispatch, state }, playload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  },
    // 调用异步 API、分发多重 mutations
    checkout ({ commit, state, dispatch }, products) {
        const saveCartItems = savedCartItems = [...state.cart.added]; // 把当前购物车的物品备份起来

        commit(types.CHECKOUT_REQUREST);  // 发出结账请求，然后乐观地清空购物车

        // 购物 API 接受一个成功回调和一个失败回调
        shop.buyProducts(
            products,
            () => commit(types.CHECKOUT_SUCCESS),                   // 成功操作
            () => commit(types.CHECKOUT_FAILURE, saveCartItems)     // 失败操作
        );
    }
}

export default actions
