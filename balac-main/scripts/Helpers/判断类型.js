/**
 * 判断类型：
 * 是否字符串：Object.prototype.toString.call(o).slice(8, -1) === 'String'
 * 是否数字：Object.prototype.toString.call(o).slice(8, -1) === 'Number'
 * 是否对象：Object.prototype.toString.call(o).slice(8, -1) === 'Object'
 * 是否数组：Object.prototype.toString.call(o).slice(8, -1) === 'Array'
 * 是否时间：Object.prototype.toString.call(o).slice(8, -1) === 'Date'
 * 是否布尔：Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
 * 是否函数：Object.prototype.toString.call(o).slice(8, -1) === 'Function'
 * 是否 null：Object.prototype.toString.call(o).slice(8, -1) === 'Null'
 * 是否 undefined：Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
 */
export const isUndefined = (o) => {
	return checkType(o, 'Undefined');
};

export const isFalse (o) => {
	return o == undefined || o == null || o == false || o == NaN || o == 0 ||
        o == 'undefined' || o == 'null' || o == '';
};

export const isTrue (o) => {
	return !isFalse(o);
};

export const checkType = (o, type) => {
	return Object.prototype.toString.call(o).slice(8, -1) === type;
};
