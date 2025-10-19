<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentController extends Controller
{
    // Show all comments for a blog
    public function index($blog)
    {
        $comments = Comment::with('user')
            ->where('blog_id', $blog)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($comments);
    }

    // Store a new comment
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'blog_id' => 'required|exists:blogs,id',
            'content' => 'required|string|max:1000',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        Comment::create([
            'blog_id' => $request->blog_id,
            'user_id' => $request->user_id,
            'content' => $request->content,
            'parent_id' => $request->parent_id,
        ]);

        return redirect()->back();
    }
}
