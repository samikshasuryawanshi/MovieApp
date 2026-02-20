import { motion } from "framer-motion";

const DropDown = ({ title, otpions, func }) => {
    return (
        <div className="relative group w-full sm:w-auto z-50">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[#6556CD]/30 rounded-md blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative flex items-center justify-between w-full sm:w-48 bg-[#141414] hover:bg-[#1a1c22] border border-zinc-700/50 hover:border-[#6556CD]/60 rounded-md overflow-hidden transition-all duration-300 shadow-lg">
                <div className="absolute left-3 text-zinc-400 pointer-events-none group-hover:text-[#6556CD] transition-colors">
                    <i className="ri-filter-3-line"></i>
                </div>

                <select
                    defaultValue="0"
                    onChange={func}
                    name="format"
                    id="format"
                    className="w-full bg-transparent text-white text-xs sm:text-sm font-semibold outline-none appearance-none py-2.5 sm:py-3 pl-10 pr-10 cursor-pointer tracking-wide"
                >
                    <option value="0" disabled className="bg-[#141414] text-zinc-500 font-bold">
                        {title}
                    </option>
                    {otpions.map((option, i) => {
                        return (
                            <option key={i} value={option} className="bg-[#141414] text-zinc-200 py-3 font-medium hover:bg-[#2b2b2b]">
                                {option.toUpperCase().replace(/_/g, " ")}
                            </option>
                        )
                    })}
                </select>

                <div className="absolute right-3 text-zinc-400 pointer-events-none group-hover:text-[#6556CD] transition-transform duration-300 group-hover:translate-y-[2px]">
                    <i className="ri-arrow-down-s-line"></i>
                </div>
            </div>
        </div>
    );
};

export default DropDown;