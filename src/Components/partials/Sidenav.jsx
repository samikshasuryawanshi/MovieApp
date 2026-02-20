import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

const Sidenav = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // The navigation items...
  const navItems = [
    { path: "/trending", icon: "ri-fire-fill", label: "Trending" },
    { path: "/popular", icon: "ri-bard-fill", label: "Popular" },
    { path: "/movie", icon: "ri-movie-2-fill", label: "Movies" },
    { path: "/tv", icon: "ri-movie-fill", label: "TV Shows" },
    { path: "/person", icon: "ri-team-fill", label: "People" },
    { path: "/genres", icon: "ri-filter-3-fill", label: "Genre Explorer" },
    { path: "/watchlist", icon: "ri-bookmark-fill", label: "Watchlist" }
  ];

  const infoItems = [
    { path: "/aboutus", icon: "ri-information-fill", label: "About CineMate" },
    { path: "/contactus", icon: "ri-phone-fill", label: "Contact Us" }
  ];

  const SidebarContent = (
    <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden scrollbar-hide py-2">
      {/* Profile Section (Added for premium feel) */}
      <div className="flex items-center gap-4 mb-8 px-2">
        <div className="w-12 h-12 bg-gradient-to-tr from-[#6556CD] to-[#9b89ff] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(101,86,205,0.4)]">
          <i className="ri-user-fill text-xl text-white"></i>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-semibold text-lg">Guest User</span>
          <span className="text-zinc-400 text-xs">Free Plan</span>
        </div>
      </div>

      <nav className="flex-1">
        <h1 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">Menu</h1>
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`relative flex items-center gap-3 rounded-xl p-3 text-base font-medium transition-all duration-300 w-full group overflow-hidden ${location.pathname === item.path
                  ? 'text-white bg-[#6556CD]/10'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {/* Active Indicator Bar */}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-[10%] bottom-[10%] w-1.5 bg-[#6556CD] rounded-r-md shadow-[0_0_10px_#6556CD]"
                />
              )}

              {/* Hover Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#6556CD]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

              <i className={`${item.icon} text-xl ${location.pathname === item.path ? 'text-[#6556CD]' : 'group-hover:text-[#6556CD]'} transition-colors duration-300`}></i>
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </div>

        <hr className="border-none mt-6 mb-6 bg-zinc-800/50 h-[1px]" />

        <h1 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">Information</h1>
        <div className="flex flex-col gap-1">
          {infoItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`relative flex items-center gap-3 rounded-xl p-3 text-base font-medium transition-all duration-300 w-full group overflow-hidden ${location.pathname === item.path
                  ? 'text-white bg-[#6556CD]/10'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeTabInfo"
                  className="absolute left-0 top-[10%] bottom-[10%] w-1.5 bg-[#6556CD] rounded-r-md shadow-[0_0_10px_#6556CD]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-[#6556CD]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              <i className={`${item.icon} text-xl ${location.pathname === item.path ? 'text-[#6556CD]' : 'group-hover:text-[#6556CD]'} transition-colors duration-300`}></i>
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer Branding Area */}
      <div className="mt-8 mb-4 px-2 p-4 rounded-xl bg-gradient-to-br from-[#1b1a20] to-[#24222f] border border-zinc-800/50 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-2">
          <i className="text-[#6556CD] text-xl ri-tv-fill drop-shadow-[0_0_8px_rgba(101,86,205,0.8)]"></i>
          <span className="text-lg font-bold text-white tracking-wide">Cine<span className="text-[#6556CD]">Mate</span></span>
        </div>
        <p className="text-[10px] text-zinc-500">Discover your next favorite movie</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-[#1b1a20]/90 backdrop-blur-md p-4 border-b border-zinc-800 fixed top-0 left-0 right-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <i className="text-[#6556CD] text-2xl ri-tv-fill drop-shadow-[0_0_8px_rgba(101,86,205,0.8)]"></i>
          <span className="text-lg font-bold text-white tracking-wide">Cine<span className="text-[#6556CD]">Mate</span></span>
        </Link>
        <button
          className="text-white text-2xl focus:outline-none hover:text-[#6556CD] transition-colors"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <i className="ri-menu-3-line"></i>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-[280px] bg-[#121115] border-r border-[#1b1a20] z-50 shadow-2xl md:hidden flex flex-col p-6"
              style={{ touchAction: 'none' }}
            >
              <div className="flex items-center justify-end mb-2">
                <button
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                  onClick={() => setOpen(false)}
                  aria-label="Close sidebar"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              {SidebarContent}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="
          hidden md:flex
          flex-col
          w-[280px] h-screen
          bg-[#121115]
          p-6
          border-r border-zinc-800/50
          fixed md:static top-0 left-0 z-30
        "
      >
        {SidebarContent}
      </motion.div>
      <div className="h-16 md:hidden" />
    </>
  );
};

export default Sidenav;