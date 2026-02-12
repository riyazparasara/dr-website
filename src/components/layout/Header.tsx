"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Appointment", href: "/appointment" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass shadow-sm py-3" : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-6">
                <nav className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex flex-col">
                        <span className="text-xl font-bold text-primary tracking-tight">
                            Dr. M. Faizan
                        </span>
                        <span className="text-[10px] uppercase tracking-[2px] text-accent font-semibold">
                            Psychiatrist
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <ul className="flex gap-8 list-none">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`relative text-sm font-medium transition-colors hover:text-accent ${pathname === link.href ? "text-accent" : "text-primary"
                                            }`}
                                    >
                                        {link.name}
                                        {pathname === link.href && (
                                            <motion.div
                                                layoutId="underline"
                                                className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent"
                                            />
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/appointment"
                            className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:translate-y-[-2px] transition-transform shadow-md flex items-center gap-2"
                        >
                            <Calendar size={16} />
                            Book Appointment
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-primary"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden"
                    >
                        <ul className="flex flex-col p-6 gap-4 list-none">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-lg font-medium ${pathname === link.href ? "text-accent" : "text-primary"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-4 border-t border-gray-100 flex flex-col gap-4">
                                <Link
                                    href="/appointment"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-primary text-white text-center py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
                                >
                                    <Calendar size={20} />
                                    Book Appointment
                                </Link>
                                <a
                                    href="tel:+919079383340"
                                    className="text-primary text-center py-3 border border-primary rounded-xl font-semibold flex justify-center items-center gap-2"
                                >
                                    <Phone size={20} />
                                    Call Now
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
