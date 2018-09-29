import Vue from 'vue'
const isServer = Vue.prototype.$isServer;
const ieVersion = isServer ? 0 : Number(document.documentMode);

const getStyle = ieVersion < 9 ?
	function (element, styleName) {
		if (isServer) return;
		if (!element || !styleName) return null;
		styleName = camelCase(styleName);
		if (styleName === 'float') {
			styleName = 'styleFloat';
		}
		try {
			switch (styleName) {
				case 'opacity':
					try {
						return element.filters.item('alpha').opacity / 100;
					} catch (e) {
						return 1.0;
					}
				default:
					return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
			}
		} catch (e) {
			return element.style[styleName];
		}
	} :
	function (element, styleName) {
		if (isServer) return;
		if (!element || !styleName) return null;
		styleName = camelCase(styleName);
		if (styleName === 'float') {
			styleName = 'cssFloat';
		}
		try {
			var computed = document.defaultView.getComputedStyle(element, '');
			return element.style[styleName] || computed ? computed[styleName] : null;
		} catch (e) {
			return element.style[styleName];
		}		
	}

/* istanbul ignore next */
const removeClass = (el, cls) => {
	if (!el || !cls) return;
	var classes = cls.split(' ');
	var curClass = ' ' + el.className + ' ';

	for (var i = 0, j = classes.length; i < j; i++) {
		var clsName = classes[i];
		if (!clsName) continue;

		if (el.classList) {
			el.classList.remove(clsName);
		} else if (hasClass(el, clsName)) {
			curClass = curClass.replace(' ' + clsName + ' ', ' ');
		}
	}
	if (!el.classList) {
		el.className = trim(curClass);
	}
};

/* istanbul ignore next */
const addClass = (el, cls) => {
	if (!el) return;
	var curClass = el.className;
	var classes = (cls || '').split(' ');

	for (var i = 0, j = classes.length; i < j; i++) {
		var clsName = classes[i];
		if (!clsName) continue;

		if (el.classList) {
		el.classList.add(clsName);
		} else if (!hasClass(el, clsName)) {
		curClass += ' ' + clsName;
		}
	}
	if (!el.classList) {
		el.className = curClass;
	}
};