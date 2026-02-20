import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import noImage from '/noImage.jpg';

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const GetSearches = async () => {
    if (!query.trim()) {
      setSearches([]);
      return;
    }
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`)
      setSearches(data.results)
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    const defaultTimer = setTimeout(() => {
      GetSearches();
    }, 300); // 300ms debounce
    return () => clearTimeout(defaultTimer);
  }, [query])

  // Mobile Search Overlay Toggle Trigger (This would typically be called from the Bottom Nav or a floating button if Topnav is just the overlay, but since Topnav renders the bar itself, we handle the responsive split here)

  return (
    <>
      {/* Desktop Search Bar (Hidden on Mobile) */}
      <div className="hidden md:flex w-full h-[10vh] relative z-50 items-center justify-center px-6">
        <div className="flex items-center bg-[#1b1a20]/80 backdrop-blur-md border border-zinc-800 focus-within:border-[#6556CD]/50 w-[70%] max-w-3xl h-[55px] rounded-full px-5 shadow-lg relative transition-all duration-300">
          <i className="text-xl text-zinc-400 ri-search-2-line group-focus-within:text-[#6556CD] transition-colors"></i>
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            type="text"
            placeholder="Search for a movie, tv show, person..."
            className="outline-none w-full mx-4 text-white placeholder:text-zinc-500 text-base bg-transparent"
          />
          {query.length > 0 && (
            <i
              onClick={() => setQuery("")}
              className="text-2xl cursor-pointer text-zinc-400 hover:text-white ri-close-fill transition-colors"
            ></i>
          )}
        </div>

        {query.length > 0 && searches.length > 0 && (
          <div className="absolute top-[100%] mt-2 w-[70%] max-w-3xl max-h-[50vh] bg-[#1b1a20] border border-zinc-800 overflow-y-auto rounded-xl shadow-2xl z-[100] custom-scrollbar">
            {searches.map((s, i) => (
              <Link
                to={`/${s.media_type}/details/${s.id}`}
                key={i}
                className="hover:bg-[#27272a] hover:text-[#6556CD] duration-200 text-zinc-300 w-full p-4 flex items-center border-b border-zinc-800 last:border-none group"
                onClick={() => setQuery("")}
              >
                <img
                  className="w-14 h-20 shadow-md rounded object-cover mr-4 group-hover:scale-105 transition-transform"
                  src={
                    s.backdrop_path || s.poster_path || s.profile_path || s.logo_path
                      ? `https://image.tmdb.org/t/p/w200/${s.poster_path || s.profile_path || s.backdrop_path || s.logo_path
                      }`
                      : noImage
                  }
                  alt=""
                />
                <div className="flex flex-col overflow-hidden">
                  <span className="font-semibold text-base truncate group-hover:text-white transition-colors">
                    {s.name || s.title || s.original_name || s.original_title}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs uppercase bg-zinc-800 text-zinc-400 px-2 py-[2px] rounded-full group-hover:bg-[#6556CD]/20 group-hover:text-[#6556CD]">
                      {s.media_type}
                    </span>
                    {s.vote_average > 0 && (
                      <span className="text-xs text-yellow-500 font-medium flex items-center gap-1">
                        <i className="ri-star-fill"></i> {(s.vote_average).toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Search Bar Trigger (Visible on Mobile) */}
      <div className="md:hidden w-full px-4 mt-2">
        <div
          onClick={() => setIsMobileSearchOpen(true)}
          className="flex items-center bg-white/5 backdrop-blur-md border border-white/10 w-full h-[45px] rounded-full px-4 shadow-sm"
        >
          <i className="text-lg text-zinc-400 ri-search-2-line"></i>
          <span className="mx-3 text-zinc-500 text-sm">Tap to search...</span>
        </div>
      </div>

      {/* Mobile Full-Screen Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="fixed inset-0 z-[200] bg-[#121115]/95 backdrop-blur-xl md:hidden overflow-hidden flex flex-col pt-4 px-4"
          >
            {/* Search Input Area */}
            <div className="flex items-center gap-3 w-full mb-4">
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white active:bg-white/10 transition-colors"
              >
                <i className="ri-arrow-left-line text-xl"></i>
              </button>
              <div className="flex-1 flex items-center bg-[#1b1a20] border border-[#6556CD]/50 h-[50px] rounded-full px-4 shadow-[0_0_15px_rgba(101,86,205,0.2)]">
                <input
                  autoFocus
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  type="text"
                  placeholder="Search titles, peope, genres..."
                  className="outline-none w-full text-white placeholder:text-zinc-500 text-sm bg-transparent"
                />
                {query.length > 0 && (
                  <i
                    onClick={() => setQuery("")}
                    className="text-xl cursor-pointer text-zinc-400 active:text-white ri-close-fill ml-2"
                  ></i>
                )}
              </div>
            </div>

            {/* Mobile Search Results */}
            <div className="flex-1 overflow-y-auto pb-24 custom-scrollbar">
              {query.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh] opacity-50 text-zinc-500 gap-3">
                  <i className="ri-search-2-line text-5xl"></i>
                  <p>Type something to search</p>
                </div>
              ) : searches.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {searches.map((s, i) => (
                    <Link
                      to={`/${s.media_type}/details/${s.id}`}
                      key={i}
                      className="bg-white/5 active:bg-white/10 p-3 rounded-xl flex items-center gap-4 transition-colors border border-transparent active:border-white/10"
                      onClick={() => {
                        setQuery("");
                        setIsMobileSearchOpen(false);
                      }}
                    >
                      <img
                        className="w-12 h-16 shadow-md rounded-lg object-cover"
                        src={
                          s.backdrop_path || s.poster_path || s.profile_path || s.logo_path
                            ? `https://image.tmdb.org/t/p/w200/${s.poster_path || s.profile_path || s.backdrop_path || s.logo_path}`
                            : noImage
                        }
                        alt=""
                      />
                      <div className="flex flex-col overflow-hidden flex-1">
                        <span className="font-semibold text-sm text-white truncate">
                          {s.name || s.title || s.original_name || s.original_title}
                        </span>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] uppercase bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded flex items-center gap-1">
                            <i className={s.media_type === 'movie' ? 'ri-movie-2-line' : s.media_type === 'tv' ? 'ri-tv-line' : 'ri-user-line'}></i> {s.media_type}
                          </span>
                          {s.vote_average > 0 && (
                            <span className="text-[10px] text-yellow-500 font-medium flex items-center gap-1">
                              <i className="ri-star-fill"></i> {(s.vote_average).toFixed(1)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center text-zinc-500 mt-10 text-sm">No results found for "{query}"</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Topnav;