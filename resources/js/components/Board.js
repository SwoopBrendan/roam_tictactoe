import React, { Component } from 'react';
import Cell from './Cell';

class Board extends Component {

    constructor(props) {
        super(props);
        const { complete } = props;
        this.state = {
            cells: Array(9).fill(null),
            xPlayerNext: true,
            game: props.game,
            moveCount: 0,
            moveHistory: props.history
        }
    }

    componentDidMount() {
        if (!_.isEmpty(this.state.moveHistory)) {
            let history = this.state.moveHistory;
            let cells = this.state.cells.slice();
    
            history.forEach(element => {
                cells[element.location] = element.player;
            });
    
            this.setState({ cells: cells });        
        }
    }

    completeGame = () => {
        fetch('/api/game/complete-game/' + this.state.game.id, {
            method: 'POST'
        }).then(response => {
            return response.json();
        });
    }

    calculateWinner() {
        let cells = this.state.cells;
        let result = null;

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
                result = cells[a];
            }
        }

        if (result) {
            this.completeGame()
        }

        return result;
    }

    handleClick(i) {
        const cells = this.state.cells.slice();
        cells[i] = this.state.xPlayerNext ? 'X' : 'O';
        
        this.setState({
            cells: cells,
            xPlayerNext: !this.state.xPlayerNext,
            moveCount: this.state.moveCount + 1
        });

        this.saveHistory(i);
    }

    saveHistory = (i) => {
        fetch('/api/game', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                game_id: this.state.game.id,
                move_number: this.state.moveCount,
                location: i,
                player: this.state.xPlayerNext ? 'X' : 'O'
            })
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
        const winner = this.calculateWinner();
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