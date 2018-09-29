import * as Loading from './index.js'

Vue.directive('loading', Loading.directive)

const Instance = Vue.extend(Loading.view)

const instance = new Instance({
	el: document.createElement('div')
})

document.body.appendChild(instance.$el)

instance.visible = true;