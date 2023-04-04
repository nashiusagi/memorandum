<?php

namespace App\Http\Controllers;

use App\Models\Tip;
use App\Http\Requests\TipsRequest;
use Illuminate\Support\Str;

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

    public function markdown(TipsRequest $request){
        $value = $request['body'];

        return Str::of($value)->markdown();
    }
}
