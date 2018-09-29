/**
 * JSX 简介：是 JavaScrip 的一种扩展语法
 * JSX 可以生成 React “元素”
 * 比起 HTML ， JSX 更接近于 JavaScript ， 所以 React DOM 使用驼峰(camelCase)属性命名约定, 而不是HTML属性名称。class 变为 className，tabindex 变为 tabIndex
 * 元素 elements, 组件 components, 属性 props
 */
const user = {firstName: 'Harper', lastName: 'Perez'};

// 推荐使用括号将 JSX 包裹起来，虽然这不是必须的，但这样做可以避免分号自动插入的陷阱。
const element = (
    // jsx 指定属性值，{} 中嵌入表达式最为属性值，不要使用引号来包裹大括号
    <h1 tabIndex="0" src={ user.avatarUrl }>
        // jsx 中嵌入表达式, 2 + 2, user.firstName 等
        Hello, { formatName(user) }!
    </h1>
);

// 编译后，jsx 表达式变为常规 js 对象
function getGreeting (user) {
    if (user) {
        return <h1>Hello, { formatName(user) }!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}

/**
 * JSX 防止注入攻击
 * const element = <h1>{title}</h1>; 是安全的
 * 默认情况下， 在渲染之前, React DOM 会格式化(escapes) JSX中的所有值. 从而保证用户无法注入任何应用之外的代码.
 * 在被渲染之前，所有的数据都被转义成为了字符串处理。 以避免 XSS(跨站脚本) 攻击。
 */

function formatName (user) {
    return user.firstName + ' ' + user.lastName;
}

// ReactDOM.render() 方法：渲染一个 React 元素到一个 root DOM 节点
ReactDOM.render(
    element,    // react 元素
    document.getElementById('root')
);

// JSX 表示对象，Babel 将JSX编译成 React.createElement() 调用。
const element1 = (
    <h1 className="greeting">
        Hello, world!
    </h1>
);
// 与 element1 相同
const element2 = React.createElement(
    'h1',
    { className: 'greeting' },
    'Hello, world!'
);
// React.createElement 执行后创建的对象：
const element3 = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello, world'
    }
};

// “React元素”。你可以把他们想象成为你想在屏幕上显示内容的一种描述。React会读取这些对象，用他们来构建DOM，并且保持它们的不断更新。