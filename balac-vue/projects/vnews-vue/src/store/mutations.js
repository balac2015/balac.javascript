export default {
	SET_ACTIVE_TYPE: (state, type) => {
		state.activeType = type;
	},
	SET_LIST: (state, lists) => {
		state.lists[state.activeType] = lists;
	},
	INIT_RANK_INDEX: (state) => {
		state.rankIndex = [];
	},
	ADD_RANK_INDEX: (state, rank) => {
		state.rankIndex.push(rank);
	},
	DEL_RANK_INDEX: (state) => {
		state.rankIndex.pop();
	}
}