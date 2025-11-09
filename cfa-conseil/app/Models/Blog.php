<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'content_html',
        'excerpt',
        'featured_image'
    ];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($blog) {
            // Delete featured image
            if ($blog->featured_image) {
                $path = str_replace('/storage/', '', $blog->featured_image);
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }

            // Delete related images
            foreach ($blog->images as $image) {
                if ($image->file_path) {
                    $imagePath = str_replace('/storage/', '', $image->file_path);
                    if (Storage::disk('public')->exists($imagePath)) {
                        Storage::disk('public')->delete($imagePath);
                    }
                }
            }
            $blog->images()->delete();

            // Delete related PDFs
            foreach ($blog->pdfs as $pdf) {
                if ($pdf->file_path) {
                    $pdfPath = str_replace('/storage/', '', $pdf->file_path);
                    if (Storage::disk('public')->exists($pdfPath)) {
                        Storage::disk('public')->delete($pdfPath);
                    }
                }
            }
            $blog->pdfs()->delete();
        });
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function images()
    {
        return $this->hasMany(BlogImages::class);
    }

    public function pdfs()
    {
        return $this->hasMany(BlogPdfs::class);
    }
}
