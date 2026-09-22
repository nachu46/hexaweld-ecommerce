import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowRight, Phone, Mail, MapPin, CheckCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || '';

// Registered Brand Trademarks
const REGISTERED_BRANDS = [
    { name: 'TORK®', cat: 'Electricals & Tools', style: 'text-[#E11D48] font-black' },
    { name: 'EUREX®', cat: 'Lock Cylinders & Handles', style: 'text-[#2563EB] font-black' },
    { name: 'NEXT®', cat: 'Hand Tools & Painting', style: 'text-slate-900 font-black italic' },
    { name: 'MARK SAFETY PRO®', cat: 'Safety Boots & PPE', style: 'bg-black text-[#FACC15] font-black px-2 py-1 rounded' },
    { name: 'CLEXO®', cat: 'Sanitary Wares', style: 'text-[#0EA5E9] font-black' },
    { name: 'EDON®', cat: 'Welders & Machinery', style: 'text-[#DC2626] font-black flex items-center gap-1' },
    { name: 'TENZO®', cat: 'Power Tools', style: 'text-slate-900 font-black' }
];

// Partner Brands List
const PARTNER_BRANDS = [
    'Vini-Tape', 'Oryx Paints', 'Tenby', 'National Paints', 'Total', 'EBM', 'Jotun', 'Mac Paints', 'Makita'
];

