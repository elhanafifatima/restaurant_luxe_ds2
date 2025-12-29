<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // For development convenience: if the user is authenticated but not admin,
        // and we are in local environment, we could show a more helpful message.
        if ($request->user() && $request->user()->role === 'admin') {
            return $next($request);
        }

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Unauthorized. Admin role required.'], 403);
        }

        abort(403, 'Accès réservé aux administrateurs. Veuillez contacter le support ou promouvoir votre compte via la console.');
    }
}
