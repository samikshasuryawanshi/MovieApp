import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();
  document.title = "cineMate | Page Not Found";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#0f0e13] text-white px-4 text-center overflow-hidden relative font-sans p-6">

      {/* Massive Ambient Hero Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#6556CD] opacity-[0.07] blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-600 opacity-[0.05] blur-[150px] rounded-full pointer-events-none z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center max-w-3xl mx-auto w-full"
      >
        <div className="relative flex justify-center items-center mb-8">
          {/* Glitch or glowing text effect */}
          <motion.h1
            initial={{ textShadow: "0 0 0px rgba(101,86,205,0)" }}
            animate={{ textShadow: ["0 0 20px rgba(101,86,205,0.5)", "0 0 60px rgba(101,86,205,0.8)", "0 0 20px rgba(101,86,205,0.5)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-[120px] sm:text-[180px] md:text-[250px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 tracking-tighter z-10"
          >
            404
          </motion.h1>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute z-0 opacity-20 mix-blend-overlay"
          >
            <i className="ri-compass-discover-line text-[150px] sm:text-[200px] md:text-[300px] text-[#6556CD] blur-[2px]"></i>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-[#1b1a20]/40 backdrop-blur-2xl border border-white/5 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 w-full shadow-2xl relative overflow-hidden"
        >
          {/* Internal Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#6556CD]/20 blur-[50px] rounded-full pointer-events-none"></div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight">Lost in space?</h2>
          <p className="text-zinc-400 mb-10 text-lg sm:text-xl font-light leading-relaxed max-w-xl mx-auto">
            The cinematic universe you're looking for has expanded beyond our reach. Try heading back to base.
          </p>

          <div className="flex flex-col justify-center items-center gap-4 sm:flex-row w-full sm:w-auto z-10 relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white font-bold tracking-wide hover:bg-white/[0.08] hover:border-[#6556CD]/50 transition-all flex items-center justify-center gap-3 group"
            >
              <i className="ri-arrow-left-line text-zinc-400 group-hover:text-white transition-colors"></i>
              Go Back
            </motion.button>

            <Link to="/" className="w-full sm:w-auto inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#6556CD] text-white font-bold tracking-wide shadow-[0_10px_30px_rgba(101,86,205,0.3)] hover:shadow-[0_15px_40px_rgba(101,86,205,0.5)] transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <span className="relative z-10">Return Home</span>
                <i className="ri-home-4-fill relative z-10"></i>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
