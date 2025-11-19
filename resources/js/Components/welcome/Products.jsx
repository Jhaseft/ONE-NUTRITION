import { useEffect, useState } from 'react';
import SearchBar from '@/Components/welcome/Search';
import { useCart } from '@/Contexts/CartContext';

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [addingId, setAddingId] = useState(null);
  const [successId, setSuccessId] = useState(null);
  const { addToCart } = useCart();

  // Cargar todas las categorías y productos disponibles al inicio
  useEffect(() => {
    setLoading(true);
    fetch('/products')
      .then(res => res.json())
      .then(data => {
        setCategories(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar productos:', err);
        setCategories([]);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (product) => {
    setAddingId(product.id);
    await addToCart({
      id: product.id,
      nombre: product.name,
      precio: product.price,
      cantidad: 1,
      image: product.image || 'https://via.placeholder.com/100',
    });
    setAddingId(null);
    setSuccessId(product.id);
    setTimeout(() => setSuccessId(null), 1500);
  };

  if (loading) {
    return <p className="text-center mt-8 text-gray-600">Cargando productos...</p>;
  }

  // Filtrar categorías según el botón seleccionado
  const displayedCategories = selectedCategory
    ? categories.filter(cat => cat.name === selectedCategory)
    : categories;

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <SearchBar onSearch={setSearchTerm} />

      {/* Filtro por categorías */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full ${selectedCategory === '' ? 'bg-brandGold text-white' : 'bg-gray-200 dark:bg-zinc-700'}`}
          onClick={() => setSelectedCategory('')}
        >
          Todas
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`px-4 py-2 rounded-full ${selectedCategory === cat.name ? 'bg-brandGold text-white' : 'bg-gray-200 dark:bg-zinc-700'}`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <h2 className="text-4xl font-semibold text-center mb-12 text-brandBlack dark:text-white">
        Productos Disponibles
      </h2>

      {displayedCategories.map(category => {
        // Filtrar productos por búsqueda en el frontend
        const filteredProducts = category.products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filteredProducts.length === 0) return null;

        return (
          <div key={category.id} className="mb-12">
            <h2 className="text-3xl font-semibold text-brandBlack dark:text-white mb-6">
              {category.name}
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-zinc-800 rounded-3xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-full h-64 sm:h-80 lg:h-96 overflow-hidden">
                    <img
                      src={product.image || 'https://via.placeholder.com/600x400'}
                      alt={product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-brandBlack dark:text-white">{product.name}</h3>
                    <p className="text-gray-500 dark:text-gray-300 mt-2">{product.description}</p>
                    <p className="text-gray-700 dark:text-gray-100 mt-2">Stock: {product.stock}</p>
                    <p className="text-gray-700 dark:text-gray-100 mt-4 font-bold text-lg">Bs{Number(product.price).toFixed(2)}</p>

                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={addingId === product.id}
                      className={`mt-6 w-full py-3 rounded-xl transition ${
                        addingId === product.id
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-brandGold text-brandBlack hover:bg-[#bfa333]'
                      }`}
                    >
                      {addingId === product.id ? 'Agregando...' : successId === product.id ? '¡Agregado!' : 'Agregar al carrito'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
