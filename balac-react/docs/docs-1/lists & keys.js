/**
 * 列表(Lists) 和 键(Keys)
  * 键 Keys
  * 键(Keys) 帮助 React 标识哪个项被修改、添加或者移除了。数组中的每一个元素都应该有一个唯一不变的键(Keys)来标识：
  * 键是React的一个内部映射，但其不会传递给组件的内部。
  * 如果 map() 体中有太多嵌套，可能是提取组件的好时机。
 */

// 多组件渲染
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
    <li key={ number.toString() }>{ number }</li>
);

// 在 JSX 中嵌入 map()
function NumberList (props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        <ListItem key={ number.toString() } value={ number } />
    );

    return (
        <ul>{ listItems }</ul>
    );
}

// JSX允许在大括号中嵌入任何表达式，因此可以 内联 map() 结果
function NumberList (props) {
    const numbers = props.numbers;

    return (
        <ul>
            { numbers.map((number) =>
                <ListItem key={ number.toString() } value={ number } />
            )}
        </ul>
    );
}
