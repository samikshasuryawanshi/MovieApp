import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#1F1E24] text-white px-4 text-center overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6556CD] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9b89ff] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative">
          <motion.h1
            initial={{ textShadow: "0 0 0px #6556CD" }}
            animate={{ textShadow: ["0 0 10px #6556CD", "0 0 30px #6556CD", "0 0 10px #6556CD"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[150px] md:text-[200px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-white via-[#6556CD] to-[#1F1E24]"
          >
            404
          </motion.h1>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
          >
            <i className="ri-film-fill text-[200px] md:text-[250px] text-white/5 blur-sm"></i>
          </motion.div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg mt-4">Lost in space?</h2>
        <p className="text-zinc-400 mb-10 max-w-md text-lg">
          The page you're looking for has been moved, exists in another universe, or doesn't exist at all.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="bg-[#1b1a20] border border-zinc-700 hover:border-[#6556CD] transition-colors px-8 py-4 rounded-xl text-white font-medium flex items-center justify-center gap-2"
          >
            <i className="ri-arrow-left-line"></i> Go Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="bg-[#6556CD] hover:bg-[#574bc3] shadow-[0_0_20px_rgba(101,86,205,0.4)] transition-colors px-8 py-4 rounded-xl text-white font-medium flex items-center justify-center gap-2"
          >
            <i className="ri-home-4-line"></i> Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
