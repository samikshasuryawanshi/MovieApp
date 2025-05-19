import { Link } from "react-router-dom";
import noImage from '/noImage.jpg'

const Cards = ({ data, title }) => {
  return (
    <div className="grid w-full h-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-7 px-2 sm:px-4 md:px-5 mt-6 sm:mt-10">
      {data.map((item, i) => (
        <Link
          to={`/${item.media_type || title}/details/${item.id}`}
          className="group relative w-full h-fit p-2 sm:p-4 bg-[#1b1a20] rounded-2xl transition-all duration-300 hover:scale-105"
          key={i}
        >
          <div className="w-full h-[32vw] xs:h-[28vw] sm:h-[30vh] md:h-[32vh] lg:h-[36vh] xl:h-[40vh] overflow-hidden rounded-lg relative min-h-[140px] max-h-[350px]">
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <h1 className="text-zinc-300 text-base sm:text-lg font-semibold mt-2 sm:mt-3 group-hover:text-[#6556CD] transition-colors duration-300 truncate">
            {item.name || item.title || item.original_name}
          </h1>
          {item.vote_average && (
            <div className="absolute top-4 right-4 text-xs sm:text-base bg-yellow-500 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center font-bold shadow-lg">
              {(item.vote_average * 10).toFixed()}<sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;