import Vue from 'vue';
import main from './main.vue';

const vConstructor = Vue.extend(main);
let vInstance = null;
const props = main.props;
const defaultOptions = {};

Object.keys(props).forEach((key) => {
    let prop = props[key],
        det = prop.default;

	if (prop && det != null) {
		defaultOptions[key] = typeof det === 'function' ? det() : det;
	}
});

export default function Service (options) {
	options = options || {};

	// 如果已经存在 tip 的实例,直接更新属性值
	if (vInstance && vInstance.$el.parentNode) {
		Object.assign(vInstance, defaultOptions, options);

		if (vInstance.target) {
			vInstance.updateTip();
		} else {
			vInstance.hiddenTip();
		}
	} else {
        // 否则创建一个 tip 实例
        vInstance = new vConstructor({
            propsData: options
        }).$mount();
        vInstance.updateTip();
    }	

	return vInstance;
}