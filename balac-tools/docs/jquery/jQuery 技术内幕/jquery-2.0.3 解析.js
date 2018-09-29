// jQuery 2.0.3 ，加入了 AMD 规范
// 整体架构

$().find().css();
$().hide().html().css().on();
/*
* 可看出的问题：对象的构建方式、方法的调用方式
* 分析 1、无 new 构建
* */
// 常规使用构造函数
var oQuery = function (selector, context) {
    // 构造函数
    // return new oQuery(); 会形成死循环
}
oQuery.prototype = {
    // 原型
    name: function(){},
    age: function(){}
};
var o = new oQuery();
o.name();

//
var oQuery = function (selector, context) {
    return oQuery.prototype.init();
    // return new oQuery.prototype.init(); 此时，调用 oQuery().name() 会抛错
}
oQuery.prototype = {
    init: function () {
        this.age = 18;
        return this;        // init() 指向原型对象
    },
    name: function () {},
    age: 20
};
oQuery().age;       // 18

// jQuery 定义
var jQuery = function ( selector, context ) {
    return new jQuery.fn.init( selector, context, rootjQuery );
};

// 怎么怎么访问jQuery类原型上的属性与方法？做到既能隔离作用域还能使用jQuery原型对象的作用域呢，还能在返回实例中访问jQuery的原型对象?
// 关键点：
jQuery.fn.init.prototype = jQuery.fn;

//
var oQuery = function (selector, context) {
    return new oQuery.prototype.init();
}
oQuery.prototype = {
    init: function () {
        return this;        // init() 指向原型对象
    },
    name: function () {
        return this.age;
    },
    age: 20
};
oQuery.prototype.init.prototype = oQuery.prototype;
oQuery().name();

/*
* 分析 2、链式调用
* */
oQuery.ptototype = {
    init: function() {
        return this;
    },
    name: function() {
        return this;
    }
};
oQuery.init().name();

/*
 * 分析 3、插件接口
 * jQuery.extend 对 jQuery 本身的属性和方法进行了扩展，不破坏 jQuery 原型结构而快速扩展
 * */























































