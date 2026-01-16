<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Show only approved comments for a blog post.
     */
    public function index($blogId)
    {
        $allComments = Comment::with('user')
            ->where('blog_id', $blogId)
            ->where('status', 'approved')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($allComments);
    }

    /**
     * Store a new comment (user or guest).
     */
    public function store(Request $request, $blogId)
    {
        $validated = $request->validate([
            'content' => 'required|string|min:3|max:1000',
            'parent_id' => 'nullable|exists:comments,id',
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
        ]);

        // Validate that the parent comment (if provided) belongs to the same blog
        if ($validated['parent_id'] ?? false) {
            $parentComment = Comment::findOrFail($validated['parent_id']);
            if ($parentComment->blog_id != $blogId) {
                return response()->json([
                    'message' => 'Invalid parent comment.',
                ], 422);
            }
        }

        $comment = new Comment();
        $comment->blog_id = $blogId;
        $comment->content = $validated['content'];
        $comment->parent_id = $validated['parent_id'] ?? null;

        if (Auth::check()) {
            // Logged-in user
            $comment->user_id = Auth::id();
            $comment->status = 'approved';
        } else {
            // Guest user
            $comment->name = $validated['name'];
            $comment->email = $validated['email'];
            $comment->status = 'pending';
        }

        $comment->save();

        return response()->json([
            'success' => true,
            'message' => Auth::check()
                ? 'Your comment has been added successfully!'
                : 'Your comment has been submitted',
            'comment' => $comment,
        ], 201);
    }

    /**
     * Admin: Approve a pending comment.
     */
    public function approve($commentId)
    {
        $comment = Comment::findOrFail($commentId);
        $comment->status = 'approved';
        $comment->save();

        return response()->json([
            'message' => 'Comment approved successfully.',
            'comment' => $comment,
        ]);
    }

    /**
     * Admin: Delete a comment.
     */
    public function destroy($commentId)
    {
        $comment = Comment::findOrFail($commentId);
        $comment->delete();

        return response()->json([
            'message' => 'Comment deleted successfully.',
        ]);
    }
}
