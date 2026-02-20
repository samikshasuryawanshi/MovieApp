import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Sidenav from './partials/Sidenav.jsx'
import Topnav from './partials/Topnav.jsx'
import Header from './partials/Header.jsx'
import HorizontalCards from './partials/HorizontalCards.jsx'
import axios from '../utils/axios';
import DropDown from './partials/DropDown.jsx';
import Loading from '../Components/Loading.jsx';
import Footer from './partials/Footer.jsx';

const Home = () => {
    document.title = "Home | CineMate"
    const [wallpaper, setwallpaper] = useState(null);
    const [trending, setTrending] = useState(null);
    const [category, setcategory] = useState("all");
    const [popularMovies, setPopularMovies] = useState(null);
    const [upcomingMovies, setUpcomingMovies] = useState(null);

    const GetHeaderWallpaper = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`)
            let randomData = data.results[(Math.random() * data.results.length).toFixed()]
            setwallpaper(randomData)
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/day`)
            setTrending(data.results)
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const GetPopularMovies = async () => {
        try {
            const { data } = await axios.get('/movie/popular')
            setPopularMovies(data.results.slice(0, 15))
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const GetUpcomingMovies = async () => {
        try {
            const { data } = await axios.get('/movie/upcoming')
            setUpcomingMovies(data.results.slice(0, 15))
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    useEffect(() => {
        !wallpaper && GetHeaderWallpaper()
        GetTrending()
        GetPopularMovies()
        GetUpcomingMovies()
    }, [category])

    return wallpaper && trending ? (
        <div className="flex flex-col md:flex-row h-screen w-full bg-[#1F1E24]">
            <div className="w-[280px] hidden md:block flex-shrink-0">
                <Sidenav />
            </div>
            <div className="w-full h-full overflow-hidden overflow-y-auto pt-14 md:pt-0 scrollbar-hide flex-1">
                <Topnav />
                <div className="px-3 sm:px-5 md:px-8 max-w-[1600px] mx-auto">
                    <Header data={wallpaper} />

                    {/* Trending Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="py-4 mb-6"
                    >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                                <i className="ri-fire-fill text-[#6556CD] drop-shadow-[0_0_10px_rgba(101,86,205,0.8)]"></i> Trending <span className="text-[#6556CD] ml-2">Now</span>
                            </h2>
                            <DropDown
                                title="Filter"
                                otpions={["tv", 'movie', "all"]}
                                func={(e) => setcategory(e.target.value)}
                            />
                        </div>
                        <HorizontalCards data={trending} />
                    </motion.div>

                    {/* Popular Movies Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="py-4 mb-6"
                    >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                                <i className="ri-bard-fill text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]"></i> Popular <span className="text-[#6556CD] ml-2">Movies</span>
                            </h2>
                        </div>
                        <HorizontalCards data={popularMovies || []} />
                    </motion.div>

                    {/* Upcoming Movies Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="py-4 mb-8"
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <i className="ri-calendar-event-fill text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]"></i> Coming <span className="text-[#6556CD] ml-2">Soon</span>
                        </h2>
                        <HorizontalCards data={upcomingMovies || []} />
                    </motion.div>
                </div>

                <Footer />
            </div>
        </div>
    ) : <Loading />;
};

export default Home;