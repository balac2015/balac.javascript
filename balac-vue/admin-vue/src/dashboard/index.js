import view from './views/Dashboard.vue'

const store = {}
const router = {
	path: '/dashboard',
	name: 'dashboard',
	component: view
}

export { router, view, store }