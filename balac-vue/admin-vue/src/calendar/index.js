import view from './views/Calendar.vue'

const store = {}
const router = {
	path: '/calendar',
	name: 'calendar',
	component: view
}

export { router, view, store }