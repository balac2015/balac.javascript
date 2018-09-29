Form Input Bindings


<input v-model=" message " placeholder="edit me">                          // 单行文本

<textarea v-model=" multiline " placeholder="add mutiple lines"></textarea>// 多行文本

<input type="checkbox" id="checkbox" v-model="checkbox">                   // 单个复选框
<label for="checkbox">{{ checkbox }}</label>

<input type="checkbox" id="jack" value="jack" v-model="checkedNames">     // 多个复选框
<label for="jack">jack</label>
<input type="checkbox" id="john" value="john" v-model="checkedNames">
<label for="john">john</label>
<input type="checkbox" id="mike" value="mike" v-model="checkedNames">
<label for="mike">mike</label>
<span>选中的值：{{ checkedNames }}</span>                                  // checkedName 初始值为 []

<input type="radio" id="one" value="one" v-model="picked">               // 单选按钮
<label for="one">one</label>
<br>
<input type="radio" id="two" value="two" v-model="picked">
<label for="two">two</label>
<br>
<span>选中的：{{ picked }}</span>                                          // picked 可以没有初始值

<select v-model=" selected ">                                             // 多选列表
    <option>A</option>
    <option>B</option>
    <option>C</option>
</select>
<span>Selected: {{ selected }}</span>

<select v-model=" selected " multiple>                                  // 多选列表（绑定到一个数组）
    <option>A</option>
    <option>B</option>
    <option>C</option>
</select>
<span>Selected: {{ selected }}</span>

<select v-model=" selected ">                                           // 动态选项，v-for 渲染
    <option v-for=" option in options " v-bind:value=" option.value ">
        {{ option.text }}
    </option>
</select>
<span>Selected: {{ selected }}</span>
data: {
    selected: 'A',
    options: [
        { text: 'one', value: 'A' },
        { text: 'two', value: 'B' },
        { text: 'three', value: 'C' }
    ]
}


// 单选按钮绑定 value
<input type="radio" v-model=" picked " value="a">       // 当选中时 picked 值为 "a"

<input type="checkbox " v-model=" toggle ">             // toggle 为 true 或 false

<select v-model=" selected ">                           // 当选中时，selected 值为 "abc"
    <option value=" abc ">ABC</option>
</select>

<input type="radio" v-model=" pick " v-bind:value=" a ">// 当选中时 vm.pick === vm.a

// 复选框绑定 value
<input type="checkbox" v-model=" toggle "
       v-bind:true-value="a"
       v-bind:false-value="b">                          // 当没选中时，vm.toggle === vm.b，当选中时 vm.toggle === vm.a

// 选择列表设置
<select v-model=" selected ">
    <option v-bind:value=" { number: 123 } ">123</option>
</select>                                               // 当选中时：typeof vm.selected 为 'object'，vm.selected.number 为 123


// 修饰符
v-model.lazy=" msg "                  // 在 "change" 而不是 "input" 事件中更新（默认下v-model 在 input 事件中同步输入框的值与数据）

v-model.number=" age " type="number" // 自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值）

v-model.trim=" msg "                  // 自动过滤用户输入的首尾空格