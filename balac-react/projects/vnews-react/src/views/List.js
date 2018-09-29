import React, { Component } from 'react'
import { getEntryByRank } from '../scripts/api.js'

class List extends Component {
    constructor (props) {
        super(props)

        const title = this.props.match.params.title
        getEntryByRank(title)
    }

    render () {
        const { match } = this.props
        return (
            <div>{ match.params.title }</div>
        )
    }
}
export default List
