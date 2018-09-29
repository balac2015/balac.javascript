import view from './views/Email.vue'

const store = {}
const router = {
	path: '/email',
	name: 'email',
	component: view
}

export { router, view, store }