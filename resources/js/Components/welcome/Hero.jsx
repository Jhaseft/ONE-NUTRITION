import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-darkGray via-gray-900 to-darkTurquoise min-h-[70vh] flex items-center">
      {/* Decorative circles */}
      <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full bg-turquoise/10 blur-3xl" />
      <div className="absolute bottom-[-60px] left-[-60px] w-96 h-96 rounded-full bg-turquoise/5 blur-3xl" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-turquoise/20 text-turquoise text-sm font-semibold tracking-wider uppercase mb-6">
              Nutricion de calidad
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Tu bienestar comienza con lo que{' '}
              <span className="text-turquoise">consumes</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              Descubre nuestra seleccion de productos pensados para potenciar tu salud, rendimiento y estilo de vida.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#productos"
                className="px-8 py-3.5 bg-turquoise text-white font-semibold rounded-full hover:bg-darkTurquoise transition-all duration-300 shadow-lg shadow-turquoise/25 hover:shadow-turquoise/40"
              >
                Ver productos
              </a>
              <a
                href="#nosotros"
                className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-full hover:border-turquoise hover:text-turquoise transition-all duration-300"
              >
                Conocenos
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-turquoise/20 rounded-full blur-3xl scale-75" />
              <img
                src="https://res.cloudinary.com/dai7rtja6/image/upload/v1769822795/logo-one-nutrition-removebg-preview_rlwgbi.png"
                alt="ONE NUTRITION"
                className="relative w-[28rem] h-[28rem] object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
