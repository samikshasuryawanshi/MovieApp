import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import logo from '/logo.png';

const Navbar = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // For extra options on mobile

    // Handle scroll effect for frosted glass header
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            <header
                className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${scrolled
                    ? 'bg-[#1b1a20]/90 backdrop-blur-md shadow-2xl py-3'
                    : 'bg-[#1b1a20]/90 backdrop-blur-md py-3'
                    }`}
            >
                <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between">
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
            <header className={`md:hidden fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${scrolled ? 'bg-[#1b1a20]/90 backdrop-blur-md border-white/5 shadow-xl py-3' : 'bg-transparent border-transparent py-4'}`}>
                <div className="px-4 flex items-center justify-center">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="CineMate Logo" className="h-8 w-auto drop-shadow-[0_0_15px_rgba(101,86,205,0.4)]" />
                        <span className="text-lg font-bold text-white tracking-wide mix-blend-difference">
                            Cine<span className="text-[#6556CD]">Mate</span>
                        </span>
                    </Link>
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

            {/* Mobile Bottom Navigation Bar */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-[#121115]/90 backdrop-blur-xl border-t border-white/10 pb-safe pb-2 pt-2 px-2 shadow-[0_-5px_30px_rgba(0,0,0,0.3)]">
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
        </>
    );
};

export default Navbar;
