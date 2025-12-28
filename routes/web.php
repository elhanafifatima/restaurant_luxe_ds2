<?php

use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/menu', [MenuController::class, 'index'])->name('menu.index');
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/reservation', [ReservationController::class, 'create'])->name('reservation.create');
Route::post('/reservation', [ReservationController::class, 'store'])->name('reservation.store');

// Dashboard
Route::get('/dashboard', function () {
    $user = auth()->user();
    
    if ($user->role !== 'admin') {
        return redirect()->route('reservations.mine');
    }

    $stats = [
        'menuCount' => \App\Models\MenuItem::count(),
        'reservationCount' => \App\Models\Reservation::count(),
        'userCount' => \App\Models\User::count(),
        'recentReservations' => \App\Models\Reservation::orderBy('created_at', 'desc')->take(5)->get(),
    ];

    return Inertia::render('Dashboard', [
        'stats' => $stats
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

    // Admin / Auth Routes
    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // My Reservations (Client)
        Route::get('/my-reservations', [ReservationController::class, 'myReservations'])->name('reservations.mine');

        // Development Helper: Promote to Admin
        Route::get('/promote-me', function (Request $request) {
            $user = $request->user();
            $user->role = 'admin';
            $user->save();
            return redirect()->route('dashboard')->with('status', 'Vous êtes maintenant administrateur.');
        });

        // Admin Menu Management
        Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/menu/create', [MenuController::class, 'create'])->name('menu.create');
        Route::post('/menu', [MenuController::class, 'store'])->name('menu.store');
        Route::get('/menu/{menuItem}/edit', [MenuController::class, 'edit'])->name('menu.edit');
        Route::put('/menu/{menuItem}', [MenuController::class, 'update'])->name('menu.update');
        Route::delete('/menu/{menuItem}', [MenuController::class, 'destroy'])->name('menu.destroy');

        // Admin Reservations
        Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');
        Route::patch('/reservations/{reservation}', [ReservationController::class, 'update'])->name('reservations.update');
        Route::delete('/reservations/{reservation}', [ReservationController::class, 'destroy'])->name('reservations.destroy');
    });
});

require __DIR__.'/auth.php';
