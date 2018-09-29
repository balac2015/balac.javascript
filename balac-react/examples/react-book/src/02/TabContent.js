import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class TabContent extends Component {
    render () {
        const classes = classnames({
            content: true
        })

        return (
            <div className={ classes }>
                { this.getTabPanes() }
            </div>
        )
    }
    getTabPanes () {
        const { panels, activeIndex } = this.props

        return panels.map((child) => {

            if (!child) {
                return
            }
            const order = parseInt(child.props.order, 10)
            const isActive = activeIndex === order

            return cloneElement(child, {
                isActive,
                children: child.props.children,
                key: `tabpane-${order}`
            })
        })
    }
}

TabContent.propTypes = {
    panels: PropTypes.node,
    activeIndex: PropTypes.number
}

export default TabContent
