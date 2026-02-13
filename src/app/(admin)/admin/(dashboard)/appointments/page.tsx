"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Filter,
    MoreHorizontal,
    CheckCircle,
    XCircle,
    Clock,
    Calendar as CalendarIcon,
    Phone,
    Mail,
    User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Appointment = {
    id: string;
    patientName: string;
    phone: string;
    email: string | null;
    concern: string;
    preferredDate: string;
    status: string;
    message: string | null;
    createdAt: string;
};

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/appointments");
            const data = await res.json();
            setAppointments(data);
        } catch (error) {
            console.error("Failed to fetch appointments", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            await fetch(`/api/admin/appointments/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            fetchAppointments();
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const filteredAppointments = appointments.filter(app => {
        const matchesFilter = filter === "ALL" || app.status === filter;
        const matchesSearch =
            app.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.phone.includes(searchQuery) ||
            app.concern.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Appointment Management</h1>
                    <p className="text-sm text-slate-400">View and manage all patient booking requests.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search patients..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 w-64"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10"
                    >
                        <option value="ALL">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400 tracking-wider">Patient</th>
                                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400 tracking-wider">Concern & Date</th>
                                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400 tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400 tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                            <p className="text-sm font-medium">Loading appointments...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredAppointments.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                                        No appointments found.
                                    </td>
                                </tr>
                            ) : (
                                filteredAppointments.map((app) => (
                                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                                                    <User size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800">{app.patientName}</p>
                                                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                                        <span className="flex items-center gap-1"><Phone size={12} /> {app.phone}</span>
                                                        {app.email && <span className="flex items-center gap-1"><Mail size={12} /> {app.email}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-semibold text-slate-700">{app.concern}</p>
                                            <p className="text-xs text-primary mt-1 flex items-center gap-1">
                                                <CalendarIcon size={12} />
                                                {new Date(app.preferredDate).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </td>
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
                                            <div className="flex items-center justify-end gap-2">
                                                {app.status === "PENDING" && (
                                                    <button
                                                        onClick={() => updateStatus(app.id, "CONFIRMED")}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Confirm Appointment"
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                )}
                                                {app.status === "CONFIRMED" && (
                                                    <button
                                                        onClick={() => updateStatus(app.id, "COMPLETED")}
                                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                        title="Mark Completed"
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                )}
                                                {app.status !== "CANCELLED" && app.status !== "COMPLETED" && (
                                                    <button
                                                        onClick={() => updateStatus(app.id, "CANCELLED")}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Cancel Appointment"
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                )}
                                                <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </div>
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
