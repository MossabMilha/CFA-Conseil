<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home page
Route::get('/', fn() => Inertia::render('Home'))->name('home');

// Blog pages
Route::get('/blogs', [BlogController::class, 'index'])
    ->name('blogs.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])
    ->name('blogs.show');

// Editor pages (protected)
Route::middleware(['role'])->group(function () {
    Route::get('/blog-editor', fn() => Inertia::render('BlogEditor', [
        'auth' => ['user' => auth()->user()]
    ]))->name('blog.editor');

    Route::get('/blog-editor/{slug}', [BlogController::class, 'edit'])
        ->name('blog.editor.edit');
});

// Contact page
Route::get('/contact', fn() => Inertia::render('Contact'))
    ->name('contact');

// Service pages
Route::get('/services/{service}', [ServiceController::class, 'show'])
    ->name('services.show');

// Auth pages
Route::get('/register', [AuthController::class, 'showRegisterForm'])
    ->name('register');
Route::get('/login', [AuthController::class, 'showLoginForm'])
    ->name('login');

// Login/Logout endpoints (must match what's in your axios call)
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
