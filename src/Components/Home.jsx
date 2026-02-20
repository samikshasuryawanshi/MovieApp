import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Topnav from './partials/Topnav.jsx';
import HorizontalCards from './partials/HorizontalCards.jsx';
import axios from '../utils/axios';
import DropDown from './partials/DropDown.jsx';
import Loading from '../Components/Loading.jsx';
import Footer from './partials/Footer.jsx';

const Home = () => {
    document.title = "Home | CineMate"

    // State management for all sections
    const [heroData, setHeroData] = useState(null);
    const [trending, setTrending] = useState(null);
    const [trendingCategory, setTrendingCategory] = useState("all");
    const [trendingTimeWindow, setTrendingTimeWindow] = useState("day");

    const [popularMovies, setPopularMovies] = useState(null);
    const [topRatedMovies, setTopRatedMovies] = useState(null);
    const [upcomingMovies, setUpcomingMovies] = useState(null);

    const [popularTvShows, setPopularTvShows] = useState(null);
    const [topRatedTvShows, setTopRatedTvShows] = useState(null);

    const [trendingPeople, setTrendingPeople] = useState(null);

    // Fetching data
    const fetchHeroData = async () => {
        try {
            const { data } = await axios.get('/trending/all/day')
            let randomData = data.results[(Math.random() * data.results.length).toFixed()]
            setHeroData(randomData)
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const fetchTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${trendingCategory}/${trendingTimeWindow}`)
            setTrending(data.results.slice(0, 15))
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const fetchMovieSections = async () => {
        try {
            const [popular, topRated, upcoming] = await Promise.all([
                axios.get('/movie/popular'),
                axios.get('/movie/top_rated'),
                axios.get('/movie/upcoming')
            ]);
            setPopularMovies(popular.data.results.slice(0, 15));
            setTopRatedMovies(topRated.data.results.slice(0, 15));
            setUpcomingMovies(upcoming.data.results.slice(0, 15));
        } catch (error) {
            console.log("Error fetching movies: ", error);
        }
    }

    const fetchTvSections = async () => {
        try {
            const [popular, topRated] = await Promise.all([
                axios.get('/tv/popular'),
                axios.get('/tv/top_rated')
            ]);
            setPopularTvShows(popular.data.results.slice(0, 15));
            setTopRatedTvShows(topRated.data.results.slice(0, 15));
        } catch (error) {
            console.log("Error fetching TV shows: ", error);
        }
    }

    const fetchTrendingPeople = async () => {
        try {
            const { data } = await axios.get('/person/popular')
            setTrendingPeople(data.results.slice(0, 15))
        } catch (error) {
            console.log("Error fetching people: ", error);
        }
    }

    useEffect(() => {
        if (!heroData) {
            fetchHeroData();
            fetchMovieSections();
            fetchTvSections();
            fetchTrendingPeople();
        }
    }, []);

    useEffect(() => {
        fetchTrending();
    }, [trendingCategory, trendingTimeWindow]);

    return heroData ? (
        <div className="w-full min-h-screen bg-[#1F1E24] overflow-x-hidden flex flex-col">
            {/* Search Bar Container - floats over the Hero */}
            <div className="absolute top-[80px] left-0 right-0 z-40 pointer-events-none">
                <div className="max-w-[1600px] mx-auto pointer-events-auto">
                    <Topnav />
                </div>
            </div>

            {/* Immersive Hero Section */}
            <div
                className="relative w-full h-[75vh] md:h-[85vh] lg:h-[90vh] flex items-end pb-16 md:pb-24 px-4 md:px-12 lg:px-20 overflow-hidden"
                style={{
                    background: `linear-gradient(to top, #1F1E24 0%, rgba(31,30,36,0.8) 20%, rgba(31,30,36,0.2) 60%, transparent 100%), 
                                 url(https://image.tmdb.org/t/p/original/${heroData.backdrop_path || heroData.poster_path})`,
                    backgroundPosition: "center 20%",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Additional gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#121115]/80 via-[#121115]/50 to-transparent"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative z-10 w-full max-w-4xl flex flex-col gap-4 sm:gap-6 mt-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex flex-wrap items-center gap-3 drop-shadow-md"
                    >
                        <span className="bg-[#6556CD] text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase">
                            Featured
                        </span>
                        {heroData.media_type && (
                            <span className="bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase border border-white/20">
                                {heroData.media_type === 'tv' ? 'TV Show' : 'Movie'}
                            </span>
                        )}
                        {heroData.vote_average > 0 && (
                            <span className="bg-yellow-500/20 backdrop-blur-md text-yellow-500 border border-yellow-500/30 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                <i className="ri-star-fill"></i> {(heroData.vote_average).toFixed(1)}
                            </span>
                        )}
                    </motion.div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                        {heroData.title || heroData.name || heroData.original_name || heroData.original_title}
                    </h1>

                    <p className="text-zinc-300 text-sm sm:text-base md:text-lg max-w-2xl line-clamp-3 md:line-clamp-4 drop-shadow-lg font-medium leading-relaxed">
                        {heroData.overview}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-4">
                        <Link
                            to={`/${heroData.media_type || 'movie'}/details/${heroData.id}`}
                            className="bg-[#6556CD] hover:bg-[#5244ad] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-xl font-bold text-sm md:text-base flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(101,86,205,0.4)]"
                        >
                            <i className="ri-play-large-fill text-xl"></i>
                            More Details
                        </Link>
                        <Link
                            to={`/${heroData.media_type || 'movie'}/details/${heroData.id}/trailer`}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 md:py-4 rounded-xl font-bold text-sm md:text-base flex items-center gap-2 transition-all duration-300 hover:scale-105"
                        >
                            <i className="ri-film-fill"></i>
                            Watch Trailer
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Main Content Sections */}
            <div className="flex-1 w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 -mt-10 relative z-20 space-y-16 pb-20">

                {/* 1. Trending Now - Dynamic Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative"
                >
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-6 gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white flex items-center gap-3">
                                Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6556CD] to-[#9b89ff]">Now</span>
                            </h2>
                            <p className="text-zinc-500 text-sm mt-1">The most watched content right now.</p>
                        </div>
                        <div className="flex bg-[#121115] p-1 rounded-xl border border-white/5">
                            <button
                                onClick={() => setTrendingTimeWindow('day')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${trendingTimeWindow === 'day' ? 'bg-[#6556CD] text-white shadow-lg' : 'text-zinc-400 hover:text-white'}`}
                            >Today</button>
                            <button
                                onClick={() => setTrendingTimeWindow('week')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${trendingTimeWindow === 'week' ? 'bg-[#6556CD] text-white shadow-lg' : 'text-zinc-400 hover:text-white'}`}
                            >This Week</button>
                        </div>
                    </div>
                    {trending ? <HorizontalCards data={trending} /> : <div className="h-64 animate-pulse bg-white/5 rounded-2xl w-full"></div>}
                </motion.section>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>

                {/* 2. Popular Movies */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="flex items-end justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3 border-l-4 border-yellow-500 pl-4">
                            Popular Movies
                        </h2>
                        <Link to="/movie" className="text-[#6556CD] hover:text-white text-sm font-semibold flex items-center gap-1 group transition-colors">
                            Explore All <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                        </Link>
                    </div>
                    {popularMovies ? <HorizontalCards data={popularMovies} /> : <div className="h-64 animate-pulse bg-white/5 rounded-2xl w-full"></div>}
                </motion.section>

                {/* 3. Top Rated Movies */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="flex items-end justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3 border-l-4 border-[#6556CD] pl-4">
                            Top Rated Movies
                        </h2>
                    </div>
                    {topRatedMovies ? <HorizontalCards data={topRatedMovies} /> : <div className="h-64 animate-pulse bg-white/5 rounded-2xl w-full"></div>}
                </motion.section>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>

                {/* 4. Popular TV Shows */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="flex items-end justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3 border-l-4 border-blue-500 pl-4">
                            Popular TV Shows
                        </h2>
                        <Link to="/tv" className="text-[#6556CD] hover:text-white text-sm font-semibold flex items-center gap-1 group transition-colors">
                            Explore All <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                        </Link>
                    </div>
                    {popularTvShows ? <HorizontalCards data={popularTvShows} /> : <div className="h-64 animate-pulse bg-white/5 rounded-2xl w-full"></div>}
                </motion.section>

                {/* 5. Top Rated TV Shows */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="flex items-end justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3 border-l-4 border-emerald-500 pl-4">
                            Top Rated TV Shows
                        </h2>
                    </div>
                    {topRatedTvShows ? <HorizontalCards data={topRatedTvShows} /> : <div className="h-64 animate-pulse bg-white/5 rounded-2xl w-full"></div>}
                </motion.section>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>

                {/* 6. Coming Soon */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="flex items-end justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3 border-l-4 border-pink-500 pl-4">
                            Coming Soon to Theaters
                        </h2>
                    </div>
                    {upcomingMovies ? <HorizontalCards data={upcomingMovies} /> : <div className="h-64 animate-pulse bg-white/5 rounded-2xl w-full"></div>}
                </motion.section>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>

                {/* 7. Trending People / Top Cast */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="flex items-end justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3 border-l-4 border-purple-500 pl-4">
                            Trending People
                        </h2>
                        <Link to="/person" className="text-[#6556CD] hover:text-white text-sm font-semibold flex items-center gap-1 group transition-colors">
                            Explore All <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                        </Link>
                    </div>
                    {trendingPeople ? (
                        <div className="w-full flex gap-5 overflow-y-hidden overflow-x-auto p-4 custom-scrollbar snap-x snap-mandatory">
                            {trendingPeople.map((person, i) => (
                                <Link
                                    to={`/person/details/${person.id}`}
                                    key={i}
                                    className="min-w-[140px] md:min-w-[160px] flex flex-col items-center bg-[#1b1a20] p-4 rounded-2xl group hover:shadow-[0_0_20px_rgba(101,86,205,0.3)] hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-[#6556CD]/30 snap-start"
                                >
                                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mb-4 border-[3px] border-zinc-800 group-hover:border-[#6556CD] transition-colors duration-300 shadow-lg relative">
                                        <img
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            src={
                                                person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : 'https://ui-avatars.com/api/?name=' + person.name + '&background=27272a&color=fff'
                                            }
                                            alt={person.name}
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                            <i className="ri-user-fill text-white text-2xl"></i>
                                        </div>
                                    </div>
                                    <h1 className="text-white font-bold text-center text-sm md:text-base line-clamp-1 group-hover:text-[#6556CD] transition-colors">{person.name}</h1>
                                    <p className="text-zinc-500 text-xs mt-1 text-center line-clamp-1">{person.known_for_department}</p>
                                </Link>
                            ))}
                        </div>
                    ) : <div className="h-48 animate-pulse bg-white/5 rounded-2xl w-full"></div>}
                </motion.section>

            </div>

            <Footer />
        </div>
    ) : <Loading />;
};

export default Home;