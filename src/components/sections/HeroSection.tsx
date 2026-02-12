"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Phone, MessageCircle } from "lucide-react";

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10 pointer-events-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#2BB673" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,85.6,-0.9C84,13.9,77.5,27.8,68.9,39.8C60.3,51.8,49.7,61.9,37.2,68.8C24.7,75.7,12.3,79.5,-0.6,80.5C-13.5,81.5,-27.1,79.7,-39.8,73.1C-52.5,66.6,-64.4,55.3,-72.4,41.9C-80.4,28.5,-84.5,13,-83.4,-2.2C-82.3,-17.4,-76,-32.3,-66.3,-44.6C-56.6,-56.9,-43.5,-66.6,-29.7,-73.4C-15.9,-80.2,-1.4,-84.1,13.3,-81.8C28,-79.5,41.4,-71,44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
            </div>

            <div className="container mx-auto px-6">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-widest mb-6">
                            Empowering Minds in Jaipur
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold text-primary mb-8 leading-[1.1]"
                    >
                        Dr. M. Faizan
                        <span className="block text-accent">Mental Wellness Specialist</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl leading-relaxed"
                    >
                        Personalized psychiatric care for Anxiety, Depression, Bipolar Disorder, Schizophrenia & Stress-related challenges. Restoring balance through compassionate healing.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link
                            href="/appointment"
                            className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-primary-light transition-colors shadow-lg"
                        >
                            <Calendar size={20} />
                            Book Appointment
                        </Link>
                        <a
                            href="https://wa.me/919079383340"
                            className="bg-accent text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-accent-hover transition-colors shadow-lg"
                        >
                            <MessageCircle size={20} />
                            WhatsApp Consultation
                        </a>
                        <a
                            href="tel:+919079383340"
                            className="bg-white text-primary border border-gray-200 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <Phone size={20} />
                            Call Now
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
