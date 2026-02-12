"use client";

import React from "react";
import ServicesGrid from "@/components/sections/ServicesGrid";
import CTAStrip from "@/components/sections/CallToActionStrip";
import { motion } from "framer-motion";
import { Activity, Shield, Users } from "lucide-react";

const ServicesPage = () => {
    return (
        <div className="pt-24">
            <section className="bg-white py-20 border-b border-gray-100">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">Comprehensive Care</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Psychiatric Excellence for Every Need</h1>
                        <p className="text-gray-500">Evidence-based treatments combined with compassionate understanding to help you overcome life's mental health challenges.</p>
                    </motion.div>
                </div>
            </section>

            <ServicesGrid />

            {/* Why Choose Us for Treatment */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-primary mb-8">Why Our Psychiatric Approach is Different</h2>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="bg-accent/10 p-4 rounded-2xl h-fit text-accent">
                                        <Shield size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-primary mb-2">Safe & Supportive Environment</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">We provide a non-judgmental space where you can express yourself freely and securely.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="bg-accent/10 p-4 rounded-2xl h-fit text-accent">
                                        <Activity size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-primary mb-2">Personalized Pharmacology</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">Medication is tailored specifically to your neurochemistry and lifestyle for maximum efficacy with minimum side effects.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="bg-accent/10 p-4 rounded-2xl h-fit text-accent">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-primary mb-2">Multidisciplinary Support</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">We combine psychiatric expertise with psychological counseling for a complete recovery path.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-bg-main p-12 rounded-[3rem] border border-gray-100">
                            <h3 className="text-2xl font-bold text-primary mb-6">Conditions We Specialize In:</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none">
                                {[
                                    "Panic Attacks",
                                    "Obsessive Compulsive Disorder",
                                    "Post-Traumatic Stress",
                                    "Performance Anxiety",
                                    "Chronic Insomnia",
                                    "Social Phobia",
                                    "Early Psychosis",
                                    "Geriatric Psychiatry"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 items-center text-sm font-semibold text-gray-600">
                                        <div className="w-2 h-2 rounded-full bg-accent" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <CTAStrip />
        </div>
    );
};

export default ServicesPage;
