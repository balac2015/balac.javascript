import React, { Component } from 'react'
import Board from '../board/1.js'

class Game extends Component {
    render () {

		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{ /* status */ }</div>
					<ol>{ /* todo */ }</ol>
				</div>
			</div>
		);
	}
}

export default Game
