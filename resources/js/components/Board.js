import React, { Component } from 'react';
import Cell from './Cell';

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cells: Array(9).fill(null),
            xPlayerNext: true,
            game: props.game
        }
    }

    calculateWinner(cells) {
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
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                return cells[a];
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

        let data = {
            "game_id": 1,
            "move_number": 1,
            "location": 1,
            "player": 'X'
        };

        this.saveHistory(data);
    }

    saveHistory = (data) => {
        fetch('/api/game', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).then(games => {
            this.setState({ games: games });
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
        const winner = this.calculateWinner(this.state.cells);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
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