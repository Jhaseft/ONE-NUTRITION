import { useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";

export default function ProductGallery({ multimedia, productName }) {
  const orderedMultimedia = [
    ...multimedia.filter(m => m.type !== "video"),
    ...multimedia.filter(m => m.type === "video"),
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);

  const selectedMedia = orderedMultimedia[selectedIndex];

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  const openLightbox = (index) => {
    if (window.innerWidth < 768) {
      setLightbox(index);
    }
  };

  const navigateLightbox = (dir) => {
    setLightbox(prev => {
      const next = prev + dir;
      if (next < 0) return orderedMultimedia.length - 1;
      if (next >= orderedMultimedia.length) return 0;
      return next;
    });
  };

  if (orderedMultimedia.length === 0) return null;

  return (
    <>
      <div className="space-y-4">
        {/* Main image */}
        <div
          className="relative w-full aspect-square overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 cursor-zoom-in"
          onMouseEnter={() => window.innerWidth >= 768 && setIsZoomed(true)}
          onMouseLeave={() => { setIsZoomed(false); setPosition({ x: 50, y: 50 }); }}
          onMouseMove={handleMouseMove}
          onClick={() => openLightbox(selectedIndex)}
        >
          {selectedMedia?.type === "video" ? (
            <video
              src={selectedMedia.url}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={selectedMedia?.url}
              alt={productName}
              className={`w-full h-full transition-transform duration-300 ${
                isZoomed ? "scale-[2] object-cover cursor-crosshair" : "object-contain scale-100"
              }`}
              style={{
                transformOrigin: `${position.x}% ${position.y}%`,
              }}
              draggable={false}
            />
          )}
        </div>

        {/* Thumbnails */}
        {orderedMultimedia.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {orderedMultimedia.map((media, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  selectedIndex === index
                    ? "border-turquoise shadow-md shadow-turquoise/20"
                    : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                }`}
              >
                {media.type === "video" ? (
                  <>
                    <video
                      src={media.url}
                      className="w-full h-full object-cover"
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <FaPlay className="text-white" size={12} />
                    </div>
                  </>
                ) : (
                  <img
                    src={media.url}
                    alt={`${productName}-${index}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100000] p-4">
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <FaTimes size={20} />
          </button>

          {orderedMultimedia.length > 1 && (
            <>
              <button
                onClick={() => navigateLightbox(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <FaChevronLeft size={16} />
              </button>
              <button
                onClick={() => navigateLightbox(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <FaChevronRight size={16} />
              </button>
            </>
          )}

          {orderedMultimedia[lightbox]?.type === "video" ? (
            <video
              src={orderedMultimedia[lightbox].url}
              controls
              autoPlay
              className="max-w-full max-h-full rounded-2xl"
            />
          ) : (
            <img
              src={orderedMultimedia[lightbox]?.url}
              alt={productName}
              className="max-w-full max-h-full object-contain rounded-2xl"
            />
          )}

          {/* Dots */}
          {orderedMultimedia.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {orderedMultimedia.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    lightbox === i ? "bg-turquoise w-6" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
