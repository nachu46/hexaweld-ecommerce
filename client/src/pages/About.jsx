import React from 'react';
import { ArrowRight, Phone, Mail, MapPin, Target, Globe, Shield, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const ourBrands = [
    { name: 'TORK®', sub: 'Electricals, Power Tools & Accessories', desc: 'Cordless drills, cutting discs, tool kits, and wall switches.', style: 'text-[#B15E2B] font-serif font-bold' },
    { name: 'EUREX®', sub: 'Lock Cylinder & Door Handles', desc: 'Euro profile lock cylinders, stainless handles & mortise lock bodies.', style: 'text-[#2E4046] font-serif font-bold' },
    { name: 'NEXT®', sub: 'Hand Tools & Painting Accessories', desc: 'Hammers, pliers, precision screwdrivers, tape measures & rollers.', style: 'text-[#1C1B17] font-serif font-bold' },
    { name: 'MARK SAFETY PRO®', sub: 'Safety Boots & PPE Gear', desc: 'CE EN ISO certified S3 steel toe safety boots, helmets & gloves.', style: 'bg-[#1C1B17] text-[#B15E2B] font-serif font-bold px-2 py-0.5 rounded' },
    { name: 'CLEXO®', sub: 'Sanitary Wares & Faucets', desc: 'Ceramic wash basins, shower heads, and brass chrome mixer taps.', style: 'text-[#2E4046] font-serif font-bold' },
    { name: 'TENZO®', cat: 'Power Tools & Machinery', desc: '850W angle grinders, 20V brushless impact drills & generators.', style: 'text-[#1C1B17] font-serif font-bold' }
];

const partnerBrands = [
    'Vini-Tape', 'Oryx Paints', 'Tenby', 'National Paints', 'Total', 'EBM Coatings & Chemicals', 'Jotun', 'Mas Paints', 'Makita', 'Edon'
];

const About = () => {
    return (
        <div className="flex flex-col bg-[#F6F4EE] text-[#1C1B17] font-sans">

            {/* ══ 1. HERO HEADER ═══════════════════════════════════════════ */}
            <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-8">
                <div className="max-w-7xl mx-auto pb-8 border-b border-[#E5E0D8] space-y-6">
                    
                    {/* Top Tagline */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B15E2B]">
                            COMPANY OVERVIEW • JAZA TRADING W.L.L
                        </span>
                        <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#2E4046] text-right">
                            SUPPLYING PROGRESS IN QATAR • DIVISION OF SANA GROUP
                        </span>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-4">
                        <div className="lg:col-span-8 max-w-2xl">
                            <h1 className="text-4xl sm:text-6xl font-serif font-bold leading-tight text-[#1C1B17] tracking-tight mb-4">
                                Materials. Expertise.<br />
                                <span className="text-[#B15E2B]">A partner you can trust.</span>
                            </h1>
                            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-8 font-medium">
                                Established in Qatar in 2009, Jaza Trading W.L.L (Division of Sana Group) is a premier building materials wholesaler committed to providing top-quality industrial hardware, electricals, safety boots, door locks, and sanitaryware.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#B15E2B] hover:bg-[#8E4920] text-white font-bold text-xs sm:text-sm transition-all shadow-md group"
                            >
                                Request a Wholesale Quote <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="lg:col-span-4 flex justify-end">
                            <div className="w-full max-w-sm h-64 rounded-2xl overflow-hidden shadow-md border border-[#E5E0D8] relative bg-white">
                                <img
                                    src="/hero_building_materials.jpg"
                                    alt="Jaza Trading Qatar Wholesale Facility"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#F6F4EE]/80 via-transparent to-transparent" />
                                <div className="absolute bottom-3 left-3 right-3 text-center bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-[#E5E0D8] text-xs font-bold text-[#1C1B17] shadow-sm">
                                    Serving Qatar Since 2009 · 15+ Years
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 2. ABOUT COMPANY OVERVIEW ═════════════════════════════════════ */}
            <section className="py-16 bg-[#F6F4EE]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B15E2B]">ABOUT US</span>
                        <div className="w-12 h-px bg-[#D5CFCE]" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-md border border-[#E5E0D8] bg-white h-80">
                            <img
                                src="https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=800&q=80"
                                alt="Supplying Progress in Qatar"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-4 left-4 bg-white/95 text-[#1C1B17] backdrop-blur-sm px-3.5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-[#E5E0D8] shadow-sm">
                                ESTABLISHED IN DOHA, QATAR (2009)
                            </div>
                        </div>

                        <div className="lg:col-span-7 space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1B17] leading-tight tracking-tight">
                                Leading Building Materials Wholesaler in Qatar
                            </h2>
                            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                                Over the years, Jaza Trading W.L.L has built a strong reputation for reliability, quality, competitive pricing, and excellent customer relationships. With over <strong>15 years of experience</strong> in the Qatar market, we understand our customers’ needs and provide the right products at the right value.
                            </p>
                            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                                As an active division of <strong>Sana Group</strong>, our goal is to deliver quality, value, and dependable service while building long-term partnerships with contractors, trading companies, and industrial clients across Qatar.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 3. VISION & MISSION ═══════════════════════════════════════════ */}
            <section className="py-16 bg-[#ECE8E0] border-y border-[#E5E0D8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B15E2B]">OUR PURPOSE</span>
                        <div className="w-12 h-px bg-[#D5CFCE]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Vision */}
                        <div className="p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-2xl bg-[#B15E2B]/10 text-[#B15E2B] flex items-center justify-center mb-4 border border-[#B15E2B]/20">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-[#1C1B17] mb-3">Our Vision</h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                To become a leading and future-ready building materials company in Qatar, contributing to the country’s continued development and growth through innovation, quality, and excellence. We aspire to set new standards in the wholesale industry and create lasting value for our partners.
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-2xl bg-[#2E4046]/10 text-[#2E4046] flex items-center justify-center mb-4 border border-[#2E4046]/20">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-[#1C1B17] mb-3">Our Mission</h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                Our mission is to provide quality building materials at competitive prices, supported by responsive service. We are committed to understanding our customers’ needs, building long-term relationships, and being a company our customers trust, remember, and choose again.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 4. OUR CORE VALUES ════════════════════════════════════════════ */}
            <section className="py-16 bg-[#F6F4EE]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B15E2B]">OUR CORE VALUES</span>
                        <div className="w-12 h-px bg-[#D5CFCE]" />
                    </div>

                    <h2 className="text-3xl font-serif font-bold text-[#1C1B17] mb-12">
                        What makes the difference.
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] shadow-sm">
                            <div className="text-4xl font-serif font-bold text-[#B15E2B] mb-2">01</div>
                            <h3 className="text-lg font-serif font-bold text-[#1C1B17] mb-1">Reliability</h3>
                            <p className="text-slate-600 text-xs leading-relaxed">
                                On-time deliveries and robust inventory management across Qatar.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] shadow-sm">
                            <div className="text-4xl font-serif font-bold text-[#B15E2B] mb-2">02</div>
                            <h3 className="text-lg font-serif font-bold text-[#1C1B17] mb-1">Quality</h3>
                            <p className="text-slate-600 text-xs leading-relaxed">
                                Certified tools, door cylinders, and building materials built for real-world demands.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] shadow-sm">
                            <div className="text-4xl font-serif font-bold text-[#B15E2B] mb-2">03</div>
                            <h3 className="text-lg font-serif font-bold text-[#1C1B17] mb-1">Value</h3>
                            <p className="text-slate-600 text-xs leading-relaxed">
                                Direct wholesale pricing that optimizes contractor and trader budgets.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] shadow-sm">
                            <div className="text-4xl font-serif font-bold text-[#B15E2B] mb-2">04</div>
                            <h3 className="text-lg font-serif font-bold text-[#1C1B17] mb-1">Service</h3>
                            <p className="text-slate-600 text-xs leading-relaxed">
                                Dedicated B2B support and responsive order processing.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 5. PROPRIETARY BRANDS CATALOG ═════════════════════════════════ */}
            <section className="py-16 bg-[#ECE8E0] border-t border-[#E5E0D8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B15E2B]">OWN PRODUCT BRANDS</span>
                        <div className="w-12 h-px bg-[#D5CFCE]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {ourBrands.map((b) => (
                            <div key={b.name} className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#B15E2B]/50 transition-all">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-xl ${b.style}`}>{b.name}</span>
                                    </div>
                                    <h4 className="text-xs font-bold text-[#2E4046] uppercase tracking-wider mb-2">{b.sub}</h4>
                                    <p className="text-slate-600 text-xs leading-relaxed">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Brand Partners Horizontal List */}
                    <div className="pt-6 border-t border-[#D5CFCE] flex flex-wrap items-center justify-between text-xs text-slate-600 gap-3">
                        <span className="font-bold uppercase tracking-wider text-[#1C1B17]">Distributed / Partner Brands</span>
                        {partnerBrands.map((pb) => (
                            <span key={pb} className="font-semibold px-3 py-1 bg-white rounded-lg border border-[#E5E0D8] text-slate-800 shadow-xs">{pb}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 6. CONTACT US CALLOUT BANNER ═══════════════════════════════════ */}
            <section className="py-14 bg-[#F6F4EE]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B15E2B]">GET IN TOUCH</span>
                        <div className="w-12 h-px bg-[#D5CFCE]" />
                    </div>

                    <div className="bg-[#ECE8E0] text-[#1C1B17] p-8 sm:p-14 rounded-3xl border border-[#E5E0D8] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-md">
                        <div className="lg:col-span-8 space-y-6">
                            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1C1B17] tracking-tight leading-tight">
                                Partner with Jaza Trading.<br />
                                <span className="text-[#B15E2B]">Request wholesale pricing today.</span>
                            </h2>

                            <div className="flex flex-wrap items-center gap-6">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#B15E2B] hover:bg-[#8E4920] text-white font-bold text-xs sm:text-sm shadow-md transition-all group"
                                >
                                    Contact Wholesale Team <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <div className="text-xs text-slate-700 font-medium space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5 text-[#B15E2B]" />
                                        <span>+974 7060 5494 / +974 7408 0005</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5 text-[#B15E2B]" />
                                        <span>jazatrading@gmail.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
                            <Link
                                to="/contact"
                                className="w-24 h-24 rounded-full bg-[#B15E2B] hover:scale-105 text-white flex items-center justify-center transition-all shadow-xl mb-3"
                            >
                                <ArrowRight className="w-10 h-10 text-white" />
                            </Link>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#2E4046]">
                                AL KASSARAT ST, STREET 5, DOHA, QATAR
                            </span>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;

