
MVVM - Model View ViewModel
	
	Model - 应用数据

	View - 用户界面

	ViewModel - 一个拥有双向数据处理能力的转换器，它将模型数据传递到视图，并将视图指令传递到模型。

	解决 DOM 操作，更专注于业务

	-----------------------------------------------
	双向绑定的方案：AngularJS, Avalon 等		

	参考：http://foio.github.io/posts/、http://www.ituring.com.cn/article/211443#

	mvvm: http://www.cnblogs.com/aaronjs/archive/2013/06/16/3138631.html

		https://rubylouvre.github.io/anu/ch/index.html

1、基本功能
	
	View --notify---> ViewModel ---update----> Model
		 <--update---			<---notify----

	重点：对 View， Model 变动的将领
	
	（1）、视图变动的监听

		通过相应的指令，在HTML中声明式的标记出需要监听的DOM节点

		<input type="text" foio-model="nickname" />			// 指令foio-model，声明将View中的input的变动通知到Model中的nickname

		var elem = document.querySelector('input');
		elem.addEventListener('input', callback, false);	// 监听 input 得到视图的变动

	（2）、模型变动的监听（ECMAScript5 的 Object.defineProperty 实现）

		var air = {};
		Object.defineProperty(air, 'temperature', {
			get: function () {
				console.log('get!');
			},
			set: function (value) {
				console.log('set!');	// 可以在set函数中得到模型的变动，并将相关变动通知到ViewModel。
			}
		});

		air.temperature = 15;		// output: set!
		air.temperature;			// output: get!

2、总体实现
	
	（1）View（视图）扫描

		涉及对 DOM 结构的扫描：

			抽取指令：通过 executeBindings 函数对相应的节点进行绑定处理
			
			相应节点的处理：1、绑定通知函数，用于在视图更新时通知 ViewModel。

				2、绑定更新函数，用于在模型更新时通过该函数更新视图

			针对不同的节点类型，这些通知函数和更新函数都是预先定义好的，存储在directives结构中

	（2）Model（模型）构建

		主要是注册监听函数，用于在Model变化时得到通知

		controller中的每一个变量都通过Object.defineProperty(obj, prop, descriptor)定义到Model上

		var descriptor = {
			var dependencyList = [];

			get: function () {
				// 搜集依赖
				dependencyList.push(this);
				return value;
			},
			set: function (newVal) {
				if (oldVal === newVal) {
					return;
				}
				oldVal = newVal;
				// 通知依赖于该Model的视图进行更新
				for (var dependIdx in dependencyList) {
	                dependencyList[dependIdx].updateView(newVal);
	            }
			}
		};

	（3）关联模型和视图

		// View(视图)扫描的结果是一个元素集合
		bindings = [
			{
				type: type,			// 指令类型
				element: elem,		// DOM 节点
				expr: value			// 绑定的变量名称
			}
		];

		// Model(模型)构建的结果也是一个集合：
		vmodels = {
			controller1: {
				expr1: value1,
				expr2: value2,
				binder: {
					expr1: function () {},
					expr2: function () {}
				}
			},
			controller1: { ... }
		};

		// 通过executeBindings函数，将视图和模型关联起来。
		function executeBindings (bindings, vmodels) {
			for (var i = 0, binding; (binding = bindings[i++]);) {
				bindings.vmodels = vmodels;
				directives[binding.type](binding);
			}
		}

		每一种指令都有不同的初始化函数，比如针对foio-model指令，当DOM节点为input类型时，初始化函数做了三件事：

			监听input和DOMAutoComplete事件

			注册对模型的依赖

			提供更新该DOM节点的方法

		directives['model'] = {
			switch (binding.xtype) {
				case 'input':
					// 绑定input事件
					binding.bound('input', updateVModel);
					// 绑定DOMAutoComplete事件
					binding.bound('DOMAutoComplete', updateVModel);
					// 注册对模型的依赖
					elem.value = closetVmodel.binder[binding.expr].apply(binding);
					// 更新该DOM节点的方法
					binding.updateView = function(newVal) {
	                    elem.value = newVal;
	                };
	            break;
			}
		}
