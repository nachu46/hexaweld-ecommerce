import { MapPin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import JtLogo from './JtLogo';

const Footer = () => {
    const exploreLinks = [
        { to: '/', label: 'Home' },
        { to: '/products', label: 'Products' },
        { to: '/about', label: 'About Us' },
        { to: '/contact', label: 'Contact' },
    ];

    const categoryLinks = [
        { label: 'Power Tools', to: '/products?category=Electricals,%20Power%20Tools%20%26%20Accessories' },
        { label: 'Hand Tools', to: '/products?category=Hand%20Tools%20%26%20Painting%20Accessories' },
        { label: 'Safety & PPE', to: '/products?category=Safety%20Shoes%20%26%20Safety%20Products' },
        { label: 'Building Materials', to: '/products?category=Lock%20Cylinder,%20Door%20Handles%20%26%20Lock%20Body' },
        { label: 'Electrical Supplies', to: '/products?category=Electricals,%20Power%20Tools%20%26%20Accessories' },
        { label: 'Paints & Accessories', to: '/products?category=Hand%20Tools%20%26%20Painting%20Accessories' },
    ];

    return (
        <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

                    {/* 1. Brand Logo & Description */}
                    <div>
                        <Link to="/" className="inline-block mb-3">
                            <JtLogo dark={true} />
                        </Link>
                        <p className="text-slate-400 text-xs leading-relaxed mt-2">
                            Building materials • Tools • Industrial supplies
                        </p>
                    </div>

                    {/* 2. Explore Links */}
                    <div>
                        <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Explore</h4>
                        <ul className="space-y-2.5">
                            {exploreLinks.map(({ to, label }) => (
                                <li key={to}>
                                    <Link to={to} className="text-slate-400 hover:text-white text-xs font-medium transition-colors">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Product Categories */}
                    <div>
                        <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Product Categories</h4>
                        <ul className="space-y-2.5">
                            {categoryLinks.map((cat) => (
                                <li key={cat.label}>
                                    <Link to={cat.to} className="text-slate-400 hover:text-white text-xs font-medium transition-colors">
                                        {cat.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4. Contact Info */}
                    <div>
                        <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2.5">
                                <Mail className="w-3.5 h-3.5 text-[#007AFF] shrink-0" />
                                <a href="mailto:jazatrading@gmail.com" className="text-slate-400 hover:text-white text-xs font-medium transition-colors">
                                    jazatrading@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <MapPin className="w-3.5 h-3.5 text-[#007AFF] shrink-0" />
                                <span className="text-slate-400 text-xs font-medium">Qatar</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-slate-500 text-[11px]">
                        © {new Date().getFullYear()} Jaza Trading W.L.L. All rights reserved.
                    </p>
                    <p className="text-slate-500 text-[11px] font-medium">
                        Building a stronger Qatar together.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
