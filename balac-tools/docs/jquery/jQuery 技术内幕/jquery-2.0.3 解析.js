// jQuery 2.0.3 �������� AMD �淶
// ����ܹ�

$().find().css();
$().hide().html().css().on();
/*
* �ɿ��������⣺����Ĺ�����ʽ�������ĵ��÷�ʽ
* ���� 1���� new ����
* */
// ����ʹ�ù��캯��
var oQuery = function (selector, context) {
    // ���캯��
    // return new oQuery(); ���γ���ѭ��
}
oQuery.prototype = {
    // ԭ��
    name: function(){},
    age: function(){}
};
var o = new oQuery();
o.name();

//
var oQuery = function (selector, context) {
    return oQuery.prototype.init();
    // return new oQuery.prototype.init(); ��ʱ������ oQuery().name() ���״�
}
oQuery.prototype = {
    init: function () {
        this.age = 18;
        return this;        // init() ָ��ԭ�Ͷ���
    },
    name: function () {},
    age: 20
};
oQuery().age;       // 18

// jQuery ����
var jQuery = function ( selector, context ) {
    return new jQuery.fn.init( selector, context, rootjQuery );
};

// ��ô��ô����jQuery��ԭ���ϵ������뷽�����������ܸ�����������ʹ��jQueryԭ�Ͷ�����������أ������ڷ���ʵ���з���jQuery��ԭ�Ͷ���?
// �ؼ��㣺
jQuery.fn.init.prototype = jQuery.fn;

//
var oQuery = function (selector, context) {
    return new oQuery.prototype.init();
}
oQuery.prototype = {
    init: function () {
        return this;        // init() ָ��ԭ�Ͷ���
    },
    name: function () {
        return this.age;
    },
    age: 20
};
oQuery.prototype.init.prototype = oQuery.prototype;
oQuery().name();

/*
* ���� 2����ʽ����
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
 * ���� 3������ӿ�
 * jQuery.extend �� jQuery ��������Ժͷ�����������չ�����ƻ� jQuery ԭ�ͽṹ��������չ
 * */























































