<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/home', function () {
    return Inertia::render('Home');
});

Route::get('/blogs', function () {
    return Inertia::render('Blogs');
});

Route::get('/blog-editor', function () {
    return Inertia::render('BlogEditor');
});

//Route::post('/register', [AuthController::class, 'register']);
//Route::post('/login', [AuthController::class, 'login']);
//Route::post('/logout', [AuthController::class, 'logout']);


