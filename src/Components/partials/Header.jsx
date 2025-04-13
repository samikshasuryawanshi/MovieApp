
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({data}) => {
  return <div style={{
   background:`linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/w500/${data.backdrop_path})`,
   backgroundPosition:"top 10%",
   backgroundSize:"cover",
   backgroundRepeat:"no-repeat",
  }} className="w-full h-[65vh] px-18 py-10 flex flex-col justify-end rounded">
    <h1 className="text-white text-4xl font-semibold">
        {data.title || data.name}
    </h1>
    <p className="text-white w-[80%] text-lg mt-4">
        {data.overview.slice(0,200)}... <Link className="text-blue-400">more</Link>
    </p>
    <p className="text-white text-lg mt-4">
        <i className="mr-1 text-yellow-500 ri-megaphone-fill"></i>{data.release_date || data.first_air_date} 
        <i className="ml-5 mr-1 text-yellow-500 ri-star-fill"></i>{data.vote_average}
        <i className="ml-5 mr-1 text-yellow-500 ri-album-fill"></i>{data.media_type.toUpperCase()}
        <i className="ml-5 mr-1 text-yellow-500 ri-eye-fill"></i>{data.popularity}
    </p>

    <Link className="text-white text-lg px-5 py-4 w-fit bg-[#6556CD] hover:bg-[#6556CD]/90  duration-200 rounded-xl mt-4">
      Watch Trailer
    </Link>

  </div> 
}

export default Header;