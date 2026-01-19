<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

Route::post('/registerAdmin', [AuthController::class, 'registerAdmin']);
Route::post('/register', [AuthController::class, 'register']);

Route::post('/contact-form',[ContactController::class,'contact']);

Route::get('/blogs/{blog}/comments', [CommentController::class, 'index'])->name('comments.index');
Route::post('/blogs/{blog}/comments', [CommentController::class, 'store'])->name('comments.store');

Route::middleware(['web', 'auth', 'role'])->group(function () {
    Route::post('/comments/{comment}/approve', [CommentController::class, 'approve']);
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);
});
