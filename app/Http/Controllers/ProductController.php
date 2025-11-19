<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search', '');
        $category = $request->query('category', '');

        $categoriesQuery = Category::with(['products' => function ($query) use ($search) {
            $query->where('available', 1)
                  ->when($search, fn($q) => $q->where('name', 'like', "%$search%")
                                               ->orWhere('description', 'like', "%$search%"));
        }]);

        if ($category) {
            $categoriesQuery->where('name', $category);
        }

        try {
            $categories = $categoriesQuery->get();
            return response()->json($categories);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al cargar productos',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
