<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Game;
use App\Move;

class MoveService
{
    /**
     * Store a games move
     */
    public function storeMove(Request $request)
    {
        $move = new Move();

        $move->game_id = $request->get('game_id');
        $move->move_number = $request->get('move_number');
        $move->location = $request->get('location');
        $move->player = $request->get('player');

        $move->save();

        return $move;
    }
}