import Category from './category.js';

export const getEntryByRank = (type, before) => {
	let category = Category.find((category) => category.title === type);
    let url = `/v1/get_entry_by_rank?src=web&limit=20&category=${category.id}`

    return fetch(!before ? url : `${url}&before=${before}`)
};
