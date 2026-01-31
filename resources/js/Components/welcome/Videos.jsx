import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaPlay, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

function VideoCard({ src, index }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white relative group"
    >
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        className="w-full h-auto cursor-pointer"
        onClick={togglePlay}
      />

      {/* Play overlay - shown when paused */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          onClick={togglePlay}
        >
          <div className="w-16 h-16 rounded-full bg-turquoise/90 flex items-center justify-center">
            <FaPlay className="text-white ml-1" size={24} />
          </div>
        </div>
      )}

      {/* Mute/Unmute button - shown when playing */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
        >
          {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
        </button>
      )}
    </motion.div>
  );
}

export default function Videos() {
  const videos = [
    "https://res.cloudinary.com/dai7rtja6/video/upload/v1769821697/FDownloader.net-1660932715316464-_1080p_d3essj.mp4",
    "https://res.cloudinary.com/dai7rtja6/video/upload/v1769821844/FDownloader.net-1610849050270532-_1080p_lsrcoh.mp4",
    "https://res.cloudinary.com/dai7rtja6/video/upload/v1769822024/FDownloader.net-1933544390926652-_1080p_jgqd0v.mp4"
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
            <VideoCard key={index} src={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
