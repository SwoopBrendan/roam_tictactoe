<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
        'completed'
    ];

    /**
     * get game moves
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
    */
    public function gameMoves()
    {
        return $this->hasMany('App\Move');
    }
}
