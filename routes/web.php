<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\PedidosController;
use App\Http\Controllers\SocialController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('welcome');


Route::get('/products', [ProductController::class, 'index'])->name('products.index');

Route::prefix('carrito')->group(function () {
    Route::get('/data', [CartController::class, 'data'])->name('carrito.data');
    Route::post('/add', [CartController::class, 'add'])->name('carrito.add');
    Route::patch('/update/{rowId}', [CartController::class, 'update'])->name('carrito.update');
    Route::delete('/remove/{rowId}', [CartController::class, 'remove'])->name('carrito.remove');
    Route::delete('/clear', [CartController::class, 'clear'])->name('carrito.clear');
});

Route::get('/checkout', function () {
    return Inertia::render('checkout');
})->middleware(['auth', 'verified']);
 

Route::get('/auth/google/redirect', [SocialController::class, 'redirectToGoogle'])->name('google.redirect');
Route::get('/auth/google/callback', [SocialController::class, 'handleGoogleCallback'])->name('google.callback');


require __DIR__.'/auth.php';
