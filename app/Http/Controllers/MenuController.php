<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Menu/Index', [
            'menuItems' => MenuItem::all()
        ]);
    }

    public function adminIndex()
    {
        return Inertia::render('Admin/Menu/Index', [
            'menuItems' => MenuItem::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Menu/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|regex:/^[a-zA-ZÀ-ÿ\s\'-]+$/',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0.01',
            'category' => 'required|string',
            'image_path' => 'nullable|image|max:2048',
            'ingredients' => 'nullable|string',
        ]);

        if ($request->hasFile('image_path')) {
            $path = $request->file('image_path')->store('menu_items', 'public');
            $validated['image_path'] = '/storage/' . $path;
        }

        MenuItem::create($validated);

        return redirect()->route('admin.menu.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MenuItem $menuItem)
    {
        return Inertia::render('Admin/Menu/Edit', [
            'menuItem' => $menuItem
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MenuItem $menuItem)
    {
        $rules = [
            'name' => 'required|string|max:255|regex:/^[a-zA-ZÀ-ÿ\s\'-]+$/',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0.01',
            'category' => 'required|string',
            'ingredients' => 'nullable|string',
        ];

        // If it's a file upload, validate as image
        if ($request->hasFile('image_path')) {
            $rules['image_path'] = 'nullable|image|max:2048';
        } else {
            $rules['image_path'] = 'nullable|string';
        }

        $validated = $request->validate($rules);

        if ($request->hasFile('image_path')) {
            // Delete old image if it exists and is a local file
            if ($menuItem->image_path && str_starts_with($menuItem->image_path, '/storage/')) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $menuItem->image_path));
            }
            
            $path = $request->file('image_path')->store('menu_items', 'public');
            $validated['image_path'] = '/storage/' . $path;
        }

        $menuItem->update($validated);

        return redirect()->route('admin.menu.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MenuItem $menuItem)
    {
        $menuItem->delete();
        return redirect()->back();
    }
}
