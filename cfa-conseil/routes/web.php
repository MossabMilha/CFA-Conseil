<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ServiceController;
use App\Models\Comment;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home page
Route::get('/', fn() => Inertia::render('Home'))->name('home');

// Blog pages
Route::middleware(['auth', 'role'])->group(function () {
    Route::post('/blogs', [BlogController::class, 'store']);
    Route::post('/blogs/{slug}', [BlogController::class, 'update']);
    Route::delete('/blogs/{id}', [BlogController::class, 'destroy']);
    Route::post('/blogs/content/{slug}', [BlogController::class, 'updateContent']);
    Route::post('/upload-images', [BlogController::class, 'uploadImages']);
    Route::post('/upload-pdfs', [BlogController::class, 'uploadPdfs']);
});

Route::get('/blogs', [BlogController::class, 'index'])
    ->name('blogs.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])
    ->name('blogs.show');

Route::middleware(['role'])->group(function () {
    Route::get('/blog-editor', fn() => Inertia::render('BlogEditor', [
        'auth' => ['user' => auth()->user()]
    ]))->name('blog.editor');

    Route::get('/blog-editor/{slug}', [BlogController::class, 'edit'])->name('blog.editor.edit');

    Route::get('/admin/comments', function() {
        $pendingComments = Comment::with('user')
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Comments', [
            'pendingComments' => $pendingComments,
        ]);
    })->name('admin.comments');
});

// Contact page
Route::get('/contact', fn() => Inertia::render('Contact'))->name('contact');

// Service pages
Route::get('/services/{service}', [ServiceController::class, 'show'])->name('services.show');

// Auth pages
Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
