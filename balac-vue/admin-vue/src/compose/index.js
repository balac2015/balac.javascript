import view from './views/Compose.vue'

const store = {}
const router = {
	path: '/compose',
	name: 'compose',
	component: view
}

export { router, view, store }