import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
    token: null,
    activeName: 'first',
    username: ''
}

const store = {
    state,
    mutations,
    actions
}
export default new Vuex.Store(store)