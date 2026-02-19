import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/products', label: 'Products' },
        { to: '/about', label: 'About Us' },
        { to: '/contact', label: 'Contact' },
    ];
    const socials = [
        { Icon: Facebook, href: '#' },
        { Icon: Instagram, href: '#' },
        { Icon: Twitter, href: '#' },
        { Icon: Linkedin, href: '#' },
    ];

    return (
        <footer className="bg-[#1E293B] text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F97316] to-[#ea580c] flex items-center justify-center">
                                <span className="text-white font-black text-sm">H</span>
                            </div>
                            <span className="text-xl font-black text-white">
                                Hexa<span className="text-[#F97316]">Weld</span>
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-5">
                            Your trusted partner in premium welding solutions since 2012.
                        </p>
                        <div className="flex gap-3">
                            {socials.map(({ Icon, href }, i) => (
                                <a key={i} href={href} className="w-8 h-8 bg-slate-700 hover:bg-[#F97316] rounded-lg flex items-center justify-center transition-all duration-200">
                                    <Icon className="w-4 h-4 text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Navigation</h4>
                        <ul className="space-y-2.5">
                            {navLinks.map(({ to, label }) => (
                                <li key={to}>
                                    <Link to={to} className="text-slate-400 hover:text-[#F97316] text-sm transition-colors">{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Products</h4>
                        <ul className="space-y-2.5">
                            {['Welding Machines', 'Electrodes', 'Safety Gear', 'Welding Tools', 'Accessories'].map((item) => (
                                <li key={item}>
                                    <Link to="/products" className="text-slate-400 hover:text-[#F97316] text-sm transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact</h4>
                        <ul className="space-y-3.5">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-[#F97316] mt-0.5 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">123 Industrial Area, Welding Zone, Metal City — 67890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                                <a href="tel:+919061627236" className="text-slate-400 hover:text-white text-sm transition-colors">+91 90616 27236</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                                <a href="mailto:info@hexaweld.com" className="text-slate-400 hover:text-white text-sm transition-colors">info@hexaweld.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-slate-700 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Hexaweld. All rights reserved.</p>
                    <p className="text-slate-600 text-xs">Professional Welding Solutions Since 2012</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
