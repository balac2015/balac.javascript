react 的编程思想


思考如果构建应用程序

用 React 构建一个可搜索的产品数据表的思考过程：
	
1、将 UI 拆解到组件层次结构中

	组件的单一职责原则：组件理想情况下只处理一件事。如果一个组件持续膨胀，就应该将其拆分为多个更小的组件中。

	JSON API 返回数据：

		[
		  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
		  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
		  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
		  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
		  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
		  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
		];

	UI 和数据模型的信息结构的映射

	5 个组件：

		FilterableProductTable （orange）： 包含整个示例

		SearchBar（蓝色）： 接收所有的 用户输入

		ProductTable（绿色）： 根据 用户输入 显示和过滤 数据集合

		ProductCategoryRow（宝石绿）： 显示每个 类别 的标题

		ProductRow（红色）： 显示每个 产品 的行数据

2、 用 React 构建一个静态版本（组件渲染数据模型）

	props 是将数据从 父级组件 传递到 子级 的一种方式

	state 只用于交互，也就是说，数据可以随时被改变。在构建静态版本时 *不要使用 *state **

	React 的 单向数据流（也称为 单向绑定 ）使所有模块化和高性能。

	自上而下构建，从构建层次结构中顶端的组件开始（即从 FilterableProductTable 开始）

	自下而上构建。

	在更简单的例子中，通常 自上而下 更容易，而在较大的项目中，自下而上，更有利于编写测试。

	props(属性) 和 state(状态)

3、确定 UI state(状态) 的最小（但完整）表示
	
	可变 state(状态) 的最小集合（不重复，以此计算出你所需的所有其他数据内容）

	所有的数据：（分析每一个数据，弄清楚哪一个是 state(状态) ）

		原始产品列表 - 作为 props 传递

		用户输入的搜索文本	- state,会根据用户的输入发生变化，并且不能从其他数据计算得出

		复选框的值	- state,会根据用户的输入发生变化，并且不能从其他数据计算得出

		过滤后的产品列表 - 不是 state, 因为它可以通过结合 原始产品列表 与 搜索文本 和 复选框的值 计算得出。

	分析每一个数据，弄清楚哪一个是 state(状态)

		1、是否通过 props(属性) 从父级传入？ 如果是这样，它可能不是 state(状态) 。

		2、是否永远不会发生变化？ 如果是这样，它可能不是 state(状态)。

		3、是否可以由组件中其他的 state(状态) 或 props(属性) 计算得出？如果是这样，则它不是 state(状态)。

4、确定 state(状态) 的位置
	
	确定是哪个组件可变，或者说哪个组件拥有这些 state(状态) 。

	渲染 props(属性) 和 state(状态) 沿着层次结构向下传播

	（设置了 input 的 value prop(属性) 总是等于从 FilterableProductTable 中传递的 state ）

5、添加反向数据流
	
	数据流方式：层次结构中深层的 form(表单) 组件需要更新 FilterableProductTable 中的 state(状态) 。

	（改变表单输入的时候，更新 state(状态) 来反映用户的输入。由于组件只能更新它们自己的 state(状态)，FilterableProductTable 将传递回调到 SearchBar ）