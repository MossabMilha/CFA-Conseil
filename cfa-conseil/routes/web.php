<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blog/{slug}', [BlogController::class, 'show'] );
Route::middleware(['auth'])->group(function () {
    Route::get('/blog-editor', function () {
        return Inertia::render('BlogEditor', [
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    });
    
    Route::get('/blog-editor/{slug}', [BlogController::class, 'edit']);
});
Route::get('/contact', function () {return Inertia::render('Contact'); });

// Service routes
Route::get('/services/{service}', [ServiceController::class, 'show'])->name('services.show');

Route::get('/contact-form',[ContactController::class,'contact']);
Route::get('/contact-email',[ContactController::class,'contact']);

Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
