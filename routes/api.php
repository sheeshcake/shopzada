<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserRegisterController;
use App\Http\Controllers\UserLoginController;
use App\Http\Controllers\AdminLoginController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\TransactionController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [UserRegisterController::class, 'register']);
Route::post('login', [UserLoginController::class, 'login']);
Route::post('add', [CartController::class, 'add']);
Route::post('cart', [CartController::Class, 'index']);
Route::post('update', [CartController::Class, 'update']);
Route::post('delete', [CartController::class, 'delete']);
Route::post('purchase', [TransactionController::class, 'purchase']);
Route::get('products', [ProductsController::class, 'index']);