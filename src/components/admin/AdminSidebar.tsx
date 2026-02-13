"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
    LayoutDashboard,
    Calendar,
    FileText,
    Settings as SettingsIcon,
    LogOut,
    Menu,
    X,
    Image as ImageIcon,
    PlusSquare,
    Users
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Appointments", href: "/admin/appointments", icon: Calendar },
    { name: "Services", href: "/admin/services", icon: PlusSquare },
    { name: "Blog Posts", href: "/admin/blogs", icon: FileText },
    { name: "Media Posts", href: "/admin/posts", icon: Users },
    { name: "Banners", href: "/admin/banners", icon: ImageIcon },
    { name: "Settings", href: "/admin/settings", icon: SettingsIcon },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Content */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300
                lg:relative lg:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
                    <p className="text-[10px] uppercase font-bold text-accent tracking-widest mt-1">Dr. M. Faizan</p>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActive
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "text-slate-500 hover:bg-slate-50"
                                    }`}
                            >
                                <link.icon size={20} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100 mt-auto">
                    <button
                        onClick={() => signOut()}
                        className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-all font-semibold"
                    >
                        <LogOut size={20} />
                        Log Out
                    </button>
                </div>
            </aside>
        </>
    );
}
