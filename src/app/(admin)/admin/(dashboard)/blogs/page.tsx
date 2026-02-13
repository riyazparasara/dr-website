"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    Calendar,
    Globe,
    FileText,
    Image as ImageIcon
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/blogs");
            const data = await res.json();
            setBlogs(data);
        } catch (error) {
            console.error("Failed to fetch blogs", error);
        } finally {
            setLoading(false);
        }
    };

    const togglePublish = async (id, currentStatus) => {
        try {
            await fetch(`/api/admin/blogs/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ published: !currentStatus }),
            });
            fetchBlogs();
        } catch (error) {
            console.error("Failed to toggle publish status", error);
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Blog Management</h1>
                    <p className="text-sm text-slate-400">Write and optimize articles for mental wellness awareness.</p>
                </div>

                <Link
                    href="/admin/blogs/new"
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
                >
                    <Plus size={20} />
                    Create New Blog
                </Link>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400 tracking-wider">Article</th>
                                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400 tracking-wider">SEO Status</th>
                                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400 tracking-wider">Visibility</th>
                                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400 tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400 tracking-wide font-medium">Loading content...</td></tr>
                            ) : filteredBlogs.length === 0 ? (
                                <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400 tracking-wide font-medium">No blogs yet. Start writing!</td></tr>
                            ) : (
                                filteredBlogs.map((blog) => (
                                    <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-10 bg-slate-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                                                    {blog.coverImage ? (
                                                        <img src={blog.coverImage} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <ImageIcon size={20} className="text-slate-300" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 line-clamp-1">{blog.title}</p>
                                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1 flex items-center gap-1">
                                                        <Calendar size={10} />
                                                        {new Date(blog.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${blog.seoTitle && blog.seoDescription ? 'bg-green-500' : 'bg-orange-500'}`} />
                                                <span className="text-xs font-semibold text-slate-500">
                                                    {blog.seoTitle && blog.seoDescription ? 'Optimized' : 'Incomplete'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => togglePublish(blog.id, blog.published)}
                                                className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest transition-all ${blog.published
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-slate-100 text-slate-500'
                                                    }`}
                                            >
                                                {blog.published ? 'PUBLISHED' : 'DRAFT'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/blog/${blog.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-primary rounded-lg">
                                                    <Eye size={18} />
                                                </Link>
                                                <Link href={`/admin/blogs/edit/${blog.id}`} className="p-2 text-slate-400 hover:text-blue-600 rounded-lg">
                                                    <Edit size={18} />
                                                </Link>
                                                <button className="p-2 text-slate-400 hover:text-red-600 rounded-lg">
                                                    <Trash2 size={18} />
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
