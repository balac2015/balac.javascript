const ADD_ITEMNUM = 'ADD_ITEMNUM';
const REMBER_ANSWER = 'REMBER_ANSWER';
const REMBER_TIME = 'REMBER_TIME';
const INITIALIZE_DATA = 'INITIALIZE_DATA';
const GET_TOPICS = 'GET_TOPICS';

export default {
	//记录答案
	[REMBER_ANSWER] (state, payload) {
		state.answerid[payload.key] = payload.value;
	},
	// 记录做题时间
	[REMBER_TIME] (state) {
		state.timestrap = new Date() - state.timestrap;
	},
	[GET_TOPICS] (state, data) {
		state.topics = data;
	}
}