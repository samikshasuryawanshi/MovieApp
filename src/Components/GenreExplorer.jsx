import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../utils/axios";
import Loading from "./Loading";
import Cards from "./partials/Cards";
import DropDown from "./partials/DropDown";
import InfiniteScroll from "react-infinite-scroll-component";

const GenreExplorer = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("movie");
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const [media, setMedia] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    document.title = "CineMate | Genre Explorer";

    // Fetch genres list
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const { data } = await axios.get(`/genre/${category}/list`);
                setGenres(data.genres);
                if (data.genres.length > 0) {
                    setSelectedGenre(data.genres[0]);
                }
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        fetchGenres();
        setMedia([]);
        setPage(1);
    }, [category]);

    const fetchMediaByGenre = async () => {
        if (!selectedGenre) return;
        try {
            const { data } = await axios.get(`/discover/${category}?with_genres=${selectedGenre.id}&page=${page}`);

            if (data.results.length > 0) {
                setMedia(prev => [...prev, ...data.results]);
                setPage(prev => prev + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching media by genre:", error);
        }
    };

    const handleGenreSelect = (genre) => {
        if (selectedGenre?.id === genre.id) return;
        setSelectedGenre(genre);
        setMedia([]);
        setPage(1);
        setHasMore(true);
    };

    useEffect(() => {
        if (selectedGenre) {
            fetchMediaByGenre();
        }
    }, [selectedGenre]);

    return genres.length > 0 ? (
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

                {/* Stylish Dropdown Section */}
                <div className="flex-1 w-full max-w-sm ml-auto bg-[#141414] rounded-full border border-zinc-700/50 shadow-lg px-4 py-2 shadow-black/50 flex justify-end items-center">
                    <DropDown
                        title="Category"
                        otpions={["movie", "tv"]}
                        func={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>

            <div id="scrollableDiv" className="flex-1 w-full overflow-y-auto overflow-x-hidden relative z-20 custom-scrollbar">

                {/* Section Hero Text */}
                <div className="px-5 md:px-12 lg:px-16 mb-4 md:mb-6 w-full max-w-4xl mt-6 lg:mt-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight"
                    >
                        Explore <span className="text-[#6556CD] capitalize">{category === 'movie' ? 'Movies' : 'TV Shows'}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-zinc-400 text-sm md:text-base mt-2 font-medium max-w-xl leading-relaxed"
                    >
                        Discover curated content tailored specifically for {selectedGenre?.name?.toLowerCase() || 'this'} genre. Filter through to find your next favorite {category === 'movie' ? 'film' : 'show'}.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "100%" }}
                        transition={{ delay: 0.4, duration: 0.8, ease: "anticipate" }}
                        className="w-12 h-1 bg-[#6556CD] mt-4 rounded-full"
                    ></motion.div>
                </div>

                {/* Quick Filters Section - Optimized for Mobile Swiping */}
                <div className="pl-5 md:px-12 lg:px-16 w-full mb-6 mt-6">
                    <h3 className="text-zinc-500 font-bold mb-3 text-xs tracking-widest uppercase">Select Genre</h3>
                    <div className="flex items-center gap-3 md:gap-4 overflow-x-auto scrollbar-hide py-2 pr-5">
                        {genres.map((g, index) => (
                            <button
                                key={index}
                                onClick={() => handleGenreSelect(g)}
                                className={`flex shrink-0 items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs md:text-sm transition-all duration-300 shadow-xl border ${selectedGenre?.id === g.id
                                    ? 'bg-[#6556CD] text-white border-[#6556CD] shadow-[0_5px_15px_rgba(101,86,205,0.4)]'
                                    : 'bg-[#181818] text-zinc-300 border-white/5 hover:bg-white/10 hover:text-white hover:border-white/20'
                                    }`}
                            >
                                <i className={`ri-film-fill text-lg ${selectedGenre?.id === g.id ? 'text-white' : 'text-[#6556CD]'}`}></i>
                                {g.name}
                            </button>
                        ))}
                    </div>
                </div>

                <InfiniteScroll
                    dataLength={media.length}
                    next={fetchMediaByGenre}
                    hasMore={hasMore}
                    loader={
                        <div className="w-full flex justify-center items-center py-10">
                            <div className="w-10 h-10 border-4 border-zinc-700 border-t-[#6556CD] rounded-full animate-spin"></div>
                        </div>
                    }
                    scrollableTarget="scrollableDiv"
                    className="w-full"
                >
                    <Cards data={media} title={category} />
                </InfiniteScroll>
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default GenreExplorer;
