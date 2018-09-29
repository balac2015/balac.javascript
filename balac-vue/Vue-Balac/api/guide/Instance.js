实例 Instance


// 通过构造函数 Vue 创建 Vue 的根实例启动
var vm = new Vue({
	// 选项对象：可以包含数据、模板、挂载元素、方法、生命周期钩子等选项
});


// 扩展 Vue 构造器，用预定义选项创建可复用的组件构造器（建议将组件构造器注册为一个自定义元素，然后声明式地用在模板中）
var MyComponent = Vue.extend({
	// 扩展选项
});


// 所有的 MyComponent 实例都将以预定义的扩展选项被创建
var MyComponentInstance = new MyComponent();


// 属性与方法
var data = { a: 1 }
var vm = new Vue({          // 每个 Vue 实例都会代理其 data 对象里所有的属性
    data: data              // 代理属性 data
})
vm.a === data.a             // true

vm.a = 2                    // 设置属性也会影响到原始数据
data.a                      // 2

data.a = 3                  // ... 反之亦然
vm.a                        // 3

vm.$data === data           // true，Vue 实例暴露了一些有用的实例属性与方法，$ 为前缀，与代理的 data 属性区分
vm.$el === document.getElementById('example')   // true

vm.$watch('a', function(newVal, oldVal) {
    // 这个回调将在 `vm.a`  改变后调用
})


// 注意，不要在实例属性或者回调函数中（如 vm.$watch('a', newVal => this.myMethod())）使用箭头函数。因为箭头函数绑定父上下文，所以 this 不会像预想的一样是 Vue 实例，而是 this.myMethod 未被定义


var app = new Vue({

    // 组件实例被创建，组件属性计算之前，如 data 属性等
    beforeCreate: function() {},

    // 组件实例创建完成，但 DOM 还未生成，$el 属性还不存在
    created: function() {},

    // 模板编译、挂载之前
    beforeMount: function() {},
    
    // 模板编译、挂载之后
    mounted: function() {},

    // 组件更新之前
    beforeUpdate: function() {},

    // 组件更新之后
    updated: function() {},

    // for keep-alive，组件被激活时调用
    activated: function() {},

    // for keep-alive，组件被移除时调用
    deactivated: function() {},

    // 组件销毁前调用
    beforeDestory: function() {},
    
    // 组件销毁后调用
    destoryed: function() {}
})
