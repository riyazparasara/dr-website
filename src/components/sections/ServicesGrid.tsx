"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, CloudSun, Scale, Activity, Zap, Bed, HeartPulse } from "lucide-react";

const services = [
    {
        icon: <Brain className="w-10 h-10" />,
        title: "Anxiety Disorders",
        desc: "Expert care for panic attacks, social phobias, and generalized anxiety using evidence-based clinical protocols."
    },
    {
        icon: <CloudSun className="w-10 h-10" />,
        title: "Depression Recovery",
        desc: "Holistic depression treatment combining medication, therapy, and continuous emotional support."
    },
    {
        icon: <Scale className="w-10 h-10" />,
        title: "Bipolar Management",
        desc: "Stabilizing mood swings and providing sustainable long-term strategies for emotional balance."
    },
    {
        icon: <Zap className="w-10 h-10" />,
        title: "Schizophrenia Care",
        desc: "Specialized psychiatric intervention and recovery-focused management for complex mental health conditions."
    },
    {
        icon: <Activity className="w-10 h-10" />,
        title: "Stress & Panic Issues",
        desc: "Rapid response and long-term coping strategies for acute stress and lifestyle-triggered panic."
    },
    {
        icon: <Bed className="w-10 h-10" />,
        title: "Sleep Solutions",
        desc: "Diagnosing and treating insomnia and other sleep-related psychiatric disorders for overall wellness."
    }
];

const ServicesSection = () => {
    return (
        <section className="bg-bg-main py-24" id="services">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-accent font-bold tracking-[3px] uppercase text-sm mb-4 block"
                    >
                        Our Expertise
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-primary mb-6"
                    >
                        Specialized Conditions Treated
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-gray-500 leading-relaxed"
                    >
                        We provide comprehensive psychiatric evaluations and personalized treatment plans for a wide range of mental health challenges.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-10 rounded-3xl border border-gray-100 hover:shadow-premium group transition-smooth"
                        >
                            <div className="mb-8 text-accent bg-accent/10 w-fit p-5 rounded-2xl group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-4">{service.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
