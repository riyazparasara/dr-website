"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import CTAStrip from "@/components/sections/CallToActionStrip";
import Link from "next/link";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    category?: string;
    createdAt?: string;
}

const BlogPage = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/admin/blogs");
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch blog posts", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="pt-24 min-h-screen bg-bg-main">
            {/* Header */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">Knowledge & Insights</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Mental Wellness Blog</h1>
                        <p className="text-gray-500">Expert guidance and clinical articles to help you navigate your mental health journey with confidence.</p>
                    </motion.div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="pb-24">
                <div className="container mx-auto px-6">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array(6).fill(0).map((_, i) => (
                                <div key={i} className="bg-white rounded-[2.5rem] h-96 animate-pulse border border-gray-100"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-premium group transition-smooth flex flex-col h-full"
                                >
                                    <div className="h-56 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-12">
                                        <BookOpen size={48} className="text-gray-200 group-hover:text-accent/20 transition-smooth" />
                                    </div>
                                    <div className="p-10 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider">
                                                <Tag size={12} /> {post.category || "General"}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                                                <Clock size={12} /> 5 min read
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-smooth">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed flex-grow">
                                            {post.excerpt}
                                        </p>
                                        <div className="mt-auto border-t border-gray-50 pt-6">
                                            <Link href={`/blog/${post.slug}`} className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                                                Read Full Article <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <CTAStrip />
        </div>
    );
};

export default BlogPage;
