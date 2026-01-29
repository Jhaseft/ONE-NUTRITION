import { Link } from "@inertiajs/react";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ product }) {
  const totalStock =
    product.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;

  const isOutOfStock = totalStock === 0;

  const imageUrl =
    product.multimedia?.[0]?.url ||
    "https://via.placeholder.com/600x800";

  return (
    <Link
      href={`/products/${product.name.replace(/\s+/g, '-').toLowerCase()}/${product.id}`}
      className="group block w-full h-full"
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl bg-white h-full shadow-sm border border-gray-100
          transition-all duration-500
          hover:-translate-y-2 hover:shadow-2xl hover:border-turquoise/30
          ${isOutOfStock ? "opacity-70" : ""}
        `}
      >
        {/* Image container - taller 4:5 ratio for bigger visual impact */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Quick action button */}
          {!isOutOfStock && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
              <span className="flex items-center gap-2 px-5 py-2.5 bg-white text-darkGray text-sm font-semibold rounded-full shadow-lg hover:bg-turquoise hover:text-white transition-colors duration-200 whitespace-nowrap">
                <FaShoppingCart size={14} />
                Ver producto
              </span>
            </div>
          )}

          {/* Out of stock badge */}
          {isOutOfStock && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-darkGray/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                Agotado
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Name */}
          <h3 className="text-lg font-bold text-darkGray leading-snug mb-3 line-clamp-2 group-hover:text-turquoise transition-colors duration-300">
            {product.name}
          </h3>

          {/* Variants */}
          {product.variants?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.variants.slice(0, 4).map(v => (
                <span
                  key={v.id}
                  className={`
                    px-3 py-1 text-xs font-medium rounded-lg transition-colors
                    ${v.stock === 0
                      ? "bg-gray-100 text-gray-400 line-through"
                      : "bg-turquoise/10 text-darkTurquoise border border-turquoise/20"}
                  `}
                >
                  {v.values[0]?.value}
                </span>
              ))}
              {product.variants.length > 4 && (
                <span className="px-3 py-1 text-xs font-medium text-grayCustom bg-gray-100 rounded-lg">
                  +{product.variants.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Price row */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <p className="text-2xl font-extrabold text-turquoise tracking-tight">
              ${Number(product.price).toLocaleString('es-CL')}
            </p>
            {!isOutOfStock && (
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                Disponible
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
