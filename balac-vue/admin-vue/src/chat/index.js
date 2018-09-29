import view from './views/Chat.vue'

const store = {}
const router = {
	path: '/chat',
	name: 'chat',
	component: view
}

export { router, view, store }