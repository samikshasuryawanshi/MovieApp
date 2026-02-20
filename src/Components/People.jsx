import { useNavigate, Link } from 'react-router-dom';
import axios from '../utils/axios';
import { useState, useEffect, useRef } from 'react';
import Loading from '../Components/Loading';
import Cards from './partials/Cards';
import Topnav from './partials/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';
import noImage from '/noImage.jpg';

const filterOptions = [
  { value: "popular", label: "Trending & Popular", icon: "ri-fire-fill" }
];

// Reusable native Row Component for horizontal scrolling
const ContentRow = ({ title, data }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      current.scrollBy({
        left: direction === 'left' ? -current.offsetWidth / 1.5 : current.offsetWidth / 1.5,
        behavior: 'smooth'
      });
    }
  };

  if (!data || data.length === 0) return null;

  return (
    <div className="group/row w-full mb-6 md:mb-10 relative">
      <h2 className="text-[1.1rem] md:text-xl font-bold text-[#e5e5e5] mb-2 px-5 md:px-12 lg:px-16 drop-shadow-md flex items-center gap-3">
        {title}
      </h2>

      <div className="relative">
        {/* Scroll Buttons - Visible on Desktop Hover */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-40 bg-[#0f1014]/80 hover:bg-[#0f1014] text-white w-10 md:w-16 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 hidden sm:flex cursor-pointer backdrop-blur-[2px] shadow-[20px_0_30px_rgba(15,16,20,0.9)]"
        >
          <i className="ri-arrow-left-s-line text-5xl hover:scale-125 transition-transform"></i>
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-40 bg-[#0f1014]/80 hover:bg-[#0f1014] text-white w-10 md:w-16 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 hidden sm:flex cursor-pointer backdrop-blur-[2px] shadow-[-20px_0_30px_rgba(15,16,20,0.9)]"
        >
          <i className="ri-arrow-right-s-line text-5xl hover:scale-125 transition-transform"></i>
        </button>

        {/* Left/Right Edge fade */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[#0f1014] to-transparent z-20 pointer-events-none hidden sm:block"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[#0f1014] to-transparent z-20 pointer-events-none hidden sm:block"></div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-3 md:gap-4 px-5 md:px-12 lg:px-16 py-2 scrollbar-hide snap-x snap-mandatory relative z-10"
          style={{ scrollPadding: '0 4vw' }}
        >
          {data.map((item, i) => {
            const imgUrl = item.profile_path ? `https://image.tmdb.org/t/p/w500/${item.profile_path}` : noImage;

            return (
              <Link
                to={`/person/details/${item.id}`}
                key={i}
                className={`flex-shrink-0 snap-start relative group transition-all duration-300 bg-[#1a1c22] rounded-md overflow-hidden hover:z-50 outline outline-2 outline-transparent hover:outline-[#6556CD]/50 shadow-md w-[32vw] sm:w-[22vw] md:w-[16vw] lg:w-[13vw] xl:w-[11vw] aspect-[2/3]`}
              >
                <img
                  src={imgUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-[#0f1014]/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-xs md:text-sm line-clamp-1 drop-shadow-md text-center">{item.name}</h3>
                  <p className="text-zinc-400 text-[9px] md:text-[11px] line-clamp-1 text-center mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {item.known_for_department}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};


const People = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [people, setpeople] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "People | CineMate";

  // Fetch initial top data for horizontal rows
  const getTrendingPeople = async () => {
    try {
      const { data } = await axios.get(`/trending/person/day`);
      setTrendingPeople(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const GetPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setpeople(prevState => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const resetPage = () => {
    if (people.length === 0) {
      GetPeople();
      getTrendingPeople();
    } else {
      setpage(1);
      setpeople([]);
      GetPeople();
    }
  }

  useEffect(() => {
    resetPage();
  }, [category]);

  return people.length > 0 ? (
    <div className="w-full h-screen bg-[#0f1014] overflow-hidden flex flex-col font-sans select-none relative">

      {/* Topnav & Navigation Bar (Always at Top) */}
      <div className="w-full z-50 flex items-center justify-between px-4 md:px-12 lg:px-16 pt-5 pb-2 gap-3 md:gap-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex shrink-0 items-center justify-center cursor-pointer hover:bg-white/10 hover:border-white transition-all shadow-lg text-white hover:text-[#6556CD]"
        >
          <i className="ri-arrow-left-line text-xl md:text-2xl"></i>
        </motion.button>

        {/* Transparent Search Section */}
        <div className="flex-1 w-full max-w-2xl bg-[#141414] rounded-full border border-zinc-700/50 shadow-lg px-2 shadow-black/50">
          <Topnav />
        </div>
      </div>

      <div id="scrollableDiv" className="flex-1 w-full overflow-y-auto overflow-x-hidden relative z-20 custom-scrollbar pb-10">

        {/* Section Hero Text */}
        <div className="px-5 md:px-12 lg:px-16 w-full max-w-4xl mt-6 lg:mt-8 pb-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight"
          >
            Explore <span className="text-[#6556CD]">Stars</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-zinc-400 text-sm md:text-base mt-2 font-medium max-w-xl leading-relaxed"
          >
            Discover your favorite actors, directors, and crew members.
            The creative minds behind the cinematic magic.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 0.4, duration: 0.8, ease: "anticipate" }}
            className="w-12 h-1 bg-[#6556CD] mt-4 rounded-full"
          ></motion.div>
        </div>

        {/* Highlighted Horizontal Sections Before Grid */}
        <div className="w-full flex flex-col mt-4">
          <ContentRow title="Spotlight: Trending Today" data={trendingPeople.slice(0, 15)} />

          {/* Divider */}
          <div className="w-full px-5 md:px-12 lg:px-16 my-2">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
        </div>

        {/* Quick Filters Section - Optimized for Mobile Swiping */}
        <div className="pl-5 md:px-12 lg:px-16 w-full mb-6 mt-6 flex justify-between items-end">
          <div>
            <h3 className="text-zinc-500 font-bold mb-3 text-xs tracking-widest uppercase">Browse Actors</h3>
            <div className="flex items-center gap-3 md:gap-4 overflow-x-auto scrollbar-hide py-2 pr-5">
              {filterOptions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setcategory(item.value)}
                  className={`flex shrink-0 items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs md:text-sm transition-all duration-300 shadow-xl border ${category === item.value
                      ? 'bg-[#6556CD] text-white border-[#6556CD] shadow-[0_5px_15px_rgba(101,86,205,0.4)]'
                      : 'bg-[#181818] text-zinc-300 border-white/5 hover:bg-white/10 hover:text-white hover:border-white/20'
                    }`}
                >
                  <i className={`${item.icon} text-lg ${category === item.value ? 'text-white' : 'text-[#6556CD]'}`}></i>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <InfiniteScroll
          dataLength={people.length}
          next={GetPeople}
          hasMore={hasMore}
          loader={
            <div className="w-full flex justify-center items-center py-10">
              <div className="w-10 h-10 border-4 border-zinc-700 border-t-[#6556CD] rounded-full animate-spin"></div>
            </div>
          }
          scrollableTarget="scrollableDiv"
          className="w-full"
        >
          <Cards data={people} title={"person"} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default People;