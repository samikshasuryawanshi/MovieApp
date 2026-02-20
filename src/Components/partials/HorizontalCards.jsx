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
        left: direction === 'left' ? -current.offsetWidth / 1.5 : current.offsetWidth / 1.5,
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
            className="absolute left-0 top-0 bottom-0 z-20 bg-black/50 hover:bg-black/80 text-white w-12 flex items-center justify-center opacity-0 group-hover/container:opacity-100 transition-all duration-300 disabled:opacity-0 hidden sm:flex cursor-pointer"
          >
            <i className="ri-arrow-left-s-line text-4xl transform transition-transform group-hover/container:scale-125"></i>
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-20 bg-black/50 hover:bg-black/80 text-white w-12 flex items-center justify-center opacity-0 group-hover/container:opacity-100 transition-all duration-300 disabled:opacity-0 hidden sm:flex cursor-pointer"
          >
            <i className="ri-arrow-right-s-line text-4xl transform transition-transform group-hover/container:scale-125"></i>
          </button>
        </>
      )}

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#141414] to-transparent z-10 pointer-events-none hidden sm:block"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#141414] to-transparent z-10 pointer-events-none hidden sm:block"></div>

      <div
        ref={scrollRef}
        className="w-full flex overflow-x-auto gap-2 sm:gap-3 py-4 md:py-8 px-1 snap-x snap-mandatory scrollbar-hide relative z-0"
      >
        {data.length > 0 ? data.map((d, i) => {
          return (
            <Link
              to={`/${d.media_type || 'movie'}/details/${d.id}`}
              key={i}
              className="min-w-[35vw] xs:min-w-[28vw] sm:min-w-[22vw] md:min-w-[18vw] lg:min-w-[14vw] rounded bg-[#141414] flex-shrink-0 transition-all duration-300 snap-start group relative"
            >
              <div className="relative aspect-[2/3] overflow-hidden w-full rounded shadow-sm group-hover:shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:scale-105 group-hover:z-30 group-hover:border-white/20 border border-transparent">
                <img
                  className="w-full h-full object-cover"
                  src={
                    d.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${d.poster_path}`
                      : noImage
                  }
                  alt={d.title || d.name || d.original_title || d.original_name}
                  loading="lazy"
                />

                {/* Netflix Style Hover Content overlay (visible only on desktop hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 lg:hidden group-hover:lg:flex pointer-events-none">

                  <div className="flex gap-2 items-center mb-1">
                    <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transform hover:scale-110 transition">
                      <i className="ri-play-fill text-lg ml-0.5"></i>
                    </button>
                    <button className="w-8 h-8 rounded-full border border-white/50 text-white flex items-center justify-center hover:border-white transform hover:scale-110 transition bg-black/50">
                      <i className="ri-add-line text-lg"></i>
                    </button>
                    <div className="ml-auto w-8 h-8 rounded-full border border-white/50 text-white flex items-center justify-center hover:border-white transform hover:scale-110 transition bg-black/50">
                      <i className="ri-arrow-down-s-line text-lg mt-0.5"></i>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-semibold text-white mt-1">
                    <span className="text-[#46d369]">{Math.round((d.vote_average * 10))}% Match</span>
                    <span className="border border-white/40 px-1 rounded text-[8px]">HD</span>
                  </div>
                  <h1 className="text-xs font-bold text-white line-clamp-1 mt-1">
                    {d.title || d.name || d.original_title || d.original_name}
                  </h1>
                </div>

                {/* Top badges (always visible if conditions met) */}
                {d.media_type && (
                  <div className="absolute top-2 left-2 pointer-events-none">
                    <span className="bg-[#E50914] text-white text-[8px] sm:text-[10px] font-black px-1.5 py-[1px] rounded-[2px] tracking-wider uppercase drop-shadow-md">
                      {d.media_type === 'tv' ? 'Series' : 'Film'}
                    </span>
                  </div>
                )}

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