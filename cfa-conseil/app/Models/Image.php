<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','blog_id','file_path','alt_text'];

    //RelationShip
    public function uploader(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }

}
