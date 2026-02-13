"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Calendar, Clock, ShieldCheck, MessageCircle } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import axios from "axios";

const AppointmentForm = () => {
    const { t } = useLanguage();
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        patientName: "",
        phone: "",
        email: "",
        concern: "",
        preferredDate: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await axios.post("/api/appointments", formData);
            setStatus("success");
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-[2.5rem] shadow-premium text-center border border-accent/20"
            >
                <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send size={32} />
                </div>
                <h2 className="text-3xl font-bold text-primary mb-4">{t("appointment.form.success_title")}</h2>
                <p className="text-gray-500 mb-8">{t("appointment.form.success_desc")}</p>
                <button
                    onClick={() => {
                        setStatus("idle");
                        setFormData({
                            patientName: "",
                            phone: "",
                            email: "",
                            concern: "",
                            preferredDate: "",
                            message: ""
                        });
                    }}
                    className="text-primary font-bold hover:text-accent transition-colors"
                >
                    {t("appointment.form.send_another")}
                </button>
            </motion.div>
        );
    }

    return (
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-premium border border-gray-100">
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-primary mb-2">{t("appointment.form.title")}</h2>
                <p className="text-gray-500 text-sm">{t("appointment.form.subtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {status === "error" && (
                    <div className="p-4 bg-red-50 text-red-500 rounded-xl text-sm font-medium border border-red-100">
                        Something went wrong. Please try again or contact us directly.
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-primary ml-1">{t("appointment.form.name_label")}</label>
                        <input
                            type="text"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                            required
                            className="w-full bg-bg-main border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent hover:border-gray-300 transition-colors"
                            placeholder={t("appointment.form.name_placeholder")}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-primary ml-1">{t("appointment.form.phone_label")}</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full bg-bg-main border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent hover:border-gray-300 transition-colors"
                            placeholder={t("appointment.form.phone_placeholder")}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-primary ml-1">{t("appointment.form.concern_label")}</label>
                    <select
                        name="concern"
                        value={formData.concern}
                        onChange={handleChange}
                        className="w-full bg-bg-main border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent hover:border-gray-300 transition-colors appearance-none"
                        required
                    >
                        <option value="">{t("appointment.form.concern_select")}</option>
                        <option value="anxiety">{t("appointment.form.concern_anxiety")}</option>
                        <option value="depression">{t("appointment.form.concern_depression")}</option>
                        <option value="bipolar">{t("appointment.form.concern_bipolar")}</option>
                        <option value="sleep">{t("appointment.form.concern_sleep")}</option>
                        <option value="stress">{t("appointment.form.concern_stress")}</option>
                        <option value="other">{t("appointment.form.concern_other")}</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-primary ml-1">{t("appointment.form.date_label")}</label>
                        <input
                            type="date"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className="w-full bg-bg-main border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent hover:border-gray-300 transition-colors"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-primary ml-1">{t("appointment.form.email_label")}</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-bg-main border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent hover:border-gray-300 transition-colors"
                            placeholder={t("appointment.form.email_placeholder")}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-primary ml-1">{t("appointment.form.message_label")}</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-bg-main border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent hover:border-gray-300 transition-colors min-h-[120px]"
                        placeholder={t("appointment.form.message_placeholder")}
                    ></textarea>
                </div>

                <div className="flex flex-col gap-6 pt-4">
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="bg-primary text-white w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-primary-light transition-smooth shadow-lg relative overflow-hidden group"
                    >
                        {status === "loading" ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                            />
                        ) : (
                            <>
                                <Calendar size={20} />
                                {t("appointment.form.submit")}
                            </>
                        )}
                    </button>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={14} className="text-accent" />
                            {t("appointment.form.confidential")}
                        </div>
                        <div className="hidden sm:block">|</div>
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-accent" />
                            {t("appointment.form.quick_confirmation")}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;
