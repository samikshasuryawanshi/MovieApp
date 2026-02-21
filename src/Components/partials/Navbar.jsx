import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import noImage from '/noImage.jpg';
import logo from '/logo.png';

const Navbar = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // For extra options on mobile

    // Global Mobile Search State
    const [query, setQuery] = useState("");
    const [searches, setSearches] = useState([]);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    // Handle scroll effect for frosted glass header
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch Global Search Results
    const GetSearches = async () => {
        if (!query.trim()) {
            setSearches([]);
            return;
        }
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`)
            setSearches(data.results)
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    useEffect(() => {
        const defaultTimer = setTimeout(() => {
            GetSearches();
        }, 300); // 300ms debounce
        return () => clearTimeout(defaultTimer);
    }, [query]);

    const navItems = [
        { path: "/", icon: "ri-home-fill", label: "Home" },
        { path: "/movie", icon: "ri-movie-2-fill", label: "Movies" },
        { path: "/tv", icon: "ri-tv-fill", label: "TV Shows" },
        { path: "/person", icon: "ri-team-fill", label: "People" },
        { path: "/genres", icon: "ri-filter-3-fill", label: "Genres" },
    ];

    const extraItems = [
        { path: "/trending", icon: "ri-fire-fill", label: "Trending" },
        { path: "/popular", icon: "ri-bard-fill", label: "Popular" },
        { path: "/watchlist", icon: "ri-bookmark-fill", label: "Watchlist" },
        { path: "/aboutus", icon: "ri-information-fill", label: "About" },
        { path: "/contactus", icon: "ri-phone-fill", label: "Contact" }
    ];

    const isActive = (path) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* Desktop Top Header (Hidden on Mobile) */}
            <header className="hidden md:flex fixed top-0 left-0 right-0 z-[100] justify-center pt-4 transition-all duration-300 pointer-events-none">
                <div className={`pointer-events-auto flex items-center justify-between w-[95%] max-w-[1500px] border border-white/10 rounded-full px-6 transition-all duration-500 ${scrolled ? 'bg-[#1b1a20]/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] py-2' : 'bg-[#1b1a20]/60 backdrop-blur-md shadow-2xl py-3'}`}>
                    {/* Logo Section */}
                    <div className="flex items-center gap-6 lg:gap-10">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img src={logo} alt="CineMate Logo" className="h-10 w-auto group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(101,86,205,0.4)]" />
                            <span className="text-xl font-bold text-white tracking-wide mix-blend-difference hidden sm:block">
                                Cine<span className="text-[#6556CD]">Mate</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <nav className="flex items-center gap-1 bg-black/20 backdrop-blur-sm px-2 py-1.5 rounded-full border border-white/5">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${isActive(item.path)
                                        ? 'text-white'
                                        : 'text-zinc-400 hover:text-white'
                                        }`}
                                >
                                    {isActive(item.path) && (
                                        <motion.div
                                            layoutId="activeDesktopNav"
                                            className="absolute inset-0 bg-[#6556CD] rounded-full shadow-[0_0_10px_rgba(101,86,205,0.3)] -z-10"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <i className={`${item.icon} ${isActive(item.path) ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'} transition-colors`}></i>
                                        {item.label}
                                    </span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {/* Global Search Button */}
                        <button
                            onClick={() => setIsMobileSearchOpen(true)}
                            className="w-10 h-10 rounded-full bg-white/5 text-zinc-300 hover:bg-[#6556CD] hover:text-white transition-all flex items-center justify-center border border-white/5 hover:border-[#6556CD]/50 hover:shadow-[0_0_15px_rgba(101,86,205,0.4)]"
                            title="Search"
                        >
                            <i className="ri-search-2-line text-lg"></i>
                        </button>

                        <div className="flex items-center gap-3 border-r border-white/10 pr-4 mr-1">
                            {extraItems.slice(0, 3).map(item => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    title={item.label}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isActive(item.path)
                                        ? 'bg-[#6556CD]/20 text-[#6556CD] border border-[#6556CD]/30'
                                        : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-transparent'
                                        }`}
                                >
                                    <i className={`${item.icon} text-lg`}></i>
                                </Link>
                            ))}
                        </div>

                        {/* Profile/User Icon */}
                        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                            <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden group-hover:border-[#6556CD] transition-colors">
                                <img src="https://ui-avatars.com/api/?name=Guest+User&background=27272a&color=fff" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <div className="hidden lg:flex flex-col">
                                <span className="text-sm font-medium text-white leading-tight mt-1">Guest</span>
                                <span className="text-[10px] text-zinc-400">Free Plan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Top Header (Just Logo) */}
            <header className={`md:hidden fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-[#121115]/95 backdrop-blur-3xl border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3' : 'bg-gradient-to-b from-[#0f1014]/90 via-[#0f1014]/50 to-transparent pt-4 pb-6'}`}>
                <div className="px-5 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#6556CD] blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300 rounded-full"></div>
                            <img src={logo} alt="CineMate Logo" className="h-9 w-auto relative z-10 transform group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <span className="text-xl font-black text-white tracking-tight drop-shadow-md">
                            Cine<span className="text-[#6556CD] font-bold">Mate</span>
                        </span>
                    </Link>

                    {/* Optional small elegant trailing element for visual balance */}
                    <div className={`w-2 h-2 rounded-full bg-[#6556CD] shadow-[0_0_10px_#6556CD] transition-all duration-500 delay-100 ${scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
                </div>
            </header>

            {/* Mobile Bottom Navigation Menu Overlay (for extra items) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%", transition: { duration: 0.2 } }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="md:hidden fixed inset-x-0 bottom-[70px] z-[90] bg-[#1b1a20]/95 backdrop-blur-xl border-t border-white/10 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col p-6"
                    >
                        <div className="w-12 h-1.5 bg-zinc-600 rounded-full mx-auto mb-6 opacity-50"></div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {navItems.slice(3).map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 active:bg-white/10 transition-colors border border-white/5"
                                >
                                    <i className={`${item.icon} text-2xl text-white`}></i>
                                    <span className="text-xs font-semibold text-zinc-300">{item.label}</span>
                                </Link>
                            ))}
                            {extraItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 active:bg-white/10 transition-colors border border-white/5"
                                >
                                    <i className={`${item.icon} text-2xl text-[#6556CD]`}></i>
                                    <span className="text-xs font-semibold text-zinc-300">{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Global Search FAB */}
            <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="md:hidden fixed bottom-[90px] right-4 z-[90] w-14 h-14 bg-[#6556CD] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(101,86,205,0.6)] hover:bg-[#5244ad] active:scale-95 transition-all duration-300 pointer-events-auto"
            >
                <i className="ri-search-2-line text-2xl"></i>
            </button>

            {/* Full-Screen Search Overlay (Global for Desktop & Mobile) */}
            <AnimatePresence>
                {isMobileSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.2 } }}
                        className="fixed inset-0 z-[200] bg-[#121115]/95 backdrop-blur-xl overflow-hidden flex flex-col pt-6 px-4 md:px-10"
                    >
                        <div className="max-w-[1000px] w-full mx-auto flex flex-col h-full">
                            {/* Search Input Area */}
                            <div className="flex items-center gap-3 md:gap-6 w-full mb-6 md:mb-10">
                                <button
                                    onClick={() => setIsMobileSearchOpen(false)}
                                    className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white active:bg-white/20 transition-all border border-transparent hover:border-white/10"
                                >
                                    <i className="ri-arrow-left-line text-xl md:text-2xl"></i>
                                </button>
                                <div className="flex-1 flex items-center bg-[#1b1a20] border border-[#6556CD]/50 h-[50px] md:h-[70px] rounded-full px-4 md:px-8 shadow-[0_0_20px_rgba(101,86,205,0.2)]">
                                    <i className="ri-search-2-line text-xl md:text-3xl text-zinc-400 mr-3 md:mr-5"></i>
                                    <input
                                        autoFocus
                                        onChange={(e) => setQuery(e.target.value)}
                                        value={query}
                                        type="text"
                                        placeholder="Search for movies, tv shows, people..."
                                        className="outline-none w-full text-white placeholder:text-zinc-500 text-sm md:text-xl md:font-medium bg-transparent"
                                    />
                                    {query.length > 0 && (
                                        <i
                                            onClick={() => setQuery("")}
                                            className="text-xl md:text-3xl cursor-pointer text-zinc-400 hover:text-white active:text-white ri-close-fill ml-2 transition-colors"
                                        ></i>
                                    )}
                                </div>
                            </div>

                            {/* Search Results */}
                            <div className="flex-1 overflow-y-auto pb-24 md:pb-10 custom-scrollbar pr-2">
                                {query.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-[50vh] opacity-30 text-zinc-400 gap-4 mt-10 md:mt-20">
                                        <i className="ri-search-2-line text-6xl md:text-8xl mb-2"></i>
                                        <p className="text-lg md:text-2xl font-medium">Type something to explore</p>
                                    </div>
                                ) : searches.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                                        {searches.map((s, i) => (
                                            <Link
                                                to={`/${s.media_type}/details/${s.id}`}
                                                key={i}
                                                className="bg-white/5 hover:bg-white/10 active:bg-white/15 p-3 md:p-4 rounded-2xl flex items-center gap-4 transition-all border border-transparent hover:border-white/10 group cursor-pointer"
                                                onClick={() => {
                                                    setQuery("");
                                                    setIsMobileSearchOpen(false);
                                                }}
                                            >
                                                <img
                                                    className="w-14 h-20 md:w-16 md:h-24 shadow-md rounded-lg object-cover group-hover:scale-105 transition-transform"
                                                    src={
                                                        s.backdrop_path || s.poster_path || s.profile_path || s.logo_path
                                                            ? `https://image.tmdb.org/t/p/w200/${s.poster_path || s.profile_path || s.backdrop_path || s.logo_path}`
                                                            : noImage
                                                    }
                                                    alt=""
                                                />
                                                <div className="flex flex-col overflow-hidden flex-1 justify-center">
                                                    <span className="font-semibold text-sm md:text-base text-zinc-200 group-hover:text-white truncate transition-colors">
                                                        {s.name || s.title || s.original_name || s.original_title}
                                                    </span>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="text-[10px] md:text-xs uppercase bg-[#1b1a20] text-zinc-400 px-2 md:px-2.5 py-0.5 md:py-1 rounded flex items-center gap-1 group-hover:bg-[#6556CD]/20 group-hover:text-[#6556CD] transition-colors border border-white/5">
                                                            <i className={s.media_type === 'movie' ? 'ri-movie-2-line' : s.media_type === 'tv' ? 'ri-tv-line' : 'ri-user-line'}></i> {s.media_type}
                                                        </span>
                                                        {s.vote_average > 0 && (
                                                            <span className="text-[10px] md:text-xs text-yellow-500 font-medium flex items-center gap-1 bg-yellow-500/10 px-2 md:px-2.5 py-0.5 md:py-1 rounded border border-yellow-500/20">
                                                                <i className="ri-star-fill"></i> {(s.vote_average).toFixed(1)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center text-zinc-500 mt-20 text-base md:text-xl flex flex-col items-center gap-4">
                                        <i className="ri-ghost-line text-5xl md:text-7xl opacity-50"></i>
                                        <p>No results found for "<span className="text-white">{query}</span>"</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Bottom Navigation Bar - Floating Dock */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-[100] pointer-events-none">
                <nav className="bg-[#1b1a20]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.6)] px-2 py-2 pointer-events-auto">
                    <div className="flex items-center justify-around relative">
                        {/* Nav Links */}
                        {[navItems[0], navItems[1], navItems[2]].map((item) => {
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="relative flex flex-col items-center justify-center w-16 h-12 gap-1 group"
                                >
                                    <i className={`${item.icon} text-xl transition-all duration-300 ${active ? 'text-[#6556CD] -translate-y-1' : 'text-zinc-500'}`}></i>
                                    <span className={`text-[10px] font-medium transition-all duration-300 ${active ? 'text-white opacity-100' : 'text-zinc-500 opacity-70'}`}>
                                        {item.label}
                                    </span>
                                    {active && (
                                        <motion.div
                                            layoutId="mobileNavIndicator"
                                            className="absolute -top-2 w-10 h-1 bg-gradient-to-r from-transparent via-[#6556CD] to-transparent rounded-full"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}

                        {/* Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="relative flex flex-col items-center justify-center w-16 h-12 gap-1 group"
                        >
                            <div className={`transition-all duration-300 ${mobileMenuOpen ? 'text-[#6556CD] -translate-y-1' : 'text-zinc-500'}`}>
                                {mobileMenuOpen ? <i className="ri-close-fill text-2xl"></i> : <i className="ri-menu-4-fill text-xl"></i>}
                            </div>
                            <span className={`text-[10px] font-medium transition-all duration-300 ${mobileMenuOpen ? 'text-white opacity-100' : 'text-zinc-500 opacity-70'}`}>
                                {mobileMenuOpen ? 'Close' : 'Menu'}
                            </span>
                        </button>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
