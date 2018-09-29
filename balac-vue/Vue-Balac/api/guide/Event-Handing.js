事件处理器 Even Handing


// 监听事件
v-on:click=" counter += 1 "     // v-on 监听 DOM 事件
v-on:click=" handler "
v-on:click=" say('hi') "

var example2 = new Vue({
    el: '#example-2',
    methods: {
        handler: function() {}
    }
})
example2.handler()              // 直接调用

// 事件修饰符
<a v-on:click.stop=" doThis "></a>                  // 阻止单击事件冒泡

<form v-on:submit.prevent=" onSubmit "></form>      // 提交事件不再重载页面

<a v-on:click.stop.prevent=" doThat "></a>          // 串联修饰符

<form v-on:submit.prevent></form>                   // 只有修饰符

<div v-on:click.capture=" doThis "></div>           // 添加事件侦听器时使用事件捕获模式

<div v-on:click.self=" doThat "></div>              // 只当事件在该元素本身（而不是子元素）触发时触发回调

<input v-on:keyup.13=" submit " />                  // 按键修饰符，只有在 keyCode 是 13 时调用 vm.submit()

    v-on:key.enter=""   // 按键别名：.enter, .tab, .delete, .esc, .space, .up, .down, .left, .right

    Vue.config.keyCodes.f1 = 112    // config.keyCodes 对象自定义按键修饰符别名

    .ctrl, .alt, .shift, .meta      // 鼠标事件修饰符
