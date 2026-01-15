<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    // Show only approved comments
    public function index($blogId)
    {
        // Get all approved comments for this blog
        $allComments = Comment::with('user')
            ->where('blog_id', $blogId)
            ->where('status', 'approved')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($allComments);
    }

    // Store a new comment
    public function store(Request $request, $blogId)
    {
        $request->validate([
            'content' => 'required|string|min:3|max:1000',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        // Check if parent comment belongs to the same blog
        if ($request->parent_id) {
            $parentComment = Comment::findOrFail($request->parent_id);
            if ($parentComment->blog_id != $blogId) {
                return response()->json([
                    'message' => 'Invalid parent comment.'
                ], 422);
            }
        }

        $comment = Comment::create([
            'blog_id' => $blogId,
            'user_id' => Auth::id(), // Will be null for guests
            'content' => $request->content,
            'parent_id' => $request->parent_id,
            'status' => Auth::check() ? 'approved' : 'pending',
        ]);

        return response()->json([
            'message' => Auth::check() ? 'Comment added!' : 'Comment submitted for approval!',
            'comment' => $comment,
        ], 201);
    }

    // Admin: Approve comment
    public function approve($commentId)
    {
        $comment = Comment::findOrFail($commentId);
        $comment->status = 'approved';
        $comment->save();

        return response()->json([
            'message' => 'Comment approved',
            'comment' => $comment,
        ]);
    }

    // Admin: Delete comment
    public function destroy($commentId)
    {
        $comment = Comment::findOrFail($commentId);
        $comment->delete();

        return response()->json([
            'message' => 'Comment deleted',
        ]);
    }
}
