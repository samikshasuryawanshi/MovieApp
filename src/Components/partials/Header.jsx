import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%), url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path || data.poster_path})`,
        backgroundPosition: "center 10%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] flex flex-col justify-end items-start p-4 pb-8 sm:p-10 md:p-16 rounded-xl overflow-hidden relative mb-8 border border-zinc-800 shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#1F1E24] via-[#1F1E24]/30 to-transparent opacity-90 sm:opacity-80"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full sm:w-[85%] lg:w-[65%] xl:w-[50%] relative z-10 flex flex-col gap-2 sm:gap-4"
      >
        <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-black drop-shadow-2xl leading-tight">
          {data.title || data.name || data.original_name || data.original_title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs md:text-sm font-semibold text-white">
          {data.vote_average > 0 && (
            <span className="flex items-center gap-1 bg-yellow-500/20 text-yellow-500 px-3 py-1.5 rounded-full border border-yellow-500/30 backdrop-blur-md">
              <i className="ri-star-fill"></i>
              {data.vote_average.toFixed(1)} Rating
            </span>
          )}
          <span className="flex items-center gap-1 bg-[#6556CD]/20 text-[#6556CD] px-3 py-1.5 rounded-full border border-[#6556CD]/30 backdrop-blur-md uppercase tracking-wider">
            <i className="ri-album-fill"></i>
            {data.media_type || 'movie'}
          </span>
          <span className="flex items-center gap-1 bg-white/10 text-zinc-300 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <i className="ri-calendar-event-fill"></i>
            {data.release_date || data.first_air_date || "Coming Soon"}
          </span>
        </div>

        <p className="text-zinc-200 text-xs sm:text-sm md:text-base line-clamp-3 md:line-clamp-4 drop-shadow-lg max-w-2xl leading-relaxed">
          {data.overview}
        </p>

        <div className="flex items-center gap-4 mt-3 sm:mt-4">
          <Link
            to={`/${data.media_type || 'movie'}/details/${data.id}`}
            className="flex items-center gap-2 text-white font-semibold text-sm sm:text-base px-6 py-3 bg-[#6556CD] hover:bg-[#6556CD]/80 hover:scale-105 duration-300 rounded-lg shadow-[0_0_20px_rgba(101,86,205,0.4)] transition-all"
          >
            <i className="ri-play-large-fill"></i> Watch Trailer
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;