import { motion } from "framer-motion";

const DropDown = ({ title, otpions, func }) => {
    return (
        <div className="relative group w-full sm:w-auto">
            <div className="absolute inset-0 bg-[#6556CD] rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative flex items-center justify-between w-full sm:w-48 bg-[#1b1a20] border border-zinc-800 hover:border-[#6556CD]/50 rounded-lg overflow-hidden transition-colors duration-300">
                <div className="absolute left-3 text-zinc-400 pointer-events-none group-hover:text-[#6556CD] transition-colors">
                    <i className="ri-filter-3-line"></i>
                </div>
                <select
                    defaultValue="0"
                    onChange={func}
                    name="format"
                    id="format"
                    className="w-full bg-transparent text-white text-sm outline-none appearance-none py-3 pl-10 pr-10 cursor-pointer"
                >
                    <option value="0" disabled className="bg-[#1b1a20] text-zinc-400">
                        {title}
                    </option>
                    {otpions.map((option, i) => {
                        return (
                            <option key={i} value={option} className="bg-[#1b1a20] text-white py-2">
                                {option.toUpperCase().replace(/_/g, " ")}
                            </option>
                        )
                    })}
                </select>
                <div className="absolute right-3 text-zinc-400 pointer-events-none group-hover:text-[#6556CD] transition-colors">
                    <i className="ri-arrow-down-s-line"></i>
                </div>
            </div>
        </div>
    );
};

export default DropDown;