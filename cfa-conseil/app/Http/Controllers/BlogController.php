<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use App\Models\BlogImages;

class BlogController extends Controller
{
  //Normally, we should use Inertia::render() to send data from Laravel to the frontend, like in our web project.
  //Here, we didn’t use it and instead used Laravel’s default API routes, fetching data manually from the frontend.
    public function index()
    {
        $blogs = Blog::orderBy('updated_at', 'desc')->get();
        return Inertia::render('Blogs', [
            'blogs' => $blogs,
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }


    public function show($slug)
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();
        return Inertia::render('Blog', [
            'blog' => $blog,
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }
    
    public function edit($slug)
    {
        $blog = Blog::with('images')->where('slug', $slug)->firstOrFail();

        return Inertia::render('BlogEditor', [
            'blog' => [
                'id' => $blog->id,
                'title' => $blog->title,
                'content_html' => $blog->content_html,
                'excerpt' => $blog->excerpt,
                'slug' => $blog->slug,
                'featured_image' => $blog->featured_image,
                'images' => $blog->images->map(function($image) {
                    return [
                        'id' => $image->id,
                        'url' => $image->file_path ? asset('storage/' . $image->file_path) : null,
                        'is_featured' => $image->is_featured
                    ];
                })->toArray()
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'          => 'required|string|max:255|unique:blogs,title',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'excerpt'        => 'nullable|string|max:500',
        ]);

        $blog = new Blog();
        $blog->user_id = auth()->id() ?? 5;
        $blog->title = $request->title;
        $blog->slug = Str::slug($request->title);
        $blog->excerpt = $request->excerpt ?? null;
        $blog->content_html = "";

        // Featured image
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('images/blogs', 'public');
            $blog->featured_image = $path;
        }

        $blog->save();

        return response()->json([
            'success' => true,
            'message' => 'Blog created successfully!',
            'data'    => $blog
        ], 201);
    }

    public function updateContent(Request $request, $slug)
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();

        $request->validate([
            'content_html' => 'required|string',
        ]);

        $blog->content_html = $request->content_html;
        $blog->save();

        return response()->json([
            'success' => true,
            'message' => 'Blog content updated successfully!',
            'data'    => $blog->load('images', 'pdfs')
        ]);
    }

    public function update(Request $request)
    {
        $blog = Blog::with('images')->where('slug', $request->slug)->firstOrFail();

        $validated = $request->validate([
            'title'          => ['required','string','max:255',Rule::unique('blogs', 'title')->ignore($blog->id)],
            'content_html'   => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'images'         => 'nullable',
            'images.*'       => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'pdfs'           => 'nullable',
            'pdfs.*'         => 'file|mimes:pdf|max:2048',
            'excerpt'        => 'nullable|string|max:500',
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

        // Remove old PDFs & save new ones
        $blog->pdfs()->delete();
        if ($request->hasFile('pdfs')) {
            foreach ((array) $request->file('pdfs') as $pdf) {
                $path = $pdf->store('pdfs/blogs', 'public');
                $blog->pdfs()->create([
                    'file_path' => '/storage/' . $path,
                    'file_name' => $pdf->getClientOriginalName(),
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Blog updated successfully!',
            'data'    => $blog->load('images','pdfs')
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

    public function uploadImages(Request $request)
    {
        $request->validate([
            'blog_id'   => 'required|exists:blogs,id',
            'images'    => 'required|array',
            'images.*'  => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'temp_ids'  => 'required|array',
        ]);

        $uploadedImages = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('images/blogs', 'public');
                $realUrl = asset('storage/' . $path);

                // Save in DB
                $record = BlogImages::create([
                    'blog_id' => $request->blog_id,
                    'file_path' => $path,
                    'alt_text'  => null,
                ]);

                // Map temp ID to real URL
                $tempId = $request->temp_ids[$index] ?? null;
                if ($tempId) {
                    $uploadedImages[$tempId] = $realUrl;
                }
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Images uploaded successfully',
            'data'    => $uploadedImages, // { tempId: realUrl }
        ]);
    }

    public function uploadPdfs(Request $request)
    {
        $request->validate([
            'blog_id'   => 'required|exists:blogs,id',
            'pdfs'      => 'required|array',
            'pdfs.*'    => 'file|mimes:pdf|max:2048',
            'temp_ids'  => 'required|array',
        ]);

        $uploadedPdfs = [];

        if ($request->hasFile('pdfs')) {
            foreach ($request->file('pdfs') as $index => $pdf) {
                $path = $pdf->store('pdfs/blogs', 'public');
                $realUrl = asset('storage/' . $path);

                // Save in DB
                $record = BlogPdf::create([
                    'blog_id' => $request->blog_id,
                    'file_path' => $path,
                    'file_name' => $pdf->getClientOriginalName(),
                ]);

                // Map temp ID to real URL
                $tempId = $request->temp_ids[$index] ?? null;
                if ($tempId) {
                    $uploadedPdfs[$tempId] = $realUrl;
                }
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'PDFs uploaded successfully',
            'data'    => $uploadedPdfs, // { tempId: realUrl }
        ]);
    }
}
