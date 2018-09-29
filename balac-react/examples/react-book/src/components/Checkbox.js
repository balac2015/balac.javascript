import React, { Component } from 'react'

// 复选框：checkbox
class Radio extends Component {
    constructor (props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)

        this.state = {
            coffee: []
        }
    }

    render () {
        const { coffee } = this.state

		return (
			<div>
				<p>请选择你最喜欢的咖啡:{ coffee.join() }</p>
				<label>
					male:
					<input type="checkbox" value="Cappuccino"
						checked={ coffee.indexOf('Cappuccino') !== -1 }
						onChange={ this.handleChange }
					/>
				</label>
				<label>
					male:
					<input type="checkbox" value="CafeMocha"
						checked={ coffee.indexOf('CafeMocha') !== -1 }
						onChange={ this.handleChange }
					/>
				</label>
			</div>
		)
    }

    handleChange (e) {
        const { checked, value } = e.target
		let { coffee } = this.state

		if (checked && coffee.indexOf(value) === -1) {
			coffee.push(value)
		} else {
			coffee = coffee.filter(i => i !== value)
		}
        console.log( coffee )
		this.setState({
			coffee
		})
    }
}

export default Radio
