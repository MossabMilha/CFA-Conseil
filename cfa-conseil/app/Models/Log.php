<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Log extends Model
{
    use HasFactory;

    public $timestamps = false; // only created_at exists

    protected $fillable = [
        'user_id', 'action', 'description', 'ip_address', 'user_agent'
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    // 🔹 Reusable function to track logs
    public static function track($user, $action, $description = null, $request = null)
    {
        if ($user && $user->role === 'admin') {
            return self::create([
                'user_id'    => $user->id,
                'action'     => $action,
                'description'=> $description,
                'ip_address' => $request?->ip(),
                'user_agent' => $request?->header('User-Agent'),
            ]);
        }

        return null;
    }

}
