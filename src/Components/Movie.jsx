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


const Movie = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("now_playing");
    const [movie, setmovie] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
  
    document.title = "cineMate || Movies ";
  
    const GetMovie = async () => {
      try {
        const {data} = await axios.get(`/movie/${category}?page=${page}`);
        console.log(data);
        if(data.results.length > 0){
          setmovie(prevState => [...prevState, ...data.results]);
          setpage(page+1);
  
        }else{
          setHasMore(false);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  
    const resetPage = () => {
      if(movie.length === 0){
        GetMovie();
      }else{
        setpage(1);
        setmovie([]);
        GetMovie();
      }
    }
  
    useEffect(() => {
      resetPage();
    }, [category]);
    
    
  
     return movie.length > 0 ? (
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
            Movie's<small className='text-zinc-400 text-sm mt-2'>({category})</small>
          </h1>
          <div className="flex items-center gap-4 w-[75%]">
            <Topnav />
            <DropDown
              title="Category"
              otpions={["popular", "top_rated", "upcoming","now_playing"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
        </div>
  
        {/* Scrollable Content */}
        <div id="scrollableDiv"className=" pt-[80px] overflow-y-auto h-full">
          <InfiniteScroll
            dataLength={movie.length}
            next={GetMovie}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6556CD]"></div>
              </div>
            }
            scrollableTarget="scrollableDiv"
          >
            <Cards data={movie} title={category} />
          </InfiniteScroll>
        </div>
      </div>
    ) : (
      <Loading />
    );
};

export default Movie;