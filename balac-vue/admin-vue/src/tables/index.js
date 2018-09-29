import view from './views/BasicTable.vue'

const store = {}
const router = {
	path: '/tables',
	name: 'tables',
	component: view
}

export { router, view, store }