// Redux + React + Immutable

Redux:
	
	函数式编程、行为的可预测性、同构应用，客户端和服务端多数逻辑代码的共享、时间旅行

	有目的的限制

Immutable 创建操作不可变数据结构的工具

使用 Immutable 存储状态树

todomvc 项目：webpack + babel

	单元测试：Mocha + Chai（Chai-Immutable是一个处理不可变数据结构的chai插件。）

	不会依赖像Karma这样的基于浏览器的测试运行器- 相反，jsdom库将在纯JavaScript中设置DOM模拟，并允许我们更快地运行测试：

	bootstrapping 脚本处理事项：（test/setup.js）

		模拟通常由浏览器提供document的window对象和对象

		告诉chai我们正在使用包的不可变数据结构 chai-immutable

构建状态树：状态树是将保存应用程序（状态）中包含的所有信息的数据结构		

纯组件的好处：PureRenderMixin 提升性能

react-addons-test-utils 包，帮助测试我们的组件
	
	renderIntoDocument，将组件呈现为分离的DOM节点;
	scryRenderedDOMComponentsWithTag，查找带有提供标记的DOM中所有组件实例（如li，input...）;
	scryRenderedDOMComponentsWithClass，使用提供的类查找DOM中所有组件实例;
	Simulate，模拟用户操作（点击，按键，文本输入......）











