"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
    Calendar,
    TrendingUp,
    Clock,
    CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
    const { data: session } = useSession();
    const [stats, setStats] = useState([
        { label: "Total Appointments", value: "0", icon: Calendar, color: "bg-blue-500" },
        { label: "Pending Requests", value: "0", icon: Clock, color: "bg-orange-500" },
        { label: "Completed Sessions", value: "0", icon: CheckCircle, color: "bg-green-500" },
        { label: "Website Visits", value: "1.2k", icon: TrendingUp, color: "bg-purple-500" },
    ]);
    const [recentAppointments, setRecentAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/admin/appointments");
                if (res.ok) {
                    const data = await res.json();

                    // Calculate stats
                    const total = data.length;
                    const pending = data.filter((a: any) => a.status === "PENDING").length;
                    const completed = data.filter((a: any) => a.status === "COMPLETED").length;

                    setStats([
                        { label: "Total Appointments", value: total.toString(), icon: Calendar, color: "bg-blue-500" },
                        { label: "Pending Requests", value: pending.toString(), icon: Clock, color: "bg-orange-500" },
                        { label: "Completed Sessions", value: completed.toString(), icon: CheckCircle, color: "bg-green-500" },
                        { label: "Website Visits", value: "1.2k", icon: TrendingUp, color: "bg-purple-500" }, // Mock for now
                    ]);

                    // Set recent (last 5)
                    setRecentAppointments(data.slice(0, 5));
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Welcome, {session?.user?.name || "Doctor"}</h1>
                <p className="text-sm text-slate-400">Here's what's happening at your clinic today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow"
                    >
                        <div className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Appointments Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800">Recent Appointments</h2>
                    <Link href="/admin/appointments" className="text-sm text-primary font-bold hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400 tracking-wider">Patient Name</th>
                                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400 tracking-wider">Concern</th>
                                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400 tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400 tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400 tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr><td colSpan={5} className="p-8 text-center text-slate-400">Loading...</td></tr>
                            ) : recentAppointments.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-slate-400">No appointments found</td></tr>
                            ) : (
                                recentAppointments.map((app: any) => (
                                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-slate-700">{app.patientName}</td>
                                        <td className="px-6 py-4 text-slate-500">{app.concern}</td>
                                        <td className="px-6 py-4 text-slate-500">{new Date(app.preferredDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest ${app.status === "PENDING" ? "bg-orange-100 text-orange-600" :
                                                    app.status === "CONFIRMED" ? "bg-blue-100 text-blue-600" :
                                                        app.status === "COMPLETED" ? "bg-green-100 text-green-600" :
                                                            "bg-red-100 text-red-600"
                                                }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/admin/appointments/${app.id}`} className="text-primary font-bold text-sm hover:underline">Manage</Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
