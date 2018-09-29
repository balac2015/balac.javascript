// dom 相关操作
function QuerySelector (selector) {
    if (typeof selector === 'object') {
        return selector;
    }
    var type = selector.substring(0, 1);

    if (type === '#') {

        return document.querySelector
            ? document.querySelector(selector)
            : document.getElementById(selector.substring(1));
    } else if (type === '.') {

        return document.querySelectorAll
            ? document.querySelectorAll(selector)
            : document.getElementByClassName(selector.substring(1));
    } else {

        return document['querySelectorAll' || 'getElementByTagName'](selector);
    }
}

QuerySelector.prototype = {
    hasClass: function (name) {
        return this.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
    },
    addClass: function (name) {
        !this.hasClass(name) && this.className += ' ' + name;

        return this;
    },
    removeClass: function (name) {
        if (this.hasClass(name)) {
            var reg = new RegExp('(\\s|^)' + name + '(\\s|$)');
            this.className = this.className.replace(reg, '');
        }
        return this;
    },
    replaceClass: function (newName, oldName) {
        return this.removeClass(newName).addClass(oldName);
    },
    // 获取行间样式属性
    getByStyle: function (name) {
        if (this.currentStyle) {
            this.currentStyle[name]
        } else {
            getComputedStyle(this, false)[name];
        }
        return this;
    },
    // 获取兄弟元素节点
    siblings: function () {
        var childs = this.parentNode.children,
            siblingsNode = [];

        for (var i = 0; i < childs.length; i++) {
            if (childs[i] !== ele) {
                siblingsNode.push(childs[i]);
            }
        }

        return siblingsNode;
    }
};
