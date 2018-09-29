/**
 * 组件使你可以将 UI 划分为一个一个独立，可复用的小部件，并可以对每个部件进行单独的设计。
 * 从定义上来说， 组件就像JavaScript的函数。组件可以接收任意输入(称为”props”)， 并返回 React 元素，用以描述屏幕显示内容。
 * 
 * 组件名称总是以大写字母开始。<div /> 代表一个 DOM 标签，而 <Welcome /> 则代表一个组件，并且需要在作用域中有一个 Welcome 组件。
 * 组件必须返回一个单独的根元素。
 * 建议从组件本身的角度来命名 props 而不是它被使用的上下文环境。
 * Props 是只读的
 */

// 函数式组件：接收一个 props 参数, 并返回一个 React 元素
function Welcome (props) {
    return <h1>Hello, { props.name }</h1>;
}

// 类组件：类允许在其中添加本地状态(state)和生命周期钩子。
class Welcome extends React.Component {

    render () {
        return <h1>Hello, { this.props.name }</h1>;
    }
}

const element = <Welcome name="Sara" />;

/**
 * ReactDOM.render() 方法来更新渲染的输出
    我们调用了 ReactDOM.render() 方法并向其中传入了 <Welcome name="Sara" /> 元素。
    React 调用 Welcome 组件，并向其中传入了 {name: 'Sara'} 作为 props 对象。
    Welcome 组件返回 <h1>Hello, Sara</h1>。
    React DOM 迅速更新 DOM ，使其显示为 <h1>Hello, Sara</h1>。
 */
ReactDOM.render(
    element,
    document.getElementById('root')
);

// 构成组建，创建一个 App 组件，并在其内部多次渲染 Welcome 组件
function App () {
    return (
        <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
        </div>
    );
}

// 纯函数：不会试图改变它们的输入，并且对于同样的输入,始终可以得到相同的结果。
function sum (a, b) {
    return a + b;
}

// 非纯函数：改变了自身的输入值
function withdraw (account, amount) {
    account.total -= amount;
}

// *** 所有 React 组件都必须是纯函数，并禁止修改其自身 props 。 ***