bindActionCreators：对disptach的一种封装，可以直接执行或者通过属性方法的调用隐式的调用dispatch,而不用显式调用dispacth

bindActionCreators会根据传入的是函数还是对象，采取不同的处理方式，

    入参是函数，返回函数，传入对象，返回对象。

// 对 Redux 源码分析-基本概念 中例子的修改
let { createStore, bindActionCreators } = window.Redux
// action creater
let actionCreaters = {
    add: function (todo) {
        return {
            type: 'add',
            todo
        }
    },
    delete: function (id) {
        return {
            type: 'delete',
            id
        }
    }
}
// bindActionCreators() 的 2 中调用方式
let boundActions = bindActionCreators(actionCreaters, store.dispatch)
boundActions.add({
    id: 12,
    content: 'bindActionCreators 返回一个对象，直接可以调用属性方法，就会更新数据'
})
let boundAdd = bindActionCreators(actionCreaters.add, store.dispatch)
boundAdd({
    id: 13,
    content: 'bindActionCreators 返回一个函数，直接调用就会更新数据，不用显式调用dispatch'
})
