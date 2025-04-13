import React from 'react';
import { motion } from 'framer-motion';
import Sidenav from './Sidenav';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="flex h-screen w-full bg-[#1F1E24]">
      <Sidenav />
      <div className="w-[80%] h-[100%] overflow-hidden overflow-y-auto px-5 py-10">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 relative"
          >
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 left-0 w-14 h-14 bg-[#6556CD] rounded-full flex items-center justify-center group cursor-pointer"
              >
                <motion.i 
                  className="ri-home-4-fill text-3xl text-white"
                  whileHover={{ scale: 1.2 }}
                ></motion.i>
                
              </motion.div>
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About <span className="text-[#6556CD]">CineMate</span></h1>
            <div className="w-32 h-1 bg-gradient-to-r from-[#6556CD] to-transparent mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-semibold text-white">Our Story</h2>
              <p className="text-zinc-400 leading-relaxed text-lg">
                CineMate is your ultimate destination for discovering and exploring the world of movies and TV shows. 
                We're passionate about bringing you the latest in entertainment, from blockbuster hits to hidden gems.
              </p>
              <p className="text-zinc-400 leading-relaxed text-lg">
                Our platform is designed to make your movie-watching experience seamless and enjoyable. 
                With a vast collection of titles, personalized recommendations, and easy-to-use features, 
                we're here to help you find your next favorite film or series.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#6556CD]/20 via-[#6556CD]/10 to-transparent rounded-2xl group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Movie Theater" 
                className="w-full h-[500px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-10 mb-24"
          >
            {[
              {
                icon: "ri-movie-2-fill",
                title: "Vast Collection",
                description: "Access thousands of movies and TV shows from various genres and eras."
              },
              {
                icon: "ri-star-fill",
                title: "Personalized",
                description: "Get recommendations tailored to your taste and viewing history."
              },
              {
                icon: "ri-device-fill",
                title: "Multi-Platform",
                description: "Watch your favorite content on any device, anywhere, anytime."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#1b1a20] p-8 rounded-2xl group hover:bg-[#1b1a20]/80 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-[#6556CD]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${feature.icon} text-4xl text-[#6556CD]`}></i>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-[#6556CD] transition-colors duration-300">{feature.title}</h3>
                <p className="text-zinc-400 text-lg group-hover:text-zinc-300 transition-colors duration-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 items-center mb-24"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#6556CD]/20 via-[#6556CD]/10 to-transparent rounded-2xl group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Movie Collection" 
                className="w-full h-[400px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-semibold text-white">Our Mission</h2>
              <p className="text-zinc-400 leading-relaxed text-lg">
                We're dedicated to creating a platform that celebrates the art of cinema and television. 
                Our mission is to connect people with stories that inspire, entertain, and move them.
              </p>
              <p className="text-zinc-400 leading-relaxed text-lg">
                Through innovative technology and a deep understanding of what makes great entertainment, 
                we're building a community where film enthusiasts can discover, share, and celebrate their passion.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl font-semibold text-white mb-8">Join Our Community</h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
              Be part of our growing community of movie enthusiasts. Share your thoughts, 
              discover new favorites, and connect with fellow cinephiles.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#6556CD] text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-[#6556CD]/90 transition-colors duration-300"
            >
              Get Started
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-10"
          >
            {[
              {
                number: "10K+",
                label: "Movies & Shows"
              },
              {
                number: "1M+",
                label: "Active Users"
              },
              {
                number: "24/7",
                label: "Support"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <h3 className="text-5xl font-bold text-[#6556CD] mb-2 group-hover:scale-110 transition-transform duration-300">{stat.number}</h3>
                <p className="text-zinc-400 text-lg group-hover:text-zinc-300 transition-colors duration-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 