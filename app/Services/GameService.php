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

    /**
     * Create new game instance
     */
    public function createGame()
    {
        return new Game();
    }
}