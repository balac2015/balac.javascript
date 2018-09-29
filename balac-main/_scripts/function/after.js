/**
 * The opposite of `before`. This method creates a function that invokes
 * `func` once it's called `n` or more times.
 *
 * @since 0.1.0
 * @category Function
 * @param {number} n The number of calls before `func` is invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * const saves = ['profile', 'settings']
 * const done = after(saves.length, () => console.log('done saving!'))
 *
 * forEach(saves, type => asyncSave({ 'type': type, 'complete': done }))
 * // => Logs 'done saving!' after the two async saves have completed.
 */
/**
 * 被调用 n 或更多次之后马上触发 func
 * @param {Number} n, func 方法应该在调用多少次后才执行。
 * @param {Function} func, 用来限定的函数。
 * @returns {Function} 返回新的限定函数。
 * @example 
 *
 * var origin = function () { return Array.prototype.slice.call(arguments).join(); };
 * for (var i = 0; i < 5; i++) { console.log( origin(i) ); }
 */
function after (n, func) {

	if (typeof func !== 'function') {

		throw new TypeError('Expected a function');
	}

	return function (...args) {

		if (--n < 1) {

			return func.apply(this, args);
		}
	};
}

export default after;