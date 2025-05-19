import { useState } from 'react';
import axios from '../../utils/axios';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import noImage from '/noImage.jpg'


const Topnav = () => {
    const [query, setQuery] = useState("");
    const [searches, setSearches] = useState([]);


    const GetSearches = async () => {
        try {
          const {data} = await axios.get(`/search/multi?query=${query}`)
        //   console.log(data.results);
          setSearches(data.results)
          } catch (error) {
          console.log("Error: ",error);
        }
      }
    
      useEffect(() => {
        GetSearches()
      },[query])

  return (
    <div className="w-full h-auto relative p-2 sm:p-4  flex items-center md:ml-[10%]">
      <div className="flex items-center bg-[#2c2b32] w-full sm:w-[70%] h-[7vh] rounded-full px-3 sm:px-4">
        <i className="text-xl sm:text-2xl text-zinc-400 ri-search-2-line"></i>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          placeholder="Search for a movie, tv show, person..."
          className="outline-none w-full mx-3 sm:mx-6 py-2 sm:py-4 text-white placeholder:text-zinc-400 text-base sm:text-xl bg-transparent"
        />
        {query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="text-xl sm:text-2xl cursor-pointer text-zinc-400 ri-close-fill"
          ></i>
        )}
      </div>
      {query.length > 0 && (
        <div className="w-full sm:w-[60%] max-h-[50vh] bg-zinc-200 absolute top-[110%] left-0 sm:left-[5%] overflow-auto rounded shadow-lg z-50">
          {searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="hover:text-black hover:bg-zinc-300 duration-200 font-semibold text-zinc-600 w-full p-3 sm:p-6 flex justify-start items-center border-b border-zinc-100"
              onClick={() => setQuery("")}
            >
              <img
                className="w-12 h-12 sm:w-[10vh] sm:h-[10vh] shadow-lg rounded object-cover mr-3 sm:mr-4"
                src={
                  s.backdrop_path ||
                  s.poster_path ||
                  s.profile_path ||
                  s.logo_path
                    ? `https://image.tmdb.org/t/p/w500/${
                        s.poster_path ||
                        s.profile_path ||
                        s.backdrop_path ||
                        s.logo_path
                      }`
                    : noImage
                }
                alt=""
              />
              <span className="truncate">{s.name || s.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topnav;