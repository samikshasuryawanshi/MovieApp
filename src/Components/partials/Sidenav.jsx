import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

const Sidenav = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { path: "/trending", icon: "ri-fire-fill", label: "Trending" },
    { path: "/popular", icon: "ri-bard-fill", label: "Popular" },
    { path: "/movie", icon: "ri-movie-2-fill", label: "Movies" },
    { path: "/tv", icon: "ri-movie-fill", label: "TV Shows" },
    { path: "/person", icon: "ri-team-fill", label: "People" }
  ];

  const infoItems = [
    { path: "/aboutus", icon: "ri-information-fill", label: "About CineMate" },
    { path: "/contactus", icon: "ri-phone-fill", label: "Contact Us" }
  ];

  // Sidebar content as a component for reuse
  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* Only show logo in sidebar (not in topbar at the same time) */}
      <div className="flex items-center gap-2 md:gap-3 mb-6">
        <i className="text-[#6556CD] text-2xl md:text-3xl ri-tv-fill"></i>
        <span className="text-lg md:text-2xl font-semibold text-white">CineMate</span>
      </div>
      <nav className="flex-1">
        <h1 className="text-base md:text-xl font-semibold text-zinc-300 mb-2 md:mb-4">New Feed's</h1>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2 md:gap-3 rounded-lg mt-1 p-2 md:p-3 text-base md:text-lg transition-all duration-300 w-full ${
              location.pathname === item.path
                ? 'bg-[#6556CD] text-white'
                : 'text-zinc-400 hover:bg-[#6556CD]/20 hover:text-white'
            }`}
          >
            <i className={`${item.icon} text-lg md:text-xl`}></i>
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
        <hr className="border-none mt-2 md:mt-4 bg-zinc-800 h-[1px]" />
        <h1 className="text-base md:text-xl font-semibold text-zinc-300 mt-4 md:mt-6 mb-2 md:mb-4">Website Information</h1>
        {infoItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2 md:gap-3 rounded-lg p-2 md:p-3 text-base md:text-lg transition-all duration-300 w-full ${
              location.pathname === item.path
                ? 'bg-[#6556CD] text-white'
                : 'text-zinc-400 hover:bg-[#6556CD]/20 hover:text-white'
            }`}
          >
            <i className={`${item.icon} text-lg md:text-xl`}></i>
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Topbar for mobile (no CineMate logo in sidebar when open) */}
      <div className="md:hidden flex items-center justify-between bg-[#1b1a20] p-4 border-b border-zinc-800 fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center gap-2">
          <i className="text-[#6556CD] text-2xl ri-tv-fill"></i>
          <span className="text-lg font-semibold text-white">CineMate</span>
        </div>
        <button
          className="text-white text-2xl focus:outline-none transition-all"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <i className="ri-menu-3-line"></i>
        </button>
      </div>

      {/* Sidebar drawer for mobile */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-64 bg-[#1b1a20] z-50 shadow-lg md:hidden flex flex-col p-4"
              style={{ touchAction: 'none' }}
            >
              <div className="flex items-center justify-between mb-6">
                {/* Only show close button here, not logo again */}
                <div />
                <button
                  className="text-white text-2xl focus:outline-none transition-all"
                  onClick={() => setOpen(false)}
                  aria-label="Close sidebar"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
              {SidebarContent}
            </motion.div>
            {/* Overlay for mobile drawer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Sidebar for desktop */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="
          hidden md:flex
          flex-col
          w-[250px] h-screen
          bg-[#1b1a20]
          p-8
          border-r border-zinc-800
          fixed md:static top-0 left-0 z-30
        "
      >
        {SidebarContent}
      </motion.div>
      {/* Spacer for mobile topbar */}
      <div className="h-5 md:hidden" />
    </>
  );
};

export default Sidenav;