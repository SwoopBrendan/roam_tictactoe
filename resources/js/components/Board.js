import React, { Component } from 'react';
import Cell from './Cell';

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cells: Array(9).fill(null),
            xPlayerNext: true
        }
    }

    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }

    handleClick(i) {
        const cells = this.state.cells.slice();
        cells[i] = this.state.xPlayerNext ? 'X' : 'O';
        this.setState({ 
            cells: cells,
            xPlayerNext: !this.state.xPlayerNext
        });
    }

    renderCell(i) {
        return (
            <Cell 
                value={this.state.cells[i]} 
                onClick={() => this.handleClick(i)}
            />
        );
    }
    
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            statue = 'Winner: ' + winner;
        } else {
            status = 'Next Player: ' + (this.state.xPlayerNext ? 'X' : '0');
        }
    
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderCell(0)}
                    {this.renderCell(1)}
                    {this.renderCell(2)}
                </div>
                <div className="board-row">
                    {this.renderCell(3)}
                    {this.renderCell(4)}
                    {this.renderCell(5)}
                </div>
                <div className="board-row">
                    {this.renderCell(6)}
                    {this.renderCell(7)}
                    {this.renderCell(8)}
                </div>
            </div>
        );
    }

}

export default Board;