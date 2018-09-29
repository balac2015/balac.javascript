import React, { Component } from 'react'
import classnames from 'classnames'

class InkBar extends Component {
    render () {
        const { left, width } = this.props
        const classes = classnames({
            inkBar: true
        })

        return (
            <div styleName={ classes } style={
                {
                    WebkitTransform: `translate3d(${left}px, 0, 0)`,
                    transform: `translate3d(${left}px, 0, 0)`,
                    width: width
                }
            }></div>
        )
    }
}

export default InkBar
