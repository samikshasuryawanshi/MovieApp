import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadTv, removeTv } from "../store/actions/tvActions";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";
import noImage from '/noImage.jpg'

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  //useParams is used to get the parameters from the url
  //useDispatch is used to dispatch the actions to the store
  //useEffect is used to perform side effects in functional components
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  // console.log(info);

  useEffect(() => {
    dispatch(asyncloadTv(id));
    return () => {
      dispatch(removeTv())
    }
  }, [id])

  return info ? (
    <div
      style={{
        height: "fit-content",
        background: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.5), rgba(18,17,21,1)), url(https://image.tmdb.org/t/p/w1280/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-full min-h-screen px-4 sm:px-8 md:px-14 lg:px-24 py-6"
    >

      <nav className="w-full text-zinc-200 flex items-center gap-6 sm:gap-10 mb-8 mt-2 bg-black/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/5 w-fit">
        <i
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line text-2xl hover:text-[#6556CD] cursor-pointer transition-colors">
        </i>
        {info.detail.homepage && (
          <a target="_blank" rel="noreferrer" href={info.detail.homepage} className="hover:scale-110 transition-transform">
            <i className="hover:text-[#6556CD] text-xl ri-external-link-fill transition-colors"></i>
          </a>
        )}
        {info.externalid?.wikidata_id && (
          <a target="_blank" rel="noreferrer" href={`https://www.wikipedia.org/wiki/${info.externalid.wikidata_id}`} className="hover:scale-110 transition-transform">
            <i className=" hover:text-[#6556CD] text-xl ri-earth-fill transition-colors"></i>
          </a>
        )}
        {info.externalid?.imdb_id && (
          <a target="_blank" rel="noreferrer" href={`https://www.imdb.com/title/${info.externalid.imdb_id}`} className="hover:text-[#6556CD] text-lg font-bold transition-colors hover:scale-110 transform">
            IMDB
          </a>
        )}
      </nav>

      {/* Poster and details */}
      <div className="w-full flex flex-col lg:flex-row py-2 gap-8 lg:gap-14 items-center lg:items-start">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-[45vh] mb-6 lg:mb-0 mx-auto lg:mx-0 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] rounded-2xl relative border border-white/10 shrink-0">
          <img
            className="w-full h-[400px] sm:h-[450px] md:h-[500px] object-cover transition-transform duration-500 hover:scale-[1.02]"
            src={`https://image.tmdb.org/t/p/w500/${info.detail.poster_path || info.detail.backdrop_path}`}
            alt={info.detail.name || info.detail.title || info.detail.original_name}
          />
        </div>

        <div className="content w-full flex flex-col items-start bg-black/40 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-white/5 shadow-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-black drop-shadow-lg leading-tight">
            {info.detail.name || info.detail.title || info.detail.original_name}
            <small className="ml-3 font-medium text-lg sm:text-2xl text-zinc-400">
              ({info.detail.first_air_date ? info.detail.first_air_date.split("-")[0] : 'N/A'})
            </small>
          </h1>

          <div className="flex flex-wrap gap-3 sm:gap-4 items-center text-white mt-4 mb-6">
            <span className="flex items-center gap-1.5 bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-3 py-1.5 rounded-full font-bold shadow-lg">
              <i className="ri-star-fill text-sm"></i> {(info.detail.vote_average * 10).toFixed()}% User Score
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-sm backdrop-blur-md">
              <i className="ri-calendar-event-fill text-zinc-400"></i> {info.detail.first_air_date}
            </span>
            {info.detail.number_of_episodes && (
              <span className="flex items-center gap-1.5 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-sm backdrop-blur-md">
                <i className="ri-list-check text-zinc-400"></i> {info.detail.number_of_episodes} Episodes
              </span>
            )}
            {info.detail.runtime && (
              <span className="flex items-center gap-1.5 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-sm backdrop-blur-md">
                <i className="ri-timer-fill text-zinc-400"></i> {info.detail.runtime} min
              </span>
            )}
          </div>

          {info.detail.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {info.detail.genres.map((g, i) => (
                <span key={i} className="text-xs uppercase tracking-wider font-semibold bg-[#6556CD]/20 text-[#6556CD] border border-[#6556CD]/30 px-3 py-1 rounded-md">
                  {g.name}
                </span>
              ))}
            </div>
          )}

          {info.detail.tagline && <h1 className="text-lg sm:text-xl text-zinc-300 italic font-medium mb-4 border-l-4 border-[#6556CD] pl-4 opacity-90">"{info.detail.tagline}"</h1>}

          <div className="mt-2">
            <h3 className="text-white text-xl font-bold mb-2">Overview</h3>
            <p className="w-full text-zinc-300 text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-4xl opacity-90">
              {info.detail.overview || "No description available."}
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              to={`${pathname}/trailer`}
              className="flex items-center gap-2 px-6 py-4 hover:bg-[#6556CD]/80 bg-[#6556CD] rounded-xl text-sm sm:text-lg font-bold text-white transition-all shadow-[0_0_20px_rgba(101,86,205,0.4)] hover:scale-105"
            >
              <i className="ri-play-large-fill"></i> Play Trailer
            </Link>
          </div>
        </div>
      </div>

      {/* Info Section (Watch Providers & Production Companies) */}
      <div className="w-full flex md:flex-row flex-col gap-6 mt-8">
        {info.watchproviders && (
          <div className="flex-1 bg-[#1b1a20]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/5">
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2 border-b border-zinc-800 pb-3">
              <i className="ri-tv-2-line text-[#6556CD]"></i> Where to Watch
            </h2>
            <div className="flex flex-col gap-5">
              {info.watchproviders.flatrate && (
                <div className="flex items-center gap-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 w-20">Stream</h3>
                  <div className="flex gap-3 flex-wrap">
                    {info.watchproviders.flatrate.map((item, i) => (
                      <img key={i} title={item.provider_name} className="w-10 h-10 rounded-xl shadow-md border border-white/10 hover:scale-110 transition-transform cursor-pointer" src={`https://image.tmdb.org/t/p/w200/${item.logo_path}`} alt={item.provider_name} />
                    ))}
                  </div>
                </div>
              )}
              {info.watchproviders.rent && (
                <div className="flex items-center gap-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 w-20">Rent</h3>
                  <div className="flex gap-3 flex-wrap">
                    {info.watchproviders.rent.map((item, i) => (
                      <img key={i} title={item.provider_name} className="w-10 h-10 rounded-xl shadow-md border border-white/10 hover:scale-110 transition-transform cursor-pointer" src={`https://image.tmdb.org/t/p/w200/${item.logo_path}`} alt={item.provider_name} />
                    ))}
                  </div>
                </div>
              )}
              {info.watchproviders.buy && (
                <div className="flex items-center gap-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 w-20">Buy</h3>
                  <div className="flex gap-3 flex-wrap">
                    {info.watchproviders.buy.map((item, i) => (
                      <img key={i} title={item.provider_name} className="w-10 h-10 rounded-xl shadow-md border border-white/10 hover:scale-110 transition-transform cursor-pointer" src={`https://image.tmdb.org/t/p/w200/${item.logo_path}`} alt={item.provider_name} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex-1 bg-[#1b1a20]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/5 flex flex-col justify-start">
          {info.detail.networks && info.detail.networks.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-4 w-full flex items-center gap-2 border-b border-zinc-800 pb-3">
                <i className="ri-broadcast-fill text-[#6556CD]"></i> Networks
              </h2>
              <div className="flex flex-wrap items-center gap-6">
                {info.detail.networks.map((network, i) => (
                  network.logo_path ? (
                    <img key={i} title={network.name} className="h-8 max-w-[120px] object-contain invert mix-blend-screen opacity-70 hover:opacity-100 transition-opacity" src={`https://image.tmdb.org/t/p/w200/${network.logo_path}`} alt={network.name} />
                  ) : <span key={i} className="text-zinc-400 font-semibold">{network.name}</span>
                ))}
              </div>
            </div>
          )}

          {info.detail.production_companies && info.detail.production_companies.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4 w-full flex items-center gap-2 border-b border-zinc-800 pb-3">
                <i className="ri-building-4-fill text-[#6556CD]"></i> Production
              </h2>
              <div className="flex flex-wrap items-center gap-6">
                {info.detail.production_companies.map((company, i) => (
                  company.logo_path ? (
                    <img key={i} title={company.name} className="h-8 max-w-[120px] object-contain invert mix-blend-screen opacity-70 hover:opacity-100 transition-opacity" src={`https://image.tmdb.org/t/p/w200/${company.logo_path}`} alt={company.name} />
                  ) : null
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cast Section */}
      {info.cast && info.cast.length > 0 && (
        <div className="mt-8 bg-[#1b1a20]/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/5">
          <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <i className="ri-group-fill text-[#6556CD]"></i> Top Cast
          </h1>
          <div className="flex overflow-y-hidden overflow-x-auto gap-4 sm:gap-6 pb-4 scrollbar-hide snap-x">
            {info.cast.slice(0, 15).map((person, i) => (
              <Link to={`/person/details/${person.id}`} key={i} className="min-w-[110px] max-w-[110px] sm:min-w-[130px] sm:max-w-[130px] flex flex-col items-center gap-3 group shrink-0 snap-start">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-zinc-800 group-hover:border-[#6556CD] transition-colors shadow-lg bg-zinc-900">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={person.profile_path ? `https://image.tmdb.org/t/p/w200/${person.profile_path}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt={person.name} />
                </div>
                <div className="text-center">
                  <h2 className="text-white text-xs sm:text-sm font-bold leading-tight group-hover:text-[#6556CD] transition-colors line-clamp-2">{person.name}</h2>
                  <p className="text-zinc-500 text-[10px] sm:text-xs mt-1 leading-tight line-clamp-2">{person.character}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Seasons */}
      <div className="mt-8 mb-5 bg-[#1b1a20]/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/5">
        <h1 className="text-2xl mb-6 font-bold text-white flex items-center gap-2">
          <i className="ri-list-check-2 text-[#6556CD]"></i> Seasons
        </h1>
        <div className="w-full h-fit flex shrink-0 overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x">
          {info.detail.seasons.length > 0 ? (
            info.detail.seasons.map((d, i) => {
              if (d.season_number === 0) return null; // Skip specials usually
              return (
                <div
                  key={i}
                  className="w-[60vw] sm:w-[35vw] md:w-[25vw] lg:w-[15vw] bg-[#121115] shadow-lg shrink-0 rounded-2xl border border-zinc-800 hover:border-[#6556CD]/50 transition-colors overflow-hidden group snap-start"
                >
                  <div className="h-[20vh] sm:h-[25vh] overflow-hidden relative bg-zinc-900">
                    <img
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src={
                        d.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${d.poster_path}`
                          : noImage
                      }
                      alt={d.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-4">
                    <h1 className="text-white text-base font-bold truncate group-hover:text-[#6556CD] transition-colors">
                      {d.name}
                    </h1>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-zinc-400 text-xs">{d.episode_count} Episodes</p>
                      {d.air_date && <p className="text-zinc-500 text-xs">{new Date(d.air_date).getFullYear()}</p>}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <h1 className="text-lg text-zinc-500 font-medium text-center py-10 w-full">No Seasons Available</h1>
          )}
        </div>
      </div>

      {/* Recommendations and similarity */}
      <div className="mt-8 mb-10 p-6 rounded-3xl bg-[#1b1a20]/20 border border-white/5">
        <h1 className="text-2xl mb-6 font-bold text-white flex items-center gap-2">
          <i className="ri-magic-fill text-[#6556CD]"></i> Recommendations & Similar
        </h1>
        <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />
      </div>

      <Outlet />

    </div>) : <Loading />;
};

export default TvDetails;