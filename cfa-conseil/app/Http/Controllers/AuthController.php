<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showRegisterForm(){
        return view(); //Return The Register Form
    }
    public function  showLoginForm(){
        return view(); //Return The Login Form

    }
    public function register(Request $request){
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed'
        ]);
        $user = User::create([
            'first_name'=>$request->first_name,
            'last_name'=>$request->last_name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'role'=>'admin'
        ]);

        Auth::login($user);
        return response()->json([
            'message' => 'User registered successfully',
            'user'    => $user
        ], 201);

//        return redirect()->route('dashboard');
    }

    public function login(Request $request){
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if(Auth::attempt($credentials,$request->filled('remember'))){
            $request->session()->regenerate();
            return redirect()->intended('dashboard');
        }
        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);

//        return back()->withErrors([
//            'email' => 'Invalid credentials'
//        ]);
    }
    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json([
            'message' => 'Logged out successfully'
        ]);

//        return redirect()->route('login');
    }

}
