import Router from 'vue-router'
import Vue from 'vue'

const key = '动态路由';


import { router as dashboard, view as Default } from './dashboard/index.js'
import { router as email } from './email/index.js'
import { router as compose } from './compose/index.js'
import { router as calendar } from './calendar/index.js'
import { router as chat } from './chat/index.js'
import { router as charts } from './charts/index.js'
import { router as ui } from './ui/index.js'
import { router as forms } from './forms/index.js'
import { router as maps } from './maps/index.js'
import { router as tables } from './tables/index.js'

Vue.use(Router)

const router = {
	mode: 'history',
	routes: [
		{ path: '/', component: {} },
		dashboard,
		email,
		compose,
		calendar,
		chat,
		charts,
		ui,
		maps,
		forms,
		tables
	]
}

export default new Router(router)

/*
var routes = [
	{ name: 'dashboard', path: '/dashboard', icon: 'ti-home', component: '', default: true },

	{ name: 'email', path: '/email', icon: 'ti-holder', component: '' },

	{ name: 'compose', path: '/compose', icon: 'ti-share', component: '' },

	{ name: 'calendar', path: '/calendar', icon: 'ti-calendar', component: '' },

	{ name: 'chat', path: '/chat', icon: 'ti-comment-alt', component: '' },

	{ name: 'charts', path: '/charts', icon: 'ti-bar-chart', component: '' },

	{ name: 'forms', path: '/forms', icon: 'ti-pencil', component: '' },

	{ name: 'ui elements', path: '/ui', icon: 'ti-palette', component: '' },

	{ name: 'tables', path: '/tables', icon: 'ti-layout-list-thumb', component: '' },

		{ name: 'basic table', path: '/basic-table' }

		{ name: 'data table', path: '/data-table' }

	{ name: 'maps', path: '/maps', icon: 'ti-map', component: '' },

		{ name: 'google', path: '/goole-maps' }

		{ name: 'vector', path: '/vector' }

	{ name: 'pages', path: '/pages', icon: 'ti-files', component: '' },

		{ name: '404', path: '/404' }

		{ name: 'blank', path: '/blank' }

	{ name: 'Multiple Levels', path: '/multiple', icon: 'ti-view-list-alt', component: '' }

		{ name: 'menu item' }

];

ti-angle-right
*/