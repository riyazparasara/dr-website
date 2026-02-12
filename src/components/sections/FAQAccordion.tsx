"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        q: "Is psychiatric treatment confidential?",
        a: "Yes, absolute confidentiality is our top priority. All consultations and medical records are kept completely private in accordance with medical ethics and law."
    },
    {
        q: "Do you treat both anxiety and depression?",
        a: "Yes, we specialize in evidence-based treatments for both anxiety disorders and clinical depression, tailored to each patient's unique needs."
    },
    {
        q: "Can I book an appointment through WhatsApp?",
        a: "Certainly. You can use the quick WhatsApp button on our website for an immediate response and booking support."
    },
    {
        q: "How long does the treatment usually take?",
        a: "The duration of treatment varies significantly depending on the individual and the nature of the condition. We focus on long-term, sustainable healing."
    },
    {
        q: "When should I consult a psychiatrist?",
        a: "You should consider a consultation if you experience persistent symptoms like sadness, excessive worry, sleep disturbances, or mood swings that interfere with your daily life."
    }
];

const FAQAccordion = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-500">Clear answers to your common concerns about mental health care.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-100 rounded-2xl bg-bg-main overflow-hidden"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white transition-colors"
                            >
                                <span className="font-bold text-primary">{faq.q}</span>
                                <ChevronDown
                                    className={`text-accent transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                                    size={20}
                                />
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQAccordion;
