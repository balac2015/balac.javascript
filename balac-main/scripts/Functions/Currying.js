'use strict';
import React, { Component } from 'react';

export default class Currying extends Component {

    render () {

        return (
            <div>
                <h1>函数柯里化测试</h1>
                <p>{ showMsg('平常调用', 1, 1) }</p>
                <p>{ showMsgHelper('简单修改')(2, 2) }</p>
            </div>
        );
    }
}

// 1: showMsg('name', 'age', 'fruit');
var showMsg = function (name, age, fruit) {
    return '我的名字：' + name + '，我的年龄：' + age + '，我喜欢吃：' + fruit;
}

// 2: showMsgHelper('name')('age', 'fruit');
var showMsgHelper = function (name) {
    return function (age, fruit) {
        return '我的名字：' + name + '，我的年龄：' + age + '，我喜欢吃：' + fruit;
    };
}

// 3: helper(showMsg, 'name')('arg', 'fruit');
var helper = function (fn) {
    const _arg1 = Array.prototype.slice.call(arguments, 1);

    return function () {
        const _arg2 = Array.prototype.slice.call(arguments, 1);

        return fn.call(this, _arg1.concat(_arg2));
    };
};

// 4: currying(showMsg)('name', 'age')('fruit');、currying(showMsg)('name')('age')('fruit');
var currying = function (fn, len) {
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
