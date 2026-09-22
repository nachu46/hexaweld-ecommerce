import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import JtLogo from './JtLogo';

const Footer = () => {
    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/products', label: 'All Products' },
        { to: '/about', label: 'About Us' },
        { to: '/contact', label: 'Contact' },
    ];
    const productLinks = [
        'Electricals, Power Tools & Accessories',
        'Lock Cylinder, Door Handles & Lock Body',
        'Hand Tools & Painting Accessories',
        'Safety Shoes & Safety Products',
        'Sanitary Wares',
        'Power Tools & Machineries',
    ];
    const socials = [
        { Icon: Facebook, href: '#', label: 'Facebook' },
        { Icon: Instagram, href: '#', label: 'Instagram' },
        { Icon: Twitter, href: '#', label: 'Twitter' },
        { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    ];

    return (
        <footer className="bg-[#0B132B] text-slate-300 border-t border-slate-800">

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-block mb-4 group">
                            <JtLogo dark={true} />
                        </Link>

                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                            Jaza Trading W.L.L (Division of Sana Group) — Established in Qatar in 2009. Your trusted wholesaler for quality building materials, electricals, safety products, and power tools.
                        </p>
                        <div className="flex gap-2.5">
                            {socials.map(({ Icon, href, label }) => (
                                <a key={label} href={href} aria-label={label} className="w-9 h-9 bg-[#16203D] hover:bg-[#007AFF] text-slate-300 hover:text-white rounded-xl flex items-center justify-center transition-all duration-200 border border-slate-700">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.15em] mb-5">Navigate</h4>
                        <ul className="space-y-3">
                            {navLinks.map(({ to, label }) => (
                                <li key={to}>
                                    <Link to={to} className="text-slate-400 hover:text-white text-xs sm:text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-200">{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.15em] mb-5">Categories</h4>
                        <ul className="space-y-3">
                            {productLinks.map((item) => (
                                <li key={item}>
                                    <Link to="/products" className="text-slate-400 hover:text-white text-xs sm:text-sm font-medium transition-colors hover:translate-x-1 inline-block transform duration-200">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.15em] mb-5">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-7 h-7 rounded-lg bg-[#16203D] flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">
                                    <MapPin className="w-3.5 h-3.5 text-[#007AFF]" />
                                </div>
                                <span className="text-slate-400 text-xs sm:text-sm leading-relaxed">Al kassarat Street, Industrial Area, street 5, Qatar</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-[#16203D] flex items-center justify-center shrink-0 border border-slate-700">
                                    <Phone className="w-3.5 h-3.5 text-[#007AFF]" />
                                </div>
                                <div className="text-slate-400 text-xs sm:text-sm flex flex-col font-medium">
                                    <a href="tel:+97470605494" className="hover:text-white transition-colors">+974 70605494</a>
                                    <a href="tel:+97474080005" className="hover:text-white transition-colors">+974 74080005</a>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-[#16203D] flex items-center justify-center shrink-0 border border-slate-700">
                                    <Mail className="w-3.5 h-3.5 text-[#007AFF]" />
                                </div>
                                <a href="mailto:jazatrading@gmail.com" className="text-slate-400 hover:text-white font-medium text-xs sm:text-sm transition-colors">jazatrading@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-slate-500 text-xs">© {new Date().getFullYear()} Jaza Trading W.L.L — Division Of Sana Group. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Privacy Policy</a>
                        <a href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
