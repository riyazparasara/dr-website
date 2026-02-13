"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Type,
    Image as ImageIcon,
    Video as VideoIcon,
    Layers,
    Trash2,
    MoveUp,
    MoveDown,
    Save,
    Eye,
    XCircle
} from "lucide-react";
import { motion, Reorder, AnimatePresence } from "framer-motion";

type Block = {
    id: string;
    type: "TEXT" | "IMAGE" | "VIDEO";
    content: string;
};

export default function PostsPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [newPostTitle, setNewPostTitle] = useState("");
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [previewPost, setPreviewPost] = useState<any>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/posts");
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        } finally {
            setLoading(false);
        }
    };

    const addBlock = (type: "TEXT" | "IMAGE" | "VIDEO") => {
        const newBlock: Block = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            content: ""
        };
        setBlocks([...blocks, newBlock]);
    };

    const updateBlock = (id: string, content: string) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
    };

    const removeBlock = (id: string) => {
        setBlocks(blocks.filter(b => b.id !== id));
    };

    const handleSave = async () => {
        if (!newPostTitle) return alert("Title is required");
        try {
            await fetch("/api/admin/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: newPostTitle,
                    type: blocks.length > 1 ? "MIXED" : (blocks[0]?.type || "TEXT"),
                    blocks: JSON.stringify(blocks),
                }),
            });
            setIsCreating(false);
            setBlocks([]);
            setNewPostTitle("");
            fetchPosts();
        } catch (error) {
            console.error("Save failed", error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Media Post Builder</h1>
                    <p className="text-sm text-slate-400">Create complex multimedia posts with mixed content blocks.</p>
                </div>

                {!isCreating && (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
                    >
                        <Plus size={20} />
                        New Multimedia Post
                    </button>
                )}
            </div>

            {isCreating ? (
                <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-8 space-y-8">
                    <div className="flex items-center justify-between">
                        <input
                            type="text"
                            placeholder="Post Title..."
                            value={newPostTitle}
                            onChange={(e) => setNewPostTitle(e.target.value)}
                            className="text-3xl font-bold text-slate-800 border-none focus:outline-none placeholder:text-slate-200 w-full"
                        />
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsCreating(false)}
                                className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20"
                            >
                                <Save size={18} />
                                Save Post
                            </button>
                        </div>
                    </div>

                    {/* Block Controls */}
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">Add Block:</p>
                        <button onClick={() => addBlock("TEXT")} className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm font-bold text-slate-600 hover:text-primary transition-all border border-slate-100 shadow-sm">
                            <Type size={16} /> Text
                        </button>
                        <button onClick={() => addBlock("IMAGE")} className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm font-bold text-slate-600 hover:text-primary transition-all border border-slate-100 shadow-sm">
                            <ImageIcon size={16} /> Image
                        </button>
                        <button onClick={() => addBlock("VIDEO")} className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm font-bold text-slate-600 hover:text-primary transition-all border border-slate-100 shadow-sm">
                            <VideoIcon size={16} /> Video
                        </button>
                    </div>

                    {/* Blocks Content */}
                    <div className="space-y-6">
                        {blocks.map((block, index) => (
                            <div key={block.id} className="relative group bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                                <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-3 group-hover:translate-x-0">
                                    <button className="p-1.5 bg-white shadow-md rounded-full text-slate-400 hover:text-primary"><MoveUp size={14} /></button>
                                    <button className="p-1.5 bg-white shadow-md rounded-full text-slate-400 hover:text-primary"><MoveDown size={14} /></button>
                                </div>
                                <button
                                    onClick={() => removeBlock(block.id)}
                                    className="absolute -right-3 -top-3 p-2 bg-white text-red-500 rounded-full shadow-md border border-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={16} />
                                </button>

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400 border border-slate-100">
                                        {block.type === "TEXT" && <Type size={16} />}
                                        {block.type === "IMAGE" && <ImageIcon size={16} />}
                                        {block.type === "VIDEO" && <VideoIcon size={16} />}
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{block.type} BLOCK</span>
                                </div>

                                {block.type === "TEXT" && (
                                    <textarea
                                        value={block.content}
                                        onChange={(e) => updateBlock(block.id, e.target.value)}
                                        placeholder="Enter your content here..."
                                        rows={4}
                                        className="w-full bg-white border border-slate-100 rounded-2xl p-4 focus:outline-none focus:ring-1 focus:ring-primary/20 text-slate-600 leading-relaxed"
                                    />
                                )}

                                {(block.type === "IMAGE" || block.type === "VIDEO") && (
                                    <input
                                        type="text"
                                        value={block.content}
                                        onChange={(e) => updateBlock(block.id, e.target.value)}
                                        placeholder={block.type === "IMAGE" ? "Paste image URL..." : "Paste video URL (YouTube/Vimeo)..."}
                                        className="w-full bg-white border border-slate-100 rounded-2xl p-4 focus:outline-none focus:ring-1 focus:ring-primary/20 text-slate-600 font-mono text-xs"
                                    />
                                )}
                            </div>
                        ))}
                        {blocks.length === 0 && (
                            <div className="py-20 text-center text-slate-300 font-medium">
                                Your post is empty. Add a block to get started.
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        Array(6).fill(0).map((_, i) => <div key={i} className="h-40 bg-white border border-slate-100 rounded-3xl animate-pulse" />)
                    ) : posts.length === 0 ? (
                        <div className="col-span-full py-32 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                <Layers size={40} className="text-slate-200" />
                            </div>
                            <p className="text-slate-400 font-medium">No multimedia posts yet.</p>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
                                        <Layers size={24} />
                                    </div>
                                    <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${post.type === 'MIXED' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                        {post.type}
                                    </div>
                                </div>
                                <h3 className="font-bold text-slate-800 mb-2 truncate">{post.title}</h3>
                                <p className="text-xs text-slate-400 mb-6">Created {new Date(post.createdAt).toLocaleDateString()}</p>
                                <div className="flex items-center gap-2 pt-4 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setPreviewPost(post)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all">
                                        <Eye size={14} /> Preview
                                    </button>
                                    <button className="p-2 text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition-all">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            <AnimatePresence>
                {previewPost && (
                    <PostPreview title={previewPost.title} blocks={JSON.parse(previewPost.blocks || "[]")} onClose={() => setPreviewPost(null)} />
                )}
            </AnimatePresence>

            {/* Preview Modal */}
            <AnimatePresence>
                {/* We can re-use the same structure or a simple modal */}
                {/* For now, let's just use a simple alert or console for simplicity as "Preview" is complex without a dedicated component */}
            </AnimatePresence>
        </div>
    );
}

function PostPreview({ title, blocks, onClose }: { title: string, blocks: Block[], onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 relative z-10">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200"><XCircle size={20} /></button>
                <h2 className="text-2xl font-bold mb-6">{title || "Untitled Post"}</h2>
                <div className="space-y-6">
                    {blocks.map(block => (
                        <div key={block.id}>
                            {block.type === "TEXT" && <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{block.content}</p>}
                            {block.type === "IMAGE" && <img src={block.content} alt="" className="w-full rounded-2xl" />}
                            {block.type === "VIDEO" && <div className="aspect-video bg-black rounded-2xl flex items-center justify-center text-white">Video Player Placeholder</div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
