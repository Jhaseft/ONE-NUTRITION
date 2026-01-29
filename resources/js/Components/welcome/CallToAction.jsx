import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-darkGray to-darkTurquoise relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-turquoise/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-turquoise/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Necesitas ayuda para elegir?
          </h2>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Contactanos por WhatsApp y te asesoramos de forma personalizada.
            Estamos para ayudarte a encontrar los mejores productos para ti.
          </p>

          <a
            href="https://wa.me/56978843627"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-turquoise text-white font-semibold text-lg rounded-full hover:bg-white hover:text-darkGray transition-all duration-300 shadow-xl shadow-turquoise/20 hover:shadow-turquoise/40"
          >
            <FaWhatsapp size={24} />
            Escribenos por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
