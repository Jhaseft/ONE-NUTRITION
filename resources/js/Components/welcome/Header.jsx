import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '#productos' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '/Contacto' },
];

export default function Header({ auth }) {
  const { props } = usePage();
  const [flashMessage, setFlashMessage] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    if (props?.flash?.success) {
      setFlashMessage({ type: 'success', message: props.flash.success });
      setTimeout(() => setFlashMessage(null), 2000);
    } else if (props?.flash?.error) {
      setFlashMessage({ type: 'error', message: props.flash.error });
      setTimeout(() => setFlashMessage(null), 3000);
    }
  }, [props]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
      } else {
        // Not on the home page — navigate to home with the hash
        window.location.href = '/' + href;
      }
    }
  };

  return (
    <>
      <header
        className={`w-full bg-white/95 backdrop-blur-md sticky top-0 z-[100] transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'border-b border-gray-100'
          }`}
      >
        {/* Fixed height container - prevents layout shift */}
        <div className="container mx-auto flex justify-between items-center px-6 h-24">
          <Link href="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/dai7rtja6/image/upload/v1769822795/logo-one-nutrition-removebg-preview_rlwgbi.png"
              alt="Logo de la tienda"
              className={`h-24 w-52 md:h-28 md:w-64 object-contain transition-transform duration-300 origin-left ${scrolled ? 'scale-[0.85]' : 'scale-100'
                }`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative text-base font-semibold text-darkGray transition-all duration-300 hover:text-turquoise after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-turquoise after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-base font-semibold text-darkGray transition-all duration-300 hover:text-turquoise after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-turquoise after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-darkGray hover:bg-gray-100 transition"
          >
            {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <nav className="flex flex-col px-6 pb-4 border-t border-gray-100">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="py-3 text-base font-medium text-darkGray hover:text-turquoise transition-colors border-b border-gray-50 last:border-0"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="py-3 text-base font-medium text-darkGray hover:text-turquoise transition-colors border-b border-gray-50 last:border-0"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>
        </div>
      </header>

      {flashMessage && (
        <div
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-[200] transition-all duration-500
            ${flashMessage.type === 'success' ? 'bg-darkGray text-white' : 'bg-red-600 text-white'}
            px-6 py-4 rounded-xl shadow-xl animate-slideDown`}
        >
          {flashMessage.message}
        </div>
      )}

      <style>
        {`
          @keyframes slideDown {
            0% { opacity: 0; transform: translateY(-20px) translateX(-50%); }
            100% { opacity: 1; transform: translateY(0) translateX(-50%); }
          }
          .animate-slideDown {
            animation: slideDown 0.5s ease-out forwards;
          }
        `}
      </style>
    </>
  );
}
