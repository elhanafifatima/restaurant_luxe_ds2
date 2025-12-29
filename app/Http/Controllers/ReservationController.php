<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource (Admin).
     */
    public function index()
    {
        return Inertia::render('Admin/Reservations/Index', [
            'reservations' => Reservation::orderBy('created_at', 'desc')->get()
        ]);
    }

    /**
     * Display reservations for the logged-in user.
     */
    public function myReservations()
    {
        return Inertia::render('Client/Reservations/Index', [
            'reservations' => Reservation::where('user_id', auth()->id())
                ->orderBy('reservation_date', 'desc')
                ->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Reservation/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|regex:/^[a-zA-ZÀ-ÿ\s\'-]+$/',
            'email' => 'required|email',
            'phone' => 'required|string|regex:/^[\d\s+]+$/',
            'reservation_date' => 'required|date',
            'guests_count' => 'required|integer|min:1',
            'special_requests' => 'nullable|string',
        ]);

        // If user is logged in, attach user_id
        if (auth()->check()) {
            $validated['user_id'] = auth()->id();
        }

        Reservation::create($validated);

        return redirect()->route('home')->with('success', 'Reservation created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $reservation->update($validated);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return redirect()->back();
    }
}
