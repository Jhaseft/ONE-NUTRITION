import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Maria G.',
    text: 'Excelente calidad de productos y la atencion por WhatsApp es super rapida. Muy recomendable!',
    rating: 5,
  },
  {
    name: 'Carlos P.',
    text: 'Llevo meses comprando aqui y siempre quedo satisfecho. Los envios son puntuales y todo llega en perfecto estado.',
    rating: 5,
  },
  {
    name: 'Andrea M.',
    text: 'Me encanta la variedad de productos que tienen. Me asesoran y siempre encuentro lo que necesito.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-turquoise/10 text-turquoise text-sm font-semibold tracking-wider uppercase mb-4">
            Testimonios
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-darkGray"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Lo que dicen nuestros <span className="text-turquoise">clientes</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Quote mark */}
              <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-turquoise flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                "
              </div>

              <div className="flex gap-1 mb-4 mt-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" size={16} />
                ))}
              </div>

              <p className="text-grayCustom leading-relaxed mb-6 italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-turquoise/10 flex items-center justify-center">
                  <span className="text-turquoise font-bold text-sm">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <p className="font-semibold text-darkGray">{t.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
