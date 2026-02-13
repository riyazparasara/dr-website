"use client";

import { useState, useEffect } from "react";
import {
    Save,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Shield,
    Globe
} from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        clinicName: "Dr. M. Faizan Wellness Clinic",
        phone: "+91 90793 83340",
        whatsappPhone: "9079383340",
        email: "drfaizan@wellness.com",
        address: "Jaipur, Rajasthan",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302001",
        facebookUrl: "",
        instagramUrl: "",
        twitterUrl: "",
        youtubeUrl: ""
    });
    const [loading, setLoading] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // API call logic
            setTimeout(() => setLoading(false), 1000);
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-5xl">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Clinic Settings</h1>
                <p className="text-sm text-slate-400">Manage your contact information, address and social connectivity.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* General Info */}
                <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                            <Shield size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">General Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Clinic Name</label>
                            <input
                                type="text"
                                value={settings.clinicName}
                                onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 font-bold text-slate-700"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Primary Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                    className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 font-semibold text-slate-600"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input
                                    type="text"
                                    value={settings.phone}
                                    className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 font-semibold text-slate-600"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">WhatsApp Number</label>
                            <input
                                type="text"
                                value={settings.whatsappPhone}
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 font-semibold text-slate-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Address Info */}
                <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                            <MapPin size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Clinic Address</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Full Address</label>
                            <textarea
                                rows={3}
                                value={settings.address}
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 font-semibold text-slate-600 leading-relaxed"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">City</label>
                                <input type="text" value={settings.city} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">State</label>
                                <input type="text" value={settings.state} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Pincode</label>
                                <input type="text" value={settings.pincode} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                            <Globe size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Social Media Links</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#1877F2]/10 text-[#1877F2] rounded-2xl flex items-center justify-center shrink-0">
                                <Facebook size={24} />
                            </div>
                            <input type="text" placeholder="Facebook URL" className="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none" />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#E4405F]/10 text-[#E4405F] rounded-2xl flex items-center justify-center shrink-0">
                                <Instagram size={24} />
                            </div>
                            <input type="text" placeholder="Instagram URL" className="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none" />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#1DA1F2]/10 text-[#1DA1F2] rounded-2xl flex items-center justify-center shrink-0">
                                <Twitter size={24} />
                            </div>
                            <input type="text" placeholder="Twitter URL" className="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none" />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#FF0000]/10 text-[#FF0000] rounded-2xl flex items-center justify-center shrink-0">
                                <Youtube size={24} />
                            </div>
                            <input type="text" placeholder="Youtube URL" className="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 pb-20">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-3 px-10 py-4 bg-primary text-white rounded-[20px] font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : (
                            <>
                                <Save size={20} />
                                Save All Settings
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
