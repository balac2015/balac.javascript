import React, { Component } from 'react';
import Board from '../board/3.js';
import { calculateWinner } from '../util.js';

class Game1 extends Component {

	constructor (props) {
		super(props);
		this.state = {
			history: [
				{
					squares: Array(9).fill(null)
				}
			],
			xIsNext: true
		};
	}

	handleClick (i) {
		const history = this.state.history;
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		// 创建一个新的历史记录数组来将新条目推入堆栈。
		this.setState({
			history: history.concat([
			{
				squares: squares
			}
			]),
			xIsNext: !this.state.xIsNext
		});
	}

	render () {
		const history = this.state.history;
		const current = history[history.length - 1];
		const winner = calculateWinner(current.squares);

		let status;
		if (winner) {
			status = 'winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={ current.squares }
						onClick={ (i) => this.handleClick(i) }
					/>
				</div>
				<div className="game-info">
					<div>{ status }</div>
					<ol>{ /* todo */ }</ol>
				</div>
			</div>
		);
	}
}

// 显示下棋步骤（Showing the Moves）
class Game extends Component {

	constructor (props) {
		super(props);
		this.state = {
			history: [
				{
					squares: Array(9).fill(null)
				}
			],
			// 当前正在查看的是哪一步
			stepNumber: 0,
			xIsNext: true
		};
	}

	handleClick (i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([
			{
				squares: squares
			}
			]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext
		})
	}

	jumpTo (step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0
		});
	}

	render () {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		// 显示下棋步骤（Showing the Moves），历史纪录的每一步
		const moves = history.map((step, move) => {
			const desc = move ?
				'Move #' + move :
				'Game start';

			return (
				// 警告： 数组或迭代器中的每个子元素都应该有一个唯一的 “key” prop
				<li key={ move }>
					<button onClick={ () => this.jumpTo(move) }>{ desc }</button>
				</li>
			);
		});

		let status;
		if (winner) {
			status = 'winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={ current.squares }
						onClick={ (i) => this.handleClick(i) }
					/>
				</div>
				<div className="game-info">
					<div>{ status }</div>
					<ol>{ moves }</ol>
				</div>
			</div>
		);
	}
}


export default Game;
