import './mask.scss'

export default {
	name: 'loading-mask',
	render () {
		return (
			<div class="mask">
				{ this.$slots.default }
			</div>
		)
	}
}