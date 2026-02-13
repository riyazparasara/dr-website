"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Award, GraduationCap, Users, ShieldCheck } from "lucide-react";

const StatsSection = () => {
    const { t } = useLanguage();

    const stats = [
        {
            icon: <Award className="w-8 h-8 text-accent" />,
            value: t("home.stats.experience_value"),
            label: t("home.stats.experience_label")
        },
        {
            icon: <GraduationCap className="w-8 h-8 text-accent" />,
            value: t("home.stats.education_value"),
            label: t("home.stats.education_label")
        },
        {
            icon: <Users className="w-8 h-8 text-accent" />,
            value: t("home.stats.patients_value"),
            label: t("home.stats.patients_label")
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-accent" />,
            value: t("home.stats.confidential_value"),
            label: t("home.stats.confidential_label")
        }
    ];

    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 rounded-3xl bg-bg-main border border-gray-100 flex flex-col items-center text-center hover:shadow-premium transition-smooth"
                        >
                            <div className="mb-4 bg-white p-4 rounded-2xl shadow-sm">
                                {stat.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-1">{stat.value}</h3>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
