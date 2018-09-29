/* @flow */

/**
 * Convert a value to a string that is actually rendered.
 */
// 这个函数可以将任意类型的值转为字符串
export function _toString (val: any): string {
	return val === null
	 	// 如果是null就返回空字符串
		? ''
		: typeof val === 'object'
			// 如果是object就转成json
      		// 这里比较特殊的是在调用stringify时除了要转换的值，还多传了两个参数，其中第二个参数用来过滤数据，第三个参数用来控制内容的缩进
			? JSON.stringify(val, null, 2)
			// 其他的都是用String来转换为字符串，其实跟调用对象的toString是一样的吧？
			: String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
// 将传入的值转换为浮点数，如果转换失败就返回传入值 
export function toNumber (val: string): number | string {
	// 浮点数没加 ",10" ，不知道是不是个隐藏的问题
	const n = parseFloat(val)
	return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
// 这个函数比较有意思，功能有点儿像集合（Set）对象，但是只能存储字符串，最后用来判断值是否已经存在
// 貌似是用来快速检索某个值是否存在用的 
export function makeMap (
	str: string,
	expectsLowerCase?: boolean
): (key: string) => true | void {
	const map = Object.create(null)
	const list: Array<string> = str.split(',')

	for (let i = 0; i < list.length; i++) {
		map[list[i]] = true
	}

	return expectsLowerCase
		? val => map[val.toLowerCase()]
		: val => map[val]
}

/**
 * Check if a tag is a built-in tag.
 */
// 生成一个用来检索是否是内置标签的函数，用到了之前的makeMap方法 
export const isBuiltInTag = makeMap('slot,component', true)

/**
 * Remove an item from an array
 */
// 一个工具方法，用来删除数组中匹配到的对象 
export function remove (arr: Array<any>, item: any): Array<any> | void {

	if (arr.length) {
		const index = arr.indexOf(item)

		if (index > -1) {
			return arr.splice(index, 1)
		}
	}
}

/**
 * Check whether the object has the property.
 */
// 对Object.prototype.hasOwnProperty的封装，用来判断对象的属性是否是继承自原型的
// 顺便复习下instanceof和typeof
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof
// 除了三者作用的区别以外，需要注意的是，hasOwnProperty是函数，instanceof和typeof是运算符
// 其实MDN上写的instanceof是运算符，typeof是操作符，特意查了一下，在英语中操作符和运算符都叫operator，应该可以认为是一个东西吧
// 与函数的区别在于，一个是符号，一个是有名称的，另外，函数有明确定义的参数表，符号没有
// 当然，从广义来上来看，任何一个运算符都可看做是一个函数，而它的运算数可看做参数 
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj: Object, key: string): boolean {
	return hasOwnProperty.call(obj, key)
}

/**
 * Check if value is primitive
 */
// 判断一个值是否是基础类型？字面上看primitive是原始的意思……
// 总之就是判断传入的参数是否是数字或者字符串 
export function isPrimitive (value: any): boolean {
	return typeof value === 'string' || typeof value === 'number'
}

/**
 * Create a cached version of a pure function.
 */
// 生成一个带缓存的纯函数
// 就是会把每次函数执行的结果缓存起来
// 根据纯函数的定义，传入同样的参数值，函数总是求出同样的结果，这样处理之后可以大幅提升函数的运算速度 
export function cached<F: Function> (fn: F): F {
	// 定义缓存对象
	const cache = Object.create(null)

	return (function cachedFn (str: string) {
		// 根据传入的参数取缓存
		const hit = cache[str]

		// 检查缓存是否存在，如果存在就直接返回缓存，缓存不存在就运行函数缓存结果
		return hit || (cache[str] = fn(str))
	}: any)
} 

/**
 * Camelize a hyphen-delimited string.
 */
// 将破折号分割的命名修改为驼峰命名
// 感觉是在解析模板时，将tag name转换为 class name用的 
const camelizeRE = /-(\w)/g 
export const camelize = cached((str: string): string => {
	return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

/**
 * Capitalize a string.
 */
// 将字符串首字母转换为大写的函数
// 估计是跟camelize配合一起使用的吧
// 最后的效果就是：<my-component> ==> MyComponent 
export const capitalize = cached((str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}) 

/**
 * Hyphenate a camelCase string.
 */
// 将驼峰命名再改回中划线命名……(￣.￣)
// 效果类似于：ABCD => a-b-c-d 
const hyphenateRE = /([^-])([A-Z])/g 
export const hyphenate cached((str: string): string => {
	return str
		// 这里要调用两次replace是因为，如果是 ABCD 这种包含三个连续大写字母的字符串，
	    // 只replace一次会变成A-BC-D这样，需要再replace一次……
		.replace(hyphenateRE, '$1-$2')
		.replace(hyphenateRE, '$1-$2')
		.toLowerCase()
}) 

/**
 * Simple bind, faster than native
 */
// 简单实现的bind方法，源码的注释中说比原生的bind快 
export function bind (fn: Function, ctx: Object): Function {
	function boundFn (a) {
		const l: number = arguments.length
		return l
			? l > 1
				? fn.apply(ctx, arguments)
				: fn.call(ctx, a)
			: fn.call(ctx)
	}
	// 记录原始函数的参数个数
	boundFn._length = fn.length
	return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
// 将类数组对象转化为一个数组，其实这个操作挺常见的，但是这样用循环处理貌似效率低呢
// 测试了一下使用Array.prototype上的方法来做转换会快100倍……
// 不知道为啥不用…… 
export function toArray (list: any, start?: number): Array<any> {
	start = start || 0
	let i = list.length - start
	const ret: Array<any> = new Array(i)
	while (i--) {
		ret[i] = list[i + start]
	}
	return ret
}

export function toArray (list: any, start?: number): Array<any> {
	start = start || 0
	const ret: Array<any> = [].concat(list)
	return ret.slice(start)
}

/**
 * Mix properties into target object.
 */
// 简单的浅拷贝，原来用的object.keys来取key，现在改成用循环了，估计用原生API效率低吧 
export function extend (to: Object, _from: ?Object): Object {
	for (const key in _from) {
		to[key] = _from[key]
	}
	return to
} 

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
// 超简单的对象检查…… 
export function isObject (obj: mixed): boolean {
	return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
// 使用Object.prototype.toString做的严格对象检查 
const toString = Object.prototype.toString
const OBJECT_STRING = '[object Object]'
export function isPlainObject (obj: any): boolean {
	return toString.call(obj) === OBJECT_STRING
}

/**
 * Merge an Array of Objects into a single Object.
 */
// 将一个元素都是对象的数组合并成一个对象……
// 貌似是用来将标签的属性合并为一个配置对象用的 
export function toObject (arr: Array<any>): Object {
	const res = {}
	for (let i = 0; i < arr.length; i++) {
		if (arr[i]) {
			extend(res, arr[i])
		}
	}
}
// 话说之前看到的使用reduce来遍历对象的方法，其实也能够使在这里的
// 比如这样
export function toObject (arr: Array<any>): Object {
	return arr.reduce((res, cur) => extend(res, cur), {})
}

/**
 * Perform no operation.
 */
// 不执行操作的空函数
// 抓要是为了兼容那些需要函数作为参数的函数，有没有可做的操作时用的 
export function noop () {}

/**
 * Always return false.
 */
// 永远返回false的函数，作用跟noop一样的 
export const no = () => false 

/**
 * Return same value
 */
// 返回传入的参数，同上，嗯…… 
export const identity = (_: any) => _

/**
 * Generate a static keys string from compiler modules.
 */
// 用来将模块数组转换出模块名的一个字符串……
// 这个方法也是用了reduce来做遍历赋值，使用这种方法还真是挺简洁的 
export function genStaticKeys (modules: Array<ModuleOptions>): string {
	return modules.reduce((keys, m) => {
		return keys.concat(m.staticKeys || [])
	}, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
// 简单比较两个对象是否一致，就是转成字符串然后比较字符串是否一致 
export function looseEqual (a: mixed, b: mixed): boolean {
	const isObjectA = isObject(a)
	const isObjectB = isObject(b)

	if (isObjectA && isObjectB) {
		return JSON.stringify(a) === JSON.stringify(b)
	} else if (!isObjectA && !isObjectB) {
		return String(a) === String(b)
	} else {
		return false
	}
}

// 使用了looseEqual的indexOf
// 话说这个判断方法的思想就是，只要有同样的结构，那么就是同样的对象
export function looseIndexOf (arr: Array<mixed>, val: mixed): number {
	for (let i = 0; i < arr.length; i++) {
		if (looseEqual(arr[i], val))
			return i
	}
	return -1
}

/**
 * Ensure a function is called only once.
 */
// 确保只调用一次函数 
export function once (fn: Function): Function {
	let called = false
	return () => {
		if (!called) {
			called = true
			fn()
		}
	}
}















