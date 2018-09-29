// 1.compose
export default function compose(...funcs) {

    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => a(b(args)))
}

/**
 * 1.compose
 *
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function. 从右到左构成单参数函数。最右边函数可以使用多个参数，因为它提供了签名得到的复合函数。
 *
 * @param {...Function} funcs The functions to compose. funcs要编写的函数。
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))). 通过组合参数函数获得的函数从右到左。例如，撰写（f，g，h）与完成相同
 */
