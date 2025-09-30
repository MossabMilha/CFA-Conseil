<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class BlogController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title'          => 'required|string|max:255|unique:blogs,title',
            'content_html'   => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'images'         => 'nullable',
            'images.*'       => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'excerpt'        => 'nullable|string|max:500'
        ]);

        $blog = new Blog();
        $blog->user_id = 2; // Replace with Auth::id()
        $blog->title = $request->title;
        $blog->slug = Str::slug($request->title);
        $blog->content_html = $request->content_html;
        $blog->excerpt = $request->excerpt ?? null;

        // Featured image
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('images/blogs', 'public');
            $blog->featured_image = '/storage/' . $path;
        }

        $blog->save();

        // Save images
        if ($request->hasFile('images')) {
            foreach ((array) $request->file('images') as $image) {
                $path = $image->store('images/blogs', 'public');
                $blog->images()->create([
                    'file_path' => '/storage/' . $path,
                    'alt_text'  => null,
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Blog created successfully!',
            'data'    => $blog->load('images')
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::with('images')->findOrFail($id);

        $request->validate([
            'title'          => 'required|string|max:255|unique:blogs,title,' . $blog->id,
            'content_html'   => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'images'         => 'nullable',
            'images.*'       => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'excerpt'        => 'nullable|string|max:500'
        ]);

        $blog->title = $request->title;
        $blog->slug = Str::slug($request->title);
        $blog->content_html = $request->content_html;
        $blog->excerpt = $request->excerpt ?? null;

        // Replace featured image
        if ($request->hasFile('featured_image')) {
            if ($blog->featured_image && Storage::disk('public')->exists(str_replace('/storage/', '', $blog->featured_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $blog->featured_image));
            }
            $path = $request->file('featured_image')->store('images/blogs', 'public');
            $blog->featured_image = '/storage/' . $path;
        }

        $blog->save();

        // Remove old images & save new ones
        $blog->images()->delete();
        if ($request->hasFile('images')) {
            foreach ((array) $request->file('images') as $image) {
                $path = $image->store('images/blogs', 'public');
                $blog->images()->create([
                    'file_path' => '/storage/' . $path,
                    'alt_text'  => null,
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Blog updated successfully!',
            'data'    => $blog->load('images')
        ], 200);
    }

    public function destroy($id)
    {
        $blog = Blog::with('images')->findOrFail($id);

        if ($blog->featured_image && Storage::disk('public')->exists(str_replace('/storage/', '', $blog->featured_image))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $blog->featured_image));
        }

        foreach ($blog->images as $image) {
            if ($image->file_path && Storage::disk('public')->exists(str_replace('/storage/', '', $image->file_path))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $image->file_path));
            }
        }

        $blog->delete();

        return response()->json([
            'success' => true,
            'message' => 'Blog and its images deleted successfully'
        ], 200);
    }
}
