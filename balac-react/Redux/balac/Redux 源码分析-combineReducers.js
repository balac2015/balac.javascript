combineReducers：把recuder函数们，合并成一个新的reducer函数，dispatch的时候，挨个执行每个reducer

const todoReducer = (state = [], action) => {}
const counterReducer = (state = 0, action) => {}

const reducer = combineReducers({ todoReducer, counterReducer })

1. combineReducers 的参数是一个对象

2. 执行结果返回的依旧是一个reducer

3. 通过combineReducers 返回的reducer创建的store, 再派发某个action的时候，实际上每个内在的reducer都会执行

4. createStrore使用合成的reducer创建的store， 他再派发action返回的是总的大的state
