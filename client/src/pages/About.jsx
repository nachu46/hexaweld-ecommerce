import React from 'react';
import { ArrowRight, Phone, Mail, MapPin, Target, Globe, Shield, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const ourBrands = [
    { name: 'TORK®', sub: 'Electricals, Power Tools & Accessories', desc: 'Cordless drills, cutting discs, tool kits, and wall switches.', style: 'text-[#E11D48] font-black' },
    { name: 'EUREX®', sub: 'Lock Cylinder & Door Handles', desc: 'Euro profile lock cylinders, stainless handles & mortise lock bodies.', style: 'text-[#2563EB] font-black' },
    { name: 'NEXT®', sub: 'Hand Tools & Painting Accessories', desc: 'Hammers, pliers, precision screwdrivers, tape measures & rollers.', style: 'text-slate-900 font-black italic' },
    { name: 'MARK SAFETY PRO®', sub: 'Safety Boots & PPE Gear', desc: 'CE EN ISO certified S3 steel toe safety boots, helmets & gloves.', style: 'bg-black text-[#FACC15] font-black px-2 py-0.5 rounded' },
    { name: 'CLEXO®', sub: 'Sanitary Wares & Faucets', desc: 'Ceramic wash basins, shower heads, and brass chrome mixer taps.', style: 'text-[#0EA5E9] font-black' },
    { name: 'EDON®', cat: 'Machinery', desc: 'Inverter ARC MMA welding machines & heavy air compressors.', style: 'text-[#DC2626] font-black' },
    { name: 'TENZO®', cat: 'Power Tools', desc: '850W angle grinders, 20V brushless impact drills & chainsaws.', style: 'text-slate-900 font-black' }
];

const partnerBrands = [
    'Vini-Tape', 'Oryx Paints', 'Tenby', 'National Paints', 'Total', 'EBM', 'Jotun', 'Mac Paints', 'Makita'
];

const About = () => {
    return (
        <div className="flex flex-col bg-white text-slate-900 font-sans">

            {/* ══ 1. HERO ARCH BANNER (Matching Front Page Design) ══════════════ */}
            <section className="px-4 sm:px-6 lg:px-8 pt-3 pb-8">
                <div className="max-w-7xl mx-auto bg-[#0B132B] rounded-3xl overflow-hidden relative text-white p-8 sm:p-14 min-h-[420px] flex flex-col justify-between shadow-xl">
                    
                    {/* Top Tagline */}
                    <div className="flex items-center justify-between z-10">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300">
                            COMPANY • JAZA TRADING W.L.L
                        </span>
                        <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-right">
                            SUPPLYING PROGRESS IN QATAR<br />DIVISION OF SANA GROUP
                        </span>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-6 z-10">
                        <div className="lg:col-span-8 max-w-2xl">
                            <h1 className="text-4xl sm:text-6xl font-black leading-tight text-white tracking-tight mb-4">
                                Materials. Expertise.<br />
                                <span className="text-slate-200">A partner you can trust.</span>
                            </h1>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                                Established in Qatar in 2009, Jaza Trading W.L.L is a leading building materials wholesaler and a division of Sana Group.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#0B132B] font-bold text-xs sm:text-sm transition-all shadow-md group"
                            >
                                Request a Quote <ArrowRight className="w-4 h-4 text-[#0B132B] group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="lg:col-span-4 flex justify-end">
                            <div className="w-full max-w-sm h-64 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 relative bg-slate-800">
                                <img
                                    src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80"
                                    alt="Jaza Trading Qatar Facility"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/80 via-transparent to-transparent" />
                                <div className="absolute bottom-3 left-3 right-3 text-center bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/20 text-xs font-bold text-white">
                                    Serving Qatar Since 2009
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Badge */}
                    <div className="z-10 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">15+ YEARS OF EXCELLENCE IN QATAR</span>
                        <span className="text-lg font-black text-white">2009 — 2026</span>
                    </div>
                </div>
            </section>

            {/* ══ 2. ABOUT COMPANY OVERVIEW ═════════════════════════════════════ */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">ABOUT US</span>
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
                                ESTABLISHED IN QATAR IN 2009
                            </div>
                        </div>

                        <div className="lg:col-span-7 space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                                Leading Building Materials Wholesaler in Qatar
                            </h2>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                Over the years, we have built a strong reputation for reliability, quality, competitive pricing, and excellent customer relationships. With over <strong>15 years of experience</strong> in the Qatar market, we understand our customers’ needs and provide the right products at the right value.
                            </p>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                Our goal is to deliver quality, value, and dependable service while building long-term partnerships with our customers, suppliers, and business partners.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 3. VISION & MISSION (Matching Front Page Cards) ═══════════════ */}
            <section className="py-16 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">OUR PURPOSE</span>
                        <div className="w-12 h-px bg-slate-300" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Vision */}
                        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#007AFF] flex items-center justify-center mb-4">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-3">Our Vision</h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                To become a leading and future-ready building materials company in Qatar, contributing to the country’s continued development and growth through innovation, quality, and excellence. We aspire to set new standards in the industry and create lasting value for our partners.
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#007AFF] flex items-center justify-center mb-4">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-3">Our Mission</h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                Our mission is to provide quality building materials at competitive prices, supported by responsive service. We are committed to understanding our customers’ needs, building long-term relationships, and being a company our customers trust, remember, and choose again.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 4. OUR STRENGTHS 01, 02, 03 (Matching Front Page Design) ═════ */}
            <section className="py-16 bg-white">
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

            {/* ══ 5. PROPRIETARY BRANDS CATALOG ═════════════════════════════════ */}
            <section className="py-16 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">OUR BRANDS</span>
                        <div className="w-12 h-px bg-slate-300" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {ourBrands.map((b) => (
                            <div key={b.name} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-xl ${b.style}`}>{b.name}</span>
                                    </div>
                                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">{b.sub}</h4>
                                    <p className="text-slate-600 text-xs leading-relaxed">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Brand Partners Horizontal List */}
                    <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
                        <span className="font-bold uppercase tracking-wider text-slate-900">Brand partners</span>
                        {partnerBrands.map((pb) => (
                            <span key={pb} className="font-medium hover:text-slate-900 transition-colors">{pb}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 6. CONTACT US CALLOUT BANNER (Matching Front Page Design) ═════ */}
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

export default About;
