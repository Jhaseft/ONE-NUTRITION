import { useState } from "react";
import { useCart } from "@/Contexts/CartContext";
import ProductGallery from "./ProductGallery";
import { FaWhatsapp, FaShoppingCart, FaCheck, FaTruck, FaShieldAlt } from "react-icons/fa";

export default function ShowProduct({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.find(v => v.stock > 0) || null
  );

  const [quantity, setQuantity] = useState(
    selectedVariant ? Math.min(1, selectedVariant.stock) : 1
  );

  const [adding, setAdding] = useState(false);
  const [success, setSuccess] = useState(false);

  const { addToCart } = useCart();

  const multimedia = product.multimedia || [];

  const mainImage =
    multimedia.find(m => m.type !== "video")?.url ||
    "https://via.placeholder.com/600x400";

  const stock = selectedVariant?.stock || 0;
  const isOutOfStock = stock === 0;
  const currentUrl = window.location.href;

  const selectedAttribute =
    selectedVariant?.values[0]?.attribute || "Variante";

  const selectedValue =
    selectedVariant?.values[0]?.value || "";

  const handleAddToCart = async () => {
    if (!selectedVariant || isOutOfStock) return;

    setAdding(true);

    await addToCart({
      id: product.id,
      nombre: product.name,
      precio: selectedVariant.price,
      cantidad: quantity,
      image: mainImage,
      sku: selectedVariant.sku,
      stock: selectedVariant.stock,
      variant: `${selectedAttribute}: ${selectedValue}`,
    });

    setAdding(false);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 md:py-14 px-4 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-grayCustom">
        <a href="/" className="hover:text-turquoise transition-colors">Inicio</a>
        <span className="mx-2">/</span>
        <span className="text-darkGray font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <ProductGallery
            multimedia={multimedia}
            productName={product.name}
          />
        </div>

        {/* Product info */}
        <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
          {/* Name */}
          <h1
            className="text-3xl md:text-4xl font-bold text-darkGray leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <p className="text-3xl md:text-4xl font-extrabold text-turquoise">
              ${Number(selectedVariant?.price ?? product.price).toLocaleString('es-CL')}
            </p>
          </div>

          {/* SKU */}
          {selectedVariant && (
            <p className="text-sm text-grayCustom">
              SKU: <span className="font-medium text-darkGray">{selectedVariant.sku}</span>
            </p>
          )}

          {/* Description */}
          {product.description && (
            <div className="border-t border-b border-gray-100 py-5">
              <p className="text-base text-grayCustom leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Variant selector */}
          <div>
            <h3 className="text-sm font-semibold text-darkGray uppercase tracking-wider mb-3">
              {selectedAttribute}
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => {
                const label = v.values[0]?.value;
                const isSelected = selectedVariant?.id === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVariant(v);
                      setQuantity(1);
                    }}
                    disabled={v.stock === 0}
                    className={`
                      min-w-[52px] px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2
                      ${isSelected
                        ? "bg-turquoise text-white border-turquoise shadow-md shadow-turquoise/20"
                        : "bg-white text-darkGray border-gray-200 hover:border-turquoise"
                      }
                      ${v.stock === 0
                        ? "opacity-35 cursor-not-allowed !border-gray-200"
                        : ""
                      }
                    `}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stock */}
          {selectedVariant && (
            <div>
              {isOutOfStock ? (
                <div className="flex items-center gap-2 px-4 py-3 bg-red-50 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <p className="text-red-600 font-semibold text-sm">No disponible</p>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-3 bg-green-50 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <p className="text-green-700 font-semibold text-sm">
                    {stock} {stock === 1 ? 'unidad disponible' : 'unidades disponibles'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Quantity */}
          {!isOutOfStock && selectedVariant && (
            <div>
              <h3 className="text-sm font-semibold text-darkGray uppercase tracking-wider mb-3">
                Cantidad
              </h3>
              <div className="inline-flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center text-lg font-bold text-darkGray hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="w-14 h-12 flex items-center justify-center text-lg font-bold text-darkGray border-x-2 border-gray-200">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => (q < stock ? q + 1 : q))}
                  className="w-12 h-12 flex items-center justify-center text-lg font-bold text-darkGray hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-3 pt-2">
            <button
              disabled={!selectedVariant || isOutOfStock || adding}
              onClick={handleAddToCart}
              className={`
                w-full py-4 rounded-xl text-base font-bold transition-all duration-300 flex items-center justify-center gap-2
                ${!selectedVariant || isOutOfStock
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : success
                    ? "bg-green-500 text-white"
                    : "bg-turquoise text-white hover:bg-darkTurquoise shadow-lg shadow-turquoise/20 hover:shadow-turquoise/30"
                }
              `}
            >
              {adding ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Agregando...
                </>
              ) : success ? (
                <>
                  <FaCheck size={16} />
                  Agregado al carrito
                </>
              ) : (
                <>
                  <FaShoppingCart size={16} />
                  Agregar al carrito
                </>
              )}
            </button>

            <a
              href={`https://wa.me/56978843627?text=Hola!%20Estoy%20interesado%20en%20este%20producto:%0A${encodeURIComponent(product.name)}%0A${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-green-500 text-green-600 font-bold text-base hover:bg-green-500 hover:text-white transition-all duration-300"
            >
              <FaWhatsapp size={20} />
              Comprar por WhatsApp
            </a>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50">
              <FaTruck className="text-turquoise flex-shrink-0" size={18} />
              <p className="text-xs text-grayCustom font-medium">Envio a todo Chile</p>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50">
              <FaShieldAlt className="text-turquoise flex-shrink-0" size={18} />
              <p className="text-xs text-grayCustom font-medium">Productos originales</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
