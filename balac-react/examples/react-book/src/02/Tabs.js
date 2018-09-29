import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Seq } from 'immutable'

import TabNav from './TabNav.js'
import TabContent from './TabContent.js'

class Tabs extends Component {
    static defaultProps = {
        onChange: () => {}
    }

    constructor (props) {
        super(props)

        const currProps = this.props
        this.handleTabClick = this.handleTabClick.bind(this)
        this.immChildren = Seq(currProps.children)

        let activeIndex

        if ('activeIndex' in currProps) {
            activeIndex = currProps.activeIndex
        } else if ('defaultActiveIndex' in currProps) {
            activeIndex = currProps.defaultActiveIndex
        }

        this.state = {
            activeIndex,
            prevIndex: activeIndex
        }
    }

    componentWillReceiveProps (nextProps) {
        if ('activeIndex' in nextProps) {
            this.setState({
                activeIndex: nextProps.activeIndex
            })
        }
    }

    handleTabClick (activeIndex) {
        const prevIndex = this.state.prevIndex

        if (this.state.activeIndex !== activeIndex &&
            'defaultActiveIndex' in this.props) {
            this.setState({
                activeIndex,
                prevIndex
            })
            this.props.onChange({ activeIndex, prevIndex })
        }
    }

    render () {
        const { className } = this.props
        const cx = classnames(className, 'ui-tabs')

        return (
            <div className={ cx }>
                <TabNav key="tabBar"
                    onTabClick={ this.handleTabClick }
                    panels={ this.immChildren }
                    activeIndex={ this.state.activeIndex }
                />
                <TabContent key="tabContent"
                    activeIndex={ this.state.activeIndex }
                    panels={ this.immChildren }
                />
            </div>
        )
    }
}

Tabs.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    defaultActiveIndex: PropTypes.number,
    activeIndex: PropTypes.number,
    onChang: PropTypes.func
}

export default Tabs
