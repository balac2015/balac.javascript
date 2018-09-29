import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class TabContent extends Component {
    render () {
        const { classPrefix } = this.props
        const classes = classnames({
            [`${classPrefix}-content`]: true
        })

        return (
            <div className={ classes }>
                { this.getTabPanes() }
            </div>
        )
    }
    getTabPanes () {
        const { panels, classPrefix, activeIndex } = this.props

        return React.Children.map(panels, (child) => {

            if (!child) {
                return
            }
            const order = parseInt(child.props.order, 10)
            const isActive = activeIndex === order

            return cloneElement(child, {
                classPrefix,
                isActive,
                children: child.props.children,
                key: `tabpane-${order}`
            })
        })
    }
}

TabContent.propTypes = {
    classPrefix: PropTypes.string,
    panels: PropTypes.node,
    activeIndex: PropTypes.number
}

export default TabContent
