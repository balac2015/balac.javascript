import Vue from 'vue'
import Vuex from 'vuex'
import { store as dashboard} from './dashboard/index.js'

Vue.use(Vuex)

const state = {
	modules: [
		{ name: 'dashboard', path: '/dashboard', icon: 'ti-home', default: true },

		{ name: 'email', path: '/email', icon: 'ti-email' },

		{ name: 'compose', path: '/compose', icon: 'ti-share' },

		{ name: 'calendar', path: '/calendar', icon: 'ti-calendar' },

		{ name: 'chat', path: '/chat', icon: 'ti-comment-alt' },

		{ name: 'charts', path: '/charts', icon: 'ti-bar-chart' },

		{ name: 'forms', path: '/forms', icon: 'ti-pencil' },

		{ name: 'ui elements', path: '/ui', icon: 'ti-palette' },

		{ name: 'tables', path: '/tables', icon: 'ti-layout-list-thumb' },

		{ name: 'maps', path: '/maps', icon: 'ti-map' }
	]
}

export default new Vuex.Store({
	state,
	modules: {
		dashboard
	}
})