import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#1F1E24] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#6556CD]/20 via-[#1F1E24] to-[#1F1E24] opacity-50"></div>
        
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="relative z-10 flex flex-col items-center gap-4"
        >
            <div className="relative">
                <i className="ri-tv-fill text-6xl text-[#6556CD] drop-shadow-[0_0_15px_rgba(101,86,205,0.5)]"></i>
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 border-2 border-dashed border-[#6556CD]/50 rounded-full"
                ></motion.div>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-widest uppercase">
                Cine<span className="text-[#6556CD]">Mate</span>
            </h1>
            <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        className="w-3 h-3 bg-[#6556CD] rounded-full"
                    />
                ))}
            </div>
        </motion.div>
    </div>
  );
};

export default Loading;