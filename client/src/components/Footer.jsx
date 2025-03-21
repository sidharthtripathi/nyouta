import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#FAF0DC] text-[#643C28]">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">NYOUTA</h3>
                        <p className="text-sm">
                            Creating beautiful wedding websites for your special day.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="hover:text-[#af7d32] transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/wedding-website" className="hover:text-[#af7d32] transition-colors">
                                    Wedding Website
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="hover:text-[#af7d32] transition-colors">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>support@nyouta.com</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span>123 Wedding Street, City, Country</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-[#af7d32] transition-colors">
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="hover:text-[#af7d32] transition-colors">
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a href="#" className="hover:text-[#af7d32] transition-colors">
                                <Twitter className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[#af7d32]">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm">
                            © {new Date().getFullYear()} NYOUTA. All rights reserved.
                        </p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <Link to="/privacy" className="text-sm hover:text-[#af7d32] transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-sm hover:text-[#af7d32] transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 