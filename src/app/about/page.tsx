"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Award, BookOpen, Heart } from "lucide-react";
import CTAStrip from "@/components/sections/CallToActionStrip";

const AboutPage = () => {
    return (
        <div className="pt-24">
            {/* Hero Header */}
            <section className="bg-bg-main py-20 border-b border-gray-100">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">Dedicated to Healing</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">A Doctor Who Listens, Understands & Helps You Heal</h1>
                    </motion.div>
                </div>
            </section>

            {/* Profile & Story */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="w-full lg:w-1/2"
                        >
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] bg-gray-100 flex items-center justify-center">
                                <Heart className="w-32 h-32 text-gray-200" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <p className="text-2xl font-bold mb-1">Dr. M. Faizan</p>
                                    <p className="text-sm opacity-90">MD Psychiatry (SMS Medical College)</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="w-full lg:w-1/2"
                        >
                            <h2 className="text-3xl font-bold text-primary mb-8">Professional Journey & Philosophy</h2>
                            <div className="space-y-6 text-gray-500 leading-relaxed">
                                <p>
                                    Dr. M. Faizan is one of Jaipur’s leading psychiatrists, specializing in evidence-based treatment plans that prioritize the unique journey of every patient.
                                </p>
                                <p>
                                    An alumnus of the prestigious <strong>SMS Medical College, Jaipur</strong>, Dr. Faizan brings years of clinical expertise in managing complex psychiatric conditions with a compassionate, patient-first approach.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                                    {[
                                        "Therapy & Counseling",
                                        "Medication Support",
                                        "Lifestyle Guidance",
                                        "Holistic Wellness"
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-3 items-center text-primary font-semibold">
                                            <CheckCircle className="text-accent" size={20} />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-12 p-8 rounded-3xl bg-accent/5 border border-accent/10">
                                <p className="text-primary italic font-medium">
                                    "Mental wellness is not just the absence of illness; it is the presence of resilience, balance, and joy. My mission is to help you rediscover these in your life."
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="py-24 bg-bg-main">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                            <Award className="text-accent mb-6" size={40} />
                            <h3 className="text-xl font-bold text-primary mb-4">Clinical Excellence</h3>
                            <p className="text-gray-500 text-sm">Trained in the latest psychiatric protocols and pharmacological management.</p>
                        </div>
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                            <BookOpen className="text-accent mb-6" size={40} />
                            <h3 className="text-xl font-bold text-primary mb-4">Academic Background</h3>
                            <p className="text-gray-500 text-sm">Strong academic foundation from SMS Jaipur, focused on neuropsychiatry.</p>
                        </div>
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                            <Heart className="text-accent mb-6" size={40} />
                            <h3 className="text-xl font-bold text-primary mb-4">Patient-First Care</h3>
                            <p className="text-gray-500 text-sm">Committed to long-term healing and sustainable mental health solutions.</p>
                        </div>
                    </div>
                </div>
            </section>

            <CTAStrip />
        </div>
    );
};

export default AboutPage;
