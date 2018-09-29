import React, { Component } from 'react'

import Tabs from './Tabs.js'
import TabPane from './TabPane.js'

import './style.css'

class App extends Component {
    constructor (props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.state = {
            activeIndex: 0
        }
    }

    handleChange (e) {
        this.setState({
            activeIndex: parseInt(e.target.value, 10)
        })
    }

    render () {
        // 这里切换 select 中的选项是没有作用的，因为使用的是 defaultActiveIndex，
        // 如果想要作用的话，要把 defaultActiveIndex 改成 activeIndex 就可以
        return (
            <div>
                <div className="operator">
                    <span>切换</span>
                    <select onChange={ this.handleChange } value={ this.state.activeIndex }>
                        <option value="0">Tab 1</option>
                        <option value="1">Tab 2</option>
                        <option value="2">Tab 3</option>
                    </select>
                </div>
                <Tabs defaultActiveIndex={ this.state.activeIndex } className="tabs-bar">
                    <TabPane order="0" tab={'Tab 0'}>第一个 tab 里的内容</TabPane>
                    <TabPane order="1" tab={'Tab 1'}>第二个 tab 里的内容</TabPane>
                    <TabPane order="2" tab={'Tab 2'}>第三个 tab 里的内容</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default App
