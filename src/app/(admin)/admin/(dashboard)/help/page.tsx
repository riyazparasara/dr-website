"use client";

import React from "react";
import { Mail, Phone, FileQuestion, MessageCircle } from "lucide-react";

export default function HelpPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-slate-800">Help Center</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                        <FileQuestion size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Documentation</h3>
                    <p className="text-slate-500 mb-6 text-sm">Read the guide on how to manage your website, add banners, and update services.</p>
                    <button className="text-blue-600 font-bold text-sm">Read Guide</button>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                        <MessageCircle size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Support Chat</h3>
                    <p className="text-slate-500 mb-6 text-sm">Chat with our technical support team for immediate assistance with any issues.</p>
                    <button className="text-green-600 font-bold text-sm">Start Chat</button>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                        <Mail size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Email Support</h3>
                    <p className="text-slate-500 mb-6 text-sm">Send us an email detailing your issue and we'll get back to you within 24 hours.</p>
                    <a href="mailto:support@example.com" className="text-purple-600 font-bold text-sm">support@example.com</a>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                        <Phone size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Emergency Contact</h3>
                    <p className="text-slate-500 mb-6 text-sm">For critical system failures that need immediate attention.</p>
                    <a href="tel:+1234567890" className="text-orange-600 font-bold text-sm">+1 (234) 567-890</a>
                </div>
            </div>
        </div>
    );
}
