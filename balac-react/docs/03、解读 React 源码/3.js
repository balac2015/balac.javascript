第 3 章、解读 React 源码
	
	React15.0源码，深入 Virtual DOM 内部实现机制和原理

初探 React 源码：
	
	addons --- 包含一系列的工具方法插件，如 PureRenderMixin 、CSSTransitionGroup 、Fragment 、LinkedStateMixin 等。

	isomorphic --- 包含一系列同构方法。

	shared --- 包含一些公用或常用方法，如 Transaction、CallbackQueue等。

	test --- 包含一些测试方法等。

	core/tests --- 包含一些边界错误的测试用例。

	renderers --- （核心）包含了大部分功能实现，此处对其进行单独分析。

		dom --- 包含 client、server 和 shared。

			client --- 包含 DOM 操作方法（如 findDOMNode、setInnerHTML、setTextContent等）以及事件方法（一些非底层的实用性事件方法，如事件监听（ReactEventListener）、常用事件方法（TapEventPlugin、EnterLeaveEventPlugin）以及一些合成事件（SyntheticEvents等）），

			server --- 主要包含服务端渲染的实现和方法（如 ReactServerRendering、ReactServerRenderingTransaction等）。

			shared --- 包含文本组件（ReactDOMTextComponent）、标签组件（ReactDOMComponent）、DOM 属性操作（DOMProperty、DOMPropertyOperations）、CSS 属性操作（CSSProperty、CSSPropertyOperations）等。

		shared --- 包含 event 和 reconciler。

			event --- 包含一些更为底层的事件方法，如事件插件中心（EventPluginHub）、事件注册（EventPluginRegistry）、事件传播（EventPropagators ）以及一些事件通用方法。

				React 自定义了一套通用事件的插件系统，该系统包含事件监听器、事件发射器、事件插件中心、点击事件、进/出事件、简单事件、合成事件以及一些事件方法

			reconciler --- （最核心）称为协调器，它是最为核心的部分，包含 React 中自定义组件的实现（ReactCompositeComponent）、组件生命周期机制、setState 机制（ReactUpdates、ReactUpdateQueue）、DOM diff 算法（ReactMultiChild）等重要的特性方法。

Virtual DOM 模型
	
	{
		tagName: 'div',		// 标签名
		properties: {		// 属性：样式、属性、事件等
			style: {}		// 样式
		},
		children: [],		// 子节点
		key: 1				// 标识 id
	}

	ReactNode 中不同类型节点所需要的基础元素：

		ReactNode = ReactElement | ReactFragment | ReactText

		ReactElement = ReactComponentElement | ReactDOMElement

		ReactDOMElement = {
			type: string,
			props: {
				children: ReactNodeList,
				className: string
			},
			key: string | boolean | number | null,
			ref: string | null
		}

		ReactComponentElement = {
			type: ReactClass,
			props: TProps,
			key: string | boolean | number | null,
			ref: string | null
		}

		ReactFragment = Array<ReactNode | ReactEmpty>

		ReactNodeList = ReactNode | ReactEmpty

		ReactText = string | number

		ReactEmpty = null | undefined | boolean

生命周期的管理艺术

解密 setState 机制

diff 算法

React Patch 方法		