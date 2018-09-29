// 为了便于 debug 和输出到 log 里面查看清晰，所有的 action 类型的值都是字符串，字符串还有一个好处就是可以直接通过＝＝＝来比较是否相等，而其他对象使用＝＝＝则要求必须引用同一个对象
// 格说来，使用 Syn器并不支持 Symbol
export const ADD_TODO = 'TODO/ADD';         // 增加
export const TOGGLE_TODO = 'TODO/TOGGLE';   // 反转
export const REMOVE_TODO = 'TODO/REMOVE';   // 删除
