"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Phone } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

const CTAStrip = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-primary rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden"
                >
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                            {t("home.cta.title").split("Mental Health").map((part, i, arr) => (
                                <React.Fragment key={i}>
                                    {part}
                                    {i < arr.length - 1 && <span className="text-accent">Mental Health</span>}
                                </React.Fragment>
                            ))}
                        </h2>
                        <p className="text-gray-300 mb-12 text-lg">
                            {t("home.cta.subtitle")}
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link
                                href="/appointment"
                                className="bg-accent text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-accent-hover transition-smooth shadow-lg"
                            >
                                <Calendar size={20} />
                                {t("home.cta.button_book")}
                            </Link>
                            <a
                                href="tel:+919079383340"
                                className="bg-white text-primary px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-gray-50 transition-smooth shadow-lg"
                            >
                                <Phone size={20} />
                                {t("home.cta.button_call")}
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTAStrip;
