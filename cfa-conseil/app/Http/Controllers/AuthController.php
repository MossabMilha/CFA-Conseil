<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
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
            'verification_code' => 'required|string'
        ]);

        if ($request->verification_code !== $fixedCode) {
            throw ValidationException::withMessages([
                'verification_code' => ['Invalid Verification Code.'],
            ]);
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'admin'
        ]);

        Log::track($user, 'register', 'New admin registered', $request);
        Auth::login($user);

        return redirect()->route('blogs.index');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {

            throw ValidationException::withMessages([
                'email' => 'Email or password is incorrect.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended(route('blogs.index'));
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
