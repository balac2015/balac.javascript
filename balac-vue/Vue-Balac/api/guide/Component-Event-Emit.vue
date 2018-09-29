<title>自定义事件：v-on 绑定</title>
<script src="d://balac/libs/vue/dist/vue.js"></script>


<div id="counter-event-example">
    <p>{{ total }}</p>

    <!-- 父组件中用 v-on 监听子组件触发的事件 -->
    <button-counter v-on:increment="incrementTotal"></button-counter>
    <button-counter v-on:increment="incrementTotal"></button-counter>

</div>


<script>

    // 定义子组件
    // 子组件已经和它外部完全解耦了。它所做的只是触发一个父组件关心的内部事件。
    Vue.component('button-counter', {
        template: '<button v-on:click="increment">{{ counter }}</button>',
        data: function() {
            return {
                counter: 0
            }
        },
        methods: {
            increment: function() {
                this.counter += 1;
                this.$emit('increment');
            }
        }
    })

    // 实例
    new Vue({
        el: '#counter-event-example',
        data: {
            total: 0
        },
        methods: {
            incrementTotal: function() {
                this.total += 1
            }
        }
    })

</script>