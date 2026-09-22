import { MapPin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import JtLogo from './JtLogo';

const Footer = () => {
    return (
        <footer className="bg-[#0B132B] text-slate-300 border-t border-slate-800 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* Top Row: Logo & Nav Links */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
                    <div>
                        <Link to="/" className="inline-block">
                            <JtLogo dark={true} />
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-xs font-bold tracking-wide">
                        <Link to="/about" className="hover:text-white transition-colors">Company</Link>
                        <Link to="/products" className="hover:text-white transition-colors">Products</Link>
                        <Link to="/products" className="hover:text-white transition-colors">Brands</Link>
                        <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                </div>

                {/* Bottom Row: Address, Email & Copyright */}
                <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Al Kassarat Street, Industrial Area, Street 5, Qatar</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <a href="mailto:jazatrading@gmail.com" className="hover:text-white transition-colors">jazatrading@gmail.com</a>
                    </div>

                    <div>
                        <span>© {new Date().getFullYear()} Jaza Trading W.L.L. All rights reserved.</span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
