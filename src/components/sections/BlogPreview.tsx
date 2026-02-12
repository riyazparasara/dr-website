"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

const posts = [
    {
        category: "Anxiety",
        title: "How to Manage Anxiety in Daily Life",
        desc: "Simple and effective clinical techniques to reduce anxiety spikes during your regular routine."
    },
    {
        category: "Depression",
        title: "Depression: Signs You Should Not Ignore",
        desc: "Understanding the subtle indicators of clinical depression and when to seek professional help."
    },
    {
        category: "Wellness",
        title: "Sleep and Mental Health Connection",
        desc: "Exploring how quality sleep impacts your emotional stability and long-term psychiatric health."
    }
];

const BlogPreview = () => {
    return (
        <section className="py-24 bg-bg-main">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-bold text-primary mb-4">Latest Insights & Guidance</h2>
                        <p className="text-gray-500">Expert articles to help you understand and manage your mental wellness.</p>
                    </div>
                    <Link
                        href="/blog"
                        className="group flex gap-2 items-center text-primary font-bold hover:text-accent transition-colors"
                    >
                        View All Articles <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-3xl overflow-hidden hover:shadow-premium transition-smooth group"
                        >
                            <div className="h-48 bg-gray-100 flex items-center justify-center">
                                <BookOpen size={48} className="text-gray-300 group-hover:text-accent/20 transition-colors duration-500" />
                            </div>
                            <div className="p-8">
                                <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-4">{post.category}</span>
                                <h3 className="text-xl font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-2">{post.desc}</p>
                                <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                                    Read Article <ArrowRight size={16} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
