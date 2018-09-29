import { get, post } from './api'

const mutations = {
  // 传入的额外参数 n 为 载荷（playload）
  increment (state, n) {
    state.count += n;
  },
  // 在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读
  decrement (state, payload) {
    state.count += payload.amount;
  }
}

export default mutations