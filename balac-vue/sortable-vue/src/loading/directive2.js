import Vue from 'vue'
import Loading from './loading.vue'
const Mask = Vue.extend(Loading)


export default {
	install (Vue) {
		if (Vue.prototype.$isServer) {
			return
		}

		const toggleLoading = (el, binding) => {}

		const insertDom = (parent, el, binding) => {}

		Vue.directive('loading', {
			bind (el, binding, vnode) {
				const textExr = el.getAttribute('element-loading-text')
				const spinnerExr = el.getAttribute('element-loading-spinner')
				const backgroundExr = el.getAttribute('element-loading-background')
				const customClassExr = el.getAttribute('element-loading-custom-class')

				const vm = vnode.context
				const mask = new Mask({
					el: document.createElement('div'),
					data: {
						text: vm && vm[textExr] || textExr,
						spinner: vm && vm[spinnerExr] || spinnerExr,
						background: vm && vm[backgroundExr] || backgroundExr,
						customClass: vm && vm[customClassExr] || customClassExr,
						fullscreen: !!binding.modifiers.fullscreen
					}
				})
				el.instance = mask
				el.mask = mask.$el
				el.maskStyle = {}

				binding.value && toggleLoading(el, binding)
			},
			update (el, binding) {
				el.instance.setText(el.getAttribute('element-loading-text'))

				if (binding.oldValue !== binding.value) {
					toggleLoading(el, binding)
				}
			},
			unbind (el, binding) {
				if (el.domInserted) {
					el.mask &&
					el.mask.parentNode &&
					el.mask.parentNode.removeChild(el.mask)

					toggleLoading(el, {
						value: false,
						modifiers: binding.modifiers
					})
				}
			}
		})
	}
}