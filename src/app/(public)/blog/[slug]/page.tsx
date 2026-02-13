"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import CTAStrip from "@/components/sections/CallToActionStrip";
import { useParams } from "next/navigation";

interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    createdAt: string;
    coverImage?: string;
}

const BlogDetailsPage = () => {
    const params = useParams();
    const { slug } = params;
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/admin/blogs/${slug}`);
                if (res.ok) {
                    const data = await res.json();
                    setPost(data);
                }
            } catch (error) {
                console.error("Failed to fetch blog post", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    if (loading) return <div className="h-screen bg-bg-main flex items-center justify-center">Loading...</div>;
    if (!post) return <div className="h-screen bg-bg-main flex items-center justify-center">Post not found</div>;

    return (
        <div className="pt-24 min-h-screen bg-bg-main">
            {/* Post Header */}
            <section className="relative pt-12 pb-24">
                <div className="container mx-auto px-6 relative z-10">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-12 font-medium">
                        <ArrowLeft size={18} /> Back to Blog
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-widest mb-6">
                            Mental Health
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center gap-6 text-gray-500 font-medium">
                            <span className="flex items-center gap-2">
                                <User size={16} /> Dr. M. Faizan
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            <span className="flex items-center gap-2">
                                <Calendar size={16} /> {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            <span className="flex items-center gap-2">
                                <Clock size={16} /> 5 min read
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Image */}
            <section className="-mt-12 mb-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-5xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl h-[400px] md:h-[500px] bg-gray-200 relative"
                    >
                        {post.coverImage ? (
                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-400">
                                No Cover Image
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Content Body */}
            <section className="pb-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <article className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-primary prose-p:text-gray-600 prose-a:text-accent hover:prose-a:text-accent-hover transition-smooth">
                            <div className="whitespace-pre-wrap font-sans text-gray-600 leading-relaxed">
                                {post.content}
                            </div>
                        </article>

                        <div className="mt-16 pt-10 border-t border-gray-100 flex items-center justify-between">
                            <p className="font-bold text-primary text-xl">Share this article</p>
                            <div className="flex gap-4">
                                <button className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-accent hover:text-white transition-all">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CTAStrip />
        </div>
    );
};

export default BlogDetailsPage;
