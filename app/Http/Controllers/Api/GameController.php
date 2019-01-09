<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\GameService;
use App\Services\MoveService;

class GameController extends Controller
{
    /**
     * GameController constructor
     */
    public function __construct(GameService $gameService, MoveService $moveService)
    {   
        $this->gameService = $gameService;
        $this->moveService = $moveService;
    }

    /**
     * Return a listing of all games
     */
    public function index()
    {
        $games = $this->gameService->getGames();

        return $games->toJson();
    }

    /**
     * Create and return a new game instance
     * {
     *  id int
     *  completed tinyint(1)
     *  createde_at timestamp
     *  modified_at timestamp
     * }
     */
    public function create()
    {
        $game = $this->gameService->createGame();

        $game->save();

        return $game->toJson();
    }

    /**
     * Create and store a game move
     * return move object
     * {
     *  id int
     *  game_id int
     *  move_number int
     *  location string
     *  player string
     *  created_at timestamp
     *  modified_at timestamp
     * }
     */
    public function store(Request $request)
    {
        return $this->moveService->storeMove($request);
    }

    /**
     * Fetch a game by id and return game object
     * {
     *  id int
     *  completed tinyint(1)
     *  createde_at timestamp
     *  modified_at timestamp
     * }
     */
    public function show($id)
    {
        return $this->gameService->getGameById($id);
    }

    /**
     * Set a game as complete and return all games
     * {
     *  {
     *   id int
     *   completed tinyint(1)
     *   createde_at timestamp
     *   modified_at timestamp
     *  },
     * }
     */
    public function completeGame($id)
    {
        return $this->gameService->completeGame($id);
    }

    /**
     * Delete all games from database
     * TODO: Update DB to soft delete
     */
    public function clearHistory()
    {
        return $this->gameService->clearHistory();
    }
}
