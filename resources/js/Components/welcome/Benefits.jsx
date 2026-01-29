import { motion } from 'framer-motion';
import { FaShieldAlt, FaStar, FaShippingFast, FaHeadset } from 'react-icons/fa';

const benefits = [
  {
    icon: FaShieldAlt,
    title: 'Productos certificados',
    description: 'Trabajamos solo con marcas reconocidas que garantizan la calidad de cada producto.',
  },
  {
    icon: FaStar,
    title: 'Seleccion premium',
    description: 'Cada producto es cuidadosamente seleccionado para ofrecerte lo mejor del mercado.',
  },
  {
    icon: FaShippingFast,
    title: 'Envio rapido',
    description: 'Recibe tus pedidos de forma rapida y segura en la comodidad de tu hogar.',
  },
  {
    icon: FaHeadset,
    title: 'Atencion personalizada',
    description: 'Te asesoramos por WhatsApp para que encuentres exactamente lo que necesitas.',
  },
];

export default function Benefits() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-turquoise/10 text-turquoise text-sm font-semibold tracking-wider uppercase mb-4">
            Ventajas
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-darkGray"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Por que elegir <span className="text-turquoise">ONE NUTRITION</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group text-center p-8 rounded-2xl border border-gray-100 hover:border-turquoise/30 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-turquoise/10 flex items-center justify-center group-hover:bg-turquoise group-hover:scale-110 transition-all duration-300">
                <benefit.icon className="text-turquoise group-hover:text-white transition-colors duration-300" size={28} />
              </div>
              <h3 className="text-lg font-bold text-darkGray mb-3">
                {benefit.title}
              </h3>
              <p className="text-grayCustom text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
