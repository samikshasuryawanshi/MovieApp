import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full bg-[#121115] py-10 px-6 md:px-12 mt-10 border-t border-zinc-800/50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                <div className="flex flex-col items-center md:items-start">
                    <Link to="/" className="flex items-center gap-2 mb-4">
                        <i className="text-[#6556CD] text-3xl ri-tv-fill drop-shadow-[0_0_8px_rgba(101,86,205,0.8)]"></i>
                        <span className="text-2xl font-bold text-white tracking-wide">Cine<span className="text-[#6556CD]">Mate</span></span>
                    </Link>
                    <p className="text-zinc-500 text-sm max-w-xs text-center md:text-left">
                        Your ultimate destination for movies, TV shows, and people tracking. Designed with passion for premium experiences.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-10 md:gap-20 text-center sm:text-left mt-4 md:mt-0">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-white font-semibold mb-2 uppercase tracking-wider text-sm">Explore</h3>
                        <Link to="/movie" className="text-zinc-500 hover:text-[#6556CD] transition-colors text-sm">Movies</Link>
                        <Link to="/tv" className="text-zinc-500 hover:text-[#6556CD] transition-colors text-sm">TV Shows</Link>
                        <Link to="/person" className="text-zinc-500 hover:text-[#6556CD] transition-colors text-sm">People</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-white font-semibold mb-2 uppercase tracking-wider text-sm">Information</h3>
                        <Link to="/aboutus" className="text-zinc-500 hover:text-[#6556CD] transition-colors text-sm">About Us</Link>
                        <Link to="/contactus" className="text-zinc-500 hover:text-[#6556CD] transition-colors text-sm">Contact Us</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-white font-semibold mb-2 uppercase tracking-wider text-sm">Follow Us</h3>
                        <div className="flex justify-center sm:justify-start gap-4">
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#6556CD] hover:text-white transition-all hover:scale-110">
                                <i className="ri-github-fill text-lg"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#6556CD] hover:text-white transition-all hover:scale-110">
                                <i className="ri-twitter-x-fill text-lg"></i>
                            </a>
                            <a href="https://discord.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#6556CD] hover:text-white transition-all hover:scale-110">
                                <i className="ri-discord-fill text-lg"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-zinc-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-zinc-600 text-xs text-center sm:text-left">
                    &copy; {new Date().getFullYear()} CineMate. All rights reserved. Data provided by TMDB.
                </p>
                <p className="text-zinc-600 text-xs flex gap-6">
                    <span className="cursor-pointer hover:text-zinc-400 transition-colors">Privacy Policy</span>
                    <span className="cursor-pointer hover:text-zinc-400 transition-colors">Terms of Service</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
