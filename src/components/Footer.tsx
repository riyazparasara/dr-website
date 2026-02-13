import Link from "next/link";
import { Landmark, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-gray-300 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-white text-primary p-2 rounded-lg">
                                <Landmark size={24} />
                            </div>
                            <div>
                                <span className="text-xl font-bold text-white block leading-none">
                                    Dr. M. Faizan
                                </span>
                                <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                                    Psychiatrist
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed">
                            Dr. M. Faizan is a leading psychiatrist in Jaipur, dedicated to providing compassionate and evidence-based mental healthcare for individuals and families.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="hover:text-accent transition-smooth"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-accent transition-smooth"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-accent transition-smooth"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-accent transition-smooth"><Youtube size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-white text-lg font-bold">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="hover:text-accent transition-smooth">About Dr. Faizan</Link></li>
                            <li><Link href="/services" className="hover:text-accent transition-smooth">Our Services</Link></li>
                            <li><Link href="/blog" className="hover:text-accent transition-smooth">Mental Health Blog</Link></li>
                            <li><Link href="/appointment" className="hover:text-accent transition-smooth">Book Appointment</Link></li>
                            <li><Link href="/contact" className="hover:text-accent transition-smooth">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Services Quick List */}
                    <div className="space-y-6">
                        <h4 className="text-white text-lg font-bold">Specialties</h4>
                        <ul className="space-y-3">
                            <li className="text-sm">Anxiety & Panic Attacks</li>
                            <li className="text-sm">Depression Management</li>
                            <li className="text-sm">OCD & PTSD Therapy</li>
                            <li className="text-sm">Addiction & Rehab</li>
                            <li className="text-sm">Child & Teen Counseling</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-white text-lg font-bold">Get In Touch</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-accent shrink-0" size={20} />
                                <span className="text-sm">Jaipur Mental Wellness Clinic, 123 Health Street, Jaipur, Rajasthan</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-accent shrink-0" size={20} />
                                <a href="tel:+919079383340" className="text-sm hover:text-white transition-smooth">+91 90793 83340</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-accent shrink-0" size={20} />
                                <a href="mailto:info@drfaizan.com" className="text-sm hover:text-white transition-smooth">info@drfaizan.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="my-12 border-gray-800" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-center md:text-left leading-relaxed max-w-2xl">
                        <span className="text-white font-semibold">Disclaimer:</span> Services are provided based on individual assessment and clinical need. For emergencies, please contact your nearest hospital immediately.
                    </p>
                    <p className="text-xs">
                        © {currentYear} Dr. M. Faizan. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
