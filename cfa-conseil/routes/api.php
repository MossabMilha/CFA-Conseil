<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

Route::post('/registerAdmin', [AuthController::class, 'registerAdmin']);
Route::post('/register', [AuthController::class, 'register']);

Route::post('/contact-form',[ContactController::class,'contact']);

Route::post('/blogs', [BlogController::class, 'store']);
Route::post('/blogs/{slug}', [BlogController::class, 'update']);
Route::delete('/blogs/{id}', [BlogController::class, 'destroy']);
Route::post('/blogs/content/{slug}', [BlogController::class, 'updateContent']);
Route::post('/upload-images', [BlogController::class, 'uploadImages']);
Route::post('/upload-pdfs', [BlogController::class, 'uploadPdfs']);

Route::get('/blogs/{blog}/comments', [CommentController::class, 'index'])->name('comments.index');
Route::post('/blogs/{blog}/comments', [CommentController::class, 'store'])->name('comments.store');

Route::middleware(['web', 'auth', 'role'])->group(function () {
    Route::post('/comments/{comment}/approve', [CommentController::class, 'approve']);
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);
});

// In api.php
Route::get('/debug-session', function() {
    return response()->json([
        'session_id' => session()->getId(),
        'session_data' => session()->all(),
        'user_id' => auth()->id(),
        'user' => auth()->user(),
        'cookies_received' => request()->cookie(),
    ]);
});
