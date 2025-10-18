<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPdfs extends Model
{
    use HasFactory;

    protected $table = 'blog_pdfs';

    protected $fillable = [
        'user_id',
        'blog_id',
        'file_path',
        'file_name',
    ];

    // Relationship to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship to Blog
    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}
