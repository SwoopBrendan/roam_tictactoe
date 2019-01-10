<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource('/game', 'Api\GameController');
Route::post('game/clear-history', 'Api\GameController@clearHistory');
Route::post('game/complete-game', 'Api\GameController@completeGame');
// Route::post('game/complete-game/{id}', 'Api\GameController@completeGame');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
