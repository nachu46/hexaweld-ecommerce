import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin, Shield, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/products', label: 'All Products' },
        { to: '/about', label: 'About Us' },
        { to: '/contact', label: 'Contact' },
    ];
    const productLinks = ['Welding Machines', 'Electrodes', 'Safety Gear', 'Welding Tools', 'Accessories'];
    const socials = [
        { Icon: Facebook, href: '#', label: 'Facebook' },
        { Icon: Instagram, href: '#', label: 'Instagram' },
        { Icon: Twitter, href: '#', label: 'Twitter' },
        { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    ];

    return (
        <footer className="bg-[#0F172A] text-slate-400">

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center mb-4 group">
                            <img
                                src={logo}
                                alt="HexaWeld Industrial Store"
                                className="h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Your trusted partner in premium welding solutions since 2012. Serving 2,000+ professionals across the UAE with certified, industrial-grade equipment.
                        </p>
                        <div className="flex gap-2.5">
                            {socials.map(({ Icon, href, label }) => (
                                <a key={label} href={href} aria-label={label} className="w-9 h-9 bg-slate-800 hover:bg-[#007AFF] rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110">
                                    <Icon className="w-4 h-4 text-white" />
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
                                    <Link to={to} className="text-slate-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block transform duration-200">{label}</Link>
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
                                    <Link to="/products" className="text-slate-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block transform duration-200">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.15em] mb-5">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                                </div>
                                <span className="text-slate-400 text-sm leading-relaxed">123 Industrial Area, Welding Zone, Metal City — 67890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                                    <Phone className="w-3.5 h-3.5 text-blue-500" />
                                </div>
                                <a href="tel:+919061627236" className="text-slate-400 hover:text-white text-sm transition-colors">+91 90616 27236</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                                    <Mail className="w-3.5 h-3.5 text-blue-500" />
                                </div>
                                <a href="mailto:info@hexaweld.com" className="text-slate-400 hover:text-white text-sm transition-colors">info@hexaweld.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Hexaweld Industrial. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">Privacy Policy</a>
                        <a href="#" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
