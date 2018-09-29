import React, { Component } from 'react';
import Square from '../square/2.js';
import { calculateWinner } from '../util.js';

class Board extends Component {

	constructor () {
		super();
		this.state = {
			// 9 个空值的数组，对应 9 个方格：
			squares: Array(9).fill(null),
			// 轮流下棋（Taking Turns）
			xIsNext: true
		};
	}

	// 每当 Board(棋盘) 组件的 state(状态) 发生变化时， Square(方格) 组件会自动重新渲染。
	// Square(方格) 组件不再保持自己的 state(状态) ;它从父级 Board(棋盘) 组件中接收其值，并在点击时通知其父级组件。我们称这些组件为 受控组件。
	handleClick (i) {
		// 用 .slice() 来复制 squares 数组，而不是突然改变现有的数组
		const squares = this.state.squares.slice();

		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			squares: squares,
			xIsNext: !this.state.xIsNext
		});
	}

	renderSquare (i) {
		return <Square value={ this.state.squares[i] }
			onClick={ () => this.handleClick(i) }
		/>
	}

	render () {
		const winner = calculateWinner(this.state.squares);
		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div>
				<div className="status">{ status }</div>
				<div className="board-row">
					{ this.renderSquare(0) }
					{ this.renderSquare(1) }
					{ this.renderSquare(2) }
				</div>
				<div className="board-row">
					{ this.renderSquare(3) }
					{ this.renderSquare(4) }
					{ this.renderSquare(5) }
				</div>
				<div className="board-row">
					{ this.renderSquare(6) }
					{ this.renderSquare(7) }
					{ this.renderSquare(8) }
				</div>
			</div>
		);
	}
}

export default Board;
