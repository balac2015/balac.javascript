/**
 * 表单元素如 <input>，<textarea> 和 <select> 表单元素通常保持自己的状态，并根据用户输入进行更新
 * 在 React 中，可变状态一般保存在组件的 state(状态) 属性中，并且只能通过 setState() 更新。
 * 受控组件(Controlled Components): 通过使 React 的 state 成为 “单一数据源原则” 来结合这两个形式。然后渲染表单的 React 组件也可以控制在用户输入之后的行为。这种形式，其值由 React 控制的输入表单元素称为“受控组件”。
 */

 class NameForm extends React.Component {
     constructor(props) {
         super(props);
         this.state = { value: '' };

         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
     }
     // 对于受控组件来说，每一次 state(状态) 变化都会伴有相关联的处理函数。这使得可以直接修改或验证用户的输入
     handleChange(event) {
         this.setState({
             value: event.target.value.toUpperCase()    // 强制 name 的输入都是大写字母
         });
     }

     handleSubmit(event) {
         alert('A name was submitted: ' + this.state.value);
         event.preventDefault();
     }

     render() {
         return (
             <form onSubmit={this.handleSubmit}>
                 <label>
                     Name:
                     // 设置表单元素的value属性之后，其显示值将由this.state.value决定，以满足React状态的同一数据理念。
                     // 执行handleChange方法以更新React状态，显示值也将随着用户的输入改变。
                     <input type="text" value={this.state.value} onChange={this.handleChange} />
                 </label>
                 <input type="submit" value="Submit" />
             </form>
         );
     }
 }

// <textarea>
<textare>
    Hello there, this is some text in a text area
</textarea>
const textarea = <textarea value={this.state.value} onChange={this.handleChange} />;// constructor 中， this.state = {value: 'Hello there, this is some text in a text area'};

// select
<select>
    <option value="grapefruit">Grapefruit</option>
    <option value="lime">Lime</option>
    <option selected value="coconut">Coconut</option>   // 有 selected，默认选中 Coconut
    <option value="mango">Mango</option>
</select>
const select = <select value={ this.state.value } onChange={ this.handleChange }>   // constructor 中， this.state = {value: 'coconut'};
    <option value="grapefruit">Grapefruit</option>
    <option value="lime">Lime</option>
    <option value="coconut">Coconut</option>
    <option value="mango">Mango</option>
</select>

const select2 = <select multiple={ true } value={ ['B', 'C'] }> // 多选

// file input 标签

// 处理多个输入元素

// 受控 Input 组件的 null 值
