"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Image as ImageIcon,
    Trash2,
    Eye,
    Save,
    Type,
    Link as LinkIcon,
    ToggleLeft,
    ToggleRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Banner {
    id: string;
    headline: string;
    subtext: string | null;
    image: string;
    buttonText: string | null;
    buttonLink: string | null;
    active: boolean;
    order: number;
}

export default function BannersPage() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/banners");
            const data = await res.json();
            setBanners(data);
        } catch (error) {
            console.error("Failed to fetch banners", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id: string, active: boolean) => {
        try {
            await fetch(`/api/admin/banners/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ active: !active }),
            });
            fetchBanners();
        } catch (error) {
            console.error("Failed to toggle status", error);
        }
    };

    const togglePublish = async (id: string, currentStatus: boolean) => {
        if (!confirm("Are you sure?")) return;
        try {
            await fetch(`/api/admin/banners/${id}`, { method: "DELETE" });
            fetchBanners();
        } catch (error) {
            console.error("Failed to toggle status", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await fetch(`/api/admin/banners/${id}`, { method: "DELETE" });
            fetchBanners();
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    const [formData, setFormData] = useState({
        headline: "",
        subtext: "",
        image: "",
        buttonText: "Learn More",
        buttonLink: "/services"
    });

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/admin/banners", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setIsModalOpen(false);
                setFormData({ headline: "", subtext: "", image: "", buttonText: "Learn More", buttonLink: "/services" });
                fetchBanners();
            }
        } catch (error) {
            console.error("Save failed", error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Homepage Banners</h1>
                    <p className="text-sm text-slate-400">Manage the hero section sliders and call-to-actions.</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
                >
                    <Plus size={20} />
                    Add New Banner
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {loading ? (
                    Array(2).fill(0).map((_, i) => <div key={i} className="h-64 bg-white border border-slate-100 rounded-[40px] animate-pulse" />)
                ) : banners.length === 0 ? (
                    <div className="col-span-full py-20 bg-white rounded-[40px] border border-slate-100 border-dashed text-center">
                        <ImageIcon size={48} className="text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-medium">No banners found. Add one to start sliding!</p>
                    </div>
                ) : (
                    banners.map((banner) => (
                        <motion.div
                            key={banner.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden flex flex-col group"
                        >
                            <div className="h-48 relative overflow-hidden">
                                <img src={banner.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-xl font-bold text-white line-clamp-1">{banner.headline}</h3>
                                    <p className="text-white/80 text-sm line-clamp-1">{banner.subtext}</p>
                                </div>
                                <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => toggleStatus(banner.id, banner.active)}
                                        className={`p-2 rounded-xl transition-all ${banner.active ? 'bg-green-500 text-white' : 'bg-white text-slate-400'}`}
                                    >
                                        {banner.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(banner.id)}
                                        className="p-2 bg-red-500 text-white rounded-xl shadow-lg"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                                        <LinkIcon size={14} />
                                        {banner.buttonText || "Learn More"}
                                    </div>
                                    <div className="w-px h-4 bg-slate-100" />
                                    <span className={`text-[10px] font-bold tracking-widest ${banner.active ? 'text-green-500' : 'text-slate-400'}`}>
                                        {banner.active ? 'ACTIVE' : 'INACTIVE'}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl p-10 relative z-10">
                            <h2 className="text-2xl font-bold text-slate-800 mb-8">Add New Banner</h2>
                            <form className="space-y-6" onSubmit={handleSave}>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Headline</label>
                                    <input
                                        type="text"
                                        value={formData.headline}
                                        onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 font-bold"
                                        placeholder="Main catchy title..."
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Image URL</label>
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 font-mono text-xs"
                                        placeholder="https://images.unsplash.com/..."
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subtext</label>
                                    <input
                                        type="text"
                                        value={formData.subtext}
                                        onChange={(e) => setFormData({ ...formData, subtext: e.target.value })}
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10"
                                        placeholder="Brief description..."
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Button Text</label>
                                        <input
                                            type="text"
                                            value={formData.buttonText}
                                            onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                                            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none"
                                            placeholder="Book Now"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Button Link</label>
                                        <input
                                            type="text"
                                            value={formData.buttonLink}
                                            onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                                            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none"
                                            placeholder="/appointment"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">Cancel</button>
                                    <button type="submit" className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all">Create Banner</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
