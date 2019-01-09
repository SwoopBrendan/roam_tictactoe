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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $games = $this->gameService->getGames();

        return $games->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $game = $this->gameService->createGame();

        $game->save();

        return $game->toJson();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->moveService->storeMove($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->gameService->getGameById($id);
    }

    public function completeGame($id)
    {
        return $this->gameService->completeGame($id);
    }

    public function clearHistory()
    {
        return $this->gameService->clearHistory();
    }
}
