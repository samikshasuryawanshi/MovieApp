import { Link } from "react-router-dom";
import noImage from '/noImage.jpg'
import { useRef } from "react";
import { motion } from "framer-motion";

const HorizontalCards = ({ data }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group/container w-full">
      {data.length > 0 && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-[40%] text-2xl -translate-y-1/2 z-10 bg-black/50 hover:bg-[#6556CD] text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover/container:opacity-100 transition-all duration-300 disabled:opacity-0 hidden sm:flex cursor-pointer shadow-lg"
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-[40%] text-2xl -translate-y-1/2 z-10 bg-black/50 hover:bg-[#6556CD] text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover/container:opacity-100 transition-all duration-300 disabled:opacity-0 hidden sm:flex cursor-pointer shadow-lg"
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        className="w-full flex overflow-x-auto gap-4 sm:gap-5 pb-6 pt-2 px-1 snap-x snap-mandatory scrollbar-hide"
      >
        {data.length > 0 ? data.map((d, i) => {
          return (
            <Link
              to={`/${d.media_type || 'movie'}/details/${d.id}`}
              key={i}
              className="min-w-[75vw] xs:min-w-[60vw] sm:min-w-[45vw] md:min-w-[32vw] lg:min-w-[22vw] bg-[#1b1a20] rounded-xl flex-shrink-0 hover:-translate-y-2 transition-transform duration-300 snap-start border border-zinc-800 hover:border-[#6556CD]/50 group overflow-hidden shadow-md flex flex-col"
            >
              <div className="relative h-[20vh] sm:h-[25vh] overflow-hidden w-full bg-[#1F1E24]">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src={
                    d.backdrop_path || d.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${d.backdrop_path || d.poster_path}`
                      : noImage
                  }
                  alt={d.title || d.name || d.original_title || d.original_name}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1a20] via-black/30 to-transparent"></div>

                {d.vote_average > 0 && (
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md border border-white/10 flex items-center gap-1 shadow-md">
                    <i className="ri-star-fill text-yellow-500"></i>
                    {(d.vote_average).toFixed(1)}
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h1 className="text-base sm:text-lg font-bold truncate group-hover:text-[#6556CD] transition-colors drop-shadow-md">
                    {d.title || d.name || d.original_title || d.original_name}
                  </h1>
                </div>
              </div>
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 md:line-clamp-3 leading-relaxed">
                  {d.overview || "No description available."}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-zinc-500 font-medium pt-2 border-t border-zinc-800">
                  <span>{d.release_date || d.first_air_date ? new Date(d.release_date || d.first_air_date).getFullYear() : ""}</span>
                  <span className="text-[#6556CD] group-hover:underline">View Details <i className="ri-arrow-right-line"></i></span>
                </div>
              </div>
            </Link>
          )
        }) : (
          <div className="w-full py-10 flex flex-col items-center justify-center text-zinc-500">
            <i className="ri-movie-2-line text-5xl mb-3 text-zinc-600"></i>
            <h1 className="text-xl font-medium">Nothing to show right now</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default HorizontalCards;