const Home = () => {
    // Form State
    const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' });
    const [formLoading, setFormLoading] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);
    const [formError, setFormError] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormLoading(true);
        try {
            await axios.post(`${API_URL}/api/enquiries`, {
                customerName: form.name,
                customerEmail: form.email,
                customerPhone: form.phone,
                message: `Company: ${form.company || 'N/A'}\n\n${form.message}`,
                source: 'homepage_rfq_form',
            });
            setFormSuccess(true);
            setForm({ name: '', company: '', email: '', phone: '', message: '' });
        } catch (err) {
            setFormError('Could not send message automatically. Please connect via WhatsApp directly.');
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <div className="flex flex-col bg-white text-slate-900 font-sans">

            {/* ══ 1. HERO BANNER (Matching Reference Screenshot) ════════════════ */}
            <section className="px-4 sm:px-6 lg:px-8 pt-3 pb-8">
                <div className="max-w-7xl mx-auto bg-[#0B132B] rounded-3xl overflow-hidden relative text-white p-8 sm:p-14 min-h-[520px] flex flex-col justify-between shadow-xl">
                    
                    {/* Top Tagline */}
                    <div className="flex items-center justify-between z-10">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300">
                            BUILDING MATERIALS • QATAR
                        </span>
                        <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-right">
                            MATERIALS TODAY.<br />STRONGER TOMORROW.
                        </span>
                    </div>

                    {/* Main Content & Hero Image */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center my-6 z-10">
                        <div className="max-w-xl">
                            <h1 className="text-4xl sm:text-6xl font-black leading-none text-white tracking-tight mb-4">
                                Complex projects.<br />
                                <span className="text-slate-200">Simple supply.</span>
                            </h1>
                            <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed mb-8 max-w-md">
                                Quality materials, practical tools and dependable service.
                            </p>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#0B132B] font-bold text-xs sm:text-sm transition-all shadow-md group"
                            >
                                Explore our range <ArrowRight className="w-4 h-4 text-[#0B132B] group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Right Hero Collage Photography */}
                        <div className="relative flex justify-center items-center">
                            <div className="w-full max-w-md h-72 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 relative bg-slate-800">
                                <img
                                    src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80"
                                    alt="Industrial Construction Tools Qatar"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/80 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 flex items-center justify-between text-xs text-white">
                                    <span className="font-bold">Jaza Trading W.L.L</span>
                                    <span className="text-[10px] text-slate-300">Building Materials & Tools</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Established Badge */}
                    <div className="z-10 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                        <div>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">ESTABLISHED IN QATAR</span>
                            <span className="text-lg font-black text-white">2009</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 2. COMPANY INTRO (Matching Reference Screenshot) ═══════════════ */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">COMPANY</span>
                        <div className="w-12 h-px bg-slate-300" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 h-80">
                            <img
                                src="https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=800&q=80"
                                alt="Supplying Progress in Qatar"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-900 border border-slate-200">
                                SUPPLYING PROGRESS IN QATAR
                            </div>
                        </div>

                        <div className="lg:col-span-7 space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                                Materials. Expertise.<br />
                                A partner you can trust.
                            </h2>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                Established in Qatar in 2009, Jaza Trading W.L.L is a building materials wholesaler and a division of Sana Group. We focus on quality, competitive value and lasting relationships.
                            </p>
                            <div className="pt-2">
                                <Link to="/about" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-[#0B132B] group">
                                    Discover Jaza Trading <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 3. OUR STRENGTHS 01, 02, 03 (Matching Reference Screenshot) ═════ */}
            <section className="py-16 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">OUR STRENGTHS</span>
                        <div className="w-12 h-px bg-slate-300" />
                    </div>

                    <h2 className="text-3xl font-black text-slate-900 mb-12">
                        What makes the difference.
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                        <div className="pt-4 md:pt-0 md:pr-6">
                            <div className="text-5xl font-black text-slate-900 mb-2">01</div>
                            <h3 className="text-lg font-black text-slate-900 mb-1">Quality</h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                Reliable products for real-world demands.
                            </p>
                        </div>

                        <div className="pt-6 md:pt-0 md:px-6">
                            <div className="text-5xl font-black text-slate-900 mb-2">02</div>
                            <h3 className="text-lg font-black text-slate-900 mb-1">Value</h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                Competitive solutions without compromise.
                            </p>
                        </div>

                        <div className="pt-6 md:pt-0 md:pl-6">
                            <div className="text-5xl font-black text-slate-900 mb-2">03</div>
                            <h3 className="text-lg font-black text-slate-900 mb-1">Service</h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                Responsive support for your ongoing success.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 4. EXPLORE OUR WORLD (Matching Reference Screenshot 3 Cards) ═════ */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                                Explore our world.
                            </h2>
                        </div>
                        <div className="mt-2 md:mt-0 text-right">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                RIGHT PRODUCTS • BRIGHTER POSSIBILITIES
                            </span>
                        </div>
                    </div>

                    <div className="space-y-12">

                        {/* Card 01: Power Tools & Equipment */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200">
                            <div className="lg:col-span-6 rounded-2xl overflow-hidden h-64 sm:h-72 bg-slate-200 border border-slate-300">
                                <img
                                    src="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80"
                                    alt="Power Tools & Equipment"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="lg:col-span-6 relative space-y-3">
                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">POWER TOOLS & EQUIPMENT</span>
                                <h3 className="text-3xl font-black text-slate-900">Power your work.</h3>
                                <p className="text-slate-600 text-xs sm:text-sm font-semibold">Tork, EDON and TENZO.</p>
                                <div className="pt-3">
                                    <Link to="/products?category=Electricals,%20Power%20Tools%20%26%20Accessories" className="inline-flex items-center gap-2 text-xs font-bold text-[#0B132B] hover:underline group">
                                        Explore range <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                                <span className="absolute top-0 right-0 text-6xl font-black text-slate-200 pointer-events-none">01</span>
                            </div>
                        </div>

                        {/* Card 02: Door Hardware & Sanitary */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200">
                            <div className="lg:col-span-6 order-2 lg:order-1 relative space-y-3">
                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">DOOR HARDWARE & SANITARY</span>
                                <h3 className="text-3xl font-black text-slate-900">Details that perform.</h3>
                                <p className="text-slate-600 text-xs sm:text-sm font-semibold">Eurex and Clexo.</p>
                                <div className="pt-3">
                                    <Link to="/products?category=Lock%20Cylinder,%20Door%20Handles%20%26%20Lock%20Body" className="inline-flex items-center gap-2 text-xs font-bold text-[#0B132B] hover:underline group">
                                        Explore range <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                                <span className="absolute top-0 left-0 text-6xl font-black text-slate-200 pointer-events-none">02</span>
                            </div>
                            <div className="lg:col-span-6 order-1 lg:order-2 rounded-2xl overflow-hidden h-64 sm:h-72 bg-slate-200 border border-slate-300">
                                <img
                                    src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80"
                                    alt="Door Hardware & Sanitary"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Card 03: Hand Tools, Paints & Safety */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200">
                            <div className="lg:col-span-6 rounded-2xl overflow-hidden h-64 sm:h-72 bg-slate-200 border border-slate-300">
                                <img
                                    src="https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80"
                                    alt="Hand Tools, Paints & Safety"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="lg:col-span-6 relative space-y-3">
                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">HAND TOOLS, PAINTS & SAFETY</span>
                                <h3 className="text-3xl font-black text-slate-900">Ready for every task.</h3>
                                <p className="text-slate-600 text-xs sm:text-sm font-semibold">Next and Mark Safety Pro.</p>
                                <div className="pt-3">
                                    <Link to="/products?category=Safety%20Shoes%20%26%20Safety%20Products" className="inline-flex items-center gap-2 text-xs font-bold text-[#0B132B] hover:underline group">
                                        Explore range <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                                <span className="absolute top-0 right-0 text-6xl font-black text-slate-200 pointer-events-none">03</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ══ 5. OUR BRANDS (Matching Reference Screenshot) ═════════════════ */}
            <section className="py-14 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">OUR BRANDS</span>
                        <div className="w-12 h-px bg-slate-300" />
                    </div>

                    {/* Main Registered Brands */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center text-center mb-8">
                        {REGISTERED_BRANDS.map((b) => (
                            <Link
                                key={b.name}
                                to={`/products?brand=${encodeURIComponent(b.name.replace('®', ''))}`}
                                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-900 transition-all flex flex-col items-center justify-center h-20 shadow-sm"
                            >
                                <span className={`text-sm tracking-tight ${b.style}`}>{b.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Brand Partners Horizontal List */}
                    <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
                        <span className="font-bold uppercase tracking-wider text-slate-900">Brand partners</span>
                        {PARTNER_BRANDS.map((pb) => (
                            <span key={pb} className="font-medium hover:text-slate-900 transition-colors">{pb}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 6. CONTACT US BANNER (Matching Reference Screenshot) ═════════ */}
            <section className="py-14 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">CONTACT US</span>
                        <div className="w-12 h-px bg-slate-300" />
                    </div>

                    <div className="bg-[#EBF1F8] p-8 sm:p-14 rounded-3xl border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8 space-y-6">
                            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                Let’s build<br />something together.
                            </h2>

                            <div className="flex flex-wrap items-center gap-4">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0B132B] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all group"
                                >
                                    Request a Quote <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <div className="text-xs text-slate-700 font-bold space-y-1 pl-2">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5 text-[#0B132B]" />
                                        <span>+974 70605494 / +974 74080005</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5 text-[#0B132B]" />
                                        <span>jazatrading@gmail.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
                            <Link
                                to="/contact"
                                className="w-24 h-24 rounded-full bg-[#0B132B] hover:scale-105 text-white flex items-center justify-center transition-all shadow-xl mb-3"
                            >
                                <ArrowRight className="w-10 h-10 text-white" />
                            </Link>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                SAME MATERIALS. BRIGHTER TOMORROWS.
                            </span>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;