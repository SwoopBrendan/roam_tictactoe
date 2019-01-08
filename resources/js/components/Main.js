import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 
/* An example React component */
class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            games: [],
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
                <td>{game.completed}</td>
                <td>{game.created_at}</td>
            </tr>
        );
    }

    render() {
        const games = _.map(
            this.state.games,
            this.buildGameRows
          );

          return (
            <div>
                <h3>Saved Games</h3>

                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Completed</th>
                        <th>Started</th>
                    </tr>
                    </thead>
                    <tbody>{games}</tbody>
                </table>
            </div>
        );
    }
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}