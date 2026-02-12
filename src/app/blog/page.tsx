"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import CTAStrip from "@/components/sections/CallToActionStrip";

const blogPosts = [
    {
        category: "Anxiety",
        slug: "managing-anxiety",
        title: "Understanding & Managing Generalized Anxiety Disorder",
        excerpt: "Anxiety is more than just worrying. Learn about the symptoms and effective clinical coping mechanisms for chronic anxiety disorders.",
        readTime: "6 min read"
    },
    {
        category: "Depression",
        slug: "recovering-seasonal-depression",
        title: "Steps to Recover from Seasonal Depression",
        excerpt: "Seasonal Affective Disorder impacts millions. Explore how lifestyle changes and therapy can help you rediscover joy during difficult seasons.",
        readTime: "5 min read"
    },
    {
        category: "Wellness",
        slug: "mindfulness-mental-health",
        title: "The Role of Mindfulness in Modern Psychiatry",
        excerpt: "How practicing daily mindfulness can significantly reduce stress levels and improve your focus and emotional stability.",
        readTime: "8 min read"
    },
    {
        category: "Medication",
        slug: "psychiatric-medication-myths",
        title: "Common Myths About Psychiatric Medication",
        excerpt: "Addressing the frequent misconceptions and stigma surrounding pharmacological support for mental health conditions.",
        readTime: "7 min read"
    },
    {
        category: "Sleep",
        slug: "better-sleep-tips",
        title: "Clinical Tips for Better Sleep and Mental Focus",
        excerpt: "Poor sleep is a trigger for many psychiatric issues. Discover clinical hygiene tips for restorative sleep and better focus.",
        readTime: "4 min read"
    },
    {
        category: "Counseling",
        slug: "when-to-seek-help",
        title: "When is the Right Time to Consult a Psychiatrist?",
        excerpt: "A guide to understanding when normal stress crosses the line into a professional mental health concern that requires clinical care.",
        readTime: "6 min read"
    }
];

const BlogPage = () => {
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <motion.article
                                key={post.slug}
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
                                            <Tag size={12} /> {post.category}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                                            <Clock size={12} /> {post.readTime}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-smooth">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto border-t border-gray-50 pt-6">
                                        <button className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                                            Read Full Article <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <CTAStrip />
        </div>
    );
};

export default BlogPage;
