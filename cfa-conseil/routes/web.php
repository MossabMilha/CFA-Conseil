<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
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


