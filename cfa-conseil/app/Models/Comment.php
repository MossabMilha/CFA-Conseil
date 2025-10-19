<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'blog_id',
        'user_id',
        'content',
        'parent_id',
    ];

    // A comment belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // A comment belongs to a blog
    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }

    // A comment can have replies (children)
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    // A comment can have a parent
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }
}
