<title>自定义事件：使用自定义事件的表单输入组件</title>
<script src="d://balac/libs/vue/dist/vue.js"></script>


<div id="v-model-example">
    <p>{{ message }}</p>

    <my-input label="Message" v-model="message"></my-input>
</div>


<script>

    Vue.component('my-input', {
        template: '\
            <div class="form-group">\
                <label v-bind:for="randomId">{{ label }}:</label>\
                <input v-bind:id="randomId" v-bind:value="value" v-on:input="onInput">\
            </div>\
        ',
        props: ['value', 'label'],
        data: function() {
            return {
                randomId: 'input-' + Math.random()
            }
        },
        methods: {
            onInput: function(event) {
                this.$emit('input', event.target.value)
            }
        }
    })

    new Vue({
        el: '#v-model-example',
        data: {
            message: '绑定在自定义 input 中的字段'
        }
    })

</script>