"use client";

import { useSession } from "next-auth/react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Bell, Search, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session } = useSession();
    const [showProfile, setShowProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState<{ id: string; message: string }[]>([]);

    useEffect(() => {
        // Fetch unread/pending appointments as notifications
        const fetchNotifications = async () => {
            try {
                const res = await fetch("/api/admin/appointments?status=PENDING");
                if (res.ok) {
                    const data = await res.json();
                    // Map appointments to notifications
                    const newNotifications = data.map((appt: any) => ({
                        id: appt.id,
                        message: `New appointment request from ${appt.patientName}`
                    }));
                    setNotifications(newNotifications);
                }
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            }
        };
        fetchNotifications();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <AdminSidebar />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Admin Header */}
                <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-30">
                    <div className="relative hidden md:block w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search records..."
                            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/20 text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="p-2 text-slate-400 hover:text-primary transition-colors relative"
                            >
                                <Bell size={22} />
                                {notifications.length > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>}
                            </button>

                            <AnimatePresence>
                                {showNotifications && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50"
                                    >
                                        <h3 className="font-bold text-slate-800 mb-2">Notifications</h3>
                                        <div className="space-y-3 max-h-64 overflow-y-auto">
                                            {notifications.length === 0 ? (
                                                <p className="text-sm text-slate-400 p-2">No new notifications</p>
                                            ) : (
                                                notifications.map((notif) => (
                                                    <a href={`/admin/appointments/${notif.id}`} key={notif.id} className="block text-sm p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors">
                                                        {notif.message}
                                                    </a>
                                                ))
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Profile */}
                        <div className="relative">
                            <button
                                onClick={() => setShowProfile(!showProfile)}
                                className="flex items-center gap-3 p-1 hover:bg-slate-50 rounded-xl transition-all"
                            >
                                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary text-sm">
                                    DF
                                </div>
                                <div className="hidden sm:block text-left">
                                    <p className="text-sm font-bold text-slate-700 leading-none">{session?.user?.name || "Dr. Faizan"}</p>
                                    <p className="text-[10px] text-slate-400 font-medium mt-1">Administrator</p>
                                </div>
                                <ChevronDown size={16} className={`text-slate-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {showProfile && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
                                    >
                                        <div className="p-4 border-b border-slate-50">
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Account</p>
                                        </div>
                                        <a href="/admin/settings" className="block w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Profile Settings</a>
                                        <a href="/admin/help" className="block w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Help Center</a>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
