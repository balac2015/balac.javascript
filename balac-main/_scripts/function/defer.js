/**
 * Defers invoking the `func` until the current call stack has cleared. Any
 * additional arguments are provided to `func` when it's invoked.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to defer.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * defer(text => console.log(text), 'deferred')
 * // => Logs 'deferred' after one millisecond.
 */
/**
 * 推迟调用 func，直到当前堆栈清理完毕。 调用时，任何附加的参数会传给func。
 * @param { Function } func, 要延迟的函数。
 * @param { * } [args], 会在调用时传给 func 的参数。
 * @returns { Number }, 返回计时器的 id
 */
function defer (func, ...args) {

	if (typeof func !== 'function') {

		throw new TypeError('Expected a function');
	}

	return setTimeout(func, 1, ...args);
}

export default defer;