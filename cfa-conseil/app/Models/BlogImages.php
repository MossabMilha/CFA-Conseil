<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogImages extends Model
{
    use HasFactory;

    protected $table = 'blog_images';

    protected $fillable = [
        'blog_id',
        'file_path',
        'alt_text',
        'order' // optional, for sorting
    ];

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}
