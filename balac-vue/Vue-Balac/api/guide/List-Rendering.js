列表渲染 List Rendering


<li v-for="item in items"></li>

v-for="(item, index) in items"   // 可选的第二参数为当前项的索引

v-for=" (value, key, index) in object"  // 对象的迭代。值、键名、索引

v-for=" item of items"          // of 替代 in 作为分隔符

Template-for                    // <template> 标签的 v-for，<template v-for="item in items"></template>

v-for=" n in 10 "               // 整数的迭代，会重复多次模板
