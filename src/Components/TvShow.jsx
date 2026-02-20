import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../Components/Loading';
import Cards from './partials/Cards';
import DropDown from './partials/DropDown';
import Topnav from './partials/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';


const TvShow = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [shows, setshows] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "cineMate || Tv Show's ";

  const GetTvShow = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      // console.log(data);
      if (data.results.length > 0) {
        setshows(prevState => [...prevState, ...data.results]);
        setpage(page + 1);

      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const resetPage = () => {
    if (shows.length === 0) {
      GetTvShow();
    } else {
      setpage(1);
      setshows([]);
      GetTvShow();
    }
  }

  useEffect(() => {
    resetPage();
  }, [category]);



  return shows.length > 0 ? (
    <div className="w-screen h-screen px-2">
      {/* Fixed Header */}
      <div className="w-full z-10 flex flex-col sm:flex-row items-start sm:items-center py-3 sm:py-4 px-4 sm:px-8 border-b border-white/5 shadow-2xl h-fit bg-[#1F1E24]/80 backdrop-blur-xl fixed top-0 left-0 right-0 justify-between gap-3 sm:gap-0 transition-all">
        <h1 className="text-2xl cursor-pointer flex items-center gap-4 font-black text-white drop-shadow-md mb-2 sm:mb-0 tracking-wide">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#6556CD] to-[#4A3B9C] flex items-center justify-center cursor-pointer group relative shadow-lg shadow-[#6556CD]/30"
          >
            <motion.i
              className="ri-home-4-line text-xl sm:text-2xl text-white"
              whileHover={{ scale: 1.2 }}
            />
          </motion.div>
          <span className="flex items-center gap-2">
            Tv Show's
            <small className='text-zinc-400 text-sm mt-1 font-semibold uppercase tracking-widest'>({category.replace("_", " ")})</small>
          </span>
        </h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <Topnav />
          <DropDown
            title="Category"
            otpions={["popular", "top_rated", "on_the_air", "airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div id="scrollableDiv" className="pt-[100px] sm:pt-[110px] overflow-y-auto h-full">
        <InfiniteScroll
          dataLength={shows.length}
          next={GetTvShow}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6556CD]"></div>
            </div>
          }
          scrollableTarget="scrollableDiv"
        >
          <Cards data={shows} title={"tv"} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default TvShow;