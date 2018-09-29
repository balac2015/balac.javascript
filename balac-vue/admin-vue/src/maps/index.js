import view from './views/google.vue'

const store = {}
const router = {
	path: '/maps',
	name: 'maps',
	component: view
}

export { router, view, store }