/**
 * 测试异步代码 testing asynchronous code
 * callback
 * .resolves / .rejects
 * async / await
 */

function fetchData (callback) {
	setTimeout(callback, 800, 'peanut butter')
}

test('回调的异步模式：', done => {
	function callback(data) {
		expect(data).toBe('peanut butter')
		// 如果 done()永远不会调用，这个测试将失败
		done()
	}
	fetchData(callback)
})

function promiseData() {
	return new Promise(resolve, reject)
}

test('Promises 的异步模式：', () => {
	// 确保添加 expect.assertions 来验证一定数量的断言被调用，否则一个fulfilled态的 Promise 不会让测试失败
	// expect.assertions(1)

	// 如果省略 return 语句，测试将在 fetchData 完成之前完成。

	return promiseData().then(data => {
		expect(data).toBe('peanut butter')
	})

	// promise 被拒绝
	return promiseData().catch(e => expect(e).toMatch('error'))

	// .resolves 匹配器
	return expect(promiseData()).resolves.toBe('peanut butter')

	// .rejects 匹配器
	return expect(promiseData()).rejects.toMatch('error')
})

test('await/async', async () => {
	expect.assertions(1)

	const data = await fetchData()
	expect(data).toBe('peanut butter')

	// with error
	// try {
	// 	await fetchData()
	// } catch (e) {
	// 	expect(e).toMatch('error')
	// }
})

test('async/await + .resolves/.rejects', async () => {
	expect.assertions(1)
	await expect(fetchData()).resolves.toBe('peanut butter')

	// error
	// await expect(fetchData()).rejects.toMatch('error')
})