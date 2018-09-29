import { getEntryByRank } from '../api/index.js';

export default {
	FETCH_LIST_DATA: ({ commit, dispatch, state }) => {
		let rankIndex = state.rankIndex,
			len = rankIndex.length - 1;

		return getEntryByRank(state.activeType, len < 0 ? undefined : rankIndex[len])
			.then((res) => {
				if (res.status === 200) {
					return res.data;
				}
			});
	}
}