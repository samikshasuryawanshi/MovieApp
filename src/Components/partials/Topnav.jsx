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

  return <div className="w-full h-[10vh] relative p-4 flex justify-items-start items-center ml-[10%]">
    <div className='flex items-center bg-[#2c2b32] w-[70%] h-[7vh] rounded-full px-4'>
        <i className="text-2xl text-zinc-400 ri-search-2-line"></i>
        <input 
            onChange={(e)=>setQuery(e.target.value)}
            value={query}
            type="text"
            placeholder='Search for a movie, tv show, person...' 
            className='outline-none w-[100%] mx-6 p-4 text-white placeholder:text-zinc-400 text-xl'
        />
        {query.length > 0 && (
            <i onClick={()=>setQuery("")} className="text-2xl cursor-pointer text-zinc-400 ri-close-fill"></i>
        )}
    </div>
    <div className=" w-[60%] max-h-[50vh] bg-zinc-200 absolute top-[100%] left-[5%] overflow-auto rounded">
        {searches.map((s,i)=>{
            return(
                <Link to={`/${s.media_type}/details/${s.id}`}  key={i} className='hover:text-black hover:bg-zinc-300 duration-200 font-semibold text-zinc-600 w-[100%] p-6 flex justify-start border-b-1 border-zinc-100  items-center'>
                    <img className='w-[10vh] h-[10vh] shadow-lg rounded object-cover mr-4' src={
                        s.backdrop_path || s.poster_path || s.profile_path || s.logo_path ? `https://image.tmdb.org/t/p/w500/${s.poster_path || s.profile_path || s.backdrop_path || s.logo_path}`: noImage } alt="" />
                    <span>{s.name || s.title}</span>
                </Link>
            )
        })}
     
       
    </div>
  </div>;
};

export default Topnav;