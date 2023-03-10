<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TipController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::group(['prefix' => 'tips', 'as' => 'tips.'], function () {
        Route::get('/', [TipController::class, 'show'])->name('show');
        Route::post('/', [TipController::class, 'store'])->name('store');
        Route::get('create', [TipController::class, 'create'])->name('create');
        Route::post('create', [TipController::class, 'markdown'])->name('markdown');
    });
});

require __DIR__ . '/auth.php';
