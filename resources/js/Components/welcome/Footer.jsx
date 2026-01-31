import { Link } from '@inertiajs/react';
import { FaInstagram, FaWhatsapp, FaFacebook, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-darkGray text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img
              src="https://res.cloudinary.com/dnbklbswg/image/upload/v1769090381/WhatsApp_Image_2026-01-22_at_09.56.18_2_yn4krk.jpg"
              alt="ONE NUTRITION"
              className="h-20 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Tu tienda de confianza para productos de nutricion y bienestar.
              Calidad, variedad y atencion personalizada.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-turquoise font-semibold text-lg mb-4">Enlaces</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-turquoise transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <a href="#productos" className="text-gray-400 hover:text-turquoise transition-colors text-sm">
                  Productos
                </a>
              </li>
              <li>
                <a href="#nosotros" className="text-gray-400 hover:text-turquoise transition-colors text-sm">
                  Nosotros
                </a>
              </li>
              <li>
                <Link href="/Contacto" className="text-gray-400 hover:text-turquoise transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-turquoise font-semibold text-lg mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FaPhone className="text-turquoise flex-shrink-0" size={14} />
                +34 631 07 88 30
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FaMapMarkerAlt className="text-turquoise flex-shrink-0" size={14} />
                Chile
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-turquoise font-semibold text-lg mb-4">Siguenos</h4>
            <p className="text-gray-400 text-sm mb-4">
              Atencion personalizada via WhatsApp e Instagram
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/one_nutrition_labs?igsh=ODN2aGNpamF3ZTlu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-turquoise hover:text-white transition-all duration-300"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/share/1CCoJ3pwgN/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-turquoise hover:text-white transition-all duration-300"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://wa.me/34631078830"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-turquoise hover:text-white transition-all duration-300"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} ONE NUTRITION — Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-xs">
            Politica de privacidad | Terminos de uso
          </p>
        </div>
      </div>
    </footer>
  );
}
