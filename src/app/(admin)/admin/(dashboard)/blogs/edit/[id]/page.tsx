"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EditBlogPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        image: "",
        category: "Mental Health",
        author: "Dr. M. Faizan",
        published: false,
        seoTitle: "",
        seoDescription: ""
    });

    useEffect(() => {
        fetchBlog();
    }, []);

    const fetchBlog = async () => {
        try {
            const res = await fetch(`/api/admin/blogs/${params.id}`);
            if (res.ok) {
                const data = await res.json();
                setFormData({
                    title: data.title || "",
                    slug: data.slug || "",
                    excerpt: data.excerpt || "",
                    content: data.content || "",
                    image: data.coverImage || "",
                    category: data.category || "Mental Health", // Fallback if not in DB (DB schema might need category update if not present)
                    author: "Dr. M. Faizan",
                    published: data.published,
                    seoTitle: data.seoTitle || "",
                    seoDescription: data.seoDescription || ""
                });
            } else {
                alert("Blog not found");
                router.push("/admin/blogs");
            }
        } catch (error) {
            console.error("Failed to fetch blog", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/admin/blogs/${params.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    coverImage: formData.image // Map 'image' back to 'coverImage' schema field
                }),
            });

            if (res.ok) {
                router.push("/admin/blogs");
                router.refresh();
            } else {
                alert("Failed to update blog post");
            }
        } catch (error) {
            console.error("Error updating blog post", error);
            alert("Error updating blog post");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this blog?")) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/blogs/${params.id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                router.push("/admin/blogs");
                router.refresh();
            }
        } catch (error) {
            alert("Failed to delete blog");
            setSaving(false);
        }
    };

    if (loading) return <div className="p-12 text-center text-slate-400">Loading editor...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blogs" className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 hover:text-primary transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Edit Article</h1>
                        <p className="text-sm text-slate-400">Update content and SEO settings.</p>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    title="Delete Article"
                >
                    <Trash2 size={20} />
                </button>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Article Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 font-bold text-lg"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Display Excerpt</label>
                                <textarea
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 h-24 resize-none"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Content</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 h-96 font-mono text-sm leading-relaxed"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Slug (URL)</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm font-mono text-slate-500"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Featured Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-mono"
                                    placeholder="https://..."
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</label>
                                <input
                                    type="text"
                                    value={formData.category} // Note: Category not yet on Blog model, assuming schema update or simple storage in future
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10"
                                />
                            </div>

                            <div className="space-y-2 pt-4 border-t border-slate-50">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">SEO Title</label>
                                <input
                                    type="text"
                                    value={formData.seoTitle}
                                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10"
                                    placeholder="Meta Title"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">SEO Description</label>
                                <textarea
                                    value={formData.seoDescription}
                                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 h-24 resize-none"
                                    placeholder="Meta Description..."
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="text-sm font-bold text-slate-600">Publish Article</span>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, published: !prev.published }))}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${formData.published ? 'bg-primary' : 'bg-slate-300'}`}
                                >
                                    <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.published ? 'translate-x-6' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full py-4 bg-primary text-white rounded-[24px] font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-all flex items-center justify-center gap-2"
                        >
                            {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                            Update Article
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
