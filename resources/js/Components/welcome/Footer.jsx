import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="bg-white text-center py-12 mt-10 border-t border-darkTurquoise shadow-inner"
      
    >
    
      <p className="text-black font-medium tracking-wide mb-6">
        © {new Date().getFullYear()} ONE NUTRITION — Todos los derechos reservados.
      </p>

      
      <div className="flex justify-center mb-6">
        <a
          href="https://www.instagram.com/maro_uniformes_?igsh=MTZwcm02bzdmMnl5ZA=="
          target="_blank"
          rel="noopener noreferrer"
          className="text-turquoise hover:text-darkTurquoise transition-colors"
        >
          <FaInstagram size={36} />
        </a>
      </div> 
 
      <div className="text-black text-sm space-y-3">
        <p className="text-lg text-turquoise font-semibold">
           56 978843627
        </p>

        <p className="text-xs tracking-wide">
          Política de privacidad | Términos de uso
        </p>

        <div className="mt-4 text-grayCustom font-medium">
          <p className="text-turquoise font-semibold mb-1">CHILE 🇨🇱</p>
          <p className="text-black">Atención personalizada vía WhatsApp e Instagram</p>
        </div>
      </div>
    </footer>
  );
}
