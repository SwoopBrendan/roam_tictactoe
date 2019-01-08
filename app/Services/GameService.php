<?php

namespace App\Services;

use App\Game;
use App\Move;

class GameService
{

    public function getGames()
    {
        return Game::all();
    }

    public function getGameById($id)
    {
        $game = Game::find($id);
        $moves = Move::where('game_id', $id);
        $data = [
            'game' => $game,
            'moves' => $moves
        ];

        return $data;
    }

    /**
     * Create new game instance
     */
    public function createGame()
    {
        return new Game();
    }
}