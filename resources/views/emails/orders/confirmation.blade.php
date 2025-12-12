@component('mail::message')
{{-- Logo --}}
<img src="{{ asset('https://res.cloudinary.com/dnbklbswg/image/upload/v1765267450/exclusive-removebg-preview_x68ft5.png') }}" alt="Exclusive" style="width:150px; margin-bottom:20px;">

# Gracias por comprar en Exclusive, {{ $order->customer_name }}!

A continuación el resumen de tu pedido:

<table style="width:100%; border-collapse: collapse;">
    <thead>
        <tr>
            <th style="border-bottom:1px solid #ddd; text-align:left; padding:8px;">Producto</th>
            <th style="border-bottom:1px solid #ddd; text-align:center; padding:8px;">Cantidad</th>
            <th style="border-bottom:1px solid #ddd; text-align:right; padding:8px;">Precio (Bs)</th>
            <th style="border-bottom:1px solid #ddd; text-align:right; padding:8px;">Subtotal (Bs)</th>
        </tr>
    </thead>
    <tbody>
        @foreach($items as $item)
        <tr>
            <td style="padding:8px;">{{ $item->name ?? $item->product->name }}<br><small>SKU: {{ $item->sku }}</small></td>
            <td style="padding:8px; text-align:center;">{{ $item->quantity }}</td>
            <td style="padding:8px; text-align:right;">{{ number_format($item->price, 2) }}</td>
            <td style="padding:8px; text-align:right;">{{ number_format($item->subtotal, 2) }}</td>
        </tr>
        @endforeach
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3" style="padding:8px; text-align:right; font-weight:bold;">Total:</td>
            <td style="padding:8px; text-align:right; font-weight:bold;">{{ number_format($order->total, 2) }} Bs</td>
        </tr>
    </tfoot>
</table>

**Información importante:**

- Por favor envía tu comprobante de pago al correo o WhatsApp del vendedor.  
- Tu pedido será procesado pronto y recibirás notificación del envío.

Gracias por confiar en Exclusive.

@endcomponent
