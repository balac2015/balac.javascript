/**
 * Vue 实例
 * Vue 实例，实则也就是 ViewModel（数据 + 函数），都是通过构造函数 Vue 创建
 */
var vm = new Vue({
    name: 'root',

    // 数据
    data: { a: 1 },         // 数据，{Object / Function} 类型根实例为 Object、组件中为 Function
    props: [],              // {Object / Array} 设置负组件传递给子组件的数据限制
    computed: {},           // 计算属性
    watch: {},              // 监控属性
    methods: {},            // 事件操作

    // 资源
    directives: {},         // 内部指令
    filters: {},            // 内部过滤器
    components: {},         // 内部组件

    // 生命周期：实例创建 -> 编译挂载 -> 组件更新 -> 销毁
    beforeCreate () {},     // 实例创建 
    created () {},          // 实例创建完成，属性已绑定。（可以操作 data，但未生成 DOM（未挂载）发起异步请求，初始化组件数据 data）
    beforeMount () {},      // 模板编译、挂载之前
    mounted () {},          // 模板编译、挂载之后。（已生成 DOM 到 document 中，可访问 this.$el 属性）
    beforeUpdate () {},     // 组件更新之前
    updated () {},          // 组件更新之后。（操作 DOM $('#box1') ）
    activated () {},        // 组件被激活时（for keep-alive 组件）
    deactivated () {},      // 组件被移除时（for keep-alive 组件） 
    beforeDestroy () {},    // 组件销毁之前（解除事件绑定，销毁非Vue组件实例等 如：this.$off('event1') select2.destory()）
    destoryed () {}         // 组件销毁之后

});