import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="bg-black text-center py-10 mt-10 border-t border-gray-800 shadow-inner"
      style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '1px' }}
    >
      {/* Derechos reservados */}
      <p className="text-white font-medium tracking-wide mb-6">
        © {new Date().getFullYear()} Exclusive — Todos los derechos reservados.
      </p>

      {/* Redes sociales */}
      <div className="flex justify-center space-x-6 mb-6 text-white">
        <a href="https://www.instagram.com/exclusiveoruro?igsh=MWs1NmVzZzV0d3gyMw==" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
          <FaInstagram size={24} />
        </a>
        <a href="https://www.tiktok.com/@exclusive_oruro1?_r=1&_t=ZM-91yD4bYr6yJ" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
          <FaTiktok size={24} />
        </a>
      </div>

      {/* Información de contacto y sucursales */}
      <div className="text-gray-400 text-sm space-y-3">
        <p>Contacto: info@exclusive.com</p>
        <p>Política de privacidad | Términos de uso</p>

        <div className="mt-3 text-white font-semibold">
          <p>BOLIVIA 🇧🇴</p>
          <p>Oruro #1: 6 de Octubre y Herrera, 1er piso — Lunes a Sábado 9:00am - 21:00pm</p>
          <p>Oruro #2: Junín y Pagador, Edificio Ruby (al lado de los baños)</p>
        </div>
      </div>
    </footer>
  );
}
