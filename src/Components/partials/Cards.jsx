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
    <div className="grid w-full h-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-7 px-2 sm:px-4 md:px-5 mt-6 sm:mt-10 mb-10">
      {data.map((item, i) => {
        const percentage = item.vote_average ? (item.vote_average * 10).toFixed() : 0;
        const strokeColor = percentage >= 70 ? '#22c55e' : percentage >= 50 ? '#eab308' : '#ef4444';
        const isSaved = isInWatchlist(item.id);

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            key={i}
            className="flex h-full"
          >
            <Link
              to={`/${item.media_type || title || 'movie'}/details/${item.id}`}
              className="group relative flex flex-col w-full h-full bg-[#1b1a20] rounded-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(101,86,205,0.3)] hover:-translate-y-2 border border-transparent hover:border-[#6556CD]/30 overflow-hidden"
            >
              <div className="w-full aspect-[2/3] overflow-hidden relative bg-[#1F1E24]">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={
                    item.poster_path ||
                      item.backdrop_path ||
                      item.profile_path ||
                      item.logo_path ||
                      item.still_path
                      ? `https://image.tmdb.org/t/p/w500/${item.poster_path || item.backdrop_path || item.profile_path || item.logo_path || item.still_path}`
                      : noImage
                  }
                  alt={item.name || item.title || item.original_name}
                  loading="lazy"
                />

                {/* Hover Play Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#6556CD] rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(101,86,205,0.6)] transform scale-50 group-hover:scale-100 transition-transform duration-300 delay-100">
                    <i className="ri-play-large-fill text-xl sm:text-2xl ml-1"></i>
                  </div>
                </div>

                {/* Rating Badge */}
                {item.vote_average > 0 && (
                  <div className="absolute bottom-2 left-2 bg-[#081c22] rounded-full p-[2px] shadow-lg transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-[#081c22] rounded-full">
                      <svg className="w-full h-full -rotate-90 absolute inset-0" viewBox="0 0 36 36">
                        <path
                          className="text-white/10"
                          strokeWidth="3"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          style={{ stroke: strokeColor }}
                          className="transition-all duration-1000 ease-out"
                          strokeWidth="3"
                          strokeDasharray={`${percentage}, 100`}
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="text-white text-[8px] sm:text-[10px] font-bold">
                        {percentage}<sup className="text-[6px] sm:text-[7px]">%</sup>
                      </span>
                    </div>
                  </div>
                )}

                {/* Media Type Badge */}
                {(item.media_type || title) && (
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[8px] sm:text-[10px] uppercase font-bold px-2 py-1 rounded shadow-md border border-white/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.media_type || title}
                  </div>
                )}

                {/* Watchlist Toggle Button */}
                <button
                  onClick={(e) => toggleWatchlist(e, item)}
                  className="absolute top-2 right-2 w-8 h-8 sm:w-9 sm:h-9 bg-black/60 backdrop-blur-md rounded-full shadow-lg border border-white/10 z-20 flex items-center justify-center text-white hover:bg-[#6556CD] transition-all hover:scale-110 active:scale-95"
                  title={isSaved ? "Remove from Watchlist" : "Add to Watchlist"}
                >
                  <i className={`${isSaved ? 'ri-bookmark-fill text-[#6556CD] hover:text-white' : 'ri-bookmark-line'} text-sm sm:text-base transition-colors`}></i>
                </button>
              </div>

              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-start z-10 bg-gradient-to-t from-[#1b1a20] via-[#1b1a20] to-transparent">
                <h1 className="text-zinc-200 text-sm sm:text-base font-bold line-clamp-2 group-hover:text-[#6556CD] transition-colors duration-300">
                  {item.name || item.title || item.original_name}
                </h1>
                <p className="text-zinc-500 text-xs sm:text-sm mt-1 sm:mt-2 font-medium">
                  {item.release_date || item.first_air_date ? new Date(item.release_date || item.first_air_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Coming Soon"}
                </p>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Cards;