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
            showBoard: false
        }
    }

    componentDidMount() {
        /* fetch API in action */
        fetch('/api/game')
            .then(response => {
                return response.json();
            })
            .then(games => {
                this.setState({ games: games });
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

    displayBoard = () => {
        this.setState({
            displayBoard: !this.state.displayBoard
        });
    }

    render() {
        const games = _.map(
            this.state.games,
            this.buildGameRows
          );

          return (
            <div style={{width: '50%', margin: 'auto'}}>
                <button className="btn btn-primary" onClick={this.displayBoard}>{this.state.displayBoard ? 'End Game' : 'New Game'}</button>

                { this.state.displayBoard ? (<Board />) : '' }

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