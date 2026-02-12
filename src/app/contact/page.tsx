"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Navigation, Clock } from "lucide-react";
import CTAStrip from "@/components/sections/CallToActionStrip";

const ContactPage = () => {
    return (
        <div className="pt-24 min-h-screen bg-white">
            {/* Header */}
            <section className="bg-bg-main py-20 border-b border-gray-100">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">Get In Touch</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Clinic Location & Support</h1>
                        <p className="text-gray-500">We are here to support your mental wellness journey. Reach out for appointments or clinical inquiries.</p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Grid */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Contact Details */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            <div>
                                <h2 className="text-3xl font-bold text-primary mb-8">Visit Our Clinic in Jaipur</h2>
                                <div className="space-y-8">
                                    <div className="flex gap-6 items-start">
                                        <div className="bg-accent/10 p-4 rounded-2xl text-accent">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary mb-1">Clinic Address</h4>
                                            <p className="text-gray-500 leading-relaxed max-w-sm">
                                                37, Kidwai Nagar, Imli Phatak, Jaipur, Rajasthan 302015
                                            </p>
                                            <a
                                                href="https://www.google.com/maps/dir//Dr.+Faizan,+37,+Kidwai+Nagar,+Imli+Phatak,+Jaipur,+Rajasthan+302015"
                                                target="_blank"
                                                className="inline-flex items-center gap-2 text-accent font-bold mt-4 hover:underline underline-offset-4"
                                            >
                                                <Navigation size={18} /> Get Professional Directions
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 items-start">
                                        <div className="bg-accent/10 p-4 rounded-2xl text-accent">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary mb-1">Phone Numbers</h4>
                                            <div className="space-y-1">
                                                <a href="tel:+919079383340" className="block text-gray-500 hover:text-primary transition-colors">+91 90793 83340</a>
                                                <a href="tel:+918561993092" className="block text-gray-500 hover:text-primary transition-colors">+91 85619 93092</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 items-start">
                                        <div className="bg-accent/10 p-4 rounded-2xl text-accent">
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary mb-1">Operational Hours</h4>
                                            <p className="text-gray-500">Monday - Saturday: 11:00 AM - 07:00 PM</p>
                                            <p className="text-gray-500 text-sm italic">Sundays by Appointment Only</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 rounded-[2.5rem] bg-primary text-white space-y-8 shadow-xl">
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">Start a Conversation</h3>
                                    <p className="text-gray-300 text-sm">Our team is available to assist you with scheduling and general information.</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/919079383340"
                                        className="bg-accent text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-smooth shadow-lg"
                                    >
                                        <MessageCircle size={20} /> Chat on WhatsApp
                                    </a>
                                    <a
                                        href="tel:+919079383340"
                                        className="bg-white/10 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/20 transition-smooth"
                                    >
                                        <Phone size={20} /> Call Reception
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Map Embed */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative w-full h-[600px] rounded-[3rem] overflow-hidden shadow-premium border border-gray-100"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.123!2d75.8185309!3d26.8865389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6dcc0000001%3A0xc6c6c6c6c6c6c6c6!2sDr.%20Faizan!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </motion.div>

                    </div>
                </div>
            </section>

            <CTAStrip />
        </div>
    );
};

export default ContactPage;
