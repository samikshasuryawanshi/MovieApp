import { Link, useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import DropDown from "./partials/DropDown";
import { useState, useEffect } from "react";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "../Components/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "cineMate || Trending ";

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);

      if(data.results.length > 0){
        settrending(prevState => [...prevState, ...data.results]);
        setpage(page+1);
      }else{
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const resetPage =  () => {
    if(trending.length === 0){
      GetTrending();
    }else{
       setpage(1);
       settrending([]);
       GetTrending();
    }
  }

  useEffect(() => {
    resetPage();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen h-screen px-2">
      {/* Fixed Header */}
      <div className="w-full z-10 flex items-center py-3 px-5 shadow-2xl shadow-zinc-900 h-fit bg-[#1F1E24] fixed justify-between">
        <h1 className="text-2xl cursor-pointer flex gap-3 font-semibold text-zinc-400">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-full bg-[#6556CD] flex items-center justify-center cursor-pointer group relative"
          >
            <motion.i 
              className="ri-home-4-line text-2xl text-white"
              whileHover={{ scale: 1.2 }}
            />
          </motion.div>
          Trending
        </h1>
        <div className="flex items-center gap-4 w-[75%]">
          <Topnav />
          <DropDown
            title="Category"
            otpions={["all", "movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          />
          <DropDown
            title="Duration"
            otpions={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div id="scrollableDiv" className="pt-[80px] overflow-y-auto h-full">
        <InfiniteScroll
          dataLength={trending.length}
          next={GetTrending}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6556CD]"></div>
            </div>
          }
          scrollableTarget="scrollableDiv"
        >
          <Cards data={trending} title={category} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
