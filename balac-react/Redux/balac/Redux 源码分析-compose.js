其作用是把一系列的函数，组装生成一个新的函数，并且从后到前，后面参数的执行结果作为其前一个的参数。

compose(f, g, h) ---- (...args) => f(g(h(...args)))

const fn1 = variable => 'fn1-' + variable
const fn2 = variable => 'fn2-' + variable
const fn3 = variable => 'fn3-' + variable
compose(fn1, fn2, fn3)('测试')    // 先执行 fn3 后结果传给 fn2，结果："fn1-fn2-fn3-测试"

=====================================================================================
rest 参数（http://es6.ruanyifeng.com/#docs/function#rest-%E5%8F%82%E6%95%B0）

    形式为...变量名,用于获取函数的多余参数 ，该变量将多余的参数放入数组中,　只能是参数的最后一个。

    // sortNumbers.length 函数的 length属性，不包括 rest 参数
    function sortNumbers(...numbers) {  // rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
        // arguments 变量，类数组
        // return Array.prototype.slice.call(arguments).sort()

        // rest 参数，数组
        return numbers.sort()
    }

扩展运算符（http://es6.ruanyifeng.com/#docs/array#%E5%90%AB%E4%B9%89）

    扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

    console.log(1, ...[2, 3, 4], 5) => 1 2 3 4 5

    [...document.querySelectorAll('div')] => [<div>, <div>, <div>]
