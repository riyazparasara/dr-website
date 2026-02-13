"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";
import { motion } from "framer-motion";

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-full border border-gray-200">
            <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${language === "en"
                        ? "bg-white text-primary shadow-sm"
                        : "text-gray-400 hover:text-primary"
                    }`}
            >
                EN
            </button>
            <button
                onClick={() => setLanguage("hi")}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${language === "hi"
                        ? "bg-white text-primary shadow-sm"
                        : "text-gray-400 hover:text-primary"
                    }`}
            >
                हिन्दी
            </button>
        </div>
    );
}
