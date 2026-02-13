"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Phone, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Banner {
    id: string;
    headline: string;
    subtext: string | null;
    image: string;
    buttonText: string | null;
    buttonLink: string | null;
}

const HeroSection = () => {
    const { t } = useLanguage();
    const [banners, setBanners] = useState<Banner[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await fetch("/api/admin/banners");
                const data = await res.json();
                setBanners(data.filter((b: any) => b.active));
            } catch (error) {
                console.error("Failed to fetch banners", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, []);

    useEffect(() => {
        if (banners.length > 1) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % banners.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [banners]);

    if (loading) return <div className="h-screen bg-bg-main animate-pulse" />;

    const currentBanner = banners[currentIndex];

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
            <AnimatePresence mode="wait">
                {currentBanner ? (
                    <motion.div
                        key={currentBanner.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-0"
                    >
                        <img
                            src={currentBanner.image}
                            alt={currentBanner.headline}
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-bg-main via-bg-main/90 to-transparent" />
                    </motion.div>
                ) : (
                    /* Default Background Decor if no banners */
                    <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10 pointer-events-none">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#2BB673" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,85.6,-0.9C84,13.9,77.5,27.8,68.9,39.8C60.3,51.8,49.7,61.9,37.2,68.8C24.7,75.7,12.3,79.5,-0.6,80.5C-13.5,81.5,-27.1,79.7,-39.8,73.1C-52.5,66.6,-64.4,55.3,-72.4,41.9C-80.4,28.5,-84.5,13,-83.4,-2.2C-82.3,-17.4,-76,-32.3,-66.3,-44.6C-56.6,-56.9,-43.5,-66.6,-29.7,-73.4C-15.9,-80.2,-1.4,-84.1,13.3,-81.8C28,-79.5,41.4,-71,44.7,-76.4Z" transform="translate(100 100)" />
                        </svg>
                    </div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl">
                    <motion.div
                        key={currentBanner?.id || 'static'}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-widest mb-6">
                            {currentBanner ? "Special Announcement" : t("home.hero.badge")}
                        </span>

                        <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8 leading-[1.1]">
                            {currentBanner?.headline || t("home.hero.title")}
                            {!currentBanner && <span className="block text-accent">{t("home.hero.specialty")}</span>}
                        </h1>

                        <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl leading-relaxed">
                            {currentBanner?.subtext || t("home.hero.description")}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={currentBanner?.buttonLink || "/appointment"}
                                className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-primary-light transition-colors shadow-lg"
                            >
                                <Calendar size={20} />
                                {currentBanner?.buttonText || t("home.hero.cta_appointment")}
                            </Link>
                            {!currentBanner && (
                                <>
                                    <a
                                        href="https://wa.me/919079383340"
                                        className="bg-accent text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-accent-hover transition-colors shadow-lg"
                                    >
                                        <MessageCircle size={20} />
                                        {t("home.hero.cta_whatsapp")}
                                    </a>
                                    <a
                                        href="tel:+919079383340"
                                        className="bg-white text-primary border border-gray-200 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-gray-50 transition-colors shadow-sm"
                                    >
                                        <Phone size={20} />
                                        {t("home.hero.cta_call")}
                                    </a>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Slider Controls if many banners */}
            {banners.length > 1 && (
                <div className="absolute bottom-12 right-12 flex gap-4">
                    <button
                        onClick={() => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)}
                        className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl transition-all border border-white/20"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={() => setCurrentIndex((prev) => (prev + 1) % banners.length)}
                        className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl transition-all border border-white/20"
                    >
                        <ChevronRight />
                    </button>
                </div>
            )}
        </section>
    );
};

export default HeroSection;
