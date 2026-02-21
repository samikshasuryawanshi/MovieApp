import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { asyncloadPeople, removePeople } from "../store/actions/peopleActions";
import { motion } from "framer-motion";
import noImage from '/noImage.jpg';

const PeopleDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.people);
  const dispatch = useDispatch();

  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadPeople(id));
    return () => {
      dispatch(removePeople());
    };
  }, [id, dispatch]);

  const calculateAge = (birthday, deathday) => {
    if (!birthday) return "";
    const end = deathday ? new Date(deathday) : new Date();
    const start = new Date(birthday);
    let age = end.getFullYear() - start.getFullYear();
    const m = end.getMonth() - start.getMonth();
    if (m < 0 || (m === 0 && end.getDate() < start.getDate())) {
      age--;
    }
    return age;
  };

  if (!info) return <Loading />;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, duration: 0.8 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const textRevealVariants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="w-full min-h-screen bg-[#0f0e13] relative overflow-hidden flex flex-col pt-6 pb-16 px-4 md:px-8 text-white font-sans">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#6556CD] opacity-[0.05] blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600 opacity-[0.05] blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col relative z-10">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-6 sm:gap-8 mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[#6556CD] hover:border-[#6556CD] hover:shadow-[0_0_20px_rgba(101,86,205,0.4)] transition-all group backdrop-blur-md"
          >
            <i className="ri-arrow-left-line text-2xl text-zinc-300 group-hover:text-white transition-colors"></i>
          </button>
        </motion.nav>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row gap-6 lg:gap-10"
        >
          {/* Left Column: Profile Card */}
          <motion.div variants={itemVariants} className="w-full lg:w-[280px] shrink-0 mx-auto lg:mx-0">
            <div className="bg-[#1b1a20]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/5 shadow-2xl flex flex-col items-center">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#6556CD]/20 blur-[60px] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-[#6556CD]/30"></div>

              <div className="w-full aspect-[2/3] overflow-hidden rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-white/10 mb-8 bg-zinc-900 relative z-10">
                <img
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  src={info.detail.profile_path ? `https://image.tmdb.org/t/p/w500/${info.detail.profile_path}` : noImage}
                  alt={info.detail.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>

              {/* Social Links */}
              {(info.externalid?.wikidata_id || info.externalid?.facebook_id || info.externalid?.instagram_id || info.externalid?.twitter_id) && (
                <div className="flex gap-4 items-center justify-center w-full mb-8 relative z-10">
                  {info.externalid.wikidata_id && (
                    <a target="_blank" rel="noopener noreferrer" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-[#6556CD] hover:border-[#6556CD] text-zinc-300 hover:text-white transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_10px_20px_rgba(101,86,205,0.4)]">
                      <i className="ri-earth-fill text-2xl"></i>
                    </a>
                  )}
                  {info.externalid.facebook_id && (
                    <a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/${info.externalid.facebook_id}`} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-[#1877F2]/90 hover:border-[#1877F2] text-zinc-300 hover:text-white transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_10px_20px_rgba(24,119,242,0.4)]">
                      <i className="ri-facebook-circle-fill text-2xl"></i>
                    </a>
                  )}
                  {info.externalid.instagram_id && (
                    <a target="_blank" rel="noopener noreferrer" href={`https://www.instagram.com/${info.externalid.instagram_id}`} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] text-zinc-300 hover:text-white transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_10px_20px_rgba(188,24,136,0.4)]">
                      <i className="ri-instagram-fill text-2xl"></i>
                    </a>
                  )}
                  {info.externalid.twitter_id && (
                    <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/${info.externalid.twitter_id}`} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-black hover:border-zinc-700 text-zinc-300 hover:text-white transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)]">
                      <i className="ri-twitter-x-line text-xl"></i>
                    </a>
                  )}
                </div>
              )}

              {/* Personal Info */}
              <div className="w-full flex flex-col gap-6 text-sm relative z-10">
                <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#6556CD]/20 flex items-center justify-center text-[#6556CD]">
                    <i className="ri-user-smile-fill"></i>
                  </div>
                  Personal Info
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[#6556CD] font-bold tracking-[0.15em] uppercase text-xs">Known For</span>
                    <span className="text-zinc-200 font-medium text-base">{info.detail.known_for_department}</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[#6556CD] font-bold tracking-[0.15em] uppercase text-xs">Gender</span>
                    <span className="text-zinc-200 font-medium text-base">{info.detail.gender === 1 ? "Female" : info.detail.gender === 2 ? "Male" : "Other"}</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[#6556CD] font-bold tracking-[0.15em] uppercase text-xs">Birthday</span>
                    <span className="text-zinc-200 font-medium text-base leading-tight">
                      {info.detail.birthday ? (
                        <>
                          {info.detail.birthday}
                          <br />
                          <span className="text-zinc-400 text-sm opacity-80 mt-1 block">
                            {calculateAge(info.detail.birthday, info.detail.deathday)} years old
                          </span>
                        </>
                      ) : "Unknown"}
                    </span>
                  </div>

                  {info.detail.deathday && (
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[#6556CD] font-bold tracking-[0.15em] uppercase text-xs">Day of Death</span>
                      <span className="text-zinc-200 font-medium text-base">{info.detail.deathday}</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5 col-span-2 lg:col-span-1 border-t border-white/5 lg:border-t-0 pt-4 lg:pt-0">
                    <span className="text-[#6556CD] font-bold tracking-[0.15em] uppercase text-xs">Place of Birth</span>
                    <span className="text-zinc-200 font-medium text-base">{info.detail.place_of_birth || "Unknown"}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio and Work */}
          <div className="w-full flex-1 flex flex-col min-w-0 pt-2 lg:pt-0">
            <motion.h1
              variants={textRevealVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-lg tracking-tight"
            >
              {info.detail.name}
            </motion.h1>

            {info.detail.biography && (
              <motion.div variants={itemVariants} className="mb-10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="text-[#6556CD]">
                    <i className="ri-file-text-line"></i>
                  </div>
                  Biography
                </h2>
                <div className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light text-justify bg-black/20 p-6 sm:p-8 rounded-3xl border border-white/5">
                  {info.detail.biography.length > 1000 ? (
                    <p>
                      {info.detail.biography.slice(0, 1000)}...
                      <span className="text-[#6556CD] font-bold cursor-pointer ml-3 hover:text-purple-400 inline-flex items-center gap-2 group transition-colors">
                        Read More <i className="ri-arrow-right-line group-hover:translate-x-1.5 transition-transform duration-300"></i>
                      </span>
                    </p>
                  ) : (
                    <p>{info.detail.biography}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Known For section */}
            {info.combineCredits?.cast?.length > 0 && (
              <motion.div variants={itemVariants} className="mb-12 w-full min-w-0">
                <h2 className="text-xl font-bold text-white mb-6 w-full max-w-full flex items-center gap-2">
                  <div className="text-yellow-500">
                    <i className="ri-star-smile-fill"></i>
                  </div>
                  Known For
                </h2>
                <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 custom-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
                  {info.combineCredits.cast
                    .slice()
                    .sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0))
                    .slice(0, 10)
                    .map((item, i) => (
                      <Link
                        to={`/${item.media_type || 'movie'}/details/${item.id}`}
                        key={i}
                        className="relative group rounded-[1.5rem] overflow-hidden bg-white/5 border border-white/10 shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 w-[140px] sm:w-[160px] md:w-[180px] shrink-0 snap-start aspect-[2/3] transform hover:-translate-y-2"
                      >
                        <img
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          src={item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : noImage}
                          alt={item.title || item.name || item.original_name || item.original_title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                          <h3 className="text-white font-bold text-base sm:text-lg leading-tight mb-2 drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            {item.title || item.name || item.original_name || item.original_title}
                          </h3>
                          {item.vote_average > 0 && (
                            <div className="flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-[50ms]">
                              <i className="ri-star-fill text-yellow-500"></i>
                              <span className="text-white font-medium">{(item.vote_average * 10).toFixed()}%</span>
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>

        {/* COMPACT & ENHANCED ACTING HISTORY SECTION */}
<motion.div
  variants={itemVariants}
  className="w-full mt-10 sm:mt-16 pb-8 relative"
>
  {/* Refined Ambient Glow */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-[#6556CD] opacity-[0.05] blur-[100px] rounded-full pointer-events-none z-0"></div>

  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 w-full relative z-10">
    <h2 className="text-xl sm:text-3xl font-bold text-white flex items-center gap-3 tracking-tight">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#6556CD]/20 border border-[#6556CD]/30 flex items-center justify-center text-[#6556CD]">
        <i className="ri-movie-2-line text-xl sm:text-2xl"></i>
      </div>
      Acting History
    </h2>

    {/* Compact Glowing Pill Switch */}
    <div className="relative flex p-1 bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10 w-full sm:w-auto">
      {["movie", "tv"].map((type) => (
        <button
          key={type}
          onClick={() => setCategory(type)}
          className={`flex-1 sm:flex-none relative z-10 px-6 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 capitalize ${
            category === type ? "text-white" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {type === "movie" ? "Movies" : "TV Shows"}
        </button>
      ))}
      <motion.div
        initial={false}
        animate={{ x: category === "movie" ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="absolute top-1 left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] bg-[#6556CD] rounded-lg shadow-lg shadow-[#6556CD]/20 z-0"
      />
    </div>
  </div>

  <div className="w-full bg-zinc-900/40 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/5 overflow-hidden shadow-xl relative z-10">
    {/* Header (Hidden on Mobile) */}
    <div className="hidden md:grid grid-cols-[100px_1.5fr_1fr] gap-6 px-8 py-4 border-b border-white/5 bg-white/[0.02] text-zinc-500 font-semibold text-[10px] uppercase tracking-widest">
      <div className="text-center">Year</div>
      <div>Production</div>
      <div>Character</div>
    </div>

    {/* Compact List */}
    <div className="flex flex-col max-h-[500px] overflow-y-auto custom-scrollbar">
      {info[`${category}Credits`]?.cast
        ?.slice()
        .sort((a, b) => {
          const dateA = a.release_date || a.first_air_date || '0000';
          const dateB = b.release_date || b.first_air_date || '0000';
          return new Date(dateB) - new Date(dateA);
        })
        .map((c, i) => (
          <Link
            to={`/${category}/details/${c.id}`}
            key={i}
            className="flex flex-row md:grid md:grid-cols-[100px_1.5fr_1fr] gap-4 md:gap-6 px-5 py-4 items-center border-b border-white/[0.03] last:border-0 hover:bg-white/[0.04] transition-all group relative"
          >
            {/* Year with Timeline Detail */}
            <div className="shrink-0 flex flex-col items-center">
              <span className="text-xs sm:text-sm font-mono font-bold text-[#6556CD] bg-[#6556CD]/10 px-2 py-1 rounded border border-[#6556CD]/20">
                {c.release_date?.split('-')[0] || c.first_air_date?.split('-')[0] || '—'}
              </span>
            </div>

            {/* Title & Mobile Role */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg group-hover:text-[#6556CD] transition-colors truncate">
                {c.title || c.name || c.original_name}
              </h3>
              {/* Visible on Mobile only */}
              <p className="text-zinc-500 text-xs mt-0.5 md:hidden truncate">
                as <span className="text-zinc-400 italic">{c.character || 'Unknown'}</span>
              </p>
            </div>

            {/* Desktop Character Role */}
            <div className="hidden md:block truncate">
              <span className="text-zinc-400 text-sm font-medium">
                {c.character || <span className="text-zinc-600 italic">Unspecified</span>}
              </span>
            </div>

            {/* Arrow Icon on Hover */}
            <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
               <i className="ri-arrow-right-s-line text-[#6556CD]"></i>
            </div>
          </Link>
        ))}

      {/* Empty State */}
      {(!info[`${category}Credits`]?.cast || info[`${category}Credits`]?.cast.length === 0) && (
        <div className="py-20 text-center">
          <i className="ri-movie-line text-4xl text-zinc-700 mb-2"></i>
          <p className="text-zinc-500 text-sm">No credits available for this category.</p>
        </div>
      )}
    </div>
  </div>
</motion.div>
      </div>
    </div>
  );
};

export default PeopleDetails;