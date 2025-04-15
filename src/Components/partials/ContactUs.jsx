import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidenav from './Sidenav';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      question: "How can I report a technical issue?",
      answer: "You can report technical issues through our contact form or email us directly at support@cinemate.com. Our technical team typically responds within 24 hours."
    },
    {
      question: "What are your business hours?",
      answer: "Our support team is available 24/7 through email and chat. For phone support, we're available Monday to Friday, 9 AM to 6 PM EST."
    },
    {
      question: "How do I request a refund?",
      answer: "Refund requests can be made through our contact form or by emailing billing@cinemate.com. Please include your order number and reason for the refund request."
    },
    {
      question: "Do you offer enterprise solutions?",
      answer: "Yes, we provide customized enterprise solutions for businesses. Contact our sales team at sales@cinemate.com for more information."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setFormData({
      name: '',
      email: '',
      message:''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Contact <span className="text-[#6556CD]">Us</span></h1>
            <div className="w-32 h-1 bg-gradient-to-r from-[#6556CD] to-transparent mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 mb-20">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center cursor-pointer gap-6 p-6 bg-[#1b1a20] rounded-2xl group"
              >
                <div className="w-16 h-16 bg-[#6556CD]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-mail-fill text-3xl text-[#6556CD]"></i>
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2">Email Us</h3>
                  <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">support@cinemate.com</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center cursor-pointer gap-6 p-6 bg-[#1b1a20] rounded-2xl group"
              >
                <div className="w-16 h-16 bg-[#6556CD]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-phone-fill text-3xl text-[#6556CD]"></i>
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2">Call Us</h3>
                  <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">+1 (555) 123-4567</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center cursor-pointer gap-6 p-6 bg-[#1b1a20] rounded-2xl group"
              >
                <div className="w-16 h-16 bg-[#6556CD]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-map-pin-fill text-3xl text-[#6556CD]"></i>
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2">Visit Us</h3>
                  <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">123 Movie Street, Hollywood, CA</p>
                </div>
              </motion.div>

              <div className="flex items-center gap-8">
                {['ri-facebook-fill', 'ri-twitter-fill', 'ri-instagram-fill', 'ri-youtube-fill'].map((icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    className="w-12 h-12 bg-[#6556CD]/10 rounded-full flex items-center justify-center hover:bg-[#6556CD] transition-colors duration-300"
                  >
                    <i className={`${icon} text-2xl text-[#6556CD] hover:text-white transition-colors duration-300`}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-[#1b1a20] p-8 rounded-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-white text-lg">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#1F1E24] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6556CD] transition-colors duration-300"
                    placeholder="Your Name"
                  />
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-white text-lg">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#1F1E24] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6556CD] transition-colors duration-300"
                    placeholder="Your Email"
                  />
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-white text-lg">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#1F1E24] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6556CD] transition-colors duration-300 h-40"
                    placeholder="Your Message"
                  ></textarea>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#6556CD]  text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#6556CD]/90 transition-colors duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Frequently Asked <span className="text-[#6556CD]">Questions</span></h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  className="bg-[#1b1a20] rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full cursor-pointer p-6 text-left flex items-center justify-between"
                  >
                    <span className="text-white text-lg font-semibold">{faq.question}</span>
                    <motion.i 
                      className={`ri-arrow-down-s-line text-2xl text-[#6556CD] transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}
                    ></motion.i>
                  </button>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: activeFaq === index ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-zinc-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
