<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BlogController extends Controller
{
  //Normally, we should use Inertia::render() to send data from Laravel to the frontend, like in our web project.
  //Here, we didn’t use it and instead used Laravel’s default API routes, fetching data manually from the frontend.
    public function index()
    {
        $blogs = Blog::orderBy('updated_at', 'desc')->get();

        return Inertia::render('Blogs', [
            'blogs' => $blogs // <= this is the same way we did in our web project that will allow us to use $blogs in our frontend directly :)
        ]);
    }


    public function show($slug)
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();

        return Inertia::render('Blog', [
            'blog' => $blog
        ]);
    }

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
        $blog->user_id = 2;
        $blog->title = $request->title;
        $blog->slug = Str::slug($request->title);
        $blog->excerpt = $request->excerpt ?? null;
        $blog->content_html = $request->content_html;

        // Featured image
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('images/blogs', 'public');
            $blog->featured_image = $path;
        }

        // Save the blog first to ensure it has an ID for related images
        $blog->save();

        $replacementMap = [];

        // Save images
        if ($request->hasFile('images')) {
            foreach ((array) $request->file('images') as $index => $image) {
                $path = $image->store('images/blogs', 'public');

                // Create DB record
                $blog->images()->create([
                    'file_path' => $path,
                    'alt_text'  => null,
                ]);

                // Map data-temp-id to real file path
                $tempId = $request->input("images_temp_ids.$index");
                if ($tempId) {
                    $replacementMap[$tempId] = asset('storage/' . $path);
                }
            }
        }

        // Replace blob src with correct storage paths in content_html
        // Replace blob src with correct public storage paths in content_html
        $content = $blog->content_html;
        foreach ($replacementMap as $tempId => $realUrl) {
            $content = preg_replace(
                '/(<img[^>]+data-temp-id="' . preg_quote($tempId, '/') . '"[^>]+src=")[^"]+(")/',
                '$1' . $realUrl . '$2',
                $content
            );
        }

        // Only update content_html if we made replacements
        if ($content !== $blog->content_html) {
            $blog->content_html = $content;
            $blog->save();
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

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $path = $request->file('image')->store('images/blogs', 'public');

        return response()->json([
            'url' => asset('storage/' . $path),
        ]);
    }

}
