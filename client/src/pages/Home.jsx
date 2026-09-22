import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    ArrowRight, ChevronRight, Shield, Award,
    Package, Clock, Truck, MapPin, Phone, Mail,
    Send, Building2, Sparkles, CheckCircle, Wrench,
    HardHat, Layers, FileText, UserCheck, Settings, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const API_URL = import.meta.env.VITE_API_URL || '';

// 6 Exact Categories matching Reference Mockup
const FEATURED_CATEGORIES = [
    { name: 'Power Tools', cat: 'Electricals, Power Tools & Accessories', desc: 'Drills, grinders, saws & cordless power tools', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80' },
    { name: 'Hand Tools', cat: 'Hand Tools & Painting Accessories', desc: 'Hammers, wrenches, pliers & measuring tapes', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
    { name: 'Safety & PPE', cat: 'Safety Shoes & Safety Products', desc: 'CE safety boots, helmets, gloves & high-vis gear', image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80' },
    { name: 'Building Materials', cat: 'Lock Cylinder, Door Handles & Lock Body', desc: 'Euro lock cylinders, handles, hinges & fittings', image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80' },
    { name: 'Electrical Supplies', cat: 'Electricals, Power Tools & Accessories', desc: 'Modular switches, sockets, PVC tapes & fittings', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80' },
    { name: 'Paints & Accessories', cat: 'Hand Tools & Painting Accessories', desc: 'Interior paint, rollers, brushes & sealants', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80' }
];

// Brands Carousel List
const SLIDING_BRANDS = [
    { name: 'Tork®', style: 'bg-red-50 text-red-700 border-red-200' },
    { name: 'Eurex®', style: 'bg-blue-50 text-blue-700 border-blue-200' },
    { name: 'Next®', style: 'bg-slate-900 text-white border-slate-800' },
    { name: 'EDON®', style: 'bg-rose-50 text-rose-800 border-rose-200' },
    { name: 'TENZO®', style: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
    { name: 'Clexo®', style: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { name: 'Mark Safety Pro®', style: 'bg-amber-50 text-amber-800 border-amber-200' },
    { name: 'Makita®', style: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
    { name: 'Jotun®', style: 'bg-teal-50 text-teal-800 border-teal-200' },
    { name: 'Vini-Tape®', style: 'bg-purple-50 text-purple-800 border-purple-200' }
];

// 4 Target Audiences
const AUDIENCES = [
    { title: 'Contractors', image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80' },
    { title: 'Workshops', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
    { title: 'Maintenance Teams', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80' },
    { title: 'Project Buyers', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80' }
];

// 3 Bottom Feature Cards
const BOTTOM_RANGES = [
    { title: 'Tools for the job', link: '/products?category=Electricals,%20Power%20Tools%20%26%20Accessories', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80' },
    { title: 'Everyday safety essentials', link: '/products?category=Safety%20Shoes%20%26%20Safety%20Products', image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80' },
    { title: 'Materials for your next project', link: '/products', image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80' }
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
        <div className="flex flex-col bg-white text-slate-900">

            {/* ══ 1. HERO BANNER (Matching Mockup Section 1) ════════════════════ */}
            <section className="relative bg-slate-900 text-white overflow-hidden py-16 sm:py-24">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80"
                        alt="Jaza Trading Qatar Construction"
                        className="w-full h-full object-cover opacity-25"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <span className="inline-block px-3 py-1 rounded-full bg-[#007AFF]/20 text-[#007AFF] text-[11px] font-bold uppercase tracking-widest mb-4 border border-[#007AFF]/30">
                            YOUR PROJECT. OUR COMMITMENT.
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-4 tracking-tight">
                            Everything you need.<br />To build better.
                        </h1>
                        <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed font-normal">
                            Building materials, tools and industrial supplies in Qatar.
                        </p>
                        <div className="flex flex-wrap gap-4 items-center mb-12">
                            <Link
                                to="/products"
                                className="px-7 py-3.5 rounded-full bg-[#007AFF] hover:bg-[#0066CC] text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2"
                            >
                                Explore Products <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                to="/contact"
                                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all backdrop-blur-sm"
                            >
                                Request a Quote
                            </Link>
                        </div>

                        {/* 3 Pill Badges at bottom of Hero */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80">
                            <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                                <Package className="w-4 h-4 text-[#007AFF] shrink-0" />
                                <span>Quality products for every project</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                                <Truck className="w-4 h-4 text-[#007AFF] shrink-0" />
                                <span>Reliable supply across Qatar</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                                <Users className="w-4 h-4 text-[#007AFF] shrink-0" />
                                <span>Supporting builders and industries</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 2. 4-COLUMN FEATURE BAR (Matching Mockup Section 2) ═══════════ */}
            <section className="py-6 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-sm">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                <Layers className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <div>
                                <h4 className="font-black text-xs text-slate-900">Building materials</h4>
                                <p className="text-[11px] text-slate-500 mt-0.5">A wide range for every build</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-sm">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                <Wrench className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <div>
                                <h4 className="font-black text-xs text-slate-900">Tools & equipment</h4>
                                <p className="text-[11px] text-slate-500 mt-0.5">Trusted tools for the job</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-sm">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                <Shield className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <div>
                                <h4 className="font-black text-xs text-slate-900">Safety essentials</h4>
                                <p className="text-[11px] text-slate-500 mt-0.5">Work safer, every day</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-sm">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <div>
                                <h4 className="font-black text-xs text-slate-900">Project enquiries</h4>
                                <p className="text-[11px] text-slate-500 mt-0.5">Get the right support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 3. COMPANY INTRODUCTION (Matching Mockup Section 3) ═══════════ */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
                            <img
                                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80"
                                alt="Warehouse Jaza Trading Qatar"
                                className="w-full h-80 object-cover"
                            />
                            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center p-6 text-center">
                                <h3 className="text-white font-black text-2xl uppercase tracking-wider max-w-xs leading-snug drop-shadow-md">
                                    Good materials. Greater possibilities.
                                </h3>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-900 leading-tight">
                                Your partner in every project.
                            </h2>
                            <p className="text-[#007AFF] font-bold text-xs uppercase tracking-wider">
                                Jaza Trading W.L.L — Division of Sana Group
                            </p>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                We supply building materials, tools and industrial supplies to support Qatar’s growing construction and industrial sectors. Our focus is on quality products, reliable supply and long-term partnerships.
                            </p>
                            <div className="pt-2">
                                <Link to="/about" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007AFF] hover:underline">
                                    Discover our story <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 4. PRODUCT CATEGORIES GRID (Matching Mockup Section 4) ════════ */}
            <section className="py-12 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                            Find the right tools for the job.
                        </h2>
                        <Link to="/products" className="text-xs font-bold text-[#007AFF] hover:underline flex items-center gap-1">
                            View All Products <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FEATURED_CATEGORIES.map((cat) => (
                            <Link
                                key={cat.name}
                                to={`/products?category=${encodeURIComponent(cat.cat)}`}
                                className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-200 bg-white flex flex-col"
                            >
                                <div className="h-44 overflow-hidden relative bg-slate-100">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                                </div>
                                <div className="p-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-base font-black text-slate-900 group-hover:text-[#007AFF] transition-colors">
                                            {cat.name}
                                        </h3>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#007AFF] group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 5. BRANDS WE SUPPLY CAROUSEL (Matching Mockup Section 5) ═══════ */}
            <section className="py-10 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6">
                        Brands we supply
                    </h3>

                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={20}
                        slidesPerView={3}
                        loop={true}
                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                        breakpoints={{
                            640: { slidesPerView: 4 },
                            1024: { slidesPerView: 6 },
                        }}
                    >
                        {SLIDING_BRANDS.map((b) => (
                            <SwiperSlide key={b.name}>
                                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 font-black text-base flex items-center justify-center h-14">
                                    {b.name}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* ══ 6. PROJECT CALLOUT BANNER (Matching Mockup Section 6) ═════════ */}
            <section className="relative bg-slate-950 text-white py-16 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80"
                        alt="Project Supply Qatar"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight">
                            Big project?<br />Let’s talk supply.
                        </h2>
                        <p className="text-slate-300 text-sm leading-relaxed mb-6">
                            Get in touch for bulk requirements and project enquiries. We're here to support your goals.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#007AFF] hover:bg-[#0066CC] text-white font-bold text-xs transition-all shadow-lg"
                        >
                            Get a Quote <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl max-w-sm text-center">
                        <p className="text-xs font-black text-[#007AFF] uppercase tracking-wider mb-1">BUILT FOR A BRIGHTER TOMORROW</p>
                        <h3 className="text-xl font-black text-white">SAME MATERIALS. STRONGER TOMORROWS.</h3>
                    </div>
                </div>
            </section>

            {/* ══ 7. FACILITY SHOWCASE (Matching Mockup Section 7) ══════════════ */}
            <section className="py-14 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-black text-slate-900 mb-6">A closer look at our world.</h2>
                    <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 h-80">
                        <img
                            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80"
                            alt="Jaza Trading Facility"
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                            <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-widest leading-tight">
                                MATERIALS. TOOLS. POSSIBILITIES.
                            </h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 8. BUILT AROUND YOUR NEEDS (Matching Mockup Section 8) ════════ */}
            <section className="py-12 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-black text-slate-900 text-center mb-8">
                        Built around your needs.
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                        <div className="p-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#007AFF] flex items-center justify-center mx-auto mb-3">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="font-black text-slate-900 text-sm mb-1">Reliability</h3>
                            <p className="text-slate-500 text-xs">Consistent supply when you need it.</p>
                        </div>
                        <div className="p-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#007AFF] flex items-center justify-center mx-auto mb-3">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="font-black text-slate-900 text-sm mb-1">Quality</h3>
                            <p className="text-slate-500 text-xs">Carefully sourced products you can trust.</p>
                        </div>
                        <div className="p-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#007AFF] flex items-center justify-center mx-auto mb-3">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="font-black text-slate-900 text-sm mb-1">Safety</h3>
                            <p className="text-slate-500 text-xs">Solutions for a safer tomorrow.</p>
                        </div>
                        <div className="p-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#007AFF] flex items-center justify-center mx-auto mb-3">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="font-black text-slate-900 text-sm mb-1">Customer Value</h3>
                            <p className="text-slate-500 text-xs">Your success matters to us.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 9. TARGET AUDIENCE CARDS (Matching Mockup Section 9) ══════════ */}
            <section className="py-14 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-black text-slate-900 mb-8">
                        Supporting every kind of builder.
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {AUDIENCES.map((a) => (
                            <div key={a.title} className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                                <div className="h-36 overflow-hidden">
                                    <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-3 text-center">
                                    <h4 className="font-black text-xs text-slate-900">{a.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 10. DIRECT ENQUIRY FORM (Matching Mockup Section 10) ══════════ */}
            <section className="py-16 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 mb-2">
                                Tell us what your project needs.
                            </h2>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                                Have a project in mind? Send us your requirements and we'll get back to you.
                            </p>
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <Mail className="w-4 h-4 text-[#007AFF]" />
                                    </div>
                                    <a href="mailto:jazatrading@gmail.com" className="font-bold text-xs text-slate-900 hover:text-[#007AFF]">jazatrading@gmail.com</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-[#007AFF]" />
                                    </div>
                                    <span className="font-bold text-xs text-slate-900">Qatar</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400">We typically respond within 1 business day.</p>
                        </div>

                        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                            {formSuccess ? (
                                <div className="text-center py-8">
                                    <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                                    <h3 className="text-lg font-bold text-slate-900">Enquiry Submitted!</h3>
                                    <p className="text-slate-500 text-xs mb-4">Our team will get back to you shortly.</p>
                                    <button onClick={() => setFormSuccess(false)} className="px-5 py-2 rounded-full bg-[#007AFF] text-white text-xs font-bold">
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Name *</label>
                                            <input required name="name" type="text" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:border-[#007AFF] outline-none" placeholder="Your Name" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Company</label>
                                            <input name="company" type="text" value={form.company} onChange={(e) => setForm(p => ({ ...p, company: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:border-[#007AFF] outline-none" placeholder="Company Name" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email *</label>
                                            <input required name="email" type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:border-[#007AFF] outline-none" placeholder="email@company.com" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Phone</label>
                                            <input name="phone" type="tel" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:border-[#007AFF] outline-none" placeholder="+974 70605494" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Your requirements *</label>
                                        <textarea required rows={4} value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs resize-none focus:border-[#007AFF] outline-none" placeholder="Enter product names, quantities, or specific project requirements..." />
                                    </div>

                                    {formError && <p className="text-red-600 text-xs bg-red-50 p-3 rounded-lg border border-red-200">{formError}</p>}

                                    <button
                                        type="submit"
                                        disabled={formLoading}
                                        className="w-full py-3 rounded-xl bg-[#007AFF] hover:bg-[#0066CC] text-white font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all shadow-md"
                                    >
                                        {formLoading ? 'Submitting...' : <>Send Enquiry <ArrowRight className="w-4 h-4 text-white" /></>}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 11. EXPLORE OUR RANGE (Matching Mockup Section 11) ════════════ */}
            <section className="py-14 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-black text-slate-900 mb-8">Explore our range</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {BOTTOM_RANGES.map((r) => (
                            <Link key={r.title} to={r.link} className="group rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm flex flex-col">
                                <div className="h-40 overflow-hidden relative">
                                    <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="p-4 flex items-center justify-between">
                                    <h4 className="font-black text-xs text-slate-900 group-hover:text-[#007AFF] transition-colors">{r.title}</h4>
                                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#007AFF] group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;