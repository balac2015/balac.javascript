import Icon from './Icon.vue';

Icon.install = (Vue) => {
    Vue.component(Icon.name, Icon);
};

/**
 * import icon from './icon';
 * 调用：.vue 中 components 中声明
 * <icon :name=""></icon>
 */

export default Icon;
