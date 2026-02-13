"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Menu, X, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const { t, language, setLanguage } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: t("nav.home"), href: "/" },
        { name: t("nav.about"), href: "/about" },
        { name: t("nav.services"), href: "/services" },
        { name: t("nav.blog"), href: "/blog" },
        { name: t("nav.contact"), href: "/contact" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full glass">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary text-white p-2 rounded-lg group-hover:bg-accent transition-smooth">
                        <Landmark size={24} />
                    </div>
                    <div>
                        <span className="text-xl font-bold text-primary block leading-none">
                            Dr. M. Faizan
                        </span>
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                            Psychiatrist
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-gray-700 hover:text-accent transition-smooth relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                        </Link>
                    ))}
                    <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                        <button
                            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                            className="text-xs font-bold px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-smooth uppercase"
                        >
                            {language === "en" ? "Hindi" : "English"}
                        </button>
                        <Link
                            href="/appointment"
                            className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-accent shadow-premium transition-smooth"
                        >
                            {t("nav.bookNow")}
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-primary"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b overflow-hidden"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-base font-medium py-2 border-b border-gray-50"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-4 pt-2">
                                <button
                                    onClick={() => {
                                        setLanguage(language === "en" ? "hi" : "en");
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-sm font-bold p-3 rounded bg-gray-100 text-center uppercase"
                                >
                                    {language === "en" ? "Switch to Hindi" : "अंग्रेजी में बदलें"}
                                </button>
                                <Link
                                    href="/appointment"
                                    className="bg-primary text-white p-4 rounded-xl text-center font-bold"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {t("nav.bookNow")}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
