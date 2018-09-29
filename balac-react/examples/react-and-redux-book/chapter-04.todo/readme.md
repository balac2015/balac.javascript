Todo 应用实例

Todo 应用从界面上看应该由 3 部分组成：
    1、待办事项的列表；
    2、增加新待办事项的输入框和按钮；
    3、待办事项过滤器，可以选择过滤不同状态的待办事项

    1、2 关系紧密，可以放在一个模块中，最后确定有两个功能模块 todos 和 filter ，其中 todos 包含1、2功能

遵循“按照功能组织”的原则来设计代码

    功能模块下的 index.js 是模块的边界，要引用模块只能导入 index.js ，不能够直接去导人其他文件

Todo 状态设计

    一个待办事项的对象格式：
        {
            id: '',             // 唯一标识
            text: '',           // 待办事项内容
            completed: false    // 布尔值，标示待办事项是否已完成
        }

    过滤器的三种选择：
        全部待办事项；已完成代办事项；未完成待办事项

        const ALL = 'all';              // 考虑 debug, log 问题，0, 1 不容易看出来
        const COMPLETED = 'completed';  // 所以，开发中一个惯常的方法，就是把这些枚举型的常量定义为字符串
        const UNCOMPLETED = 'uncompleted';

    Todo 应用 Store 状态树的大概样子：

        {
            todos: [
                {
                    text: 'First todo',
                    completed: false,
                    id: 0
                }
            ],
            filter: 'all'
        }
