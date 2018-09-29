<title>计算属性 Computed Properties and Watchers</title>
<script src="d://balac/libs/vue/dist/vue.js"></script>

<!-- Since there is already a rich ecosystem of ajax libraries    -->
<!-- and collections of general-purpose utility methods, Vue core -->
<!-- is able to remain small by not reinventing them. This also   -->
<!-- gives you the freedom to just use what you're familiar with. -->
<script src="https://unpkg.com/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://unpkg.com/lodash@4.13.1/lodash.min.js"></script>


<div id="example">
    <p>在模板中放入太多的逻辑会让模板过重且难以维护：{{ message.split('').reverse().join('') }}</p>
    <p>Original message: "{{ message }}"</p>
    <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>

<div id="watch-example">
    <p>
        ask a yes/no question:<input v-model="question">
    </p>
    <p>{{ answer }}</p>
</div>


<script>

var vm = new Vue({
    el: '#example',
    data: {
        message: 'Hello'
    },
    // 计算属性基于依赖缓存（计算属性只有在它的相关依赖发生改变时才会重新取值）
    computed: {
        // a computed getter（计算属性默认只有 getter ）
        reversedMessage: function() {
            // this points to the vm instance
            return this.message.split('').reverse().join('')
        },

        // Date.now() 不响应依赖，now 值将不会更新
        now: function() {
            return Date.now()
        },

        // 计算属性的 setter，现在在运行 vm.fullName = 'John Doe' 时， setter 会被调用， vm.firstName 和 vm.lastName 也会被对应更新。
        fullName: {
            // getter
            get: function() {
                return this.firstName + ' ' + this.lastName
            },

            // setter
            set: function(newValue) {
                var names = newValue.split('');
                this.firstName = names[0]
                this.lastName = names[1]
            }
        }
    },
    // methods 调用总会执行函数，没有缓存
    methods: {
        // 也可实现 reversedMessage() ，单不会有缓存
    }
});

// 观察 Watchers 当你想要在数据变化响应时，执行异步操作或昂贵操作时
var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
    },
    watch: {
        // 如果 question 发生改变，这个函数就会运行
        question: function(newQuestion) {
            this.answer = 'Waiting for you to stop typing...';
            this.getAnswer();
        }
    },
    methods: {
        // _.debounce 是一个通过 lodash 限制操作频率的函数。
        // 在这个例子中，我们希望限制访问yesno.wtf/api的频率
        // ajax请求直到用户输入完毕才会发出
        // 学习更多关于 _.debounce function (and its cousin
        // _.throttle), 参考: https://lodash.com/docs#debounce
        getAnswer: _.debounce(
            function () {
                var vm = this
                if (this.question.indexOf('?') === -1) {
                    vm.answer = 'Questions usually contain a question mark. ;-)'
                    return
                }
                vm.answer = 'Thinking...'
                axios.get('https://yesno.wtf/api')
                    .then(function (response) {
                        vm.answer = _.capitalize(response.data.answer)
                    })
                    .catch(function (error) {
                        vm.answer = 'Error! Could not reach the API. ' + error
                    })
            },
            // 这是我们为用户停止输入等待的毫秒数
            500
        )
    }
});

</script>