import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Cards from "./partials/Cards";

const Watchlist = () => {
    const navigate = useNavigate();
    const [watchlist, setWatchlist] = useState([]);

    document.title = "CineMate | Watchlist";

    useEffect(() => {
        const loadWatchlist = () => {
            const saved = localStorage.getItem('cinemate_watchlist');
            if (saved) {
                setWatchlist(JSON.parse(saved));
            } else {
                setWatchlist([]);
            }
        };
        loadWatchlist();
        window.addEventListener('watchlistUpdated', loadWatchlist);
        return () => window.removeEventListener('watchlistUpdated', loadWatchlist);
    }, []);

    return (
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

                {/* Item Counter */}
                <div className="text-zinc-400 font-bold bg-[#141414] py-2 px-6 rounded-full border border-zinc-700/50 shadow-lg text-sm tracking-widest shadow-black/50">
                    {watchlist.length} ITEMS
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
                        Your <span className="text-[#6556CD]">Watchlist</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-zinc-400 text-sm md:text-base mt-2 font-medium max-w-xl leading-relaxed"
                    >
                        Your personal collection of must-watch movies and TV shows. Handpicked by you, ready anytime.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "100%" }}
                        transition={{ delay: 0.4, duration: 0.8, ease: "anticipate" }}
                        className="w-12 h-1 bg-[#6556CD] mt-4 rounded-full"
                    ></motion.div>
                </div>

                {/* Content Area */}
                <div className="w-full mt-6">
                    {watchlist.length > 0 ? (
                        <Cards data={watchlist} title="movie" /> // `title` is fallback for media_type
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[50vh] gap-6 text-center px-4">
                            <motion.i
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                className="ri-bookmark-3-line text-8xl text-zinc-800"
                            ></motion.i>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-3xl md:text-4xl font-black text-zinc-300">Your Watchlist is Empty</h2>
                                <p className="text-zinc-500 max-w-md mx-auto font-medium">Looks like you haven't added any movies or TV shows to your watchlist yet. Explore our collections to find something you like.</p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/')}
                                className="mt-8 px-10 py-3.5 bg-[#6556CD] hover:bg-[#4A3B9C] text-white font-bold rounded-full transition-all shadow-[0_5px_20px_rgba(101,86,205,0.4)] tracking-widest text-sm"
                            >
                                EXPLORE NOW
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Watchlist;
