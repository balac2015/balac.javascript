/**
 * Invokes `func` after `wait` milliseconds. Any additional arguments are
 * provided to `func` when it's invoked.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * delay(text => console.log(text), 1000, 'later')
 * // => Logs 'later' after one second.
 */
/**
 * 延迟 wait 毫秒后调用 func。 调用时，任何附加的参数会传给func。
 * @param { Function } func, 要延迟的函数。
 * @param { Number } wait, 要延迟的毫秒数。
 * @param { * } [args], 会在调用时传给 func 的参数。
 * @returns { Number }, 返回计时器的 id
 */
function delay (func, wait, ...args) {

	if (typeof func !== 'function') {

		throw new TypeError('Expected a function');
	}

	return setTimeout(func, +wait || 0, ...args);
}

export default delay;