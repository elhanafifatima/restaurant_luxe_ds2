<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = ['user_id', 'name', 'email', 'phone', 'reservation_date', 'guests_count', 'special_requests', 'status'];

    protected $casts = [
        'reservation_date' => 'datetime',
    ];
}
