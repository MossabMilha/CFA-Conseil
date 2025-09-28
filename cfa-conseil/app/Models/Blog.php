<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;
    protected $fillable =[
        'user_id', 'title', 'slug', 'content_html',
        'excerpt', 'featured_image', 'status', 'published_at'
    ];

    // Relationships
    public function author(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function images(){
        return $this->hasMany(Image::class);

    }
}
