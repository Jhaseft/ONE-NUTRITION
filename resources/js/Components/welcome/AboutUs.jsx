import { motion } from 'framer-motion';
import { FaLeaf, FaHeart, FaTruck } from 'react-icons/fa';

export default function AboutUs() {
  return (
    <section id="nosotros" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-turquoise rounded-2xl" />
            <div className="relative bg-gradient-to-br from-turquoise/10 to-darkTurquoise/10 rounded-2xl p-6 flex items-center justify-center min-h-[450px]">
              <img
                src="https://res.cloudinary.com/dai7rtja6/image/upload/v1769822508/oneNutrition_k2sr7c.jpg"
                alt="ONE NUTRITION"
                className="w-full max-w-lg object-contain drop-shadow-xl rounded-lg"
              />
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-turquoise/10 text-turquoise text-sm font-semibold tracking-wider uppercase mb-4">
              Sobre nosotros
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-darkGray mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Comprometidos con tu{' '}
              <span className="text-turquoise">bienestar</span>
            </h2>
            <p className="text-grayCustom text-lg leading-relaxed mb-6">
              En ONE NUTRITION creemos que una buena alimentacion es la base de una vida plena.
              Seleccionamos cuidadosamente cada producto para ofrecerte lo mejor en nutricion,
              calidad y sabor.
            </p>
            <p className="text-grayCustom text-lg leading-relaxed mb-8">
              Nuestro compromiso es acompanarte en tu camino hacia un estilo de vida mas
              saludable, con productos de las mejores marcas y atencion personalizada.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-white shadow-sm">
                <FaLeaf className="mx-auto text-turquoise mb-2" size={28} />
                <p className="text-sm font-semibold text-darkGray">Natural</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-white shadow-sm">
                <FaHeart className="mx-auto text-turquoise mb-2" size={28} />
                <p className="text-sm font-semibold text-darkGray">Calidad</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-white shadow-sm">
                <FaTruck className="mx-auto text-turquoise mb-2" size={28} />
                <p className="text-sm font-semibold text-darkGray">Envios</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
