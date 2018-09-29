import Vue from 'vue'
import Loading from './loading.js'

const Instance = Vue.extend(Loading)

const bind = (el, binding, vnode, oldValue) => {

	const instance = new Instance({
		el: document.createElement('div')
	})

	el.appendChild(instance.$el)
}

export default {
	bind
}