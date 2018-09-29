import React, { Component } from 'react'

// select 组件：单选 - radio
class Select extends Component {
    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            area: ''
        }
    }
    handleChange (e) {
        this.setState({
            area: e.target.value
        })
    }
    render () {
        const { area } = this.state

        return (
            <select value={ area } onChange={ this.handleChange }>
                <option value="bejing">北京</option>
                <option value="shanghai">上海</option>
            </select>
        )
    }
}

// select 组件：多选 - checkbox
class SelectMultiple extends Component {
    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            area: ['bingjing', 'shanghai']
        }
    }
    handleChange (e) {
        // 注意，这里返回的 options 是一个对象，并非数组
        const { options } = e.target
        const area = Object.keys(options)
            .filter(i => options[i].selected === true)
            .map(i => options[i].value)

        this.setState({
            area
        })
    }
    render () {
        const { area } = this.state

        return (
            <select multiple={ true } value={ area } onChange={ this.handleChange }>
                <option value="bejing">北京</option>
                <option value="shanghai">上海</option>
            </select>
        )
    }
}

export default SelectMultiple
