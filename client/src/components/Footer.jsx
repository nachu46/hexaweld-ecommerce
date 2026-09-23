import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Phone, Mail, MessageSquare, Send, Facebook, Linkedin, Twitter } from 'lucide-react';

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
        <footer className="bg-slate-50 text-slate-800 pt-16 pb-8 border-t border-slate-200 relative overflow-hidden font-sans">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">

                {/* ══ 1. TOP CTA SECTION ════════════ */}
                <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug mb-2">
                            Need expert guidance for your next project?
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-sm font-medium">
                            Our Qatar engineering team is ready to help with technical specifications and equipment selection.
                        </p>
                    </div>
                    <div className="shrink-0">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-slate-300 hover:border-slate-900 bg-white hover:bg-slate-900 hover:text-white transition-all duration-300 text-xs font-bold text-slate-800 shadow-sm group"
                        >
                            <span>Get in Touch</span>
                            <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* ══ 2. MIDDLE MAIN FOOTER SECTION (Matching Reference Screenshot) ══ */}
                <div className="pt-12 border-t border-slate-200 relative">

                    {/* Background Subtle Watermark Text */}
                    <div className="absolute bottom-4 left-0 right-0 pointer-events-none select-none overflow-hidden opacity-5 text-center">
                        <span className="text-[120px] sm:text-[180px] font-black text-slate-900 tracking-tighter uppercase leading-none block">
                            JAZA
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">

                        {/* Newsletter Left Column */}
                        <div className="lg:col-span-5 space-y-6">
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                                BE AMONG THE FIRST TO<br />EXPLORE OUR FUTURE.
                            </h2>

                            {subscribed ? (
                                <p className="text-xs font-bold text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-200 inline-block">
                                    ✓ Thank you for subscribing to Jaza Trading updates!
                                </p>
                            ) : (
                                <form onSubmit={handleNewsletter} className="max-w-md relative">
                                    <div className="flex items-center border-b-2 border-slate-300 focus-within:border-slate-900 transition-colors pb-2">
                                        <input
                                            type="email"
                                            required
                                            placeholder="Your Email"
                                            value={newsletterEmail}
                                            onChange={(e) => setNewsletterEmail(e.target.value)}
                                            className="w-full bg-transparent text-slate-900 text-xs font-medium placeholder:text-slate-400 focus:outline-none"
                                        />
                                        <button
                                            type="submit"
                                            className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
                                            title="Subscribe"
                                        >
                                            <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Social Icons */}
                            <div className="flex items-center gap-3 pt-2">
                                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all text-xs">
                                    <Facebook className="w-3.5 h-3.5" />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all text-xs">
                                    <Linkedin className="w-3.5 h-3.5" />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all text-xs">
                                    <Twitter className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>

                        {/* Navigation Links Middle Column */}
                        <div className="lg:col-span-3 space-y-3 text-xs font-medium text-slate-600">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Navigation</p>
                            <ul className="space-y-2.5">
                                <li><Link to="/" className="hover:text-slate-900 transition-colors">Home</Link></li>
                                <li><Link to="/about" className="hover:text-slate-900 transition-colors">About Us</Link></li>
                                <li><Link to="/services" className="hover:text-slate-900 transition-colors">Services</Link></li>
                                <li><Link to="/products" className="hover:text-slate-900 transition-colors">Products & Machinery</Link></li>
                                <li><Link to="/brands" className="hover:text-slate-900 transition-colors">Partner Brands</Link></li>
                                <li><Link to="/faq" className="hover:text-slate-900 transition-colors">FAQs & Support</Link></li>
                                <li><Link to="/contact" className="hover:text-slate-900 transition-colors">Consultation & Contact</Link></li>
                            </ul>
                        </div>

                        {/* Contact Info Right Column */}
                        <div className="lg:col-span-4 space-y-3 text-xs font-medium text-slate-600">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Contact Info</p>
                            <div className="space-y-3">
                                <a href="tel:+97455123456" className="flex items-center gap-3 hover:text-slate-900 transition-colors">
                                    <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                                    <span>+974 5512 3456 / +974 4450 1234</span>
                                </a>
                                <a href="mailto:jazatrading@gmail.com" className="flex items-center gap-3 hover:text-slate-900 transition-colors">
                                    <Mail className="w-4 h-4 text-purple-500 shrink-0" />
                                    <span>jazatrading@gmail.com</span>
                                </a>
                                <a href="https://wa.me/97470605494" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-slate-900 transition-colors">
                                    <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain shrink-0" />
                                    <span>+974 7060 5494 (WhatsApp Sales)</span>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ══ 3. BOTTOM BAR (Matching Reference Screenshot & Credit Link) ═════ */}
                <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] font-medium text-slate-500 gap-3">
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
                                className="font-bold text-slate-800 hover:text-slate-900 hover:underline transition-colors"
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
