/**
 * 使用组合而不是继承以实现代码的重用。
 */

/**
 * 包含
 * 些组件在设计前无法获知自己要使用什么子组件，Sidebar、Dialog 等通用“容器”比较常见，children prop 直接传递 子元素到他们的输出中
 */
function FancyBorder (props) {
	return (
		<div className={ 'FancyBorder FancyBorder-' + props.color }>
			{ props.children }	// 在 <FancyBorder> JSX 标签中的任何内容被传递到 FancyBorder 组件中，作为一个 children prop(属性)
		</div>
	);
}
function WelcomeDialog () {
	return (
		<FancyBorder color="blue">
			<h1 className="Dialog-title">
				Welcome
			</h1>
			<p className="Dialog-message">
				Thank you for visiting our spacecraft!
			</p>
		</FancyBorder>
	);
}


/**
 * 多个占位符
 * 如 <Contacts /> 和 <Chat /> 等 React 元素本质上也是对象，所以可以将其像其他数据一样作为 props(属性) 传递使用
 */
function SplitPance (props) {
	return (
		<div className="SplitPance">
			<div className="SplitPance-left">
				{ props.left }
			</div>
			<div className="SplitPance-right">
				{ props.right }
			</div>
		</div>
	);
}
function App () {
	return (
		<SplitPance
			left={ <Contacts /> }
			right={ <Chat /> }
		/>
	);
}


/**
 * 特例，组件作为其它组件的“特殊情况”
 * WelcomeDialog 是 Dialog 的一个特殊用例
 */
function Dialog () {
	return (
		<FancyBorder color="blue">
			<h1 className="Dialog-title">
				{ props.title }
			</h1>
			<p className="Dialog-message">
				{ props.message }
			</p>
			{ props.children }
		</FancyBorder>
	);
}
class SignUpDialog extends React.Component {

	constructor (props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.state = {
			login: ''
		};
	}

	render () {
		return (
			<Dialog title="Mars Exploration Program"
				message="How should we refer to you?">
				<input value={ this.state.login }
					onChange={ this.handleChange } />
				<button onClick={ this.handleSignUp }>
					Sign me Up!
				</button>
			</Dialog>
		);
	}

	handleSignUp () {
		alert(`Welcome aboard, ${this.state.login}!`);
	}

	handleChange (e) {
		this.setState({
			login: e.target.value
		});
	}
}