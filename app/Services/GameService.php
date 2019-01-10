<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Game;
use App\Move;

/**
 * GameService class
 */
class GameService
{

    /**
     * Fetch all games
     */
    public function getGames()
    {
        return Game::all();
    }

    /**
     * Fetch game by ID
     */
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

    /**
     * Set game completion to true
     */
    public function completeGame(Request $request)
    {
        $game = Game::find($request->get('game_id'));

        $game->completed = true;
        $game->winner = $request->get("winner");

        $game->save();

        return Game::all();
    }

    /**
     * Delete all games
     */
    public function clearHistory()
    {
        $games = Game::query()->delete();

        return $games;
    }
}