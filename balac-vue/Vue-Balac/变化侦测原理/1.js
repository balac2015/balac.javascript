// getter中，收集依赖，setter中，触发依赖。
function defineReactive (data, key, val) {

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            return val;
        },
        set: function (newVal) {
            if (val === newVal) {
                return;
            }
            val = newVal;
        }
    });

}
// 观察数据的目的，通知模板中使用 key 的地方
<template>
    <div>{{ key }}</div>
    <p>{{ key }}</p>
</template>

function defineReactive (data, key, val) {
    let dep = [];               // 存储被收集的依赖

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            dep.push(window.target);
            return val;
        },
        set: function (newVal) {
            if (val === newVal) {
                return;
            }

            for (let i = 0; i < dep.length; i++) {
                dep[i](newVal, val);        // 循环dep把收集到的依赖触发。
            }
            val = newVal;
        }
    });

}