import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../actions.js';

class AddTodo extends Component {
    constructor (props, context) {
        super(props, context);

        this.onSubmit = this.onSubmit.bind(this);
        this.refInput = this.refInput.bind(this);
    }
    onSubmit (ev) {
        ev.preventDefault();        // form 提交默认行为会引发网页跳转

        const input = this.input;   // this.state.value onChange 下

        if (!input.value.trim()) {
            return;
        }
        this.props.onAdd(input.value);
        input.value = '';
    }
    // 当 input 元素加载完后，refInput 被调用，node 表示 input DOM
    refInput (node) {
        this.input = node;
    }
    render () {
        return (
            <div className="add-todo">
                <form onSubmit={ this.onSubmit }>
                    // 当一个包含 ref 属性的组件完成装载（ mount ）过程的时候，会看一看 ref 属性是不是一个函数，如果是，就会调用这个函数，参数就是这个组件代表的 DOM 元素（不是 Virtual DOM 元素）
                    <input className="new-todo" ref={ this.refInput } />

                    // <input className="new-todo" onChange={ this.onInputChange } value={ this.state.value } />
                    <button className="add-btn" type="submit">添加</button>
                </form>
            </div>
        );
    }
    onInputChange (event) {
        this.setState({
            value: event.target.value
        });
    }
}

// AddTodo.propTypes = {
//     onAdd: PropTypes.func.isRequired
// };

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (text) => {
            dispatch(addTodo(text));
        }
    };
};

export default connect(null, mapDispatchToProps)(AddTodo);
