"use client";

import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

import { useLanguage } from "@/contexts/LanguageContext";

export default function StickyButtons() {
    const { t } = useLanguage();
    const whatsappUrl = "https://wa.me/919079383340";

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
            {/* WhatsApp Button */}
            <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
                aria-label={t("home.hero.cta_whatsapp")}
            >
                <MessageCircle size={28} />
            </motion.a>

            {/* Call Button */}
            <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="tel:+919079383340"
                className="bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
                aria-label={t("home.hero.cta_call")}
            >
                <Phone size={28} />
            </motion.a>
        </div>
    );
}
