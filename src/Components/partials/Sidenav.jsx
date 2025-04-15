import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidenav = () => {
  const location = useLocation();

  const navItems = [
    { path: "/trending", icon: "ri-fire-fill", label: "Trending" },
    { path: "/popular", icon: "ri-bard-fill", label: "Popular" },
    { path: "/movie", icon: "ri-movie-2-fill", label: "Movies" },
    { path: "/tv", icon: "ri-movie-fill", label: "TV Shows" },
    { path: "/people", icon: "ri-team-fill", label: "People" }
  ];

  const infoItems = [
    { path: "/aboutus", icon: "ri-information-fill", label: "About CineMate" },
    { path: "/contactus", icon: "ri-phone-fill", label: "Contact Us" }
  ];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-[20%] h-[100%] bg-[#1b1a20] p-8 border-r border-zinc-800'
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-3"
      >
        <i className="text-[#6556CD] text-3xl ri-tv-fill"></i>
        <span className="text-2xl font-semibold text-white">CineMate</span>
      </motion.div>

      <nav className='mt-12 flex flex-col gap-1'>
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='text-xl font-semibold text-zinc-300 mb-4'
        >
          New Feed's
        </motion.h1>

        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
          >
            <Link 
              to={item.path}
              className={`flex items-center gap-3 rounded-lg mt-1 p-3 text-lg transition-all duration-300 ${
                location.pathname === item.path 
                  ? 'bg-[#6556CD] text-white' 
                  : 'text-zinc-400 hover:bg-[#6556CD]/20 hover:text-white'
              }`}
            >
              <i className={`${item.icon} text-xl`}></i>
              <span>{item.label}</span>
            </Link>
          </motion.div>
        ))}

        <motion.hr 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className='border-none mt-4 bg-zinc-800 h-[1px]'
        />

        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className='text-xl font-semibold text-zinc-300 mt-6 mb-4'
        >
          Website Information
        </motion.h1>

        {infoItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.1 + index * 0.1 }}
          >
            <Link 
              to={item.path}
              className={`flex items-center gap-3 rounded-lg p-3 text-lg transition-all duration-300 ${
                location.pathname === item.path 
                  ? 'bg-[#6556CD] text-white' 
                  : 'text-zinc-400 hover:bg-[#6556CD]/20 hover:text-white'
              }`}
            >
              <i className={`${item.icon} text-xl`}></i>
              <span>{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidenav;