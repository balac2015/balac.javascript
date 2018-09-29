import axios from 'axios'; // https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank?src=web&limit=20&category=5562b415e4b00c57d9b94ac8';

import StoriesView from './StoriesView.vue';

export const createStoriesView = (type) => ({
	name: `${type}-stories-view`,
	title: camelize(type),
	render: (createElement) => createElement(StoriesView, {
		props: { type }
	}),
	beforeCreate () {
		this.$store.commit('SET_ACTIVE_TYPE', type);
		this.$store.commit('INIT_RANK_INDEX');
	}
});

export const camelize = (str) => str.charAt(0).toUpperCase() + str.slice(1);