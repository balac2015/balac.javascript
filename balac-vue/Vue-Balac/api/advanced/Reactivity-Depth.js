深入响应式原理 Reactivity in Depth
	
	响应式系统 Reactivity system

	模型层(model)只是普通 JavaScript 对象，修改它则更新视图(view)


Object.defineProperty

如何追踪变化


变化检测问题

	Vue 不能检测到对象属性的添加或删除

	var vm = new Vue({
		data: {
			a: 1		// vm.a 是响应的
		}
	})

	vm.b = 2			// vm.b 是非响应的


	Vue.set( vm.someObject, 'b', 2 );		// 将响应属性添加到嵌套的对象上

	this.$set( this.someObject, 'b', 2);	// vm.$set 的实例方法，Vue.set() 别名

	在已有对象上添加属性：Obejct.assign(), _.extend()

	this.someObject = Object.assign( {}, this.someObject, {	// 添加到对象上的属性触发更新
		a: 1,
		b: 2
	})


声明响应式属性


异步更新队列
	
	<div id="example">{{ message }} </div>/

	var vm = new Vue({
		el: '#example',
		data: {
			message: '123'
		}
	});
	vm.message = 'new message';		// 更新数据
	vm.$el.textContent === 'new message';		// false
	Vue.newtTick(function() {
		vm.$el.textContent === 'new message';		// true
	})

	在组件内使用 vm.$nextTick() 实例方法特别方便，因为它不需要全局 Vue ，并且回调函数中的 this 将自动绑定到当前的 Vue 实例上：

	Vue.component('example', {
		template: '<span>{{ message }}</span>',
		data: function () {
			return {
				message: 'not updated'
			}
		},
		methods: {
			updateMessage: function () {
				this.message = 'updated';
				console.log(this.$el.textContent) 			// => '没有更新'

				this.$nextTick(function () {
					console.log( this.$el.textContent );	// '更新完成'
				})
			}
		}
	})	