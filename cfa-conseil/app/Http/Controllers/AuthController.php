<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{

    public function showRegisterForm(){
        return Inertia::render('Auth/Register', [
            'layout' => 'guest'
        ]);
    }
    public function showLoginForm(){
        return Inertia::render('Auth/Login', [
            'layout' => 'guest'
        ]);
    }
    public function register(Request $request){
        $fixedCode = "CFA_AGENCY_WEB";
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'verification_code'=>'required|string'
        ]);
        // Check verification code
        if ($request->verification_code !== $fixedCode) {
            return response()->json([
                'message' => 'Invalid Verification Code.',
            ], 401);
        }

        $user = User::create([
            'first_name'=>$request->first_name,
            'last_name'=>$request->last_name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'role'=>'admin'
        ]);
        Log::track($user, 'register', 'New admin registered', $request);
        Auth::login($user);

        // Redirect with session
        return response()->json([
            'message' => 'Login successful',
            'redirect' => '/blogs',
            'user' => $user,
        ], 200);
    }

    public function login(Request $request)
    {

        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials, $request->filled('remember'))) {
            $request->session()->regenerate();
            $user = Auth::user();
            Log::track($user, 'login', 'Admin logged in', $request);

            return response()->json([
                'message' => 'Login successful',
                'redirect' => '/blogs',
                'user' => $user,
            ], 200);
        }


        return response()->json([
            'message' => 'Invalid credentials.',
        ], 401);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();
        Log::track($user, 'logout', 'Admin logged out', $request);
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('login')
            ->with('success', 'You have been logged out.');
    }

}
