import { Link } from "react-router-dom";
import noImage from '/noImage.jpg'
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Cards = ({ data, title }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const loadWatchlist = () => {
      const saved = localStorage.getItem('cinemate_watchlist');
      if (saved) setWatchlist(JSON.parse(saved));
    };
    loadWatchlist();
    window.addEventListener('watchlistUpdated', loadWatchlist);
    return () => window.removeEventListener('watchlistUpdated', loadWatchlist);
  }, []);

  const toggleWatchlist = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    let currentList = [...watchlist];
    const index = currentList.findIndex(i => i.id === item.id);

    if (index >= 0) {
      currentList.splice(index, 1);
    } else {
      currentList.push({ ...item, media_type: item.media_type || title || 'movie' });
    }

    setWatchlist(currentList);
    localStorage.setItem('cinemate_watchlist', JSON.stringify(currentList));
    window.dispatchEvent(new Event('watchlistUpdated'));
  };

  const isInWatchlist = (id) => {
    return watchlist.some(item => item.id === id);
  };

  return (
    <div className="grid w-full h-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4 md:gap-5 px-4 sm:px-8 md:px-12 lg:px-16 mt-6 sm:mt-10 mb-16">
      {data.map((item, i) => {
        const percentage = item.vote_average ? (item.vote_average * 10).toFixed() : 0;
        const strokeColor = percentage >= 70 ? '#46d369' : percentage >= 50 ? '#eab308' : '#e50914';
        const isSaved = isInWatchlist(item.id);
        const resolvedMediaType = item.media_type || title || 'movie';

        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: (i % 20) * 0.03 }}
            key={i}
            className="flex h-full w-full"
          >
            <Link
              to={`/${resolvedMediaType}/details/${item.id}`}
              className="group relative flex flex-col w-full bg-[#141414] rounded-md transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)] outline outline-2 outline-transparent hover:outline-white/30 border border-transparent overflow-hidden hover:z-50 hover:-translate-y-2"
            >
              <div className="w-full aspect-[2/3] overflow-hidden relative bg-[#181818]">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                      : item.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
                        : item.profile_path
                          ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                          : noImage
                  }
                  alt={item.name || item.title || item.original_name}
                  loading="lazy"
                />

                {/* Ambient Dark Gradient on bottom for text readability if overlayed */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* Minimalist Play Icon Hover State */}
                <div className="absolute inset-0 bg-[#0f1014]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                    <i className="ri-play-fill text-3xl md:text-4xl ml-1"></i>
                  </div>
                </div>

                {/* Netflix-style Corner Badge */}
                {resolvedMediaType && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="bg-[#E50914] text-white text-[8px] sm:text-[10px] uppercase font-black px-1.5 py-[2px] rounded-sm shadow-md tracking-wider">
                      {resolvedMediaType === 'tv' ? 'Series' : resolvedMediaType === 'movie' ? 'Film' : resolvedMediaType}
                    </span>
                  </div>
                )}

                {/* Watchlist Toggle - Right Top */}
                <button
                  onClick={(e) => toggleWatchlist(e, item)}
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full border z-20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-md ${isSaved
                      ? 'bg-white text-black border-transparent hover:bg-neutral-200'
                      : 'bg-black/50 text-white border-white/50 hover:border-white hover:bg-white/20'
                    } opacity-0 group-hover:opacity-100 sm:opacity-100`}
                  title={isSaved ? "Remove from Watchlist" : "Add to Watchlist"}
                >
                  <i className={`${isSaved ? 'ri-check-line text-lg' : 'ri-add-line text-lg'}`}></i>
                </button>

                {/* Percent Match Badge using custom logic over the cover */}
                {item.vote_average > 0 && (
                  <div className="absolute bottom-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-black/80 backdrop-blur text-[#46d369] text-[10px] font-bold px-1.5 py-0.5 rounded shadow-md border border-[#46d369]/30">
                      {percentage}% Match
                    </span>
                  </div>
                )}
              </div>

              {/* Data Section underneath poster */}
              <div className="p-2 sm:p-3 flex-1 flex flex-col justify-start bg-[#141414] border-t border-white/5 relative z-10 w-full">
                <h1 className="text-white text-xs sm:text-sm md:text-base font-bold line-clamp-1 group-hover:text-zinc-300 transition-colors duration-200">
                  {item.name || item.title || item.original_name}
                </h1>

                <div className="flex items-center gap-2 mt-1">
                  <p className="text-zinc-400 text-[10px] sm:text-xs font-semibold">
                    {item.release_date || item.first_air_date ? new Date(item.release_date || item.first_air_date).getFullYear() : "TBA"}
                  </p>
                  <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                  <span className="border border-zinc-600 px-1 rounded-[2px] text-[8px] sm:text-[9px] text-zinc-400 font-medium">U/A 16+</span>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Cards;