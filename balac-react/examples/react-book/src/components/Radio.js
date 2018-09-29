import React, { Component } from 'react'

// 单选按钮：radio
class Radio extends Component {
    constructor (props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)

        this.state = {
            radioValue: ''
        }
    }

    render () {
        const { radioValue } = this.state
        return (
            <div>
                <p>gender:{ radioValue }</p>
                <label>
					male:
					<input type="radio" value="male"
						checked={ radioValue === 'male' }
						onChange={ this.handleChange }
					/>
				</label>

				<label>
					male:
					<input type="radio" value="female"
						checked={ radioValue === 'female' }
						onChange={ this.handleChange }
					/>
				</label>
            </div>
        )
    }

    handleChange (e) {
        this.setState({
            radioValue: e.target.value
        })
    }
}

export default Radio
