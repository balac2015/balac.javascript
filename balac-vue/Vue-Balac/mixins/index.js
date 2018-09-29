// 指令器 v-loading-more="dValue" 使用
export const loadingMoreDirective = {
    directives: {
        'loading-more': {
            bind: (el, binding) => {
                // el 为 绑定指令器的元素 dom
                // binding.value 为给指令器赋的值，即 dValue
            }
        }
    }
};
export const commonDirective2 = {
    directives: {
        'common-directive': {
            bind: (el, binding) => {
            }
        }
    }
};

export const commonMethod1 = {
    methods: {
        commonMethod1 (path) {}
    }
};

export const commonMethod2 = {
    methods: {
        commonMethod1 (path) {}
    }
};