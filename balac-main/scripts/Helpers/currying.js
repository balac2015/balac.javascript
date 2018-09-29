'use strict';

function helper (fn) {
    const _arg1 = Array.prototype.slice.call(arguments, 1);

    return function () {
        const _arg2 = Array.prototype.slice.call(arguments, 1);

        return fn.call(this, _arg1.concat(_arg2));
    };
}

function currying (fn, len) {
    const length = len || fn.length;

    return function () {

        if (arguments.length >= length) {
            return fn.apply(this, arguments);
        } else {
            let argsNeedFulfilled = [fn].concat(Array.prototype.slice.call(arguments));

            return currying(helper.apply(this, argsNeedFulfilled), length - arguments.length);
        }
    };
}

function crazy (fn, length = fn.length, args = [], holes = []) {
    var _ = {};

    return function () {
        const _args = args.slice(),
            _holes = holes.slice();


    };
}
