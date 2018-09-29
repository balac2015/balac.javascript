import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action';
import getters from './getters';
import ajax from '../config/ajax'
console.log(getters)

Vue.use(Vuex)

const state = {
	timestap: 0,	// 答题总共用时
	topics: [],
	answerid: [], //答案id
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})