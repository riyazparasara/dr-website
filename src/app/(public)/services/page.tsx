"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Brain,
    LayoutGrid,
    Baby,
    Wine,
    HeartPulse,
    UserCircle,
    Sparkles,
    Activity,
    AlertCircle,
    ChevronRight,
    Calendar,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const categories = [
    { id: "COMMON", name: "Mental Health", icon: Brain },
    { id: "MAJOR", name: "Major Psychiatric", icon: LayoutGrid },
    { id: "CHILD", name: "Child & Adolescent", icon: Baby },
    { id: "REHAB", name: "Addiction & Rehab", icon: Wine },
    { id: "THERAPY", name: "Counseling & Therapy", icon: HeartPulse },
    { id: "GERIATRIC", name: "Geriatric Psychiatry", icon: UserCircle },
    { id: "WOMEN", name: "Women's Health", icon: Sparkles },
    { id: "LIFESTYLE", name: "Lifestyle Disorders", icon: Activity },
    { id: "EMERGENCY", name: "Emergency Support", icon: AlertCircle },
    { id: "WELLNESS", name: "Wellness", icon: Sparkles }
];

export default function ServicesPage() {
    const { t } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch("/api/admin/services");
                const data = await res.json();
                setServices(data.filter((s: any) => s.active));
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const filteredServices = selectedCategory === "ALL"
        ? services
        : services.filter((s: any) => s.category === selectedCategory);

    return (
        <div className="pt-32 pb-24 min-h-screen bg-bg-main">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Sparkles size={14} />
                        Comprehensive Care
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight"
                    >
                        Our specialized <span className="text-secondary">psychiatric</span> services
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-500 leading-relaxed"
                    >
                        Expert treatments tailored to every life stage. From anxiety management to advanced rehabilitation, we provide evidence-based care in a compassionate environment.
                    </motion.p>
                </div>

                {/* Category Toggles */}
                <div className="flex items-center gap-3 overflow-x-auto pb-8 mb-12 scrollbar-hide">
                    <button
                        onClick={() => setSelectedCategory("ALL")}
                        className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap shadow-sm border ${selectedCategory === "ALL"
                            ? "bg-primary text-white border-primary shadow-primary/20 scale-105"
                            : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
                            }`}
                    >
                        All Treatments
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap shadow-sm border ${selectedCategory === cat.id
                                ? "bg-primary text-white border-primary shadow-primary/20 scale-105"
                                : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
                                }`}
                        >
                            <cat.icon size={16} />
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            Array(6).fill(0).map((_, i) => (
                                <div key={i} className="h-64 bg-white/50 rounded-[2.5rem] border border-gray-100 animate-pulse" />
                            ))
                        ) : filteredServices.length === 0 ? (
                            <div className="col-span-full py-32 text-center">
                                <p className="text-gray-400 font-medium">No services found in this category at the moment.</p>
                            </div>
                        ) : (
                            filteredServices.map((service: any) => (
                                <motion.div
                                    key={service.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-gray-50 group hover:-translate-y-2 transition-all duration-500"
                                >
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="w-16 h-16 bg-bg-main rounded-[1.25rem] flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                                            <Brain size={32} />
                                        </div>
                                        <div className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            {categories.find(c => c.id === service.category)?.name || "Mental Health"}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors line-clamp-1">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                                        {service.description}
                                    </p>

                                    <Link
                                        href="/appointment"
                                        className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
                                    >
                                        Book Consultation
                                        <ArrowRight size={18} className="text-secondary" />
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Emergency Disclaimer */}
            <div className="container px-6 mt-24">
                <div className="p-10 bg-red-50/50 rounded-[2.5rem] border border-red-100 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
                        <AlertCircle size={28} />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-red-900 mb-2">Emergency & Crisis Support</h4>
                        <p className="text-red-700/80 text-sm leading-relaxed">
                            For acute psychosis, severe anxiety crisis, or immediate psychiatric help, please contact emergency services. Services are provided based on individual assessment and clinical need.
                            <strong> For emergencies, please contact your nearest hospital immediately.</strong>
                        </p>
                    </div>
                    <a href="tel:+919079383340" className="px-8 py-4 bg-red-600 text-white rounded-2xl font-bold whitespace-nowrap hover:bg-red-700 transition-all shadow-lg shadow-red-200">
                        Emergency Help
                    </a>
                </div>
            </div>
        </div>
    );
}
