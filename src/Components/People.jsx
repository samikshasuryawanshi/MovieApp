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
const People = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("popular");
    const [people, setpeople] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
  
    document.title = "cineMate || People ";
  
    const GetPeople = async () => {
      try {
        const {data} = await axios.get(`/person/${category}?page=${page}`);
        // console.log(data);
        if(data.results.length > 0){
          setpeople(prevState => [...prevState, ...data.results]);
          setpage(page+1);
  
        }else{
          setHasMore(false);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  
    const resetPage = () => {
      if(people.length === 0){
        GetPeople();
      }else{
        setpage(1);
        setpeople([]);
        GetPeople();
      }
    }
  
    useEffect(() => {
      resetPage();
    }, [category]);
    
    
  
    return people.length > 0 ? (
      <div className="w-screen h-screen px-2">
        {/* Fixed Header */}
        <div className="w-full z-10 flex flex-col sm:flex-row items-start sm:items-center py-3 px-2 sm:px-5 shadow-2xl shadow-zinc-900 h-fit bg-[#1F1E24] fixed top-0 left-0 right-0 justify-between gap-3 sm:gap-0">
          <h1 className="text-2xl cursor-pointer flex gap-3 font-semibold text-zinc-400 mb-2 sm:mb-0">
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
            People
          </h1> 
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <Topnav />
          </div>
        </div>
  
        {/* Scrollable Content */}
        <div id="scrollableDiv"className=" pt-[80px] overflow-y-auto h-full">
          <InfiniteScroll
            dataLength={people.length}
            next={GetPeople}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6556CD]"></div>
              </div>
            }
            scrollableTarget="scrollableDiv"
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