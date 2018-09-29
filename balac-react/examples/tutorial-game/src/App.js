import React, { Component } from 'react'
import './App.css'
/* game1 */
import Game1 from './game/1.js'
/* game2 */
import Game2 from './game/2.js'
/* game3 */
import Game3 from './game/3.js'

/**
 * 当一个列表重新渲染时， React 使用新版本中的每个元素，并在上一个列表中查找具有匹配 key(健) 的元素。当一个 key(健) 被添加到集合中时，创建一个组件;当一个 key(健) 被删除时，一个组件将会被销毁。 key(健) 用来告诉 React 关于每个组件的身份标识 ，因此他可以维持 state(状态) 到重新渲染。如果更改组件的 key(健) ，它将被完全毁灭，并重新建立一个新的 state(状态) 。
 */

/**
 * game1:
 * 1、通过 props 从 Board 传递数据到 Square
 * 2、Square 中的交互式改变 state
 *
 * 组件的 state(状态) 被认为是私有的
 * 在 React 应用程序中，使用 on* 名称作为其处理程序 prop(属性) 名称 ，handle* 作为其实现的名称是一个常见的约定。
 * 警告： 数组或迭代器中的每个子元素都应该有一个唯一的 “key” prop。请检查 “Game” 的渲染方法。
 */

 /**
  * game2:
  *
  * 状态提升：需要在一个地方能获取所有 9 个方格的值，而不是分裂在每个 Square(方格) 组件上。
  * 将 state(状态) 存储在 Board(棋盘) 组件中，而不是在每个 Square(方格) 组件中 - 而 Board(棋盘) 组件可以告诉每个 Square(方格) 组件要显示什么
  *
  * 当您要聚合来自多个子节点的数据 或 使两个子组件之间相互通信时，提升 state(状态) ，使其存储在父组件中。父组件可以通过 props(属性) 把 state(状态) 传递回子组件，以使子组件始终与父组件同步。
  *
  * 不可变数据的重要性（Why Immutability Is Important）:
  * 1、更简单的撤消/重做和步骤重现（Easier Undo/Redo and Time Travel）
  * 2、追踪变更（Tracking Changes）
  * 3、确定何时重新渲染（Determining When to Re-render in React）
  */

 /**
  * game3:
  *
  * 存储历史记录（Storing a History）
  * 顶级的 Game(游戏) 组件负责显示动作列表
  * 可以重新访问 Board(棋盘) 组件的旧 state(状态) ，可以看到之前的任何一个动作之后的棋面。每下一步棋，创建一个新的 squares 数组。这意味着我们可以轻松地存储 Board(棋盘) 组件过去的 state(状态)。
  * 计划存储 history 对象，来存储每一步棋的 state(状态)：
  *     let history = [
  *         {
                squares: [
                    null, null, null,
                    null, null, null,
                    null, null, null
                ]
            },
            ....
        ]
  */

 /**
  * tic-tac-toe 游戏实现：
  *     让你玩 tic-tac-toe ， --- game1
  *     指示一个玩家是否赢得比赛，---- game2
  *     存储游戏中的历史动作， --- game3
  *     让玩家及时跳回去看某一步的游戏棋盘。--- game3
  *
  * 改进的想法，按照难度越来越高的顺序列出：
  *    以 “(1, 3)” 格式而不是 “6” 显示移动位置。
  *    在步骤列表中加粗显示当前选中的项目。
  *    重写 Board(棋盘) 使用两个循环来制作方格，而不是对它们进行硬编码。
  *    添加一个切换按钮，您可以按升序或降序对步骤列表进行排序。
  *    当有人赢了，突出显示导致游戏胜利的三个方块。
  */



  export default class App extends Component {
      render () {
          return (
              <div>
                  <Game1 />
                  <Game2 />
                  <Game3 />
              </div>
          )
      }
  }
