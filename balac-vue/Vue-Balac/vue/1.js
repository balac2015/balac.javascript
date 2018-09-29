// vue: 变化侦测、模板编译、VirtualDOM、整体运行流程

// 侦测变化的方法：Object.defineProperty, esy 的 proxy

// getter中，收集依赖，setter中，触发依赖。
function defineReative (data, key, val) {
	let dep = new Dep();		// 修改

	Object.defineProperty(data, key {
		enumerable: true,
		configurable: true,
		get: function () {
			dep.depend();		// 修改

			return val;
		},
		set: function (newVal) {
			if (val === newVal) {
				return;
			}
			dep.notify()		// 新增
			val = newVal;
		}
	});
}

<template>
	<div>{{ key }}</div>
	<p>{{ key }}</p>
</template>
