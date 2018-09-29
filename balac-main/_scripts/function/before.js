/**
 * Creates a function that invokes `func`, with the `this` binding and arguments
 * of the created function, while it's called less than `n` times. Subsequent
 * calls to the created function return the result of the last `func` invocation.
 *
 * @since 3.0.0
 * @category Function
 * @param {number} n The number of calls at which `func` is no longer invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * jQuery(element).on('click', before(5, addContactToList))
 * // => Allows adding up to 4 contacts to the list.
 */
/*
 * 创建一个调用 func 的函数，通过 this 绑定和创建函数的参数调用 func，调用次数不超过 n 次。 之后再调用这个函数，将返回一次最后调用 func 的结果。
 * @param { Number } n, 超过多少次不再调用func（愚人码头注：限制调用func 的次数）。
 * @param { Function } func, 限制执行的函数
 * @returns { Function } 返回新的限定函数
 */
function before (n, func) {
	let result;

	if (typeof func !== 'function') {

		throw new TypeError('Expected a function');
	}

	return function (...args) {

		if (--n > 0) {

			result = func.apply(this, args);
		}

		if (n <= 1) {
			func = undefined;
		}

		return result;
	};
}

export default before;