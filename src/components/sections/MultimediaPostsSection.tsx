"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, XCircle, Play, Image as ImageIcon, Type } from "lucide-react";

interface Block {
    id: string;
    type: "TEXT" | "IMAGE" | "VIDEO";
    content: string;
}

interface Post {
    id: string;
    title: string;
    type: string;
    blocks: string;
    createdAt: string;
}

const MultimediaPostsSection = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/admin/posts");
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data);
                }
            } catch (error) {
                console.error("Failed to fetch posts", error);
            }
        };
        fetchPosts();
    }, []);

    if (posts.length === 0) return null;

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-secondary font-bold tracking-[3px] uppercase text-sm mb-4 block">
                        Media Updates
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        Latest from the Clinic
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedPost(post)}
                            className="group cursor-pointer bg-slate-50 rounded-[32px] overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-500"
                        >
                            <div className="h-48 bg-slate-200 relative overflow-hidden">
                                {/* Thumbnail logic: find first image or video placeholder */}
                                {(() => {
                                    const blocks: Block[] = JSON.parse(post.blocks || "[]");
                                    const imageBlock = blocks.find(b => b.type === "IMAGE");
                                    const videoBlock = blocks.find(b => b.type === "VIDEO");

                                    if (imageBlock) {
                                        return <img src={imageBlock.content} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />;
                                    }
                                    if (videoBlock) {
                                        return (
                                            <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white">
                                                <Play size={48} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        );
                                    }
                                    return (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                                            <Layers size={48} />
                                        </div>
                                    );
                                })()}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
                                    {post.type}
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                                <p className="text-sm text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPost(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] p-8 md:p-12 relative z-10"
                        >
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                            >
                                <XCircle size={24} />
                            </button>

                            <h2 className="text-3xl font-bold text-slate-800 mb-2">{selectedPost.title}</h2>
                            <p className="text-slate-400 mb-8">{new Date(selectedPost.createdAt).toLocaleDateString()}</p>

                            <div className="space-y-8">
                                {JSON.parse(selectedPost.blocks || "[]").map((block: Block) => (
                                    <div key={block.id}>
                                        {block.type === "TEXT" && (
                                            <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">{block.content}</p>
                                        )}
                                        {block.type === "IMAGE" && (
                                            <img src={block.content} alt="" className="w-full rounded-3xl shadow-sm" />
                                        )}
                                        {block.type === "VIDEO" && (
                                            <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-sm">
                                                <iframe
                                                    src={block.content.replace("watch?v=", "embed/")}
                                                    className="w-full h-full"
                                                    allowFullScreen
                                                    title="Video player"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default MultimediaPostsSection;
