import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadMovie, removeMovie } from "../store/actions/movieActions";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";
 

const MovieDetails = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  //useParams is used to get the parameters from the url
  //useDispatch is used to dispatch the actions to the store
  //useEffect is used to perform side effects in functional components
  const {id} = useParams();
  const {info} = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  // console.log(info);
  
  useEffect(() => {
    dispatch(asyncloadMovie(id));
    return () => {
      dispatch(removeMovie())
    }
  },[id])
  return info ?  (
   <div style={{
    height:"fit-content",
    background:`linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/w500/${info.detail.backdrop_path})`,
    backgroundPosition:"center",
    backgroundSize:"cover",
    backgroundRepeat:"no-repeat",
   }}
    className="relative w-screen h-fit px-20 py-2" >

      <nav className="w-full h-[10vh] text-zinc-200 flex items-center gap-10">
          <i 
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-3xl hover:text-[#6556CD] cursor-pointer"> 
          </i>
          <a target="_blank" href={info.detail.homepage}>
            <i class="hover:text-[#6556CD] text-2xl ri-external-link-fill"></i>
          </a>
          <a target="_blank" href={`https://www.wikipedia.org/wiki/${info.externalid.wikidata_id}`} className="text-2xl ri">
            <i class=" hover:text-[#6556CD] text-2xl ri-earth-fill"></i>
          </a>
          <a target="_blank" href={`https://www.imdb.com/title/${info.externalid.imdb_id}`} className="hover:text-[#6556CD] text-xl ri">
            IMDB
          </a>

      </nav>


      {/* Poster and details */}
     <div className=" mt-10 w-full flex backdrop-blur-xs py-2  gap-20">
        <div className="h-fit w-[45vh] overflow-hidden shadow-2xl cursor-pointer rounded-lg relative">
            <img 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
              src={`https://image.tmdb.org/t/p/w500/${info.detail.poster_path || info.detail.backdrop_path }`} 
              alt={info.detail.name || info.detail.title || info.detail.original_name}
            />
        </div>

        <div className="content w-fit">
          <h1 className="text-5xl text-zinc-200 font-black">
            {info.detail.name || info.detail.title || info.detail.original_name} 
            <small className="mr-4 font-medium text-2xl text-zinc-400">({info.detail.release_date.split("-")[0]})</small>
          </h1>
          
         <div className="flex gap-5 items-center text-white mt-3 mb-5">
          <span className="h-[6vh] w-[6vh] flex items-center justify-center rounded-full bg-yellow-500">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="font-medium">User Score</h1>
            <h1 className="font-medium">{info.detail.release_date}</h1>
            <h1 className="font-medium">{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1 className="font-medium">{info.detail.runtime} min</h1>
         </div>


         <h1 className="text-xl text-white italic">{info.detail.tagline}</h1>
         <p className=" w-[80%] text-zinc-100 text-lg mt-5 mb-7">{info.detail.overview}</p>
         
         <Link to={`${pathname}/trailer`} className="px-4 py-4 hover:bg-[#6556CD]/90 bg-[#6556CD] rounded-lg text-xl" ><i class="ri-play-large-fill"></i>  Play Trailer</Link>
        </div>
     </div>


       {/* 3rd platform */}

{/*       
       <div className="w-[80%] flex flex-col gap-1">
        <div className="mt-5">
          {info.watchproviders && info.watchproviders.flatrate && <div className="flex items-center gap-2">
            <h1 className="text-lg text-zinc-200 font-medium">Watch on:</h1>
            <div className="flex gap-4 mt-2">
              {info.watchproviders.flatrate.map((item, i) => (
                <img 
                  title={item.provider_name}
                  key={i}
                  className="w-[5vh] h-[5vh] rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500/${item.logo_path}`} 
                  alt={item.provider_name} 
                />
              ))}
            </div>
          </div>}
        </div>
        <div className="mt-2">
          {info.watchproviders && info.watchproviders.rent && <div className="flex items-center gap-2">
            <h1 className="text-lg text-zinc-200 font-medium">Available on rent:</h1>
            <div className="flex gap-4 mt-2">
              {info.watchproviders.rent.map((item, i) => (
                <img 
                  title={item.provider_name}
                  key={i}
                  className="w-[5vh] h-[5vh] rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500/${item.logo_path}`} 
                  alt={item.provider_name} 
                />
              ))}
            </div>
          </div>}
        </div>
        <div className="mt-2">
          {info.watchproviders && info.watchproviders.buy && <div className="flex items-center gap-2">
            <h1 className="text-lg text-zinc-200 font-medium">Buy from :</h1>
            <div className="flex gap-5 mt-2">
              {info.watchproviders.buy.map((item, i) => (
                <img 
                  title={item.provider_name}
                  key={i}
                  className="w-[5vh] h-[5vh] rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500/${item.logo_path}`} 
                  alt={item.provider_name} 
                />
              ))}
            </div>
          </div>}
        </div>
      </div> */}
     

      {/* Recommendations and similarity */}
      <hr className="mt-10 bg-zinc-400 mb-5" />

      <div>
      <h1 className="text-2xl mb-4 font-semibold text-white">Recommendations & Similar</h1>
       <HorizontalCards data={info.recommendations.length > 0 ?  info.recommendations : info.similar}/>
      </div>

      <Outlet />

  </div>):<Loading/>;
}; 

export default MovieDetails;