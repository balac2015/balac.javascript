import LoadingMask from './mask.js'
import LoadingSpinner from './spinner.js'

export default {
	name: 'loading',
	render () {
		return (
			<transition>
				<LoadingMask>
					<LoadingSpinner />
				</LoadingMask>
			</transition>
		)
	}
}