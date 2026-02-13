"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Calendar, Phone, Mail, MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface Appointment {
    id: string;
    patientName: string;
    phone: string;
    email: string | null;
    concern: string;
    preferredDate: string;
    message: string | null;
    status: string;
    createdAt: string;
}

export default function AppointmentDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;

    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchAppointment = async () => {
            try {
                // Assuming we have an API for single appointment
                const res = await fetch(`/api/admin/appointments/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setAppointment(data);
                } else {
                    console.error("Failed to fetch appointment");
                }
            } catch (error) {
                console.error("Error fetching appointment", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointment();
    }, [id]);

    const updateStatus = async (newStatus: string) => {
        if (!id) return;
        try {
            const res = await fetch(`/api/admin/appointments/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setAppointment(prev => prev ? { ...prev, status: newStatus } : null);
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (!appointment) return <div className="p-8">Appointment not found</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/appointments" className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 hover:text-primary transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold text-slate-800">Appointment Details</h1>
                <div className={`ml-auto px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${appointment.status === 'CONFIRMED' ? 'bg-green-100 text-green-600' :
                        appointment.status === 'CANCELLED' ? 'bg-red-100 text-red-600' :
                            appointment.status === 'COMPLETED' ? 'bg-blue-100 text-blue-600' :
                                'bg-yellow-100 text-yellow-600'
                    }`}>
                    {appointment.status}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Patient Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <User className="text-primary" size={20} /> Patient Information
                        </h2>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Full Name</label>
                                    <p className="font-bold text-slate-700 text-lg">{appointment.patientName}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Date Requested</label>
                                    <p className="font-bold text-slate-700 flex items-center gap-2">
                                        <Calendar size={16} className="text-slate-400" />
                                        {new Date(appointment.preferredDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Phone Number</label>
                                    <p className="font-bold text-slate-700 flex items-center gap-2">
                                        <Phone size={16} className="text-slate-400" />
                                        <a href={`tel:${appointment.phone}`} className="hover:text-primary transition-colors">{appointment.phone}</a>
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Email Address</label>
                                    <p className="font-bold text-slate-700 flex items-center gap-2">
                                        <Mail size={16} className="text-slate-400" />
                                        {appointment.email ? (
                                            <a href={`mailto:${appointment.email}`} className="hover:text-primary transition-colors">{appointment.email}</a>
                                        ) : (
                                            <span className="text-slate-400 italic">Not provided</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <MessageSquare className="text-primary" size={20} /> Clinical Concern
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Primary Concern</label>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-medium text-slate-700">
                                    {appointment.concern}
                                </div>
                            </div>

                            {appointment.message && (
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Additional Notes</label>
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-slate-600 leading-relaxed">
                                        {appointment.message}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-6">
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 mb-6">Actions</h2>
                        <div className="space-y-3">
                            <button
                                onClick={() => updateStatus('CONFIRMED')}
                                className="w-full py-3 bg-green-50 text-green-700 rounded-xl font-bold hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                            >
                                <CheckCircle size={18} /> Confirm Appointment
                            </button>
                            <button
                                onClick={() => updateStatus('COMPLETED')}
                                className="w-full py-3 bg-blue-50 text-blue-700 rounded-xl font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                            >
                                <Clock size={18} /> Mark as Completed
                            </button>
                            <button
                                onClick={() => updateStatus('CANCELLED')}
                                className="w-full py-3 bg-red-50 text-red-700 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                            >
                                <XCircle size={18} /> Cancel Appointment
                            </button>
                        </div>
                    </div>

                    <div className="bg-primary/5 rounded-[32px] p-8 border border-primary/10">
                        <h3 className="font-bold text-primary mb-2">Need to contact?</h3>
                        <p className="text-sm text-slate-600 mb-4">You can reach out to the patient directly via WhatsApp using their phone number.</p>
                        <a
                            href={`https://wa.me/${appointment.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-3 bg-primary text-white text-center rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
                        >
                            Open WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
