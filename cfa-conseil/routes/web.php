<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ServiceController;
use App\Models\Comment;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --------------------------
// Public Pages
// --------------------------
Route::get('/', fn() => Inertia::render('Home'))->name('home'); // checked
Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index'); // checked
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blogs.show'); // checked
Route::get('/contact', fn() => Inertia::render('Contact'))->name('contact'); // checked
Route::get('/services/{service}', [ServiceController::class, 'show'])->name('services.show'); // checked

// --------------------------
// Public Blog Comments
// --------------------------
Route::get('/blogs/{blog}/comments', [CommentController::class, 'index'])->name('comments.index'); // checked
Route::post('/blogs/{blog}/comments', [CommentController::class, 'store'])->name('comments.store'); // checked

// --------------------------
// Authentication
// --------------------------
Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login'); // checked
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login'); // checked
Route::post('/logout', [AuthController::class, 'logout'])->name('logout'); // checked

// --------------------------
// Protected Routes
// --------------------------
Route::middleware(['auth', 'role'])->group(function () {

    // Blog Management
    Route::post('/blogs', [BlogController::class, 'store'])->name('blogs.store'); // checked
    Route::post('/blogs/{slug}', [BlogController::class, 'update'])->name('blogs.update'); // checked
    Route::delete('/blogs/{id}', [BlogController::class, 'destroy'])->name('blogs.destroy'); // checked
    Route::post('/blogs/content/{slug}', [BlogController::class, 'updateContent'])->name('blogs.updateContent'); // checked
    Route::post('/upload-images', [BlogController::class, 'uploadImages'])->name('blogs.uploadImages'); // checked
    Route::post('/upload-pdfs', [BlogController::class, 'uploadPdfs'])->name('blogs.uploadPdfs'); // checked

    // Blog Editor Pages
    Route::get('/blog-editor', fn() => Inertia::render('BlogEditor'))->name('blog.editor'); // checked
    Route::get('/blog-editor/{slug}', [BlogController::class, 'edit'])->name('blog.editor.edit'); // checked

    // Admin Comments Management
    Route::get('/admin/comments', [CommentController::class, 'adminPending'])->name('admin.comments');   // checked

    // Comment Actions (Approve/Delete)
    Route::post('/comments/{comment}/approve', [CommentController::class, 'approve'])->name('comments.approve'); // checked
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy'); // checked
});
