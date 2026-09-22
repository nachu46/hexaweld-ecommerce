import React from 'react';
import { Shield, PenTool, Users, Target, Lightbulb, Globe, Award, CheckCircle2, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const ourBrands = [
    {
        name: 'Tork®',
        subtitle: 'Electricals, Power Tools & Accessories',
        desc: 'High-performance cordless drills, cutting discs, tool kits, and wall switches.',
        color: 'from-red-600 to-rose-700',
        badge: 'REGISTERED TRADEMARK'
    },
    {
        name: 'Eurex®',
        subtitle: 'Lock Cylinder, Door Handles & Lock Body',
        desc: 'Perfection by design — Euro profile double lock cylinders, stainless handles & mortise locks.',
        color: 'from-blue-600 to-cyan-700',
        badge: 'REGISTERED TRADEMARK'
    },
    {
        name: 'Next®',
        subtitle: 'Hand Tools and Painting Accessories',
        desc: 'Professional hammers, pliers, precision screwdrivers, tape measures, and paint rollers.',
        color: 'from-slate-800 to-black',
        badge: 'PRO GRADE'
    },
    {
        name: 'Mark Safety Pro®',
        subtitle: 'Safety Shoes & Safety Products',
        desc: 'CE EN ISO certified S3 steel toe safety boots, hard hat helmets, safety goggles & cut gloves.',
        color: 'from-amber-600 to-orange-700',
        badge: 'REGISTERED TRADEMARK'
    },
    {
        name: 'Clexo®',
        subtitle: 'Sanitary Wares',
        desc: 'Luxury ceramic countertop wash basins, overhead shower heads, and brass chrome mixer taps.',
        color: 'from-teal-600 to-emerald-700',
        badge: 'REGISTERED TRADEMARK'
    },
    {
        name: 'EDON®',
        subtitle: 'Power Tools & Machineries',
        desc: 'Heavy-duty gasoline generators, silent oil-free air compressors & MMA ARC welding machines.',
        color: 'from-red-700 to-red-900',
        badge: 'HEAVY MACHINERY'
    },
    {
        name: 'TENZO®',
        subtitle: 'Power Tools & Machineries',
        desc: '850W angle grinders, 20V brushless impact drills, gasoline chainsaws & pneumatic air nailers.',
        color: 'from-blue-700 to-indigo-900',
        badge: 'REGISTERED TRADEMARK'
    }
];

const partnerBrands = [
    { name: 'VINI-TAPE', desc: 'Japanese Electrical Insulation Tapes' },
    { name: 'ORYX PAINTS', desc: 'Industrial & Architectural Coatings' },
    { name: 'TENBY', desc: 'Electrical Switches & Fittings' },
    { name: 'NATIONAL PAINTS', desc: 'Decorative & Protective Paints' },
    { name: 'TOTAL', desc: 'One-Stop Tools Station' },
    { name: 'EBM', desc: 'Doha Factory for Paints and Chemicals' },
    { name: 'JOTUN', desc: 'Global Paint & Coating Solutions' },
    { name: 'MAS PAINTS', desc: 'Wood & Decorative Paints' },
    { name: 'MAKITA', desc: 'Industrial Power Tools' }
];

const accreditationTrademarks = [
    { title: 'Tork®', sub: 'The Power Partner', certNo: 'QF17/2614' },
    { title: 'Clexo®', sub: 'Design For Life', certNo: 'QF17/2614 rev.a' },
    { title: 'Eurex®', sub: 'Perfection By Design', certNo: '15/03/2017' },
    { title: 'MARK Safety Pro®', sub: 'Professional Safety Gear', certNo: '24/11/2025' },
    { title: 'TENZO®', sub: 'Power Tools & Machineries', certNo: '01/05/2025' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const About = () => (
    <div className="min-h-screen bg-[#F8FAFC]">

        {/* ── Page Header ── */}
        <div className="bg-[#0F172A] text-white py-16 px-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#007AFF_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider mb-5 border border-blue-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" /> Division Of Sana Group
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-4">
                        Jaza Trading <span className="text-[#007AFF]">W.L.L</span>
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Your trusted partner in quality building materials, reliable supply, and lasting partnerships in Qatar.
                    </p>
                </motion.div>
            </div>
        </div>

        {/* ── About Company (PDF Page 2) ── */}
        <section className="py-16 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <div className="bg-white rounded-3xl p-4 shadow-xl border border-slate-200 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80"
                                alt="Modern Architecture Qatar"
                                className="w-full h-80 object-cover rounded-2xl"
                            />
                            <div className="p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-2xl font-black text-[#0F172A]">Established in 2009</p>
                                    <p className="text-slate-500 text-sm font-semibold">15+ Years Experience in Qatar Market</p>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                                    <Shield className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-5">
                        <span className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">About Our Company</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] leading-tight">
                            Leading Building Materials Wholesaler in <span className="text-blue-600">Qatar</span>
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Established in Qatar in <strong>2009</strong>, <strong>Jaza Trading W.L.L</strong> is a leading building materials wholesaler committed to delivering quality products at competitive prices.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Over the years, we have built a strong reputation for reliability, quality, competitive pricing, and excellent customer relationships. With over <strong>15 years of experience</strong> in the Qatar market, we understand our customers' needs and provide the right products at the right value.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Our goal is to deliver quality, value, and dependable service while building long-term partnerships with our customers, suppliers, and business partners.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* ── Our Purpose: Vision & Mission (PDF Page 3) ── */}
        <section className="py-16 bg-white border-y border-slate-200 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">Our Purpose</span>
                    <h2 className="text-3xl font-black text-[#0F172A] mt-1">Our Vision & Mission</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Vision */}
                    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6">
                            <Target className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-black text-[#0F172A] mb-3">Our Vision</h3>
                        <p className="text-slate-600 leading-relaxed">
                            To become a leading and future-ready building materials company in Qatar, contributing to the country’s continued development and growth through innovation, quality, and excellence. We aspire to be a trusted name that sets new standards in the building materials industry and creates lasting value for our customers and partners.
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="p-8 rounded-3xl bg-blue-50/60 border border-blue-200 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-black text-[#0F172A] mb-3">Our Mission</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Our mission is to provide quality building materials at competitive prices, supported by responsive service. We are committed to understanding our customers’ needs, building relationships, and improving the way we serve them. Through quality products, competitive value, and dedicated service, we strive to be a company our customers trust, remember, and choose again.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* ── Our Brands (PDF Page 4) ── */}
        <section className="py-16 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">Proprietary Catalog</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] mt-1">Our Brands</h2>
                    <p className="text-slate-500 max-w-xl mx-auto mt-2">Quality hardware, electricals, lock systems, tools, and safety equipment built for performance.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ourBrands.map((b) => (
                        <div key={b.name} className="bg-white rounded-2xl p-6 shadow-card border border-slate-200 flex flex-col justify-between hover:shadow-lg transition-all duration-200">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-2xl font-black text-[#0F172A]">{b.name}</h3>
                                    <span className="text-[10px] font-black tracking-wider px-2 py-1 rounded bg-slate-100 text-slate-700">{b.badge}</span>
                                </div>
                                <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">{b.subtitle}</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── Accreditation Brands & Trademarks (PDF Page 5) ── */}
        <section className="py-16 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">Official Registration</span>
                    <h2 className="text-3xl font-black text-[#0F172A] mt-1">Accreditation Brands & Trademarks</h2>
                    <p className="text-slate-500 max-w-xl mx-auto mt-2">Certified trademarks registered under Intellectual Property Rights Protection Department.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {accreditationTrademarks.map((t) => (
                        <div key={t.title} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center justify-center">
                            <Award className="w-8 h-8 text-blue-600 mb-2" />
                            <h4 className="font-black text-lg text-[#0F172A]">{t.title}</h4>
                            <p className="text-xs text-slate-500 font-medium mb-1">{t.sub}</p>
                            <span className="text-[9px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">{t.certNo}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── Our Trusted Brand Partners (PDF Page 5) ── */}
        <section className="py-16 bg-[#F8FAFC] border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">Global Distribution</span>
                    <h2 className="text-3xl font-black text-[#0F172A] mt-1">Our Trusted Brand Partners</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                    {partnerBrands.map((pb) => (
                        <div key={pb.name} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4 hover:border-blue-500 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 font-black text-slate-700 text-xs">
                                {pb.name.substring(0, 2)}
                            </div>
                            <div>
                                <h4 className="font-black text-sm text-[#0F172A]">{pb.name}</h4>
                                <p className="text-xs text-slate-500">{pb.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── Contact Section (PDF Page 6) ── */}
        <section className="py-16 bg-[#0F172A] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-xs font-black text-blue-400 uppercase tracking-[0.2em]">Let's Build Together</span>
                        <h2 className="text-4xl font-black mt-2 mb-6">Contact Jaza Trading W.L.L</h2>
                        <div className="space-y-4 text-slate-300">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold">Phone Numbers</p>
                                    <p className="font-bold text-white">+974 70605494, +974 74080005</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold">Email Address</p>
                                    <p className="font-bold text-white">jazatrading@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold">Qatar Office Address</p>
                                    <p className="font-bold text-white">Al kassarat Street, Industrial Area, street 5, Qatar</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/60 p-8 rounded-3xl border border-slate-700 text-center">
                        <h3 className="text-2xl font-black mb-3">Need Bulk Building Materials?</h3>
                        <p className="text-slate-400 text-sm mb-6">Get in touch directly with our Qatar wholesale sales team for competitive pricing and project supply quotes.</p>
                        <a
                            href="https://wa.me/97470605494"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#25D366] text-white font-bold hover:bg-[#20BA5A] transition-all"
                        >
                            Chat on WhatsApp (+974 70605494)
                        </a>
                    </div>
                </div>
            </div>
        </section>

    </div>
);

export default About;
