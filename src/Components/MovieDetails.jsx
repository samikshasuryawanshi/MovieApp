import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadMovie, removeMovie } from "../store/actions/movieActions";
import Loading from "./Loading";
import { motion } from "framer-motion";
import noImage from '/noImage.jpg';

const MovieDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadMovie(id));
    return () => {
      dispatch(removeMovie());
    };
  }, [id, dispatch]);

  if (!info) return <Loading />;

  const title = info.detail.name || info.detail.title || info.detail.original_name;
  const releaseYear = info.detail.release_date ? info.detail.release_date.split("-")[0] : 'N/A';
  const backgroundImageUrl = `https://image.tmdb.org/t/p/original/${info.detail.backdrop_path || info.detail.poster_path}`;
  const posterUrl = info.detail.poster_path || info.detail.backdrop_path
    ? `https://image.tmdb.org/t/p/w500/${info.detail.poster_path || info.detail.backdrop_path}`
    : noImage;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.8 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div
      style={{
        height: "fit-content",
        background: `linear-gradient(to bottom, rgba(15, 14, 19, 0.7) 0%, rgba(15, 14, 19, 0.9) 30%, rgba(15, 14, 19, 1) 100%), url(${backgroundImageUrl})`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
      className="relative w-full min-h-screen px-4 sm:px-8 md:px-12 lg:px-20 py-8"
    >
      <div className="w-full max-w-[1600px] mx-auto">

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center mt-20 gap-6 sm:gap-8 mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[#6556CD] hover:border-[#6556CD] hover:shadow-[0_0_20px_rgba(101,86,205,0.4)] transition-all group backdrop-blur-md"
          >
            <i className="ri-arrow-left-line text-2xl text-zinc-300 group-hover:text-white transition-colors"></i>
          </button>

          <div className="flex items-center gap-5 bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/5">
            {info.detail.homepage && (
              <a target="_blank" rel="noreferrer" href={info.detail.homepage} className="text-zinc-400 hover:text-white hover:scale-110 transition-all">
                <i className="text-xl ri-external-link-line"></i>
              </a>
            )}
            {info.externalid?.wikidata_id && (
              <a target="_blank" rel="noreferrer" href={`https://www.wikipedia.org/wiki/${info.externalid.wikidata_id}`} className="text-zinc-400 hover:text-white hover:scale-110 transition-all">
                <i className="text-xl ri-earth-fill"></i>
              </a>
            )}
            {info.externalid?.imdb_id && (
              <a target="_blank" rel="noreferrer" href={`https://www.imdb.com/title/${info.externalid.imdb_id}`} className="text-zinc-400 font-bold hover:text-yellow-500 hover:scale-110 transition-all flex items-center gap-1">
                <i className="ri-movie-2-fill"></i> IMDB
              </a>
            )}
          </div>
        </motion.nav>

        {/* Hero Content Panel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mb-12 p-8 sm:p-12 rounded-[1.5rem] relative overflow-hidden shadow-2xl border border-white/5"
          style={{
            background: `linear-gradient(to right, rgba(15, 14, 19, 0.95) 0%, rgba(15, 14, 19, 0.7) 100%), url(${backgroundImageUrl})`,
            backgroundPosition: "top right",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        >
          {/* Poster */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] shrink-0 mx-auto lg:mx-0 group relative perspective-1000"
          >
            <div className="w-full relative rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 group-hover:border-white/20 transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-15px_rgba(101,86,205,0.3)]">
              <img
                className="w-full h-auto object-cover"
                src={posterUrl}
                alt={title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
            </div>
          </motion.div>

          {/* Details */}
          <div className="w-full flex-1 flex flex-col justify-center">
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-2 tracking-tight drop-shadow-2xl">
              {title}
            </motion.h1>

            {info.detail.tagline && (
              <motion.p variants={itemVariants} className="text-lg sm:text-xl text-zinc-300 italic font-light mb-6 opacity-80">
                "{info.detail.tagline}"
              </motion.p>
            )}

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 sm:gap-4 text-zinc-300 font-medium mb-6">
              <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-4 py-2 rounded-xl backdrop-blur-sm">
                <i className="ri-star-fill text-lg"></i>
                <span className="text-lg">{(info.detail.vote_average * 10).toFixed()}%</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <i className="ri-calendar-event-line text-zinc-400"></i>
                <span>{info.detail.release_date || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <i className="ri-timer-line text-zinc-400"></i>
                <span>{info.detail.runtime || 'N/A'} min</span>
              </div>
            </motion.div>

            {info.detail.genres?.length > 0 && (
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                {info.detail.genres.map((g, i) => (
                  <span key={i} className="px-4 py-2 rounded-xl bg-white/5 text-zinc-200 border border-white/10 text-sm font-semibold tracking-wide hover:bg-[#6556CD]/20 hover:text-[#6556CD] hover:border-[#6556CD]/40 transition-all cursor-default">
                    {g.name}
                  </span>
                ))}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-white text-xl font-bold mb-3 flex items-center gap-2">
                Overview
              </h3>
              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-4xl font-light">
                {info.detail.overview || "No description available."}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4">
              <Link
                to={`${pathname}/trailer`}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-[#6556CD] px-8 py-3.5 text-white font-bold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(101,86,205,0.5)] active:scale-95"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0 duration-300"></div>
                <i className="ri-play-large-fill text-xl relative z-10"></i>
                <span className="relative z-10 text-lg">Watch Trailer</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 pb-20 pt-8">
        {/* Secondary Info Layout: Watch Providers & Production */}
        <div className="flex flex-col gap-8 mb-12 mt-4 relative">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120%] bg-[#6556CD] opacity-10 blur-[120px] rounded-full pointer-events-none z-0"></div>

          {info.watchproviders && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="w-full relative z-10 bg-gradient-to-br from-white/[0.08] to-transparent border border-white/[0.15] backdrop-blur-3xl rounded-[2.5rem] p-8 sm:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#6556CD]/20 blur-[80px] rounded-full pointer-events-none"></div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-10 flex items-center gap-4 relative z-10">
                <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6556CD] to-purple-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(101,86,205,0.4)]">
                  <i className="ri-tv-2-fill text-2xl"></i>
                </span>
                Where to Watch
              </h2>

              <div className="flex flex-col md:flex-row gap-12 md:gap-20 relative z-10">
                {info.watchproviders.flatrate && (
                  <div className="flex-1">
                    <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#6556CD] mb-6 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#6556CD] animate-pulse shadow-[0_0_10px_#6556CD]"></div>
                      Stream
                    </h3>
                    <div className="flex gap-5 flex-wrap">
                      {info.watchproviders.flatrate.map((item, i) => (
                        <div key={i} className="group relative flex flex-col items-center">
                          <div className="w-[70px] h-[70px] rounded-[1.25rem] overflow-hidden p-[2px] bg-gradient-to-br from-white/20 to-white/5 hover:from-[#6556CD] hover:to-purple-500 transition-all duration-300 shadow-xl cursor-pointer hover:shadow-[0_0_25px_rgba(101,86,205,0.5)] transform hover:-translate-y-2">
                            <img title={item.provider_name} className="w-full h-full rounded-[1.1rem] object-cover" src={`https://image.tmdb.org/t/p/w200/${item.logo_path}`} alt={item.provider_name} />
                          </div>
                          <span className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[11px] font-bold text-white bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg whitespace-nowrap border border-white/10 shadow-xl translate-y-2 group-hover:translate-y-0 z-20 pointer-events-none">
                            {item.provider_name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {info.watchproviders.rent && (
                  <div className="flex-1">
                    <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#6556CD] mb-6 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#6556CD] animate-pulse shadow-[0_0_10px_#6556CD]"></div>
                      Rent
                    </h3>
                    <div className="flex gap-5 flex-wrap">
                      {info.watchproviders.rent.map((item, i) => (
                        <div key={i} className="group relative flex flex-col items-center">
                          <div className="w-[70px] h-[70px] rounded-[1.25rem] overflow-hidden p-[2px] bg-gradient-to-br from-white/20 to-white/5 hover:from-[#6556CD] hover:to-purple-500 transition-all duration-300 shadow-xl cursor-pointer hover:shadow-[0_0_25px_rgba(101,86,205,0.5)] transform hover:-translate-y-2">
                            <img title={item.provider_name} className="w-full h-full rounded-[1.1rem] object-cover" src={`https://image.tmdb.org/t/p/w200/${item.logo_path}`} alt={item.provider_name} />
                          </div>
                          <span className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[11px] font-bold text-white bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg whitespace-nowrap border border-white/10 shadow-xl translate-y-2 group-hover:translate-y-0 z-20 pointer-events-none">
                            {item.provider_name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {info.watchproviders.buy && (
                  <div className="flex-1">
                    <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#6556CD] mb-6 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#6556CD] animate-pulse shadow-[0_0_10px_#6556CD]"></div>
                      Buy
                    </h3>
                    <div className="flex gap-5 flex-wrap">
                      {info.watchproviders.buy.map((item, i) => (
                        <div key={i} className="group relative flex flex-col items-center">
                          <div className="w-[70px] h-[70px] rounded-[1.25rem] overflow-hidden p-[2px] bg-gradient-to-br from-white/20 to-white/5 hover:from-[#6556CD] hover:to-purple-500 transition-all duration-300 shadow-xl cursor-pointer hover:shadow-[0_0_25px_rgba(101,86,205,0.5)] transform hover:-translate-y-2">
                            <img title={item.provider_name} className="w-full h-full rounded-[1.1rem] object-cover" src={`https://image.tmdb.org/t/p/w200/${item.logo_path}`} alt={item.provider_name} />
                          </div>
                          <span className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[11px] font-bold text-white bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg whitespace-nowrap border border-white/10 shadow-xl translate-y-2 group-hover:translate-y-0 z-20 pointer-events-none">
                            {item.provider_name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {info.detail.production_companies?.length > 0 && (
            <div className="grid grid-cols-1 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="w-full relative z-10 bg-gradient-to-br from-white/[0.08] to-transparent border border-white/[0.15] backdrop-blur-3xl rounded-[2.5rem] p-8 sm:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6556CD]/20 blur-[80px] rounded-full pointer-events-none"></div>

                <h2 className="text-2xl sm:text-3xl font-black text-white mb-10 flex items-center gap-4 relative z-10">
                  <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6556CD] to-purple-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(101,86,205,0.4)]">
                    <i className="ri-building-4-fill text-2xl"></i>
                  </span>
                  Production
                </h2>
                <div className="flex flex-wrap items-center gap-8 relative z-10">
                  {info.detail.production_companies.map((company, i) => (
                    company.logo_path ? (
                      <div key={i} className="group relative bg-white/5 backdrop-blur-sm p-6 rounded-[1.5rem] border border-white/10 shadow-xl hover:bg-white/10 hover:border-[#6556CD]/50 hover:shadow-[0_0_30px_rgba(101,86,205,0.2)] transition-all duration-500 flex items-center justify-center min-w-[150px] h-[90px] overflow-hidden cursor-pointer transform hover:-translate-y-2">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#6556CD]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <img title={company.name} className="max-h-[50px] max-w-[110px] object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-500" src={`https://image.tmdb.org/t/p/w200/${company.logo_path}`} alt={company.name} />
                      </div>
                    ) : (
                      <span key={i} className="text-zinc-300 font-bold px-6 py-4 bg-white/5 rounded-[1.5rem] border border-white/10 hover:bg-[#6556CD]/10 hover:border-[#6556CD]/50 hover:text-white transition-all cursor-default shadow-xl transform hover:-translate-y-1">
                        {company.name}
                      </span>
                    )
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {/* Cast Section */}
        {info.cast && info.cast.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <i className="ri-group-fill text-[#6556CD]"></i> Top Cast
            </h2>
            <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x px-2">
              {info.cast.slice(0, 15).map((person, i) => (
                <Link to={`/person/details/${person.id}`} key={i} className="w-[140px] sm:w-[160px] flex flex-col items-center group shrink-0 snap-start">
                  <div className="w-full aspect-[2/3] rounded-2xl overflow-hidden mb-4 relative shadow-lg">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src={person.profile_path ? `https://image.tmdb.org/t/p/w300/${person.profile_path}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                      alt={person.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-white text-base font-bold text-center leading-tight group-hover:text-[#6556CD] transition-colors line-clamp-1">{person.name}</h3>
                  <p className="text-zinc-400 text-sm text-center mt-1 line-clamp-1">{person.character}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recommendations Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <i className="ri-magic-fill text-[#6556CD]"></i> Recommendations
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8">
            {(info.recommendations.length > 0 ? info.recommendations : info.similar).map((m, i) => (
              <Link
                to={`/${m.media_type || 'movie'}/details/${m.id}`}
                key={i}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#1b1a20] border border-white/5 hover:border-[#6556CD]/50 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(101,86,205,0.2)]"
              >
                <div className="relative w-full aspect-[2/3] overflow-hidden bg-zinc-900">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={m.poster_path ? `https://image.tmdb.org/t/p/w500/${m.poster_path}` : noImage}
                    alt={m.name || m.title || m.original_name}
                  />
                  <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex flex-col gap-1 w-full">
                      <h3 className="text-white font-bold text-sm line-clamp-2 leading-tight">
                        {m.name || m.title || m.original_name}
                      </h3>
                      <div className="flex items-center justify-between w-full mt-1">
                        <span className="text-xs text-yellow-500 font-bold flex items-center gap-1">
                          <i className="ri-star-fill"></i>
                          {m.vote_average ? (m.vote_average * 10).toFixed() : "NR"}%
                        </span>
                        <span className="text-xs text-zinc-300">
                          {(m.release_date || m.first_air_date) ? (m.release_date || m.first_air_date).split("-")[0] : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetails;