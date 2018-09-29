import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleTodo, removeTodo } from '../actions.js';

const TodoItem = ({ onToggle, onRemove, completed, text, key }) => {
    const checkedProp = completed ? {checked: true} : {};
    const style = { textDecoration: completed ? 'line-through' : 'none' };

    return (
        <li>
            <div className="view">
                <input className="toggle" type="checkbox" { ...checkedProp } readOnly onClick={ onToggle } />
                <label>{ text }</label>
                <button className="destroy" onClick={ onRemove }></button>
            </div>
        </li>
    );
};

TodoItem.propTypes = {
    onToggle: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { id } = ownProps;

    return {
        onToggle: () => dispatch(toggleTodo(id)),
        onRemove: () => dispatch(removeTodo(id))
    };
};

export default connect(null, mapDispatchToProps)(TodoItem);
