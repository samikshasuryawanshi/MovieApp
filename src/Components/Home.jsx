import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Sidenav from './partials/Sidenav.jsx'
import Topnav from './partials/Topnav.jsx'
import Header from './partials/Header.jsx'
import HorizontalCards from './partials/HorizontalCards.jsx'
import axios from '../utils/axios';
import DropDown from './partials/DropDown.jsx';
import Loading from '../Components/Loading.jsx';

const Home = () => {
    document.title = "Home | MovieApp"
    const [wallpaper, setwallpaper] = useState(null);
    const [trending, setTrending] = useState(null);
    const [category, setcategory] = useState("all");
    const [popularMovies, setPopularMovies] = useState(null);
    const [upcomingMovies, setUpcomingMovies] = useState(null);

    const GetHeaderWallpaper = async () => {
        try {
            const {data} = await axios.get(`/trending/all/day`)
            let randomData =  data.results[(Math.random() * data.results.length).toFixed()]
            setwallpaper(randomData)
        } catch (error) {
            console.log("Error: ",error);
        }
    }

    const GetTrending = async () => {
        try {
            const {data} = await axios.get(`/trending/${category}/day`)
            setTrending(data.results)
        } catch (error) {
            console.log("Error: ",error);
        }
    }

    const GetPopularMovies = async () => {
        try {
            const {data} = await axios.get('/movie/popular')
            setPopularMovies(data.results.slice(0, 5))
        } catch (error) {
            console.log("Error: ",error);
        }
    }

    const GetUpcomingMovies = async () => {
        try {
            const {data} = await axios.get('/movie/upcoming')
            setUpcomingMovies(data.results.slice(0, 5))
        } catch (error) {
            console.log("Error: ",error);
        }
    }

    useEffect(() => {
        !wallpaper && GetHeaderWallpaper()
        GetTrending()
        GetPopularMovies()
        GetUpcomingMovies()
    },[category])

    return wallpaper && trending ? (
        <div className="flex flex-col md:flex-row h-screen w-full bg-[#1F1E24]">
            <div className="w-full md:w-[250px]">
                <Sidenav />
            </div>
            <div className="w-full md:w-[80%] h-full overflow-hidden overflow-y-auto pt-14 md:pt-0">
                <Topnav />
                <Header data={wallpaper} />

                {/* Popular Movies Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="px-3 sm:px-4 md:px-6 py-4"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
                        <motion.h2 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-2xl sm:text-3xl font-bold text-white"
                        >
                            Popular <span className="text-[#6556CD]">Movies</span>
                        </motion.h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                        {popularMovies?.map((movie, index) => (
                            <motion.div
                                key={movie.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.03, y: -3 }}
                                className="bg-[#1b1a20] rounded-lg overflow-hidden group cursor-pointer"
                            >
                                <div className="h-32 sm:h-40 relative overflow-hidden">
                                    <img 
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <motion.div 
                                        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <i className="ri-play-circle-fill text-3xl sm:text-4xl md:text-5xl text-[#6556CD]"></i>
                                    </div>
                                </div>
                                <div className="p-2 sm:p-3">
                                    <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 truncate">{movie.title}</h3>
                                    <p className="text-zinc-400 text-xs">{movie.release_date}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Trending Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="px-3 sm:px-4 md:px-6 py-4"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
                        <motion.h2 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-2xl sm:text-3xl font-bold text-white"
                        >
                            Trending <span className="text-[#6556CD]">Now</span>
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="w-full sm:w-auto"
                        >
                            <DropDown 
                                title="Filter"
                                otpions={["tv", 'movie',"all"]}
                                func={(e)=>setcategory(e.target.value)}
                            />
                        </motion.div>
                    </div>
                    <HorizontalCards data={trending} />
                </motion.div>

                {/* Upcoming Movies Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="px-3 sm:px-4 md:px-6 py-4"
                >
                    <motion.h2 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="text-2xl sm:text-3xl font-bold text-white mb-6"
                    >
                        Coming <span className="text-[#6556CD]">Soon</span>
                    </motion.h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                        {upcomingMovies?.map((movie, index) => (
                            <motion.div
                                key={movie.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                                whileHover={{ scale: 1.03, y: -3 }}
                                className="bg-[#1b1a20] rounded-lg overflow-hidden group cursor-pointer"
                            >
                                <div className="h-32 sm:h-40 relative overflow-hidden">
                                    <img 
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <motion.div 
                                        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <i className="ri-play-circle-fill text-3xl sm:text-4xl md:text-5xl text-[#6556CD]"></i>
                                    </div>
                                </div>
                                <div className="p-2 sm:p-3">
                                    <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 truncate">{movie.title}</h3>
                                    <p className="text-zinc-400 text-xs">Release: {movie.release_date}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    ) : <Loading />;
};

export default Home;