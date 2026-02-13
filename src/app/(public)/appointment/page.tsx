"use client";

import React from "react";
import AppointmentForm from "@/components/sections/AppointmentForm";
import { motion } from "framer-motion";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

const AppointmentPage = () => {
    const { t } = useLanguage();

    return (
        <div className="pt-24 min-h-screen bg-bg-main">
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                        {/* Left Info Column */}
                        <div className="lg:col-span-12 xl:col-span-5">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="max-w-xl"
                            >
                                <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">
                                    {t("appointment.badge")}
                                </span>
                                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
                                    {t("appointment.title")}
                                </h1>
                                <p className="text-gray-500 mb-12 leading-relaxed">
                                    {t("appointment.description")}
                                </p>

                                <div className="space-y-8 mb-12">
                                    <div className="flex gap-6 items-start p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                                        <div className="text-accent p-3 bg-accent/5 rounded-xl"><Clock size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-primary mb-1">{t("appointment.timings_title")}</h4>
                                            <p className="text-sm text-gray-500">{t("appointment.timings_days")}</p>
                                            <p className="text-xs text-accent mt-1 font-bold">{t("appointment.timings_note")}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-start p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                                        <div className="text-accent p-3 bg-accent/5 rounded-xl"><MapPin size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-primary mb-1">{t("appointment.location_title")}</h4>
                                            <p className="text-sm text-gray-500 italic">{t("appointment.location_address")}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-10 rounded-[2.5rem] bg-primary text-white space-y-6 shadow-xl relative overflow-hidden">
                                    <MessageCircle className="absolute -bottom-10 -right-10 text-white/5 w-48 h-48" />
                                    <h3 className="text-2xl font-bold relative z-10">{t("appointment.instant_title")}</h3>
                                    <p className="text-gray-300 text-sm relative z-10">{t("appointment.instant_desc")}</p>
                                    <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                                        <a
                                            href="https://wa.me/919079383340"
                                            className="bg-accent text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white hover:text-accent transition-smooth"
                                        >
                                            <MessageCircle size={20} /> WhatsApp
                                        </a>
                                        <a
                                            href="tel:+919079383340"
                                            className="bg-white/10 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/20 transition-smooth"
                                        >
                                            <Phone size={20} /> {t("home.hero.cta_call")}
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Form Column */}
                        <div className="lg:col-span-12 xl:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <AppointmentForm />
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default AppointmentPage;
