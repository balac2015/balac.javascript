模板语法：

    文本插值：v-text, {{}}, v-once, v-html

        <span v-text=" msg "></span>        // 绑定数据
        {{}}                                // 纯文本绑定，单向，随 vm 变化而变化
        <span v-once>{{ msg }}</span>       // 纯文本，单次，不跟随 vm 变化 
        <span v-html=" msg "></span>        // 不转义 html 标签，绑定 html

    
    属性绑定：v-bind

        <a v-bind:id=" msgId "></a>         // 简写 <a :id=" msg "></a>


    模板中的 JS：加减乘除、三元运算、方法调用

        {{ number + 1 }}    

        {{ ok ? 'YES' : 'NO' }}

        {{ message.split('').reverse().join('') }}

        <div v-bind:id=" 'list-' + id"></div>

    
    过滤器：| 对原始值进行处理

        <a :id=" msgId | formatId "></a>    // 属性绑定 

        {{ msg | filterA | filterB }}       // 串联

        {{ msg | filterA(arg1, arg2) }}     // 可接收参数


    指令：v- 前缀，当其表达式的值改变时相应地将某些行为应用到 DOM 上

        v-bind, v-for, v-html, v-on, v-if 

        <a v-bind:href=" url "></a> 缩写 <a :href=" url "></a>
        
        <a v-on:click=" doSomething "></a> 缩写 <a @click=" doSomething "></a>