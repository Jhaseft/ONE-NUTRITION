import { useEffect, useState } from 'react';
//import SearchBar from '@/Components/welcome/Search';
//import CategoryFilter from './CategoryFilter';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCardadmin from './ProductCardadmin';

export default function ProductsAdmin() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [limits, setLimits] = useState({});

  const priorityCategories = ['Destacados', 'Ofertas'];

  useEffect(() => {
    setLoading(true);
    fetch('/products')
      .then(res => res.json())
      .then(data => {
        let cats = Array.isArray(data) ? data : [];

        cats.sort((a, b) => {
          const indexA = priorityCategories.indexOf(a.name);
          const indexB = priorityCategories.indexOf(b.name);
          if (indexA !== -1 || indexB !== -1) return indexA !== -1 ? -1 : 1;
          return 0;
        });

        setCategories(cats);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar productos:', err);
        setCategories([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-8 text-gray-500 text-xl animate-pulse">
        Cargando productos...
      </p>
    );
  }

  const displayedCategories = selectedCategory
    ? categories.filter(cat => cat.name === selectedCategory)
    : categories;


    
  return (
    <div className="  px-4 sm:px-6 lg:px-8">
      {/* PARA PONER SEARCH Y FILTER FIJOS EN LA PARTE SUPERIOR DERECHA 
      <div className="flex justify-end mb-6">
        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 bg-gray-200 text-black rounded-full flex items-center justify-center shadow hover:bg-gray-300 transition"
          >

            <span className="text-xl">⚙️</span>
          </button>


          <div
            className={`absolute right-0 mt-2 w-20 bg-white border border-gray-300 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="p-4 flex flex-col gap-4 justify-end items-end">
              <SearchBar onSearch={setSearchTerm} />
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
          </div>
        </div>
      </div>
      */}

      <section className="text-black  p-4">
        {displayedCategories.map((category, idx) => {
          const filteredProducts = category.products.filter(product =>
            (product.name ?? '').toLowerCase().includes(searchTerm.toLowerCase())
          );

          const hasChildren = category.children && category.children.length > 0;

          return (
            <div key={category.id} className="mb-12">
              {idx !== 0 && <hr className="border-gray-300 my-12" />}

              <div className="relative mb-6">
                <h2
                  className="text-4xl md:text-5xl font-bold text-black tracking-[2px] uppercase pl-4 py-2 border-l-[6px] border-black"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {category.name}
                </h2>
                {category.description && (
                  <p className="text-gray-600 mt-2 italic pl-2">
                    {category.description}
                  </p>
                )}
                <h2>
                  ESTO ES ADMIIINININ
                </h2>
              </div>

              {filteredProducts.length > 0 && (
                <CategorySwiper products={filteredProducts} />
              )}

              {hasChildren &&
                category.children.map((sub, subIdx) => {
                  const filteredSubProducts = sub.products.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                  );

                  return (
                    <div key={sub.id} className="mt-12">
                      <h3
                        className="text-2xl mb-10 md:text-3xl font-semibold text-gray-900 tracking-wide pl-3 border-l-4"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {sub.name}
                      </h3>

                      {filteredSubProducts.length > 0 && (
                        <CategorySwiper products={filteredSubProducts} />
                      )}

                      {subIdx !== category.children.length - 1 && <hr className="mt-8" />}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </section>
    </div>
  );
}


function CategorySwiper({ products }) {
  if (!products || products.length === 0) return null;

  const isDesktopCarousel = products.length > 3;

  return isDesktopCarousel ? (
    <Swiper
      className="z-[1] py-4 "
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={24}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      style={{ '--swiper-navigation-color': '#000' }}
    >
      {products.map(product => (
        <SwiperSlide
          key={product.id}
          className={`w-full h-full   relative overflow-hidden rounded-3xl shadow-xl 
    ${product.variants?.reduce((sum, v) => sum + v.stock, 0) === 0 ? "border-black opacity-80" : "border-gray-200"}
    bg-white text-black hover:scale-105 hover:shadow-2xl transition-all duration-500
    flex justify-center`}
        >
          <ProductCardadmin product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8">
      {products.map(product => (
        <ProductCardadmin
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
