"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    category: string; // Assuming category might be added to Blog model or inferred
}

const BlogPreview = () => {
    const { t } = useLanguage();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetching from blogs API as per schema, assuming 'Blog' model is what we want for 'BlogPreview'
                const res = await fetch("/api/admin/blogs");
                const data = await res.json();
                // Take latest 3
                setPosts(data.slice(0, 3));
            } catch (error) {
                console.error("Failed to fetch blog posts", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <section className="py-24 bg-bg-main">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-bold text-primary mb-4">{t("home.blog.title")}</h2>
                        <p className="text-gray-500">{t("home.blog.subtitle")}</p>
                    </div>
                    <Link
                        href="/blog"
                        className="group flex gap-2 items-center text-primary font-bold hover:text-accent transition-colors"
                    >
                        {t("home.blog.cta")} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {loading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="bg-white rounded-3xl overflow-hidden h-96 animate-pulse border border-gray-100">
                                <div className="h-48 bg-gray-200"></div>
                                <div className="p-8 space-y-4">
                                    <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
                                    <div className="h-6 bg-gray-200 w-3/4 rounded"></div>
                                    <div className="h-20 bg-gray-200 w-full rounded"></div>
                                </div>
                            </div>
                        ))
                    ) : posts.length === 0 ? (
                        <div className="col-span-full text-center py-10">
                            <p className="text-gray-400">No blog posts found.</p>
                        </div>
                    ) : (
                        posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-3xl overflow-hidden hover:shadow-premium transition-smooth group flex flex-col"
                            >
                                <div className="h-48 bg-gray-100 flex items-center justify-center">
                                    <BookOpen size={48} className="text-gray-300 group-hover:text-accent/20 transition-colors duration-500" />
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-4">
                                        {/* Fallback category if not in model yet */}
                                        Mental Health
                                    </span>
                                    <h3 className="text-xl font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-6 line-clamp-3 flex-grow">
                                        {post.excerpt}
                                    </p>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all mt-auto"
                                    >
                                        {t("home.blog.read_more")} <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
