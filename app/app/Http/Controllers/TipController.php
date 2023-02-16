<?php

namespace App\Http\Controllers;

use App\Models\Tip;
use Illuminate\Http\Request;

class TipController extends Controller
{
    public function show(Tip $tip)
    {
        return inertia('Tip/Show', [
            'tips' => $tip->get(),
        ]);
    }

    public function create()
    {
        return inertia('Tip/Create');
    }
}
