import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Phone, Mail, MapPin, Send, Facebook, Linkedin, Twitter } from 'lucide-react';
import JtLogo from './JtLogo';

const Footer = () => {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleNewsletter = (e) => {
        e.preventDefault();
        if (newsletterEmail.trim()) {
            setSubscribed(true);
            setNewsletterEmail('');
        }
    };

    return (
        <footer className="bg-[#1C1B17] text-[#E5E0D8] pt-14 pb-8 border-t border-[#2E4046] relative overflow-hidden font-sans">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">

                {/* ══ 1. TOP B2B QUOTE BANNER ════════════════════════ */}
                <div className="bg-[#ECE8E0] p-6 sm:p-10 rounded-2xl border border-[#D5CFCE] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-[#1C1B17]">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B15E2B] block mb-1">
                            WHOLESALE & PROJECT SUPPLY QATAR
                        </span>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1B17] tracking-tight leading-snug">
                            Need expert guidance or a custom bulk quote?
                        </h3>
                        <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
                            Our Qatar technical sales team is ready to assist with material specifications and commercial pricing.
                        </p>
                    </div>
                    <div className="shrink-0">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#B15E2B] hover:bg-[#9A5023] text-white text-xs font-bold transition-all shadow-xs group"
                        >
                            <span>Get Quotation</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* ══ 2. MAIN FOOTER CONTENT GRID ═════════════════════ */}
                <div className="pt-8 border-t border-slate-800 relative">

                    {/* Background Subtle Watermark Text */}
                    <div className="absolute bottom-2 left-0 right-0 pointer-events-none select-none overflow-hidden opacity-5 text-center">
                        <span className="text-[100px] sm:text-[160px] font-black text-white tracking-tighter uppercase leading-none block">
                            JAZA
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">

                        {/* Brand Column */}
                        <div className="lg:col-span-4 space-y-4">
                            <JtLogo dark={true} />

                            <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-sm">
                                "Your trusted partner in quality building materials, reliable supply, and lasting partnerships."
                            </p>

                            <p className="text-[11px] text-slate-400 font-medium">
                                <strong>Established 2009</strong> · Division of Sana Group · 15+ Years Serving Qatar Construction & Industry.
                            </p>

                            {/* Newsletter */}
                            <div className="pt-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subscribe to Catalog Updates</p>
                                {subscribed ? (
                                    <p className="text-xs font-bold text-emerald-400 bg-emerald-900/30 p-2.5 rounded-xl border border-emerald-800 inline-block">
                                        ✓ Thank you for subscribing to Jaza Trading!
                                    </p>
                                ) : (
                                    <form onSubmit={handleNewsletter} className="max-w-sm relative flex items-center border-b border-slate-700 pb-1.5 focus-within:border-[#B15E2B]">
                                        <input
                                            type="email"
                                            required
                                            placeholder="Enter your email address..."
                                            value={newsletterEmail}
                                            onChange={(e) => setNewsletterEmail(e.target.value)}
                                            className="w-full bg-transparent text-white text-xs font-medium placeholder:text-slate-500 focus:outline-none"
                                        />
                                        <button type="submit" className="p-1 text-[#B15E2B] hover:text-white transition-colors" title="Subscribe">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Quick Navigation Links */}
                        <div className="lg:col-span-4 space-y-3 text-xs font-medium text-slate-300">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Sitemap & Quick Navigation</p>
                            <div className="grid grid-cols-2 gap-2">
                                <ul className="space-y-2">
                                    <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                                    <li><Link to="/about" className="hover:text-white transition-colors">About Company</Link></li>
                                    <li><Link to="/products" className="hover:text-white transition-colors">Products Catalog</Link></li>
                                    <li><Link to="/categories" className="hover:text-white transition-colors">Product Categories</Link></li>
                                </ul>
                                <ul className="space-y-2">
                                    <li><Link to="/brands" className="hover:text-white transition-colors">Our Brands</Link></li>
                                    <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                                    <li><Link to="/career" className="hover:text-white transition-colors">Careers in Qatar</Link></li>
                                    <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                                </ul>
                            </div>

                            <div className="pt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-400 border-t border-slate-800">
                                <Link to="/privacy-policy" className="hover:text-slate-200">Privacy Policy</Link>
                                <span>•</span>
                                <Link to="/terms-and-conditions" className="hover:text-slate-200">Terms</Link>
                                <span>•</span>
                                <Link to="/shipping-policy" className="hover:text-slate-200">Shipping</Link>
                                <span>•</span>
                                <Link to="/return-policy" className="hover:text-slate-200">Returns</Link>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="lg:col-span-4 space-y-3 text-xs font-medium text-slate-300">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Headquarters & Contact</p>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-[#B15E2B] shrink-0 mt-0.5" />
                                    <span>Al Kassarat Street, Industrial Area, Street 5, P.O. Box 31221, Doha, State of Qatar</span>
                                </div>
                                <a href="tel:+97470605494" className="flex items-center gap-3 hover:text-white transition-colors">
                                    <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <span>+974 7060 5494 / +974 7408 0005</span>
                                </a>
                                <a href="mailto:jazatrading@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors">
                                    <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                                    <span>jazatrading@gmail.com</span>
                                </a>
                                <a href="https://wa.me/97470605494" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                                    <img src="/whatsapp.png" alt="WhatsApp" className="w-4 h-4 object-contain shrink-0" />
                                    <span>+974 7060 5494 (WhatsApp Sales)</span>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ══ 3. BOTTOM BAR (Credit & Rights) ═════════════════ */}
                <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] font-medium text-slate-400 gap-3">
                    <div>
                        <span>© {new Date().getFullYear()} Jaza Trading W.L.L. All rights reserved.</span>
                    </div>
                    <div>
                        <span>
                            Developed by{' '}
                            <a
                                href="https://khaititsolution.com"
                                target="_blank"
                                rel="noreferrer"
                                className="font-bold text-[#B15E2B] hover:underline transition-colors"
                            >
                                Khair.it
                            </a>
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
