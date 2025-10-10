<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{

    public function contact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email'       => 'required|email|max:255',
            'phone'   => 'required|string|max:20',
            'company'     => 'nullable|string|max:255',
            'post'       => 'nullable|string|max:255',
            'country'        => 'required|string|max:100',
            'city'       => 'required|string|max:100',
            'message'     => 'required|string|max:2000',
            'subject'     => 'required|string|max:255',
        ]);

        try {
            // TODO:Change Email
            Mail::to('mossabmilha.m@gmail.com')->send(new ContactMessage($validated));

            return response()->json([
                'status' => 'success',
                'message' => 'Message sent successfully!'
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to send message.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
