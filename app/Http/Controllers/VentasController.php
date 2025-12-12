<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;

class VentasController extends Controller
{
    public function index()
    {
        // Aquí puedes pasar datos si los necesitas
        return Inertia::render('Admin/Ventas', [
            // 'ventas' => $ventas, // ejemplo de datos
        ]);
    }

    public function show($slug, $id)
{
    $product = Product::where('available', 1)
        ->with([
            'variants.values.attribute',
            'multimedia'
        ])
        ->findOrFail($id);

    return Inertia::render('Products/ShowProductadmin', [
        'product' => [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'price' => $product->price,
            'image' => $product->multimedia->first()?->url,
            'variants' => $product->variants->map(fn($v) => [
                'id' => $v->id,
                'stock' => $v->stock,
                'sku' => $v->sku,
                'price' => $v->price,
                'values' => $v->values->map(fn($val) => [
                    'attribute' => $val->attribute->name,
                    'value' => $val->value
                ])
            ])
        ]
    ]);
}
}
