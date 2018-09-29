import Vue from 'vue';
import Router from 'vue-router';
import Category from './config/category.js';
import { createStoriesView } from './views/createStoriesView.js';

Vue.use(Router);

const routes = Category.map((category) => ({
	path: '/' + category.title,
	component: createStoriesView(category.title)
}));
routes.push({
	path: '/',
	redirect: '/frontend'
});

export default new Router({
	mode: 'history',
	fallback: false,
	routes: routes
});