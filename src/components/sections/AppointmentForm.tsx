"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Calendar, Clock, ShieldCheck, MessageCircle } from "lucide-react";

const AppointmentForm = () => {
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setTimeout(() => setStatus("success"), 2000);
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
                <h2 className="text-3xl font-bold text-primary mb-4">Request Received</h2>
                <p className="text-gray-500 mb-8">Thank you for reaching out. A representative from Dr. Faizan's clinic will call you shortly to confirm your slot.</p>
                <button
                    onClick={() => setStatus("idle")}
                    className="text-primary font-bold hover:text-accent transition-colors"
                >
                    Send Another Request
                </button>
            </motion.div>
        );
    }

    return (
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-premium border border-gray-100">
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-primary mb-2">Book Your Consultation</h2>
                <p className="text-gray-500 text-sm">Please fill in your details and we'll get back to you.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-primary ml-1">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-bg-main border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent hover:border-gray-300 transition-colors"
                            placeholder="e.g. John Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-primary ml-1">Phone Number</label>
                        <input
                            type="tel"
                            required
                            className="w-full bg-bg-main border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent hover:border-gray-300 transition-colors"
                            placeholder="+91 XXXXX XXXXX"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-primary ml-1">Primary Concern</label>
                    <select
                        className="w-full bg-bg-main border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent hover:border-gray-300 transition-colors appearance-none"
                        required
                    >
                        <option value="">Select Concern</option>
                        <option value="anxiety">Anxiety / Panic</option>
                        <option value="depression">Depression / Sadness</option>
                        <option value="bipolar">Bipolar Disorder</option>
                        <option value="sleep">Sleep Problems</option>
                        <option value="stress">General Stress</option>
                        <option value="other">Other Psychiatric Concern</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-primary ml-1">Preferred Date</label>
                        <input
                            type="date"
                            className="w-full bg-bg-main border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent hover:border-gray-300 transition-colors"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-primary ml-1">Email (Optional)</label>
                        <input
                            type="email"
                            className="w-full bg-bg-main border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent hover:border-gray-300 transition-colors"
                            placeholder="jane@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-primary ml-1">Your Message</label>
                    <textarea
                        className="w-full bg-bg-main border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent hover:border-gray-300 transition-colors min-h-[120px]"
                        placeholder="Tell us briefly about your concerns..."
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
                                Request Appointment Slot
                            </>
                        )}
                    </button>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={14} className="text-accent" />
                            100% Confidential
                        </div>
                        <div className="hidden sm:block">|</div>
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-accent" />
                            Quick Confirmation
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;
