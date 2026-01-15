<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        // Check if the user is logged in and has the right role
        if (!$user || !in_array($user->role, ['admin', 'coder'])) {
            // For API routes, return JSON response
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'message' => 'Access denied. Admin role required.'
                ], 403);
            }

            // For web routes, abort with 403
            abort(403, 'Access denied');
        }

        return $next($request);
    }
}
