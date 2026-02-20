import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Cards from "./partials/Cards";

const Watchlist = () => {
    const navigate = useNavigate();
    const [watchlist, setWatchlist] = useState([]);

    document.title = "cineMate || Watchlist";

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
        <div className="w-screen min-h-screen px-2 pb-10">
            {/* Fixed Header */}
            <div className="w-full z-10 flex flex-col sm:flex-row items-start sm:items-center py-3 sm:py-4 px-4 sm:px-8 border-b border-white/5 shadow-2xl h-fit bg-[#1F1E24]/80 backdrop-blur-xl fixed top-0 left-0 right-0 justify-between gap-3 sm:gap-0 transition-all">
                <h1 className="text-2xl cursor-pointer flex items-center gap-4 font-black text-white drop-shadow-md mb-2 sm:mb-0 tracking-wide">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#6556CD] to-[#4A3B9C] flex items-center justify-center cursor-pointer group relative shadow-lg shadow-[#6556CD]/30"
                    >
                        <motion.i
                            className="ri-arrow-left-line text-xl sm:text-2xl text-white"
                            whileHover={{ scale: 1.2 }}
                        />
                    </motion.div>
                    My Watchlist
                </h1>
                <div className="text-zinc-400 font-semibold bg-white/5 py-1.5 px-4 rounded-full border border-white/10">{watchlist.length} Items</div>
            </div>

            <div className="pt-[100px] w-full h-full">
                {watchlist.length > 0 ? (
                    <Cards data={watchlist} title="movie" /> // `title` is fallback for media_type
                ) : (
                    <div className="flex flex-col items-center justify-center h-[70vh] gap-6 text-center px-4">
                        <i className="ri-bookmark-3-line text-8xl text-zinc-700"></i>
                        <h2 className="text-3xl font-bold text-white">Your Watchlist is Empty</h2>
                        <p className="text-zinc-400 max-w-md">Looks like you haven't added any movies or TV shows to your watchlist yet. Explore our collections to find something you like.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="mt-4 px-8 py-3 bg-[#6556CD] hover:bg-[#4A3B9C] text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#6556CD]/30"
                        >
                            Explore Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Watchlist;
