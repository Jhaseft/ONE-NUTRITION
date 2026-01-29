import { motion } from 'framer-motion';

export default function Videos() {
  const videos = [
    "https://res.cloudinary.com/ds2tkqwtr/video/upload/v1765626231/video3_onxuao.mp4",
    "https://res.cloudinary.com/ds2tkqwtr/video/upload/v1765626226/WhatsApp_Video_2025-12-11_at_06.54.18_o4bzdd.mp4",
    "https://res.cloudinary.com/ds2tkqwtr/video/upload/v1765626221/video_2_pbjrvx.mp4"
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-turquoise/10 text-turquoise text-sm font-semibold tracking-wider uppercase mb-4">
            Novedades
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-darkGray"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Mira lo <span className="text-turquoise">nuevo</span>
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
