/**
 * Creates an object that inherits from the `prototype` object. If a
 * `properties` object is given, its own enumerable string keyed properties
 * are assigned to the created object.
 *
 * @since 2.3.0
 * @category Object
 * @param {Object} prototype The object to inherit from.
 * @param {Object} [properties] The properties to assign to the object.
 * @returns {Object} Returns the new object.
 * @example
 *
 * function Shape() {
 *   this.x = 0
 *   this.y = 0
 * }
 *
 * function Circle() {
 *   Shape.call(this)
 * }
 *
 * Circle.prototype = create(Shape.prototype, {
 *   'constructor': Circle
 * })
 *
 * const circle = new Circle
 * circle instanceof Circle
 * // => true
 *
 * circle instanceof Shape
 * // => true
 */
/*
 * 创建一个继承 prototype 的对象。 如果提供了 prototype，它的可枚举属性会被分配到创建的对象上。
 * @param { Object } prototype, 要继承的对象
 * @param { Object } [properties]，待分配的对象
 * @returns { Object } 返回新对象
 */
function create (prototype, properties) {
	prototype = prototype === null ? null : Object(prototype);
	const result = Object.create(prototype);

	return properties == null ? result : Object.assign(result, properties);
}

export default create;