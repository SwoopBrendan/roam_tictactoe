import * as _ from "lodash";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
 
/* An example React component */
class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            games: [],
            game: {},
            showBoard: false
        }
    }

    componentDidMount() {
        fetch('/api/game').then(response => {
            return response.json();
        }).then(games => {
            this.setState({ games: games });
        });
    }

    startGame = () => {
        fetch('/api/game/create').then(response => {
            return response.json();
        }).then(game => {
            this.setState({ game: game });
        });
    }

    buildGameRows = (game, key) => {
        return (
            <tr key={game.id}>
                <td>{game.id}</td>
                <td>Game {game.id}</td>
                <td>{game.completed == 1 ? 'Complete' : 'Incomplete'}</td>
                <td>{game.created_at}</td>
                <td>{game.completed ? '' : (<button className="btn btn-success">Continue</button>)}</td>
            </tr>
        );
    }

    handleGameStatus = () => {
        this.setState({
            showBoard: !this.state.showBoard
        });
    }

    render() {
        const games = _.map(
            this.state.games,
            this.buildGameRows
        );

        return (
            <div style={{width: '50%', margin: 'auto'}}>

                { this.state.showBoard ? (
                    <button className="btn btn-warning" onClick={() => {this.handleGameStatus()}}>End Game</button>
                ) : (
                    <button className="btn btn-primary" onClick={() => {[this.handleGameStatus(), this.startGame()]}}>New Game</button>
                ) }

                { this.state.showBoard ? (<Board game={this.state.game} />) : '' }

                <hr/>
                <h3>Saved Games</h3>
                <br/>

                {_.isEmpty(this.state.games) ? (
                    <div>
                        <br/>
                        <h5>No Game History</h5>
                    </div>
                ) : (
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Completed</th>
                            <th>Started</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>{games}</tbody>
                    </table>
                )}

            </div>
        );
    }
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}