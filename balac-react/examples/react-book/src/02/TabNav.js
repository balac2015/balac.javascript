import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import CSSModules from 'react-css-modules'
import { Motion, spring } from 'react-motion'
import styles from './style.css'
import InkBar from './InkBar.js'

function getOuterWidth (el) {
    return el.offsetWidth
}

function getOffset (el) {
    const html = el.ownerDocument.documentElement
    const box = el.getBoundingClientRect()

    return {
        top: box.top + window.pageYOffset - html.clientTop,
        left: box.left + window.pageXOffset - html.clientLeft
    }
}

class TabNav extends Component {
    constructor (props) {
        super(props)

        this.state = {
            inkBarWidth: 0,
            inkBarLeft: 0
        }
    }
    componentDidMount () {
        const { activeIndex } = this.props
        const node = ReactDOM.findDOMNode(this)
        const el = node.querySelectorAll('li')[activeIndex]

        this.setState({
            inkBarWidth: getOuterWidth(el),
            inkBarLeft: getOffset(el).left
        })
    }
    componentDidUpdate (prevProps) {
        if (prevProps.activeIndex !== this.props.activeIndex) {
            const { activeIndex } = this.props
            const node = ReactDOM.findDOMNode(this)
            const el = node.querySelectorAll('li')[activeIndex]

            this.setState({
                inkBarWidth: getOuterWidth(el),
                inkBarLeft: getOffset(el).left
            })
        }
    }
    render () {
        const { classPrefix } = this.props
        const rootClasses = classnames({
            [`${classPrefix}-bar`]: true
        })
        const classes = classnames({
            [`${classPrefix}-nav`]: true
        })

        return (
            <div className={ rootClasses } role="tablist">
                <ul className={ classes }>
                    { this.getTabs() }
                </ul>
            </div>
        )
    }
    getTabs () {
        const { panels, classPrefix, activeIndex } = this.props

        return React.Children.map(panels, (child) => {

            if (!child) {
                return
            }
            const order = parseInt(child.props.order, 10)
            let classes = classnames({
                [`${classPrefix}-tab`]: true,
                [`${classPrefix}-active`]: activeIndex === order,
                [`${classPrefix}-disabled`]: child.props.disabled
            })
            let events = {}

            if (!child.props.disabled) {
                events = {
                    onClick: this.props.onTabClick.bind(this, order)
                }
            }
            const ref = {}

            if (activeIndex === order) {
                ref.ref = 'activeTab'
            }

            return (
                <li role="tab"
                    aria-disabled={ child.props.disabled ? 'true' : 'false' }
                    aria-selected={ activeIndex === order ? 'true' : 'false' }
                    { ...events }
                    className={ classes }
                    key={ order }
                    { ...ref }
                >
                    { child.props.tab }
                </li>
            )
        })
    }
}

TabNav.propTypes = {
    classPrefix: PropTypes.string,
    panels: PropTypes.node,
    activeIndex: PropTypes.number
}

export default TabNav
