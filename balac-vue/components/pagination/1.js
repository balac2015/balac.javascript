export default {
	render: function (h) {
		return (
			<div onClick={ this.click }>测试，</div>
		);
	},
	methods: {
		click () {
			console.log(this, 'click')
		}
	}
}