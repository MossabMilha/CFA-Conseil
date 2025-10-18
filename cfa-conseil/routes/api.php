<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::get('/ping', function () {
    return response()->json([
        'message' => 'API is working in Laravel 12!'
    ]);
});
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::post('/contact-form',[ContactController::class,'contact']);

Route::post('/blogs', [BlogController::class, 'store']);
Route::post('/blogs/{slug}', [BlogController::class, 'update']);
Route::post('/blogs/content/{slug}', [BlogController::class, 'updateContent']);
Route::post('/upload-images', [BlogController::class, 'uploadImages']);
Route::post('/upload-pdfs', [BlogController::class, 'uploadPdfs']);
