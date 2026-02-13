"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Check,
    X,
    Settings,
    LayoutGrid,
    Brain,
    Baby,
    Wine,
    HeartPulse,
    UserCircle,
    Activity,
    AlertCircle,
    Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
    { id: "COMMON", name: "Common Mental Health", icon: Brain },
    { id: "MAJOR", name: "Major Psychiatric", icon: LayoutGrid },
    { id: "CHILD", name: "Child & Adolescent", icon: Baby },
    { id: "REHAB", name: "Addiction & Rehab", icon: Wine },
    { id: "THERAPY", name: "Counseling & Therapy", icon: HeartPulse },
    { id: "GERIATRIC", name: "Geriatric Psychiatry", icon: UserCircle },
    { id: "WOMEN", name: "Women's Mental Health", icon: Sparkles },
    { id: "LIFESTYLE", name: "Lifestyle Disorders", icon: Activity },
    { id: "EMERGENCY", name: "Emergency support", icon: AlertCircle },
    { id: "WELLNESS", name: "Wellness & Prevention", icon: Sparkles }
];

interface Service {
    id: string;
    category: string;
    title: string;
    description: string;
    icon: string;
    active: boolean;
    createdAt: string;
}

interface Blog {
    id: string;
    title: string;
    slug: string;
    coverImage: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    published: boolean;
    createdAt: string;
}

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/services");
            const data = await res.json();
            setServices(data);
        } catch (error) {
            console.error("Failed to fetch services", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;
        try {
            await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
            fetchServices();
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    const [formData, setFormData] = useState({
        category: "COMMON",
        title: "",
        description: "",
        active: true
    });

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = editingService ? "PATCH" : "POST";
            const url = editingService ? `/api/admin/services/${editingService.id}` : "/api/admin/services";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsModalOpen(false);
                setFormData({ category: "COMMON", title: "", description: "", active: true });
                setEditingService(null);
                fetchServices();
            }
        } catch (error) {
            console.error("Save failed", error);
        }
    };

    useEffect(() => {
        if (editingService) {
            setFormData({
                category: editingService.category,
                title: editingService.title,
                description: editingService.description,
                active: editingService.active
            });
        } else {
            setFormData({ category: "COMMON", title: "", description: "", active: true });
        }
    }, [editingService]);

    const filteredServices = services.filter(s =>
        selectedCategory === "ALL" || s.category === selectedCategory
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Services Manager</h1>
                    <p className="text-sm text-slate-400">Add and manage medical services and treatments.</p>
                </div>

                <button
                    onClick={() => { setEditingService(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
                >
                    <Plus size={20} />
                    Add New Service
                </button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                    onClick={() => setSelectedCategory("ALL")}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${selectedCategory === "ALL"
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "bg-white text-slate-500 hover:bg-slate-50"
                        }`}
                >
                    All Services
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${selectedCategory === cat.id
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "bg-white text-slate-500 hover:bg-slate-50"
                            }`}
                    >
                        <cat.icon size={16} />
                        {cat.name}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    Array(6).fill(0).map((_, i) => (
                        <div key={i} className="h-48 bg-white border border-slate-100 rounded-3xl animate-pulse" />
                    ))
                ) : filteredServices.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-slate-400">
                        No services found in this category.
                    </div>
                ) : (
                    filteredServices.map((service) => (
                        <motion.div
                            key={service.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
                                    <Brain size={24} />
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => { setEditingService(service); setIsModalOpen(true); }}
                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service.id)}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2 truncate">{service.title}</h3>
                            <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">{service.description}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    {categories.find(c => c.id === service.category)?.name || "Uncategorized"}
                                </span>
                                <div className={`w-2 h-2 rounded-full ${service.active ? 'bg-green-500' : 'bg-slate-300'}`} />
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden relative z-10"
                        >
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
                                <form className="space-y-4" onSubmit={handleSave}>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10"
                                            required
                                        >
                                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Service Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10"
                                            placeholder="e.g. Anxiety Treatment"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Description</label>
                                        <textarea
                                            rows={4}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10"
                                            placeholder="Describe the treatment..."
                                            required
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 pt-2">
                                        <input
                                            type="checkbox"
                                            id="active"
                                            checked={formData.active}
                                            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                        />
                                        <label htmlFor="active" className="text-sm font-bold text-slate-700">Service is active</label>
                                    </div>

                                    <div className="flex gap-3 pt-6">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="flex-1 px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
                                        >
                                            {editingService ? 'Update Service' : 'Save Service'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
