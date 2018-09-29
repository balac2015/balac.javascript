import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TabNav from './TabNav.js'
import TabContent from './TabContent.js'

class Tabs extends Component {
    static defaultProps = {
        classPrefix: 'tabs',
        onChange: () => {}
    }
    
    constructor (props) {
        super(props)

        const currProps = this.props
        this.handleTabClick = this.handleTabClick.bind(this)

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
        const { classPrefix, children, className } = this.props
        const cx = classnames(this.props.className, 'ui-tabs')

        return (
            <div className={ cx }>
                <TabNav key="tabBar"
                    classPrefix={ classPrefix }
                    onTabClick={ this.handleTabClick }
                    panels={ children }
                    activeIndex={ this.state.activeIndex }
                />
                <TabContent key="tabContent"
                    classPrefix={ classPrefix }
                    activeIndex={ this.state.activeIndex }
                    panels={ children }
                />
            </div>
        )
    }
}

Tabs.propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    defaultActiveIndex: PropTypes.number,
    activeIndex: PropTypes.number,
    onChang: PropTypes.func
}

export default Tabs
