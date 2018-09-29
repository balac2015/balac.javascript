import React from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends React.Component {

	static propTypes = {};

	static defaultProps = {};

	constructor (props) {
		super(props);

		this.state = {
			checked: 'checked' in props ? props.checked : props.defaultChecked
		};
	}

	componentWillReceiveProps (nextProps) {
		if ('checked' in nextProps) {
			this.setState({
				checked: nextProps.checked
			});
		}
	}

	focus () {
		this.input.focus();
	}

	blur () {
		this.input.blur();
	}

	handleChange = (e) => {
		const { props } = this;

		if (props.disabled) {
			return;
		}

		if (!('checked' in props)) {
			this.setState({
				checked: e.target.checked
			});
		}
		props.onChange({
			target: {
				...props,
				checked: e.target.checked
			},
			stopPropagation () {
				e.stopPropagation();
			},
			preventDefault () {
				e.preventDefault();
			},
			nativeEvent: e.nativeEvent
		});
	}

	saveInput = (node) => {
		this.input = node;
	}

	render () {
		const { prefixCls, className, style, name, id, type, disabled, readOnly, tabIndex
			, onClick, onFocus, onBlur, autoFocus, value, ...others
		} = this.props;

		const globalProps = Object.keys(others).reduce((prev, key) => {
			if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
				prev[key] = others[key];
			}
			return prev;
		}, {});
		const { checked } = this.state;
		const classString
	}
}