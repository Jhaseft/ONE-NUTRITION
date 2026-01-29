import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

export default function Products({ categories: initialCategories = [], search: initialSearch = '', page: initialPage = 1, hasMore: initialHasMore = false }) {
  const [categories, setCategories] = useState(initialCategories);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const handleVerMasCategorias = async () => {
    try {
      setLoading(true);
      const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      const nextOffset = categories.length;

      const params = new URLSearchParams({ offset: nextOffset });
      const response = await fetch(`/ventas/json?${params.toString()}`, {
        headers: { 'X-CSRF-TOKEN': token },
      });

      const data = await response.json();
      if (data.categories && data.categories.length > 0) {
        setCategories(prev => [...prev, ...data.categories]);
        setHasMore(data.hasMore);
      } else setHasMore(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {categories.map((category, idx) => {
        const filteredProducts = category.products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const hasChildren = category.children && category.children.length > 0;

        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="mb-16"
          >
            {/* Category header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-12 bg-gradient-to-b from-turquoise to-darkTurquoise rounded-full" />
              <div>
                <h2
                  className="text-2xl md:text-3xl font-bold text-darkGray leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {category.name}
                </h2>
                {category.description && (
                  <p className="text-grayCustom text-sm mt-1">
                    {category.description}
                  </p>
                )}
              </div>
            </div>

            {filteredProducts.length > 0 && (
              <CategorySwiper products={filteredProducts} />
            )}

            {/* Subcategories */}
            {hasChildren &&
              category.children.map(sub => {
                const filteredSubProducts = sub.products.filter(product =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                );

                return (
                  <div key={sub.id} className="mt-12">
                    <div className="flex items-center gap-3 mb-6 ml-4">
                      <div className="w-8 h-px bg-turquoise/50" />
                      <h3
                        className="text-xl md:text-2xl font-semibold text-grayCustom"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {sub.name}
                      </h3>
                    </div>

                    {filteredSubProducts.length > 0 && (
                      <CategorySwiper products={filteredSubProducts} />
                    )}
                  </div>
                );
              })}
          </motion.div>
        );
      })}

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleVerMasCategorias}
            disabled={loading}
            className="
              group relative px-10 py-4 rounded-full font-semibold text-base
              bg-white text-darkGray border-2 border-gray-200
              hover:border-turquoise hover:text-turquoise
              disabled:opacity-50 transition-all duration-300
            "
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Cargando...
              </span>
            ) : (
              'Ver mas categorias'
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function CategorySwiper({ products }) {
  if (!products || products.length === 0) return null;

  const useCarousel = products.length > 2;

  return useCarousel ? (
    <Swiper
      className="z-[1] py-4"
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={28}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      breakpoints={{
        640: { slidesPerView: 1.5, spaceBetween: 24 },
        768: { slidesPerView: 2, spaceBetween: 28 },
        1024: { slidesPerView: 2.5, spaceBetween: 32 },
        1280: { slidesPerView: 3, spaceBetween: 32 },
      }}
      style={{
        '--swiper-navigation-color': '#01a387',
        '--swiper-pagination-color': '#01a387',
        '--swiper-navigation-size': '36px',
      }}
    >
      {products.map(product => (
        <SwiperSlide key={product.id} className="!h-auto">
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
