this.setState({
    // 修改 state
    comment: 'Hello'
});
// this.state.comment = 'Hello';    // 错误，不要直接修改 state(状态)

// state(状态) 更新可能是异步的，不能依赖他们的值计算下一个state(状态)。
this.setState(function (prevState, props) {
    counter: prevState.counter + props.increment
});
// 错误：
// this.setState({
//     counter: this.state.counter + this.props.increment
// })

class Clock extends React.Component {
    // 类构造函数(class constructor) 初始化 this.state:
    constructor (props) {
        // this.props 由 React 本身设定, 而 this.state 具有特殊的含义，但如果需要存储一些不用于视觉输出的内容，则可以手动向类中添加额外的字段。
        super(props);
        this.state = {
            date: new Date()
        };
    }

    // 在一个具有许多组件的应用程序中，在组件被销毁时释放所占用的资源是非常重要的。

    componentDidMount () {
        // 当 Clock 第一次渲染到DOM时，我们要设置一个定时器 。 这在 React 中称为 “挂载(mounting)” 。
        // componentDidMount() 钩子在组件输出被渲染到 DOM 之后运行
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount () {
        // 当 Clock 产生的 DOM 被销毁时，我们也想清除该计时器。 这在 React 中称为 “卸载(unmounting)” 。
        clearInterval(this.timerID);
    }

    tick () {
        this.setState({
            date: new Date()
        });
    }

    render () {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is { this.state.date.toLocaleTimeString() }.</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);