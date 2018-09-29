import axios from 'axios';
import Category from '../config/category.js';

export const getEntryByRank = (type, before) => {
	let category = Category.find((category) => category.title === type);

	return axios({
		url: '/v1/get_entry_by_rank',
		method: 'get',
		params: {
			src: 'web',
			limit: 20,
			before: before,
			category: category.id
		}
	});
};