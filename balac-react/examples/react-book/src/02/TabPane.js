import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import style from './style.css'

class TabPane extends Component {
    render () {
        const { className, isActive, children } = this.props
        const classes = classnames({
            panel: true,
            contentActive: isActive
        })

        return (
            <div role="tabpanel" className={ classes } aria-hidden={ !isActive }>
                { children }
            </div>
        )
    }
}

TabPane.propTypes = {
    tab: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired,
    order: PropTypes.string.isRequired,
    disable: PropTypes.bool,
    isActive: PropTypes.bool
}

export default TabPane
