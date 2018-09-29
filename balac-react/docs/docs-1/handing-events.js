/**
 * 事件处理
 * 通过 React 元素处理事件跟在 DOM 元素上处理事件非常相似。但是有一些语法上的区别：
 *      1、React 事件使用驼峰命名，而不是全部小写。
 *      2、通过 JSX , 你传递一个函数作为事件处理程序，而不是一个字符串。(react: onClick={ activateLasers }, html: onclick="activateLasers()")
 *      3、默认行为，必须调用 e.preventDefault();
 */

 /**
  * 将参数传递给事件处理程序，以下两种方式等价
  * 1、arrow functions 参数 e 作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递
  * 2、Function.prototype.bind 通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。
  */
 <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
 <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

 /**
  * this 指向
  * 1、在构造函数中进行绑定
  * 2、属性初始化语法 ，那么你可以使用属性初始值设置来正确地 绑定(bind) 回调
  * 3、在回调中使用一个 箭头函数
  *
  * 3 的问题：每次 Toggle 渲染时都创建一个不同的回调。在多数情况下，没什么问题。然而，如果这个回调被作为 prop(属性) 传递给下级组件，这些组件可能需要额外的重复渲染。我们通常建议在构造函数中进行绑定，以避免这类性能问题。
  */
// Toggle 组件渲染一个按钮，让用户在 “ON” 和 “OFF” 状态之间切换：
class Toggle extends React.Component {
    constructor (props) {
        super(props);
        this.state = { isToggleOn: true };

        this.handleClick = this.handleClick.bind(this);     // 1、这个绑定是必要的，使`this`在回调中起作用
    }


    // 1、3
    handleClick () {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    // 2
    // 这个语法确保 `this` 绑定在 handleClick 中。
    // 警告：这是 *实验性的* 语法。
    handleClick = () => {
        console.log( 'this is: ', this);
    }

    render () {
        return (
            <button
                onClick={ this.handleClick }            // 1、2
                onClick={ (e) => this.handleClick(e) }  // 3
            >
                { this.state.isToggleOn ? 'ON' : 'OFF' }
            </button>
        );
    }
}
