import { useState } from 'react';
import axios from '../../utils/axios';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import noImage from '/noImage.jpg'

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

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

  return (
    <div className="w-full h-[10vh] relative z-50 flex items-center justify-center px-4 sm:px-6">
      <div className="flex items-center bg-[#1b1a20]/80 backdrop-blur-md border border-zinc-800 focus-within:border-[#6556CD]/50 w-full sm:w-[70%] max-w-3xl h-[55px] rounded-full px-5 shadow-lg relative transition-all duration-300">
        <i className="text-xl text-zinc-400 ri-search-2-line group-focus-within:text-[#6556CD] transition-colors"></i>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          placeholder="Search for a movie, tv show, person..."
          className="outline-none w-full mx-4 text-white placeholder:text-zinc-500 text-sm sm:text-base bg-transparent"
        />
        {query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="text-xl sm:text-2xl cursor-pointer text-zinc-400 hover:text-white ri-close-fill transition-colors"
          ></i>
        )}
      </div>

      {query.length > 0 && searches.length > 0 && (
        <div className="absolute top-[100%] mt-2 w-full sm:w-[70%] max-w-3xl max-h-[50vh] bg-[#1b1a20] border border-zinc-800 overflow-y-auto rounded-xl shadow-2xl z-[100] custom-scrollbar">
          {searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="hover:bg-[#27272a] hover:text-[#6556CD] duration-200 text-zinc-300 w-full p-3 sm:p-4 flex items-center border-b border-zinc-800 last:border-none group"
              onClick={() => setQuery("")}
            >
              <img
                className="w-12 h-16 sm:w-14 sm:h-20 shadow-md rounded object-cover mr-4 group-hover:scale-105 transition-transform"
                src={
                  s.backdrop_path || s.poster_path || s.profile_path || s.logo_path
                    ? `https://image.tmdb.org/t/p/w200/${s.poster_path || s.profile_path || s.backdrop_path || s.logo_path
                    }`
                    : noImage
                }
                alt=""
              />
              <div className="flex flex-col overflow-hidden">
                <span className="font-semibold text-sm sm:text-base truncate group-hover:text-white transition-colors">
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
  );
};

export default Topnav;