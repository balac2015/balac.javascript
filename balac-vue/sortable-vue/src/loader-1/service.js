import Vue from 'vue'
import Loading from './loading.js'

const Instance = Vue.extend(Loading)

const service = (options = {}) => {
	const instance = new Instance({
		el: document.createElement('div')
	})
	
	options.el.appendChild(instance.$el)
}

export default service