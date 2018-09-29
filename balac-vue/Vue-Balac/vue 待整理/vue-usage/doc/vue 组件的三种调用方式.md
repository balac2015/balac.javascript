vue 三种方式调用组件：（查看ElementUI 源码）

    v-model 或者 .sync 显示控制组件显示隐藏。如 component/Icon

        先全局注册：Vue.component(Icon.name, Icon)

        标签方式使用：<icon></icon>

    通过 js 代码调用。如 Notice

        Vue.prototype.$test = test;

        this.$test()

    通过 vue 指令器调用。如 Loading

        Vue.use(Loading.directive); 可通过指令器方式使用

        Vue.prototype.$loading = Loading.service; 使用 this.$loading 方式使用