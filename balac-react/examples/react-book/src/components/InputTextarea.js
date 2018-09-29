import React, { Component } from 'react'
import './input.css'

// 文本框：input, textarea
class Input extends Component {
    constructor (props) {
        super(props)

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleTextareaChange = this.handleTextareaChange.bind(this)

        this.state = {
            inputValue: '',
            textareaValue: ''
        }
    }

    render () {
        const { inputValue, textareaValue } = this.state
        return (
            <div>
                <p>单行输入框:{ inputValue }</p>
                <div className="ui input">
                    <input type="text" value={ inputValue } onChange={ this.handleInputChange }  placeholder="Search..." />
                </div>

                <p>多行输入框: { textareaValue }</p>
                <div className="ui input">
                    <textarea value={ textareaValue } onChange={ this.handleTextareaChange } />
                </div>
            </div>
        )
    }

    handleInputChange (e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    handleTextareaChange (e) {
        this.setState({
            textareaValue: e.target.value
        })
        console.log( this.state.textareaValue)
    }
}

export default Input
