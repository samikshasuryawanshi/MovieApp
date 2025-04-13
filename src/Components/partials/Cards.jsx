import { Link } from "react-router-dom";

const Cards = ({data,title}) => {
  return <div className="grid w-full h-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-7 px-5 mt-10">
    {data.map((item,i)=>(
        <Link className="group relative w-fit h-fit p-4 bg-[#1b1a20] rounded-2xl transition-all duration-300 hover:scale-105" key={i}>
          <div className="w-full h-[40vh] overflow-hidden rounded-lg relative">
            <img 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path || item.backdrop_path || item.profile_path || item.logo_path || item.still_path}`} 
              alt={item.name || item.title || item.original_name} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
         <h1 className="text-zinc-300  text-lg font-semibold mt-3  group-hover:text-[#6556CD] transition-colors duration-300">
            {item.name || item.title || item.original_name}
         </h1>

         <div className="absolute bottom-25 right-[-5%] text-lg bg-yellow-500 h-13 w-13 rounded-full flex items-center justify-center">
          {(item.vote_average * 10).toFixed()} <sup>%</sup>
         </div>
        </Link>
    ))}
  </div>;
};

export default Cards;