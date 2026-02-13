"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Search, FileText, HeartPulse } from "lucide-react";

const ApproachSection = () => {
    const { t } = useLanguage();

    const steps = [
        {
            icon: <Search className="w-8 h-8" />,
            title: t("home.approach.step1_title"),
            desc: t("home.approach.step1_desc")
        },
        {
            icon: <FileText className="w-8 h-8" />,
            title: t("home.approach.step2_title"),
            desc: t("home.approach.step2_desc")
        },
        {
            icon: <HeartPulse className="w-8 h-8" />,
            title: t("home.approach.step3_title"),
            desc: t("home.approach.step3_desc")
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-primary mb-4">{t("home.approach.title")}</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">{t("home.approach.subtitle")}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="relative p-10 rounded-3xl bg-bg-main border border-gray-100 hover:border-accent/30 transition-smooth group"
                        >
                            <div className="mb-6 text-accent bg-white w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">{step.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ApproachSection;
