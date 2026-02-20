import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#0A0A0F] overflow-hidden">
            {/* Extremely subtle ambient glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#6556CD]/5 via-transparent to-transparent opacity-60"></div>

            <motion.div
                className="relative z-10 flex flex-col items-center gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                {/* Minimalist brand text */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-4xl md:text-5xl font-black tracking-[0.3em] text-white flex items-center drop-shadow-sm"
                >
                    CINE<span className="text-[#6556CD]">MATE</span>
                </motion.h1>

                {/* Elegant, ultra-thin loading line */}
                <div className="w-48 md:w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div
                        className="absolute top-0 bottom-0 left-0 bg-[#6556CD] rounded-full shadow-[0_0_10px_#6556CD]"
                        animate={{
                            left: ['-50%', '150%']
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{ width: '40%' }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default Loading;