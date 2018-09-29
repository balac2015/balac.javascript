import ajax from '../config/ajax';
import topics from '../api/topics';

export default {
	addNum({ commit, state }, id) {
		//点击下一题，记录答案id，判断是否是最后一题，如果不是则跳转下一题
		commit('REMBER_ANSWER', id);

		if (state.num < state.topics.length) {
			commit('ADD_ITEMNUM', 1);
		}
	},
	getTopic ({ commit, state }) {
		commit('GET_TOPICS', topics);
	}
}