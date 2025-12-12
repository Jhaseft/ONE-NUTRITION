import { useState } from "react";

export default function ProductModal({ product, imageUrl, closeModal, handleAddToCart }) {
  const [closing, setClosing] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const startClose = () => {
    setClosing(true);
    setTimeout(() => closeModal(), 250);
  };

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  const stock = selectedVariant?.stock || 0;
  const isOutOfStock = stock === 0;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[9999] px-4 
      ${closing ? "animate-fade-out" : "animate-fade-in"}`}
    >
      
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={startClose}
      ></div>

      
      <div
        className={`
          bg-white rounded-2xl shadow-xl w-full max-w-5xl relative overflow-hidden
          ${closing ? "animate-modal-exit" : "animate-swing-drop-in"}
        `}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">

          
          <div className="relative w-full h-[350px] md:h-[500px] overflow-hidden bg-gray-100">
            <img
              src={imageUrl}
              alt={product.name}
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={handleMouseMove}
              className={`
                w-full h-full object-cover transition-transform duration-300 
                ${zoom ? "scale-150 cursor-crosshair" : "scale-100 cursor-zoom-in"}
              `}
              style={{
                transformOrigin: `${position.x}% ${position.y}%`,
              }}
            />
          </div>

         
          <div className="p-6 space-y-5 overflow-y-auto max-h-[90vh]">

            <h2 className="text-3xl font-extrabold uppercase">{product.name}</h2>

            <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>

            <p className="text-3xl font-bold">Bs {Number(product.price).toFixed(2)}</p>

            
            <h3 className="text-xl font-semibold mt-4">Selecciona tu talla:</h3>

            <div className="flex flex-wrap gap-3">
              {product.variants?.map((v) => {
                const label = v.values.map((val) => val.value).join(", ");

                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    disabled={v.stock === 0}
                    className={`
                      w-8 h-8 flex items-center justify-center rounded-xl border text-lg font-bold
                      transition-all
                      ${
                        selectedVariant?.id === v.id
                          ? "bg-black text-white border-black"
                          : "bg-white border-gray-400 text-black"
                      }
                      ${v.stock === 0 ? "opacity-40 cursor-not-allowed" : "hover:border-black"}
                    `}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

         
            {selectedVariant && (
              <div className="mt-4">
                {isOutOfStock ? (
                  <p className="text-red-600 font-bold">NO DISPONIBLE</p>
                ) : (
                  <>
                    <p className="text-gray-700 font-semibold mb-1">Stock disponible: {stock}</p>

                   
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 transition-all"
                        style={{
                          width: `${Math.min((stock / 20) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
            )}

            {!isOutOfStock && selectedVariant && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Selecciona la cantidad:</h3>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center border rounded-full text-2xl"
                  >
                    -
                  </button>

                  <span className="text-xl font-bold">{quantity}</span>

                  <button
                    onClick={() =>
                      setQuantity((q) => (q < stock ? q + 1 : q))
                    }
                    className="w-10 h-10 flex items-center justify-center border rounded-full text-2xl"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

         
            <button
              disabled={!selectedVariant || isOutOfStock}
              onClick={() =>
                handleAddToCart({
                  id: selectedVariant.id,
                  nombre: product.name,
                  precio: product.price,
                  cantidad: quantity,
                  image: imageUrl,
                })
              }
              className={`
                mt-6 w-full py-3 rounded-xl text-lg font-bold transition
                ${
                  !selectedVariant || isOutOfStock
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-900"
                }
              `}
            >
              Añadir al carrito
            </button>

           
            <button
              onClick={startClose}
              className="w-full mt-2 py-3 rounded-xl border text-lg font-bold"
            >
              Cerrar
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
