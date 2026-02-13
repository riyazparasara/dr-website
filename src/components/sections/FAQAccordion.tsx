"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

const FAQAccordion = () => {
    const { t } = useLanguage();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqs = [
        {
            q: t("home.faq.q1"),
            a: t("home.faq.a1")
        },
        {
            q: t("home.faq.q2"),
            a: t("home.faq.a2")
        },
        {
            q: t("home.faq.q3"),
            a: t("home.faq.a3")
        },
        {
            q: t("home.faq.q4"),
            a: t("home.faq.a4")
        },
        {
            q: t("home.faq.q5"),
            a: t("home.faq.a5")
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-primary mb-4">{t("home.faq.title")}</h2>
                    <p className="text-gray-500">{t("home.faq.subtitle")}</p>
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
