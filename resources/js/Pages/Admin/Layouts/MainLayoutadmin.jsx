import { Head } from '@inertiajs/react';
import Header from '@/Components/welcome/Header';
import Footer from '@/Components/welcome/Footer';
import { CartProvider } from '@/Contexts/CartContext';
import { useState } from 'react';
import CartIconadmin from '../Cart/CartIconadmin';
import CartModaladmin from '../Cart/CartModaladmin';

export default function Layoutadmin({ title, auth, children }) {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <Head title={title || "Tienda de Ropa"} />

      <div className="min-h-screen flex flex-col bg-white text-black relative">
        <Header auth={auth} />
        <main className="flex-1 container mx-auto px-6 py-10">
          {children}
        </main>
        <Footer />

        
        <div className="fixed bottom-6 right-6 z-[9999] ">
          <CartIconadmin
            className="text-black hover:text-gray-800 transition"
            onClick={() => setCartOpen(true)}
          />
        </div>

        
        <CartModaladmin
          isOpen={isCartOpen}
          onClose={() => setCartOpen(false)}
          className="z-[99999]"
        />

        <a
  href="https://wa.me/69791784"
  target="_blank"
  className="fixed bottom-6 right-6 w-20 h-20 rounded-full bg-[#25D366] shadow-xl flex items-center justify-center hover:bg-[#1ebe57] transition z-[1000]"
>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
    alt="WhatsApp"
    className="w-12 h-12"
  />
</a>
      </div>
    </CartProvider>
  );
}
