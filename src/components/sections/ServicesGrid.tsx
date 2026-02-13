"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { useLanguage } from "@/contexts/LanguageContext";

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: string;
}

const ServicesSection = () => {
    const { t } = useLanguage();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch("/api/admin/services");
                const data = await res.json();
                setServices(data);
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    return (
        <section className="bg-bg-main py-24" id="services">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-accent font-bold tracking-[3px] uppercase text-sm mb-4 block"
                    >
                        {t("home.services.badge")}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-primary mb-6"
                    >
                        {t("home.services.title")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-gray-500 leading-relaxed"
                    >
                        {t("home.services.description")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="bg-white p-10 rounded-3xl border border-gray-100 h-64 animate-pulse">
                                <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-6"></div>
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                        ))
                    ) : services.length === 0 ? (
                        <div className="col-span-full text-center py-20">
                            <p className="text-gray-400">No services found.</p>
                        </div>
                    ) : (
                        services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-10 rounded-3xl border border-gray-100 hover:shadow-premium group transition-smooth"
                            >
                                <div className="mb-8 text-accent bg-accent/10 w-fit p-5 rounded-2xl group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                                    <DynamicIcon name={service.icon} className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-4">{service.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
