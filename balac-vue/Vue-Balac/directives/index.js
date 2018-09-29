/**
 * 指令器
 * 使用：
 *      v-example:foo.a.b="message"
 */

/**
 * 钩子函数
 * 在许多情况下，可能只需要在 bind 和 update 钩子函数上定义过相同的行为就足够了，而无需关心其他钩子函数
 */
const hooks = {
    // 在指令第一次绑定到元素时调用，只会调用一次。可以在此钩子函数中，执行一次性的初始化设置
    bind: callback,

    // 在已绑定的元素插入到父节点时调用（只能保证父节点存在，不一定存在于 document 中）
    inserted: callback,

    // 在包含指令的组件的 VNode 更新后调用，但可能之前其子组件已更新。指令的值可能更新或者还没更新，然而可以通过比较绑定的当前值和旧值，来跳过不必要的更新（参考下面的钩子函数）
    update: callback,

    // 在包含指令的组件的 VNode 更新后调用，并且其子组件的 VNode 已更新。
    componentUpdated: callback,

    // 在指令从元素上解除绑定时调用，只会调用一次。
    unbind: callback,
};

/**
 * 指令钩子函数参数
 * 除了 el 之外的其他参数，都应该是只读的，并且永远不要去修改它们。
 * 
 * 如果你需要通过钩子函数共享信息数据，推荐通过元素的 dataset 来实现（https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset）
 */
const callback = (el, binding, vnode, oldVnode) => {
    // @param el: 指令绑定的元素。可以用于直接操作 DOM。

    // @param binding: 一个对象，包含以下属性
    binding = {
        name: '',       // 指令的名称，不包括 v- 前缀
        value: '',      // 向指令传入的值。例如，在 v-my-directive="1 + 1" 中，传入的值是 2
        oldVale: '',    // 之前的值，只在 update 和 componentUpdated 钩子函数中可用。无论值是否发生变化，都可以使用。
        expression: '', // 指令绑定的表达式(expression)，以字符串格式。例如，在 v-my-directive="1 + 1" 中，表达式是 "1 + 1"
        arg: '',        // 向指令传入的参数，如果有的话。例如，在 v-my-directive:foo 中，参数是 "foo"
        modifiers: '',  // 一个对象，包含修饰符，如果有的话。例如，在 v-my-directive.foo.bar 中，修饰符是 { foo: true, bar: true }
    };

    // @param vnode：由 Vue 编译器(Vue’s compiler)生成的虚拟 Node 节点(virtual node)

    // @param oldVnode: 之前的虚拟 Node 节点(virtual node)，只在 update 和 componentUpdated 钩子函数中可用。
};

// 注册一个名为 `v-focus` 的全局自定义指令，使用：<input v-focus />
Vue.directive('focus', hooks);

// 注册局部指令，也可以通过设置组件的 directives 选项：
directives: {
    focus: hooks
}
