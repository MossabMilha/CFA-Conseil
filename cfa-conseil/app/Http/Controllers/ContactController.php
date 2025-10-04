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
            'nom_complet' => 'required|string|max:255',
            'email'       => 'required|email|max:255',
            'Telephone'   => 'required|string|max:20',
            'Société'     => 'nullable|string|max:255',
            'Poste'       => 'nullable|string|max:255',
            'Pays'        => 'required|string|max:100',
            'Ville'       => 'required|string|max:100',
            'Message'     => 'required|string|max:2000',
        ]);

        try {
            Mail::to('yourrealemail@example.com')->send(new ContactMessage($validated));

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
