import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";
import { asyncloadPeople, removePeople } from "../store/actions/peopleActions";
import DropDown from "./partials/DropDown";

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
      dispatch(removePeople())
    }
  }, [id])

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
  }

  return info ? (
    <div className="min-h-screen w-full bg-[#121115] text-zinc-300 font-sans">
      {/* Navigation */}
      <nav className="w-full text-zinc-200 flex items-center gap-6 sm:gap-10 px-4 sm:px-10 lg:px-20 pt-8 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center border border-white/5 hover:bg-[#6556CD] hover:text-white transition-all hover:scale-[1.05] active:scale-95 group"
        >
          <i className="ri-arrow-left-line text-2xl drop-shadow-md"></i>
        </button>
      </nav>

      <div className="w-full px-4 sm:px-10 lg:px-20 pb-12 flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Left Column: Profile Card */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-[350px] shrink-0 mx-auto lg:mx-0">
          <div className="bg-[#1b1a20]/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col items-center">
            <div className="w-full aspect-[2/3] overflow-hidden rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.6)] border border-white/10 mb-8 bg-zinc-900 group">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={info.detail.profile_path ? `https://image.tmdb.org/t/p/w500/${info.detail.profile_path}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                alt={info.detail.name}
              />
            </div>

            {/* Social Links */}
            {(info.externalid.wikidata_id || info.externalid.facebook_id || info.externalid.instagram_id || info.externalid.twitter_id) && (
              <div className="flex gap-4 items-center justify-center w-full mb-8">
                {info.externalid.wikidata_id && (
                  <a target="_blank" rel="noopener noreferrer" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`} className="w-11 h-11 rounded-full bg-zinc-800/80 flex items-center justify-center border border-white/10 hover:bg-[#6556CD] hover:border-[#6556CD] text-zinc-300 hover:text-white transition-all hover:-translate-y-1 shadow-lg">
                    <i className="ri-earth-fill text-xl"></i>
                  </a>
                )}
                {info.externalid.facebook_id && (
                  <a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/${info.externalid.facebook_id}`} className="w-11 h-11 rounded-full bg-zinc-800/80 flex items-center justify-center border border-white/10 hover:bg-[#1877F2]/90 hover:border-[#1877F2] text-zinc-300 hover:text-white transition-all hover:-translate-y-1 shadow-lg">
                    <i className="ri-facebook-circle-fill text-xl"></i>
                  </a>
                )}
                {info.externalid.instagram_id && (
                  <a target="_blank" rel="noopener noreferrer" href={`https://www.instagram.com/${info.externalid.instagram_id}`} className="w-11 h-11 rounded-full bg-zinc-800/80 flex items-center justify-center border border-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] text-zinc-300 hover:text-white transition-all hover:-translate-y-1 shadow-lg">
                    <i className="ri-instagram-fill text-xl"></i>
                  </a>
                )}
                {info.externalid.twitter_id && (
                  <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/${info.externalid.twitter_id}`} className="w-11 h-11 rounded-full bg-zinc-800/80 flex items-center justify-center border border-white/10 hover:bg-black hover:border-zinc-700 text-zinc-300 hover:text-white transition-all hover:-translate-y-1 shadow-lg">
                    <i className="ri-twitter-x-line text-lg"></i>
                  </a>
                )}
              </div>
            )}

            {/* Personal Info */}
            <div className="w-full flex flex-col gap-5 text-sm">
              <h2 className="text-xl font-bold text-white border-b border-zinc-700/50 pb-3 flex items-center gap-2">
                <i className="ri-user-smile-line text-[#6556CD]"></i> Personal Info
              </h2>

              <div className="flex flex-col gap-1">
                <span className="text-zinc-500 font-semibold tracking-wide uppercase text-xs">Known For</span>
                <span className="text-zinc-200 font-medium">{info.detail.known_for_department}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-zinc-500 font-semibold tracking-wide uppercase text-xs">Gender</span>
                <span className="text-zinc-200 font-medium">{info.detail.gender === 1 ? "Female" : info.detail.gender === 2 ? "Male" : "Other"}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-zinc-500 font-semibold tracking-wide uppercase text-xs">Birthday</span>
                <span className="text-zinc-200 font-medium">{info.detail.birthday ? `${info.detail.birthday} (${calculateAge(info.detail.birthday, info.detail.deathday)} years old)` : "Unknown"}</span>
              </div>

              {info.detail.deathday && (
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-500 font-semibold tracking-wide uppercase text-xs">Day of Death</span>
                  <span className="text-zinc-200 font-medium">{info.detail.deathday}</span>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <span className="text-zinc-500 font-semibold tracking-wide uppercase text-xs">Place of Birth</span>
                <span className="text-zinc-200 font-medium">{info.detail.place_of_birth || "Unknown"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bio and Work */}
        <div className="w-full flex-1 flex flex-col min-w-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8 drop-shadow-md tracking-tight">
            {info.detail.name}
          </h1>

          {info.detail.biography && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <i className="ri-file-text-line text-[#6556CD]"></i> Biography
              </h2>
              <div className="text-zinc-300 text-base sm:text-lg leading-relaxed opacity-90 font-light text-justify bg-black/20 p-6 sm:p-8 rounded-3xl border border-white/5">
                {info.detail.biography.length > 1000 ? (
                  <p>
                    {info.detail.biography.slice(0, 1000)}...
                    <span className="text-[#6556CD] font-medium cursor-pointer ml-2 hover:underline inline-flex items-center gap-1 group">
                      Read More <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                    </span>
                  </p>
                ) : (
                  <p>{info.detail.biography}</p>
                )}
              </div>
            </div>
          )}

          {/* Known For section */}
          {info.combineCredits.cast.length > 0 && (
            <div className="mb-12 w-full min-w-0">
              <h2 className="text-2xl font-bold text-white mb-6 w-full max-w-full flex items-center gap-2">
                <i className="ri-star-smile-fill text-[#6556CD]"></i> Known For
              </h2>
              <div className="w-full -ml-[1px]">
                <HorizontalCards data={info.combineCredits.cast} />
              </div>
            </div>
          )}

          {/* Filmography Section */}
          <div className="bg-[#1b1a20]/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/5 w-full min-w-0 overflow-hidden shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 border-b border-zinc-800/80 pb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <i className="ri-film-line text-[#6556CD]"></i> Acting History
              </h2>
              <div className="w-40 shadow-lg shadow-black/20">
                <DropDown title="Category" otpions={["movie", "tv"]} func={(e) => setCategory(e.target.value)} />
              </div>
            </div>

            <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2 sm:pr-4">
              {info[`${category}Credits`].cast
                .slice() // create copy to not mutate state
                .sort((a, b) => { // sort by release date descending
                  const dateA = a.release_date || a.first_air_date || '0000';
                  const dateB = b.release_date || b.first_air_date || '0000';
                  return new Date(dateB) - new Date(dateA);
                })
                .map((c, i) => (
                  <Link
                    to={`/${category}/details/${c.id}`}
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-black/20 hover:bg-[#6556CD]/10 rounded-2xl border border-white/5 hover:border-[#6556CD]/30 transition-all duration-300 group gap-2 sm:gap-4 active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className="text-zinc-500 font-mono font-bold shrink-0 w-10 text-center bg-black/40 py-1.5 px-2 rounded-lg text-sm">
                        {c.release_date ? c.release_date.split('-')[0] : c.first_air_date ? c.first_air_date.split('-')[0] : '—'}
                      </span>
                      <h3 className="text-white font-bold text-base sm:text-lg group-hover:text-[#6556CD] transition-colors">{c.title || c.name || c.original_name || c.original_title}</h3>
                    </div>
                    <div className="sm:text-right pl-14 sm:pl-0 flex items-center sm:block gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      <span className="text-zinc-500 text-sm hidden sm:inline">as </span>
                      <span className="text-zinc-300 font-medium text-sm sm:text-base">{c.character || c.job || 'Unknown Role'}</span>
                    </div>
                  </Link>
                ))}
              {info[`${category}Credits`].cast.length === 0 && (
                <div className="p-12 text-center text-zinc-500 flex flex-col items-center gap-3">
                  <i className="ri-folder-forbid-line text-4xl opacity-50"></i>
                  <p>No {category} credits available for this person.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : <Loading />;
};

export default PeopleDetails;