"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Youtube, Facebook, MapPin, Phone, Mail } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-primary text-white pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="md:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <span className="text-2xl font-bold tracking-tight">{t("home.hero.title")}</span>
                            <p className="text-[10px] uppercase tracking-[3px] text-accent font-semibold">
                                {t("home.hero.specialty")}
                            </p>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {t("footer.description")}
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/faizannasirpathan"
                                target="_blank"
                                className="hover:text-accent transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://www.youtube.com/@mohammadfaizan7121"
                                target="_blank"
                                className="hover:text-accent transition-colors"
                                aria-label="YouTube"
                            >
                                <Youtube size={20} />
                            </a>
                            <a
                                href="www.facebook.com/share/177yhxE9kt"
                                target="_blank"
                                className="hover:text-accent transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">{t("footer.quick_links")}</h4>
                        <ul className="flex flex-col gap-4 list-none">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">{t("nav.home")}</Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">{t("footer.about_doctor")}</Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-gray-400 hover:text-white transition-colors text-sm">{t("nav.services")}</Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">{t("footer.blog")}</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">{t("footer.services_title")}</h4>
                        <ul className="flex flex-col gap-4 list-none text-sm text-gray-400">
                            <li>Anxiety Disorders</li>
                            <li>Depression Treatment</li>
                            <li>Bipolar Disorder</li>
                            <li>Schizophrenia Care</li>
                            <li>Stress Management</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">{t("footer.contact_title")}</h4>
                        <ul className="flex flex-col gap-4 list-none">
                            <li className="flex gap-3 text-sm text-gray-400 items-start">
                                <MapPin size={18} className="text-accent shrink-0" />
                                <span>37, Kidwai Nagar, Imli Phatak, Jaipur 302015</span>
                            </li>
                            <li className="flex gap-3 text-sm text-gray-400 items-center">
                                <Phone size={18} className="text-accent shrink-0" />
                                <a href="tel:+919079383340" className="hover:text-white">+91 90793 83340</a>
                            </li>
                            <li className="flex gap-3 text-sm text-gray-400 items-center">
                                <Mail size={18} className="text-accent shrink-0" />
                                <a href="mailto:info@drfaizan.com" className="hover:text-white">info@drfaizan.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-gray-800 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} {t("home.hero.title")}. {t("footer.rights")}</p>
                    <p className="mt-2 text-[10px] text-gray-600 uppercase tracking-widest">
                        {t("footer.tagline")}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
