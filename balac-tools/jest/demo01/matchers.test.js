/**
 * using matchers
 * https://jestjs.io/docs/zh-Hans/expect
 */
const sum = require('./sum.js')

test('普通匹配器：adds 1 + 2 to equal 3', () => {
	expect(sum(1, 2)).toBe(3)
})

test('toEqual 递归检查对象或数组的每个字段：object assignment', () => {
	let data = { one: 1 }
	data['two'] = 2
	expect(data).toEqual({ one: 1, two: 2})
})

test('测试相反的匹配器：adding positive numbers is not zero', () => {
	for (let a = 1; a < 10; a++) {
		for (let b = 1; b < 10; b++) {
			expect(a + b).not.toBe(0)
		}
	}
})

test('Truthiness：测试中区分 undefined、null、false 匹配器', () => {
	const n = null
	expect(n).toBeNull()		// toBeNull 只匹配 null
	expect(n).toBeDefined()		// toBeDefined 只匹配 undefined
	expect(n).not.toBeUndefined() 	// toBeDefined 与 toBeUndefined 相反
	expect(n).not.toBeTruthy()	// toBeTruthy 匹配任何 if 语句为真
	expect(n).toBeFalsy()		// toBeFalsy 匹配任何 if 语句为假
})

test('Thuthiness 报错例子：', () => {
	const n = 0
	expect(n).toBeNull()
	expect(n).toBeDefined()
	expect(n).not.toBeUndefined()
	expect(n).not.toBeTruthy()
	expect(n).toBeFalsy()
})

test('数字匹配器：', () => {
	const value = 2 + 2;
	expect(value).toBeGreaterThan(3);
	expect(value).toBeGreaterThanOrEqual(3.5);
	expect(value).toBeLessThan(5);
	expect(value).toBeLessThanOrEqual(4.5);

	// toBe and toEqual are equivalent for numbers
	expect(value).toBe(4);
	expect(value).toEqual(4);

	// 浮点数相加，不希望测试取决于一个小小的舍入误差
	expect(0.1 + 0.2).toBeCloseTo(0.3)
})

test('字符串-可以检查对具有 toMatch 正则表达式的字符串：', () => {
	expect('team').not.toMatch(/I/)
	expect('Christoph').toMatch(/stop/)
})

test('数组-可以检查数组是否包含特定子项使用 toContain', () => {
	const shoppingList = [
	  'diapers',
	  'kleenex',
	  'trash bags',
	  'paper towels',
	  'beer',
	];
	expect(shoppingList).toContain('beer')
})

function compileAndroidCode() {
  throw new ConfigError('you are using the wrong JDK');
}

test('例外-想要测试的特定函数抛出一个错误，在它调用时，使用 toThrow', () => {
	expect(compileAndroidCode).toThrow();
	expect(compileAndroidCode).toThrow(ConfigError);

	// You can also use the exact error message or a regexp
	expect(compileAndroidCode).toThrow('you are using the wrong JDK');
	expect(compileAndroidCode).toThrow(/JDK/);
})
