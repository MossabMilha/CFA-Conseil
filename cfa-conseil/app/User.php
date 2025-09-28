<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role',
        'avatar_url'
    ];

    protected $hidden = ['password'];

    public function blogs()
    {
        return $this->hasMany(Blog::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function logs()
    {
        return $this->hasMany(Log::class);
    }

    // Helper: Full name
    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
