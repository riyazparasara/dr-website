"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        text: "The most supportive psychiatrist I’ve met. Dr. Faizan really listens and understands the complexity of mental health issues.",
        author: "Patient A"
    },
    {
        text: "Helped me overcome severe anxiety with confidence. The medication and therapy balance was perfect for my recovery.",
        author: "Patient B"
    },
    {
        text: "Professional, kind, and highly recommended in Jaipur. A safe space for anyone struggling with mental wellness.",
        author: "Patient C"
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-bg-main">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-primary mb-4">What Our Patients Say</h2>
                    <p className="text-gray-500">Trusted care from Jaipur's leading mental health specialist.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-10 rounded-3xl shadow-sm flex flex-col relative"
                        >
                            <Quote className="absolute top-6 right-8 text-accent/10 w-12 h-12" />
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-accent text-accent" />
                                ))}
                            </div>
                            <p className="text-gray-600 italic mb-8 flex-grow">"{t.text}"</p>
                            <div className="pt-6 border-t border-gray-100">
                                <span className="font-bold text-primary">{t.author}</span>
                                <span className="block text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">Verified Review</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a
                        href="https://share.google/cxLQdQyqvtBme8aX3"
                        target="_blank"
                        className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors underline underline-offset-8"
                    >
                        View More Google Reviews
                    </a>
                    <p className="mt-6 text-xs text-gray-400 italic">* All patient identities remain confidential in compliance with medical ethics.</p>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
