import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowRight, Phone, Mail, MapPin, Building2, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || '';

// Registered Brand Trademarks fallback
const REGISTERED_BRANDS = [
    { name: 'TORK®', cat: 'Electricals & Tools', style: 'text-[#E11D48] font-black' },
    { name: 'EUREX®', cat: 'Lock Cylinders & Handles', style: 'text-[#2563EB] font-black' },
    { name: 'NEXT®', cat: 'Hand Tools & Painting', style: 'text-slate-900 font-black italic' },
    { name: 'MARK SAFETY PRO®', cat: 'Safety Boots & PPE', style: 'bg-black text-[#FACC15] font-black px-2 py-1 rounded' },
    { name: 'CLEXO®', cat: 'Sanitary Wares', style: 'text-[#0EA5E9] font-black' },
    { name: 'EDON®', cat: 'Welders & Machinery', style: 'text-[#DC2626] font-black flex items-center gap-1' },
    { name: 'TENZO®', cat: 'Power Tools', style: 'text-slate-900 font-black' }
];

// Partner Brands List fallback
const PARTNER_BRANDS = [
    'Vini-Tape', 'Oryx Paints', 'Tenby', 'National Paints', 'Total', 'EBM', 'Jotun', 'Mac Paints', 'Makita'
];

const Home = () => {
    // Dynamic Brands State
    const [dynamicBrands, setDynamicBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/brands`);
                if (Array.isArray(data) && data.length > 0) {
                    setDynamicBrands(data);
                }
            } catch (err) {
                console.error('Failed to load dynamic brands:', err);
            }
        };
        fetchBrands();
    }, []);

    const getImageUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
        return `${API_URL}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    return (
        <div className="flex flex-col bg-white text-slate-900 font-sans">

            {/* ══ 1. HERO BANNER (Compact & Clean) ════════════════ */}
            <section className="px-4 sm:px-6 lg:px-8 pt-3 pb-6">
                <div className="max-w-7xl mx-auto bg-[#0B132B] rounded-3xl overflow-hidden relative text-white p-6 sm:p-10 min-h-[460px] flex flex-col justify-between shadow-xl">
                    
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center my-4 z-10">
                        <div className="max-w-xl">
                            <h1 className="text-3xl sm:text-5xl font-black leading-none text-white tracking-tight mb-3">
                                Complex projects.<br />
                                <span className="text-slate-200">Simple supply.</span>
                            </h1>
                            <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed mb-6 max-w-md">
                                Quality building materials, electricals, lock cylinders, hardware, and safety tools for Qatar projects.
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                                <Link
                                    to="/products"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#0B132B] font-bold text-xs transition-all shadow-md group"
                                >
                                    Explore products <ArrowRight className="w-4 h-4 text-[#0B132B] group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 hover:border-white text-white font-bold text-xs transition-all"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>

                        {/* Right Hero Image */}
                        <div className="relative flex justify-center items-center">
                            <div className="w-full max-w-md h-64 sm:h-72 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 relative bg-slate-800">
                                <img
                                    src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80"
                                    alt="Industrial Construction Tools Qatar"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/80 via-transparent to-transparent" />
                                <div className="absolute bottom-3 left-3 right-3 bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/20 flex items-center justify-between text-xs text-white">
                                    <span className="font-bold text-xs">Jaza Trading W.L.L</span>
                                    <span className="text-[10px] text-slate-300">Doha, Qatar</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Established Badge */}
                    <div className="z-10 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                        <div>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">ESTABLISHED IN QATAR</span>
                            <span className="text-base font-black text-white">2009 • Sana Group Division</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 2. COMPANY INTRO & DETAILED CORPORATE INFORMATION ═══════════════ */}
            <section className="py-8 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">ABOUT THE COMPANY</span>
                        <div className="w-12 h-px bg-slate-300" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xs border border-slate-200 bg-slate-100 h-72 sm:h-80">
                            <img
                                src="https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=800&q=80"
                                alt="Supplying Progress in Qatar"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-900 border border-slate-200">
                                SUPPYING PROGRESS IN QATAR
                            </div>
                        </div>

                        <div className="lg:col-span-7 space-y-4">
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                                Jaza Trading W.L.L<br />
                                <span className="text-slate-500 text-lg sm:text-xl font-bold">Materials. Expertise. Trusted Partner in Qatar.</span>
                            </h2>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                Established in 2009 in Doha, Qatar, <strong>Jaza Trading W.L.L</strong> is a leading wholesaler of premium building materials, electrical accessories, door hardware, lock cylinders, hand tools, welders, sanitary wares, and safety PPE. As a core division of <strong>Sana Group</strong>, we pride ourselves on exceptional product quality, reliable supply, and long-term partnership with major Qatar contractors.
                            </p>

                            {/* Corporate Info Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase">Headquarters</p>
                                        <p className="text-xs font-bold text-slate-800">Al Kassarat Street, Industrial Area, Street 5</p>
                                        <p className="text-[11px] text-slate-500">P.O. Box 31221, Doha, Qatar</p>
                                    </div>
                                </div>

                                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase">Contact Lines</p>
                                        <p className="text-xs font-bold text-slate-800">+974 7060 5494 / +974 4450 1234</p>
                                        <p className="text-[11px] text-slate-500">jazatrading@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Link to="/about" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007AFF] hover:underline group">
                                    Read complete company profile <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 3. OUR STRENGTHS (Compact) ═════════════════════ */}
            <section className="py-8 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">OUR PILLARS</span>
                        <div className="w-12 h-px bg-slate-300" />
                    </div>

                    <h2 className="text-2xl font-black text-slate-900 mb-6">
                        Why Qatar contractors choose Jaza Trading.
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                        <div className="pt-3 md:pt-0 md:pr-4">
                            <div className="text-4xl font-black text-slate-900 mb-1">01</div>
                            <h3 className="text-base font-black text-slate-900 mb-1">Certified Quality</h3>
                            <p className="text-slate-600 text-xs leading-relaxed">
                                International standards compliant tools, safety equipment, and building supplies tested for heavy industrial demands.
                            </p>
                        </div>

                        <div className="pt-4 md:pt-0 md:px-4">
                            <div className="text-4xl font-black text-slate-900 mb-1">02</div>
                            <h3 className="text-base font-black text-slate-900 mb-1">Wholesale Value</h3>
                            <p className="text-slate-600 text-xs leading-relaxed">
                                Direct importer pricing and flexible procurement for bulk construction contracts across the State of Qatar.
                            </p>
                        </div>

                        <div className="pt-4 md:pt-0 md:pl-4">
                            <div className="text-4xl font-black text-slate-900 mb-1">03</div>
                            <h3 className="text-base font-black text-slate-900 mb-1">Rapid Delivery</h3>
                            <p className="text-slate-600 text-xs leading-relaxed">
                                Dedicated delivery fleet serving Industrial Area, Doha, Lusail, Al Wakrah, and all major project sites.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 4. EXPLORE OUR CATEGORIES (Compact 3 Cards) ═════════════════ */}
            <section className="py-8 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                Explore product range.
                            </h2>
                        </div>
                        <div className="mt-1 md:mt-0 text-right">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                TRUSTED SUPPLIER • PROVEN QUALITY
                            </span>
                        </div>
                    </div>

                    <div className="space-y-6">

                        {/* Card 01: Power Tools & Equipment */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-50 p-5 sm:p-8 rounded-3xl border border-slate-200">
                            <div className="lg:col-span-6 rounded-2xl overflow-hidden h-52 sm:h-60 bg-slate-200 border border-slate-300">
                                <img
                                    src="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80"
                                    alt="Power Tools & Equipment"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="lg:col-span-6 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">ELECTRICALS & MACHINERY</span>
                                    <span className="text-3xl font-black text-slate-300">01</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">Power your construction site.</h3>
                                <p className="text-slate-600 text-xs font-semibold">Tork®, EDON® and TENZO® machinery & power tools.</p>
                                <div className="pt-2">
                                    <Link to="/products?category=Electricals,%20Power%20Tools%20%26%20Accessories" className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:underline group">
                                        Explore electricals & tools <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Card 02: Door Hardware & Sanitary */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-50 p-5 sm:p-8 rounded-3xl border border-slate-200">
                            <div className="lg:col-span-6 order-2 lg:order-1 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">DOOR HARDWARE & SANITARY</span>
                                    <span className="text-3xl font-black text-slate-300">02</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">Details built for durability.</h3>
                                <p className="text-slate-600 text-xs font-semibold">Eurex® lock cylinders & Clexo® sanitary fittings.</p>
                                <div className="pt-2">
                                    <Link to="/products?category=Lock%20Cylinder,%20Door%20Handles%20%26%20Lock%20Body" className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:underline group">
                                        Explore door hardware <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                            <div className="lg:col-span-6 order-1 lg:order-2 rounded-2xl overflow-hidden h-52 sm:h-60 bg-slate-200 border border-slate-300">
                                <img
                                    src="https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80"
                                    alt="Door Hardware & Sanitary"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Card 03: Hand Tools, Paints & Safety */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-50 p-5 sm:p-8 rounded-3xl border border-slate-200">
                            <div className="lg:col-span-6 rounded-2xl overflow-hidden h-52 sm:h-60 bg-slate-200 border border-slate-300">
                                <img
                                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                                    alt="Hand Tools, Paints & Safety"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="lg:col-span-6 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">HAND TOOLS, PAINTS & SAFETY PPE</span>
                                    <span className="text-3xl font-black text-slate-300">03</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">Safety & high performance hand tools.</h3>
                                <p className="text-slate-600 text-xs font-semibold">Next® hand tools and Mark Safety Pro® safety footwear.</p>
                                <div className="pt-2">
                                    <Link to="/products?category=Safety%20Shoes%20%26%20Safety%20Products" className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:underline group">
                                        Explore safety & hand tools <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ══ 5. REGISTERED BRANDS & PARTNERS ═════════════════ */}
            <section className="py-8 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">REGISTERED BRANDS & PARTNERS</span>
                            <div className="w-12 h-px bg-slate-300" />
                        </div>
                    </div>

                    {/* Main Registered Brands */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 items-center text-center mb-6">
                        {dynamicBrands.length > 0 ? (
                            dynamicBrands.filter(b => b.isRegistered !== false).map((b) => (
                                <Link
                                    key={b._id || b.name}
                                    to={`/products?brand=${encodeURIComponent(b.name.replace('®', ''))}`}
                                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-900 transition-all flex flex-col items-center justify-center h-20 shadow-xs group hover:bg-white"
                                >
                                    {b.logo ? (
                                        <img
                                            src={getImageUrl(b.logo)}
                                            alt={b.name}
                                            className="max-h-10 max-w-[90%] object-contain group-hover:scale-105 transition-transform"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'block';
                                            }}
                                        />
                                    ) : null}
                                    <span
                                        className={`text-xs font-black tracking-tight text-slate-900 ${b.logo ? 'hidden mt-1' : 'block'}`}
                                    >
                                        {b.name}
                                    </span>
                                    {b.badgeTag && (
                                        <span className="text-[9px] font-bold text-blue-600 tracking-tighter uppercase mt-0.5">
                                            {b.badgeTag}
                                        </span>
                                    )}
                                </Link>
                            ))
                        ) : (
                            REGISTERED_BRANDS.map((b) => (
                                <Link
                                    key={b.name}
                                    to={`/products?brand=${encodeURIComponent(b.name.replace('®', ''))}`}
                                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-900 transition-all flex flex-col items-center justify-center h-20 shadow-xs"
                                >
                                    <span className={`text-xs tracking-tight ${b.style}`}>{b.name}</span>
                                </Link>
                            ))
                        )}
                    </div>

                    {/* Brand Partners Horizontal List */}
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                        <span className="font-bold uppercase tracking-wider text-slate-900">Brand partners</span>
                        {dynamicBrands.length > 0 ? (
                            dynamicBrands.map((pb) => (
                                <Link
                                    key={pb._id || pb.name}
                                    to={`/products?brand=${encodeURIComponent(pb.name.replace('®', ''))}`}
                                    className="font-medium hover:text-slate-900 transition-colors flex items-center gap-1.5"
                                >
                                    {pb.logo && (
                                        <img src={getImageUrl(pb.logo)} alt={pb.name} className="w-3.5 h-3.5 object-contain rounded" />
                                    )}
                                    <span>{pb.name}</span>
                                </Link>
                            ))
                        ) : (
                            PARTNER_BRANDS.map((pb) => (
                                <span key={pb} className="font-medium hover:text-slate-900 transition-colors">{pb}</span>
                            ))
                        )}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;