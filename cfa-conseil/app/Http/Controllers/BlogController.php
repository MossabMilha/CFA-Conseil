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
        $blog = Blog::with('images', 'pdfs')->where('slug', $slug)->firstOrFail();

        return Inertia::render('BlogEditor', [
            'blog' => [
                'id' => $blog->id,
                'title' => $blog->title,
                'content_html' => $blog->content_html,
                'excerpt' => $blog->excerpt,
                'slug' => $blog->slug,
                'featured_image_path' => $blog->featured_image,
                'images' => $blog->images->map(function($image) {
                    return [
                        'id' => $image->id,
                        'url' => $image->file_path ? asset('storage/' . $image->file_path) : null,
                        'is_featured' => $image->is_featured
                    ];
                })->toArray(),
                'pdfs' => $blog->pdfs->map(function($pdf) {
                    return [
                        'id' => $pdf->id,
                        'url' => $pdf->file_path ? asset('storage/' . $pdf->file_path) : null,
                        'name' => $pdf->file_name
                    ];
                })->toArray()
            ],
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'          => 'required|string|max:255|unique:blogs,title',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
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
            'data'    => $blog
        ]);
    }

    public function update(Request $request)
    {
        $blog = Blog::with('images')->where('slug', $request->slug)->firstOrFail();

        $validated = $request->validate([
            'title'               => ['required', 'string', 'max:255', Rule::unique('blogs', 'title')->ignore($blog->id)],
            'excerpt'             => 'nullable|string|max:500',
            'featured_image'      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'featured_image_path' => 'nullable|string',
            'has_featured_image'    => 'nullable|string',
        ]);

        $blog->title = $request->title;
        $blog->slug  = Str::slug($request->title);
        $blog->excerpt = $request->excerpt ?? null;

        // --- Featured image logic ---
        $oldPath = $request->featured_image_path;

        if ($request->hasFile('featured_image')) {
            // Replace old image if it exists
            if ($oldPath !== null && Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('featured_image')->store('images/blogs', 'public');
            $blog->featured_image = $path;
        } elseif ($request->has_featured_image === 'false') {
            // Explicit removal
            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
            $blog->featured_image = null;
        }

        $blog->save();

        return response()->json([
            'success' => true,
            'message' => 'Blog updated successfully!',
            'data'    => $blog,
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
        $validated = $request->validate([
            'blog_id'        => 'required|exists:blogs,id',
            'images'         => 'nullable|array',
            'images.*'       => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'temp_ids'       => 'nullable|array',
            'existing_paths' => 'nullable|array',
        ]);

        $blog = Blog::with('images')->findOrFail($validated['blog_id']);
        $existingPaths = $validated['existing_paths'] ?? [];

        // Extract just filenames from existing paths
        $existingFilenames = array_map('basename', $existingPaths);

        // Step 1: Delete images no longer referenced
        foreach ($blog->images as $image) {
            $imageFilename = basename($image->file_path);
            $shouldDelete = empty($existingPaths) || !in_array($imageFilename, $existingFilenames);

            if ($shouldDelete) {
                if (Storage::disk('public')->exists($image->file_path)) {
                    Storage::disk('public')->delete($image->file_path);
                }
                $image->delete();
            }
        }

        $uploadedImages = [];

        // Step 2: Save new images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $imageFile) {
                $path = $imageFile->store('images/blogs', 'public');
                $realUrl = asset('storage/' . $path);

                $blog->images()->create([
                    'blog_id'   => $validated['blog_id'],
                    'file_path' => $path,
                    'alt_text'  => null,
                ]);

                $tempId = $request->temp_ids[$index] ?? null;
                if ($tempId) {
                    $uploadedImages[$tempId] = $realUrl;
                }
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Images synchronized successfully!',
            'data'    => $uploadedImages,
        ]);
    }


    public function uploadPdfs(Request $request)
    {
        $validated = $request->validate([
            'user_id'        => 'required|exists:users,id',
            'blog_id'        => 'required|exists:blogs,id',
            'pdfs'           => 'nullable|array',
            'pdfs.*'         => 'file|mimes:pdf|max:2048',
            'temp_ids'       => 'nullable|array',
            'existing_paths' => 'nullable|array',
        ]);

        $blog = Blog::with('pdfs')->findOrFail($validated['blog_id']);
        $existingPaths = $validated['existing_paths'] ?? [];

        // Extract just filenames from existing paths
        $existingFilenames = array_map('basename', $existingPaths);

        // Step 1: Delete PDFs no longer referenced
        foreach ($blog->pdfs as $pdf) {
            $pdfFilename = basename($pdf->file_path);
            $shouldDelete = empty($existingPaths) || !in_array($pdfFilename, $existingFilenames);

            if ($shouldDelete) {
                if (Storage::disk('public')->exists($pdf->file_path)) {
                    Storage::disk('public')->delete($pdf->file_path);
                }
                $pdf->delete();
            }
        }

        $uploadedPdfs = [];

        // Step 2: Save new PDFs
        if ($request->hasFile('pdfs')) {
            foreach ($request->file('pdfs') as $index => $pdfFile) {
                $path = $pdfFile->store('pdfs/blogs', 'public');
                $realUrl = asset('storage/' . $path);

                $blog->pdfs()->create([
                    'user_id'   => $validated['user_id'],
                    'blog_id'   => $validated['blog_id'],
                    'file_path' => $path,
                    'file_name' => $pdfFile->getClientOriginalName(),
                ]);

                $tempId = $request->temp_ids[$index] ?? null;
                if ($tempId) {
                    $uploadedPdfs[$tempId] = $realUrl;
                }
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'PDFs synchronized successfully!',
            'data'    => $uploadedPdfs,
        ]);
    }

}
