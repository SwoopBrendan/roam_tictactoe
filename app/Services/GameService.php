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
        $moves = Move::where('game_id', $id)->get();

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
        $game = new Game();

        return $game;
    }

    public function completeGame($gameId)
    {
        $game = Game::find($gameId);

        $game->completed = true;

        $game->save();

        return $game;
    }

    public function clearHistory()
    {
        Game::query()->delete();
    }
}