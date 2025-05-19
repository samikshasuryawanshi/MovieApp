import { Link } from "react-router-dom";
import noImage from '/noImage.jpg'

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full h-fit flex overflow-x-auto gap-3 pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
      {data.length > 0 ? data.map((d, i) => (
        <Link
          to={`/${d.media_type}/details/${d.id}`}
          key={i}
          className="
            min-w-[70vw] sm:min-w-[45vw] md:min-w-[30vw] lg:min-w-[19%]
            h-[32vh] sm:h-[38vh] md:h-[45vh]
            bg-[#1b1a20] p-3 rounded-xl mb-2
            flex-shrink-0
            hover:scale-[1.03] transition-transform duration-200
          "
        >
          <img
            className="h-[16vh] sm:h-[20vh] md:h-[25vh] w-full object-cover rounded"
            src={
              d.backdrop_path || d.poster_path
                ? `https://image.tmdb.org/t/p/w500/${d.backdrop_path || d.poster_path}`
                : noImage
            }
            alt=""
          />
          <h1 className="text-white text-base sm:text-lg mt-3 font-semibold truncate">
            {d.title || d.name || d.original_title || d.original_name}
          </h1>
          <p className="text-zinc-200 text-xs sm:text-sm mt-1 line-clamp-2">
            {d.overview.slice(0, 50)}... <span className="text-zinc-400">more</span>
          </p>
        </Link>
      )) : (
        <h1 className="text-2xl text-white font-medium text-center w-full">Nothing to show</h1>
      )}
    </div>
  );
};

export default HorizontalCards;