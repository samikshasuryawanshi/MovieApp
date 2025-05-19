import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/w500/${data.backdrop_path})`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[45vh] sm:h-[55vh] md:h-[65vh] px-4 sm:px-8 md:px-16 py-6 sm:py-10 flex flex-col justify-end rounded transition-all"
    >
      <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold">
        {data.title || data.name}
      </h1>
      <p className="text-white w-full sm:w-[90%] md:w-[80%] text-sm sm:text-base md:text-lg mt-2 sm:mt-4 line-clamp-3">
        {data.overview.slice(0, 200)}...{" "}
        <Link
          to={`${data.media_type}/details/${data.id}`}
          className="text-blue-400 underline"
        >
          more
        </Link>
      </p>
      <p className="text-white text-sm sm:text-base md:text-lg mt-2 sm:mt-4 flex flex-wrap gap-x-6 gap-y-2">
        <span>
          <i className="mr-1 text-yellow-500 ri-megaphone-fill"></i>
          {data.release_date || data.first_air_date}
        </span>
        <span>
          <i className="mr-1 text-yellow-500 ri-star-fill"></i>
          {data.vote_average}
        </span>
        <span>
          <i className="mr-1 text-yellow-500 ri-album-fill"></i>
          {data.media_type?.toUpperCase()}
        </span>
        <span>
          <i className="mr-1 text-yellow-500 ri-eye-fill"></i>
          {data.popularity}
        </span>
      </p>
      <Link
        to={`/${data.media_type}/details/${data.id}`}
        className="text-white text-sm sm:text-base md:text-lg px-4 sm:px-5 py-3 sm:py-4 w-fit bg-[#6556CD] hover:bg-[#6556CD]/90 duration-200 rounded-xl mt-4"
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;