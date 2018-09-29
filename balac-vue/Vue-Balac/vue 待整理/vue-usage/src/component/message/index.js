import Vue from 'vue'
import Component from './component'
import { isVNode } from '../../util/vdom'

let MessageConstructor = Vue.extend(Component),
    instance,
    instances = [],
    seed = 1;

const Message = function (options) {
    
    if (Vue.prototype.$isServer) {
        return
    }
    options = options || {}

    if (typeof options === 'string') {
        options = {
            message: options
        }
    }
    let userOnClose = options.onClose
    let id = 'message_' + seed++

    options.onClose = function () {
        Message.close(id, userOnClose)
    }
    instance = new MessageConstructor({
        data: options
    })
    instance.id = id

    if (isVNode(instance.message)) {
        instance.$slots.default = [instance.message]
        instance.message = null
    }
    
    instance = new MessageConstructor({
        data: {
            message: options
        }
    })
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el)
    instance.vm.visible = true
    instance.dom = instance.vm.$el
    // instance.dom.style.zIndex = PopupManager.nextZIndex()
    instances.push(instance)

    return instance.vm
}

var state = ['success', 'warning', 'info', 'error']
state.forEach(type => {
    Message[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options
            }
        }
        options.type = type

        return Message(options)
    }
})

Message.close = function (id, userOnClose) {
    for (let i = 0, len = instances.length; i < len; i++) {
        if (id === instances[i].id) {
            if (typeof userOnClose === 'function') {
                userOnClose(instances[i]);
            }
            instances.splice(i, 1)
            break;
        }
    }
}

Message.closeAll = function () {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close();
    }
}

export default Message