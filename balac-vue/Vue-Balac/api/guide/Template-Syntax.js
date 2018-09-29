模板语法 Template Syntax


插值：

	{{ msg }}		Mustache 语法

	<span v-once>{{ msg }}</span>	一次性插值，会影响到该节点上所有的数据绑定：/

	v-html=" rawHtml "				纯 HTML 

	v-bind:id=" dynamicId "			属性

	{{ msg.split('').reverse().join('') }}		使用 javascript 表达式


指令：

	v-if=" seen "	指令的职责就是当其表达式的值改变时相应地将某些行为应用到 DOM 上

	参数：

		v-bind:href=" url "

		v-on:click=" doSomething "

	修饰符 modifiers

		v-on:submit.prevent=" onSubmit "

	过滤器：

		v-bind:id=" rawId | formatId "  过滤器设计目的就是用于文本转换。为了在其他指令中实现更复杂的数据变换，你应该使用计算属性。

		        {{ msg | capitalize | filterB }}

		        {{ msg | filterA('arg1', arg2) }}

缩写

    v-bind:href=" url " 缩写为 :href=" url "

    v-on:click=" doSomething " 缩写为 @click=" doSomething "


// 过滤函数 
new Vue({
	// ...
	.filter: {
		capitalize: function( value ) {
			if (!value) {
				return '';
			}
			value = value.toString();

			return value.chatAt(0).toUpperCase() + value.slice(1);
		}
	}
})