vue的内部原理部分：变化侦测，模板编译，virtualDOM，整体运行流程等。

侦测变化：Object.defineProperty、ES6 的 proxy。

getter中，收集依赖，setter中，触发依赖。

1、收集在哪？ dep.target, 1-1.js

2、收集谁？当属性变化后，通知使用数据的地方（模板、watch）