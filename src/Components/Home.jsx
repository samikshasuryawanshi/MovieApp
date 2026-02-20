import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import Loading from '../Components/Loading.jsx';
import Footer from './partials/Footer.jsx';
import noImage from '/noImage.jpg';

// ContentRow Component without expanding scale hover card
const ContentRow = ({ title, data, isLandscape = false }) => {
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

    if (!data) {
        return (
            <div className="w-full mb-8 md:mb-12 px-4 md:px-12 lg:px-16">
                <h2 className="text-lg md:text-xl font-bold text-[#e5e5e5] mb-3">{title}</h2>
                <div className={`w-full animate-pulse bg-white/5 rounded-md ${isLandscape ? 'h-32 md:h-48' : 'h-40 md:h-64'}`}></div>
            </div>
        );
    }

    return (
        <div className="group/row w-full mb-6 md:mb-10 relative">
            <h2 className="text-[1.1rem] md:text-xl font-bold text-[#e5e5e5] mb-2 px-4 md:px-12 lg:px-16 drop-shadow-md flex items-center gap-3">
                {title}
            </h2>

            <div className="relative">
                {/* Scroll Buttons - Visible on Desktop Hover */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-0 bottom-0 z-40 bg-[#0f1014]/80 hover:bg-[#0f1014] text-white w-10 md:w-16 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 disabled:opacity-0 hidden sm:flex cursor-pointer backdrop-blur-[2px] shadow-[20px_0_30px_rgba(15,16,20,0.9)]"
                >
                    <i className="ri-arrow-left-s-line text-5xl hover:scale-125 transition-transform"></i>
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-0 bottom-0 z-40 bg-[#0f1014]/80 hover:bg-[#0f1014] text-white w-10 md:w-16 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 disabled:opacity-0 hidden sm:flex cursor-pointer backdrop-blur-[2px] shadow-[-20px_0_30px_rgba(15,16,20,0.9)]"
                >
                    <i className="ri-arrow-right-s-line text-5xl hover:scale-125 transition-transform"></i>
                </button>

                {/* Left/Right Edge fade to indicate scrollability */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[#0f1014] to-transparent z-20 pointer-events-none hidden sm:block"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[#0f1014] to-transparent z-20 pointer-events-none hidden sm:block"></div>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-3 md:gap-4 px-4 md:px-12 lg:px-16 py-2 scrollbar-hide snap-x snap-mandatory relative z-10"
                    style={{ scrollPadding: '0 4vw' }}
                >
                    {data.map((item, i) => {
                        const isTV = item.media_type === 'tv' || item.first_air_date;
                        const linkUrl = `/${isTV ? 'tv' : 'movie'}/details/${item.id}`;
                        const imgUrl = isLandscape
                            ? (item.backdrop_path ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}` : noImage)
                            : (item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : noImage);

                        return (
                            <Link
                                to={linkUrl}
                                key={i}
                                /* No hover scale, just outline and play icon overlay */
                                className={`flex-shrink-0 snap-start relative group transition-all duration-300 bg-[#1a1c22] rounded-md overflow-hidden hover:z-50 outline outline-2 outline-transparent hover:outline-[#e5e5e5]/50 shadow-md hover:shadow-xl
                                    ${isLandscape ? 'w-[45vw] sm:w-[35vw] md:w-[25vw] lg:w-[19vw] xl:w-[16vw] aspect-video'
                                        : 'w-[32vw] sm:w-[22vw] md:w-[16vw] lg:w-[13vw] xl:w-[11vw] aspect-[2/3]'}`}
                            >
                                <img
                                    src={imgUrl}
                                    alt={item.title || item.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />

                                {/* Persistent bottom gradient for Landscape titles */}
                                {isLandscape && (
                                    <>
                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f1014] via-[#0f1014]/60 to-transparent pointer-events-none"></div>
                                        <div className="absolute bottom-2 left-2 right-2 text-white font-bold text-[10px] md:text-sm line-clamp-1 pointer-events-none drop-shadow-md">
                                            {item.title || item.name || item.original_name || item.original_title}
                                        </div>
                                    </>
                                )}

                                {/* Minimalist Play Icon Hover State */}
                                <div className="absolute inset-0 bg-[#0f1014]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/40 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                        <i className="ri-play-fill text-2xl md:text-3xl ml-1"></i>
                                    </div>
                                </div>

                                {/* Top badges */}
                                {item.media_type && (
                                    <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 pointer-events-none">
                                        <span className="bg-[#E50914] text-white text-[8px] md:text-[10px] font-black px-1.5 py-[2px] rounded-sm tracking-widest uppercase shadow-md backdrop-blur-md">
                                            {item.media_type === 'tv' ? 'Series' : 'Film'}
                                        </span>
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// Auto-sliding Hero Carousel (Hotstar style - removing hover scale transitions)
const HeroCarousel = ({ heroItems }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!heroItems || heroItems.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev === heroItems.length - 1 ? 0 : prev + 1));
        }, 7000); // 7 seconds
        return () => clearInterval(timer);
    }, [heroItems]);

    if (!heroItems || heroItems.length === 0) return <div className="h-[80vh] w-full bg-[#0f1014] animate-pulse"></div>;

    const heroData = heroItems[currentIndex];

    return (
        <div className="relative w-full h-[75vh] md:h-[85vh] lg:h-[95vh] overflow-hidden bg-[#0f1014]">
            <AnimatePresence mode="sync">
                <motion.div
                    key={currentIndex}
                    /* Simple pure fade without scale zoom */
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                    style={{
                        background: `url(https://image.tmdb.org/t/p/original/${heroData.backdrop_path || heroData.poster_path})`,
                        backgroundPosition: "center 20%",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    {/* Dark gradient for text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f1014] via-[#0f1014]/70 to-transparent w-full md:w-[80%] z-0"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-[#0f1014]/20 to-transparent h-full z-0"></div>

                    {/* Generous bottom fade protecting the overlapping row */}
                    <div className="absolute bottom-[-2px] left-0 right-0 h-48 md:h-64 bg-gradient-to-t from-[#0f1014] via-[#0f1014]/90 to-transparent pointer-events-none z-10"></div>

                    {/* Adjusted bottom padding (pb-24/32) so content doesn't get overlapped by the first row */}
                    <div className="relative z-20 w-full px-4 md:px-12 lg:px-16 mt-20 md:mt-24 max-w-4xl flex flex-col justify-end h-full pb-24 md:pb-36 lg:pb-40">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col gap-3 md:gap-5"
                        >
                            <div className="flex items-center gap-2 drop-shadow-md text-[10px] md:text-sm font-semibold text-zinc-300">
                                <span className="text-[#46d369] font-bold text-sm md:text-base">{Math.round((heroData.vote_average * 10))}% Match</span>
                                <span className="text-white mx-1">•</span>
                                <span className="text-white">{heroData.media_type === 'tv' ? 'Series' : 'Movie'}</span>
                                <span className="text-white mx-1">•</span>
                                <span className="text-white">{heroData.release_date ? heroData.release_date.substring(0, 4) : heroData.first_air_date ? heroData.first_air_date.substring(0, 4) : ''}</span>
                                <span className="text-white mx-1">•</span>
                                <span className="border border-zinc-500 px-1.5 py-0.5 rounded text-[9px] md:text-[10px] text-white">U/A 16+</span>
                                <span className="border border-zinc-500 px-1.5 py-0.5 rounded text-[9px] md:text-[10px] text-white">HD</span>
                            </div>

                            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.05] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] tracking-tight">
                                {heroData.title || heroData.name || heroData.original_name || heroData.original_title}
                            </h1>

                            <p className="text-zinc-200 text-sm md:text-lg max-w-2xl line-clamp-3 md:line-clamp-4 drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] font-medium leading-relaxed mt-1">
                                {heroData.overview}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-3">
                                <Link
                                    to={`/${heroData.media_type || 'movie'}/details/${heroData.id}`}
                                    className="bg-white hover:bg-zinc-200 text-black px-6 md:px-10 py-2.5 md:py-3.5 rounded-[4px] font-bold text-sm md:text-lg flex items-center gap-2 md:gap-3 transition-colors duration-300 shadow-xl"
                                >
                                    <i className="ri-play-fill text-xl md:text-3xl leading-none"></i>
                                    Watch Now
                                </Link>
                                <Link
                                    to={`/${heroData.media_type || 'movie'}/details/${heroData.id}/trailer`}
                                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 md:px-10 py-2.5 md:py-3.5 rounded-[4px] font-bold text-sm md:text-lg flex items-center gap-2 md:gap-3 transition-colors duration-300 shadow-xl"
                                >
                                    <i className="ri-add-line text-xl md:text-3xl leading-none"></i>
                                    Watchlist
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Pagination Indicators */}
            <div className="absolute right-4 md:right-16 bottom-24 md:bottom-36 z-30 flex flex-col gap-2">
                {heroItems.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-1.5 md:w-2 transition-all duration-300 rounded-full ${currentIndex === idx ? 'h-6 md:h-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'h-1.5 md:h-2 bg-white/40 hover:bg-white/70'}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

// Main Home Component
const Home = () => {
    document.title = "Home | CineMate"

    const [heroDataArray, setHeroDataArray] = useState(null);
    const [trending, setTrending] = useState(null);

    const [nowPlayingMovies, setNowPlayingMovies] = useState(null);
    const [popularMovies, setPopularMovies] = useState(null);
    const [topRatedMovies, setTopRatedMovies] = useState(null);
    const [upcomingMovies, setUpcomingMovies] = useState(null);

    const [airingTodayTv, setAiringTodayTv] = useState(null);
    const [popularTvShows, setPopularTvShows] = useState(null);
    const [topRatedTvShows, setTopRatedTvShows] = useState(null);

    const fetchData = async () => {
        try {
            const [
                trendingAll,
                nowPlaying,
                popularM,
                topRatedM,
                upcoming,
                airingToday,
                popularT,
                topRatedT
            ] = await Promise.all([
                axios.get('/trending/all/day'),
                axios.get('/movie/now_playing'),
                axios.get('/movie/popular'),
                axios.get('/movie/top_rated'),
                axios.get('/movie/upcoming'),
                axios.get('/tv/airing_today'),
                axios.get('/tv/popular'),
                axios.get('/tv/top_rated')
            ]);

            setHeroDataArray(trendingAll.data.results.slice(0, 5));
            setTrending(trendingAll.data.results.slice(5, 20));
            setNowPlayingMovies(nowPlaying.data.results.slice(0, 15));
            setPopularMovies(popularM.data.results.slice(0, 15));
            setTopRatedMovies(topRatedM.data.results.slice(0, 15));
            setUpcomingMovies(upcoming.data.results.slice(0, 15));
            setAiringTodayTv(airingToday.data.results.slice(0, 15));
            setPopularTvShows(popularT.data.results.slice(0, 15));
            setTopRatedTvShows(topRatedT.data.results.slice(0, 15));

        } catch (error) {
            console.log("Error fetching home data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return heroDataArray ? (
        <div className="w-full min-h-screen bg-[#0f1014] overflow-x-hidden flex flex-col font-sans select-none">

            <HeroCarousel heroItems={heroDataArray} />

            {/* Overlapping Rows Section - Adjusted margin to avoid hero text overlap */}
            <div className="relative z-30 w-full flex flex-col pb-20 mt-5 md:mt-10">

                <ContentRow title="Latest & Trending" data={trending} isLandscape={true} />

                <ContentRow title="Now Playing in Theaters" data={nowPlayingMovies} isLandscape={false} />

                <ContentRow title="Only on CineMate • POPULAR SHOWS" data={popularTvShows} isLandscape={false} />

                <ContentRow title="Blockbuster Movies" data={popularMovies} isLandscape={true} />

                <ContentRow title="Airing Today" data={airingTodayTv} isLandscape={false} />

                <ContentRow title="Upcoming Releases" data={upcomingMovies} isLandscape={true} />

                <ContentRow title="Top Rated TV Shows" data={topRatedTvShows} isLandscape={false} />

                <ContentRow title="Critically Acclaimed Movies" data={topRatedMovies} isLandscape={false} />

            </div>

            <Footer />
        </div>
    ) : <Loading />;
};

export default Home;