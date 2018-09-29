import Component from './test.vue'
import Vue from 'vue'

let MessageConstructor = Vue.extend(Component),
    instance,
    instances = [],
    seed = 1;

var test = function (msg) {
    instance = new MessageConstructor({
        data: {
            message: msg
        }
    })
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el)
    // instance.vm.visible = true
    instance.dom = instance.vm.$el
    instances.push(instance)

    return instance.vm
}  

export default test