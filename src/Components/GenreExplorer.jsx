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

    document.title = "cineMate || Genre Explorer";

    // Fetch genres list
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const { data } = await axios.get(`/genre/${category}/list`);
                setGenres(data.genres);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        fetchGenres();
        setSelectedGenre(null); // Reset selection when category changes
        setMedia([]);
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

    return (
        <div className="w-screen h-screen px-2 flex flex-col">
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
                    Genre Explorer
                </h1>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <DropDown
                        title="Category"
                        otpions={["movie", "tv"]}
                        func={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>

            <div className="pt-[100px] w-full flex-1 flex flex-col overflow-hidden">
                {/* Genre Selection Grid (Sticky Top or Scrollable Area) */}
                {!selectedGenre ? (
                    <div className="p-6 overflow-y-auto w-full h-full max-w-6xl mx-auto custom-scrollbar">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center sm:text-left drop-shadow-md">Select a {category === 'movie' ? 'Movie' : 'TV Show'} Genre</h2>
                        {genres.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {genres.map((g, i) => (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={g.id}
                                        onClick={() => handleGenreSelect(g)}
                                        className="bg-[#1b1a20] hover:bg-[#6556CD] border border-white/5 hover:border-transparent p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(101,86,205,0.4)] group hover:-translate-y-1"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                                            <i className="ri-film-line text-2xl text-zinc-400 group-hover:text-white transition-colors"></i>
                                        </div>
                                        <span className="text-lg font-bold text-zinc-300 group-hover:text-white transition-colors tracking-wide">{g.name}</span>
                                    </motion.button>
                                ))}
                            </div>
                        ) : (
                            <Loading />
                        )}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col overflow-hidden w-full h-full">
                        <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 bg-[#121115] gap-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSelectedGenre(null)}
                                    className="text-zinc-400 hover:text-white flex flex-shrink-0 items-center justify-center w-10 h-10 transition-colors bg-white/5 hover:bg-white/10 rounded-full"
                                >
                                    <i className="ri-arrow-left-line text-xl"></i>
                                </button>
                                <h2 className="text-2xl sm:text-3xl font-black text-white capitalize drop-shadow-md">{selectedGenre.name} <span className="text-zinc-500 font-semibold">{category === 'movie' ? 'Movies' : 'TV Shows'}</span></h2>
                            </div>
                        </div>

                        <div id="scrollableDiv" className="flex-1 overflow-y-auto">
                            <InfiniteScroll
                                dataLength={media.length}
                                next={fetchMediaByGenre}
                                hasMore={hasMore}
                                loader={
                                    <div className="flex justify-center items-center py-4">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6556CD]"></div>
                                    </div>
                                }
                                scrollableTarget="scrollableDiv"
                            >
                                <Cards data={media} title={category} />
                            </InfiniteScroll>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenreExplorer;
