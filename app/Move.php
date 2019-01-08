<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Move extends Model
{
    protected $fillable = [
        'game_id', 'move_number', 'location', 'player'
    ];
}
