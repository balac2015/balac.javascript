import React, { Component } from 'react'
import { List, Map } from 'immutable'

const map1 = Map({a: 1, b: 2, c: 3})
const map2 = map1.set('b', 50)


class TodoAppContainer extends Component {
    render () {
        return (
            <div>
                { map1.get('b') + ' vs. ' + map2.get('b') }
                { JSON.stringify(map1) + ' vs. ' + JSON.stringify(map2) }    
            </div>
        )
    }
}
export {
    TodoAppContainer
}