const ctx = '@@InfiniteScroll';

export default {
    bind (el, binding, vnode) {
        el[ctx] = {
            el,
            vm: vnode.context,
            expression: binding.value
        };

        const args = arguments;

        el[ctx].vm.$on('hook:mounted', function () {
            el[ctx].vm.$nextTick(function () {
                if (isAttached(el)) {
                    doBind.call(el[ctx], args);
                }

                
            });
        })
    },
    unbind (el) {}
}