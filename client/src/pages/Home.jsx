import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowRight, Phone, Mail, MapPin, Building2, ShieldCheck, CheckCircle2, FileText, Download, Award, Clock, Users, PackageCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || '';

// Own Brands from Brief
const OWN_BRANDS = [
    { name: 'TORK®', cat: 'Electricals, power tools & accessories', tag: 'OWN BRAND', style: 'text-[#B15E2B] font-serif font-bold' },
    { name: 'EUREX®', cat: 'Lock cylinders, door handles & lock bodies', tag: 'OWN BRAND', style: 'text-[#2E4046] font-serif font-bold' },
    { name: 'NEXT®', cat: 'Hand tools & painting accessories', tag: 'OWN BRAND', style: 'text-[#1C1B17] font-black italic' },
    { name: 'MARK SAFETY PRO®', cat: 'Safety shoes & safety products', tag: 'OWN BRAND', style: 'bg-[#1C1B17] text-[#B15E2B] font-bold px-2 py-0.5 rounded' },
    { name: 'CLEXO®', cat: 'Sanitaryware', tag: 'OWN BRAND', style: 'text-[#2E4046] font-bold' },
    { name: 'TENZO®', cat: 'Power tools & machineries', tag: 'OWN BRAND', style: 'text-[#1C1B17] font-bold' }
];

// Distributed Partner Brands from Brief
const DISTRIBUTED_BRANDS = [
    'Vini-Tape', 'Oryx Paints', 'Tenby', 'National Paints', 'Total', 'EBM Coatings & Chemicals', 'Jotun', 'Mas Paints', 'Makita', 'Edon'
];

// Product Categories from Brief
const CATEGORIES_BRIEF = [
    {
        title: 'Power & Hand Tools',
        desc: 'Cordless drills, angle grinders, hammers, pliers, screwdriver sets & measuring tapes.',
        categoryQuery: 'Electricals,%20Power%20Tools%20%26%20Accessories',
        img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
        brandTag: 'Tork® & Tenzo®'
    },
    {
        title: 'Door Hardware',
        desc: 'Mortise lock bodies, high-security cylinder locks & keys, door handles & escutcheons.',
        categoryQuery: 'Lock%20Cylinder,%20Door%20Handles%20%26%20Lock%20Body',
        img: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80',
        brandTag: 'Eurex®'
    },
    {
        title: 'Painting Accessories',
        desc: 'Paint rollers, trays, brushes, masking tape, drop sheets & surface preparation gear.',
        categoryQuery: 'Hand%20Tools%20%26%20Painting%20Accessories',
        img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
        brandTag: 'NexT® & Oryx Paints'
    },
    {
        title: 'Safety & PPE',
        desc: 'Steel-toe safety shoes, helmets, high-vis vests, safety glasses & work gloves.',
        categoryQuery: 'Safety%20Shoes%20%26%20Safety%20Products',
        img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        brandTag: 'Mark Safety Pro®'
    },
    {
        title: 'Sanitaryware',
        desc: 'Wash basins, mixer taps, shower fittings & commercial plumbing accessories.',
        categoryQuery: 'Sanitaryware',
        img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        brandTag: 'Clexo®'
    },
    {
        title: 'Power Machineries',
        desc: 'Generators, air compressors, industrial welding machines & chainsaws.',
        categoryQuery: 'Power%20Tools%20%26%20Machineries',
        img: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
        brandTag: 'Tenzo® & Edon'
    }
];

const Home = () => {
    const [dynamicBrands, setDynamicBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const { data } = await axios.get('/api/brands');
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

    const brandCarouselList = dynamicBrands.length > 0
        ? [...dynamicBrands, ...dynamicBrands, ...dynamicBrands]
        : [...OWN_BRANDS, ...OWN_BRANDS, ...OWN_BRANDS];

    return (
        <div className="flex flex-col bg-[#F6F4EE] text-[#1C1B17] font-sans overflow-x-hidden w-full">

            {/* ══ 1. HERO BANNER (Bright Corporate Warm Theme) ════════════════════ */}
            <section className="px-3 sm:px-6 lg:px-8 pt-4 pb-6">
                <div className="max-w-7xl mx-auto bg-[#ECE8E0] rounded-3xl overflow-hidden relative text-[#1C1B17] p-6 sm:p-12 min-h-[460px] flex flex-col justify-between shadow-md border border-[#E5E0D8]">
                    
                    {/* Top Tagline */}
                    <div className="flex items-center justify-between z-10 gap-2">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B15E2B]">
                            BUILDING MATERIALS WHOLESALE • QATAR
                        </span>
                        <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#2E4046] text-right">
                            ESTABLISHED 2009 • DIVISION OF SANA GROUP
                        </span>
                    </div>

                    {/* Main Hero Content & Photography */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-4 z-10">
                        <div className="lg:col-span-7 space-y-4">
                            <p className="text-xs font-bold text-[#B15E2B] uppercase tracking-widest">
                                15+ Years in the Qatar Market
                            </p>
                            <h1 className="text-3xl sm:text-5xl font-serif font-bold leading-tight text-[#1C1B17] tracking-tight">
                                Your trusted partner in quality building materials & reliable supply.
                            </h1>
                            <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed max-w-lg">
                                Jaza Trading W.L.L provides premium electricals, door hardware, lock cylinders, hand tools, welders, sanitaryware, and PPE safety gear to contractors across the State of Qatar.
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                <Link
                                    to="/products"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B15E2B] hover:bg-[#8E4920] text-white font-bold text-xs transition-all shadow-md group"
                                >
                                    <span>Explore Products Catalog</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <a
                                    href="/catalog.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#D5CFCE] hover:border-[#B15E2B] text-[#1C1B17] font-bold text-xs transition-all bg-white hover:bg-[#F6F4EE]"
                                >
                                    <Download className="w-4 h-4 text-[#B15E2B]" />
                                    <span>Download PDF Catalog</span>
                                </a>
                            </div>
                        </div>

                        {/* Right Photography Frame */}
                        <div className="lg:col-span-5 relative flex justify-center items-center">
                            <div className="w-full max-w-md h-72 sm:h-80 md:h-[370px] rounded-2xl overflow-hidden shadow-md border border-[#D5CFCE] relative bg-[#1C1B17]">
                                <img
                                    src="/jaza_office_reception.jpg"
                                    alt="Jaza Trading W.L.L Corporate Office & Reception Qatar"
                                    className="w-full h-full object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B17]/70 via-transparent to-transparent" />
                                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-[#E5E0D8] flex items-center justify-between text-xs text-[#1C1B17] shadow-sm">
                                    <div>
                                        <p className="font-serif font-bold text-xs text-[#1C1B17]">Jaza Trading Head Office</p>
                                        <p className="text-[10px] text-slate-600 font-medium">Division Of Sana Group • Doha, Qatar</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-white bg-[#B15E2B] px-2.5 py-1 rounded shadow-xs">QATAR</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Core Values Strip */}
                    <div className="z-10 pt-4 border-t border-[#D5CFCE] flex flex-wrap items-center justify-between text-xs text-slate-700 gap-2 font-medium">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#B15E2B]">CORE VALUES</span>
                        <div className="flex flex-wrap items-center gap-4 font-serif font-bold text-[#1C1B17] text-xs">
                            <span className="text-[#B15E2B]">Reliability</span>
                            <span>•</span>
                            <span className="text-[#B15E2B]">Quality</span>
                            <span>•</span>
                            <span className="text-[#B15E2B]">Value</span>
                            <span>•</span>
                            <span className="text-[#B15E2B]">Service</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 2. STATS STRIP ════════════════════════════════════ */}
            <section className="py-6 bg-white border-y border-[#E5E0D8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 sm:divide-x divide-[#E5E0D8]">
                        <div className="p-2">
                            <div className="flex justify-center mb-1"><Clock className="w-5 h-5 text-[#B15E2B]" /></div>
                            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1B17]">15+ Years</h3>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Established 2009 in Qatar</p>
                        </div>

                        <div className="p-2">
                            <div className="flex justify-center mb-1"><PackageCheck className="w-5 h-5 text-[#B15E2B]" /></div>
                            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1B17]">10,000+</h3>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">SKUs & Building Materials</p>
                        </div>

                        <div className="p-2">
                            <div className="flex justify-center mb-1"><Users className="w-5 h-5 text-[#B15E2B]" /></div>
                            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1B17]">500+</h3>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Qatar Project Partners</p>
                        </div>

                        <div className="p-2">
                            <div className="flex justify-center mb-1"><Award className="w-5 h-5 text-[#B15E2B]" /></div>
                            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1B17]">100%</h3>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Quality Assurance Certified</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 3. WELCOME & CORPORATE OVERVIEW (Vision, Mission & Brief Info) ══ */}
            <section className="py-10 bg-[#F6F4EE]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B15E2B]">WELCOME TO JAZA TRADING</span>
                        <div className="w-12 h-px bg-[#D5CFCE]" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xs border border-[#E5E0D8] bg-white h-64 sm:h-80">
                            <img
                                src="/qatar_katara_towers.png"
                                alt="Qatar Lusail Iconic Architecture Katara Towers"
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute bottom-3 left-3 bg-[#1C1B17]/90 backdrop-blur-sm px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                                STATE OF QATAR • SANA GROUP DIVISION
                            </div>
                        </div>

                        <div className="lg:col-span-7 space-y-4">
                            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1C1B17] leading-tight">
                                Quality building materials at competitive prices with responsive service.
                            </h2>
                            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
                                Established in Qatar in 2009, <strong>Jaza Trading W.L.L</strong> is a leading wholesaler of construction and industrial building supplies. As a core division of <strong>Sana Group</strong>, we provide wholesale and retail supply across electricals, hardware, lock bodies, safety PPE, and sanitaryware.
                            </p>

                            {/* Vision & Mission Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                <div className="p-4 rounded-xl bg-white border border-[#E5E0D8] space-y-1 shadow-xs">
                                    <span className="text-[10px] font-black text-[#B15E2B] uppercase tracking-wider">OUR VISION</span>
                                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                                        To become a leading and future-ready building materials company in Qatar, contributing to the country's development through innovation, quality, and excellence.
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl bg-white border border-[#E5E0D8] space-y-1 shadow-xs">
                                    <span className="text-[10px] font-black text-[#B15E2B] uppercase tracking-wider">OUR MISSION</span>
                                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                                        To provide quality building materials at competitive prices with responsive service, understanding customer needs and building lasting relationships.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-2 flex flex-wrap items-center gap-3">
                                <Link
                                    to="/about"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B15E2B] hover:bg-[#8E4920] text-white font-bold text-xs transition-all shadow-xs"
                                >
                                    <span>Read Complete Company Profile</span>
                                    <ArrowRight className="w-4 h-4 text-white" />
                                </Link>

                                <a
                                    href="tel:+97470605494"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#D5CFCE] hover:border-[#B15E2B] text-[#1C1B17] font-bold text-xs transition-all bg-white"
                                >
                                    <Phone className="w-3.5 h-3.5 text-[#B15E2B]" />
                                    <span>Call Sales: +974 7060 5494</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 4. PRODUCT CATEGORIES OVERVIEW GRID (From Brief Section 7) ═══════ */}
            <section className="py-10 bg-white border-t border-[#E5E0D8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B15E2B] block mb-1">
                                PRODUCT CATEGORIES
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1C1B17] tracking-tight">
                                Comprehensive Product Range
                            </h2>
                        </div>
                        <div className="mt-2 md:mt-0">
                            <Link to="/categories" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B15E2B] hover:underline">
                                View All Categories <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CATEGORIES_BRIEF.map((cat, idx) => (
                            <div key={cat.title} className="bg-[#F6F4EE] rounded-2xl border border-[#E5E0D8] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                                <div className="h-44 bg-slate-200 overflow-hidden relative border-b border-[#E5E0D8]">
                                    <img
                                        src={cat.img}
                                        alt={cat.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                                    <div>
                                        <h3 className="text-lg font-serif font-bold text-[#1C1B17] group-hover:text-[#B15E2B] transition-colors">
                                            {cat.title}
                                        </h3>
                                        <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">
                                            {cat.desc}
                                        </p>
                                    </div>

                                    <div className="pt-2 border-t border-[#E5E0D8]">
                                        <Link
                                            to={`/products?category=${cat.categoryQuery}`}
                                            className="inline-flex items-center justify-between w-full text-xs font-bold text-[#1C1B17] group-hover:text-[#B15E2B] transition-colors"
                                        >
                                            <span>Explore {cat.title}</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 5. OWN BRANDS & DISTRIBUTED PARTNERS MARQUEE ═══════════════════ */}
            <section className="py-10 bg-[#F6F4EE] border-t border-[#E5E0D8] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B15E2B] block mb-1">OWN BRANDS & DISTRIBUTED PARTNERS</span>
                            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1B17]">Trusted Manufacturers & Trademarks</h2>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 hidden sm:inline-block">Hover to pause</span>
                    </div>
                </div>

                {/* Marquee Slider Container */}
                <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-16 before:bg-gradient-to-r before:from-[#F6F4EE] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-16 after:bg-gradient-to-l after:from-[#F6F4EE] after:to-transparent after:z-10">
                    
                    <div className="animate-marquee flex items-center gap-4 py-2">
                        {brandCarouselList.map((item, idx) => {
                            const isDynamic = !!item._id;
                            const brandName = isDynamic ? item.name : item.name;
                            const logoUrl = isDynamic && item.logo ? getImageUrl(item.logo) : null;
                            const badgeTag = isDynamic ? (item.badgeTag || 'OWN BRAND') : (item.tag || 'BRAND');
                            const targetBrand = brandName.replace('®', '');

                            return (
                                <Link
                                    key={`${item._id || item.name}-${idx}`}
                                    to={`/products?brand=${encodeURIComponent(targetBrand)}`}
                                    className="p-4 rounded-2xl bg-white border border-[#E5E0D8] hover:border-[#1C1B17] transition-all flex items-center gap-3 shrink-0 shadow-xs hover:shadow-md group min-w-[200px] h-20"
                                >
                                    {logoUrl ? (
                                        <img
                                            src={logoUrl}
                                            alt={brandName}
                                            className="h-9 w-auto max-w-[100px] object-contain group-hover:scale-105 transition-transform"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.style.display = 'none';
                                                if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                                            }}
                                        />
                                    ) : null}

                                    <div className={`${logoUrl ? 'hidden' : 'block'}`}>
                                        <p className="text-sm font-serif font-bold text-[#1C1B17] tracking-tight">
                                            {brandName}
                                        </p>
                                        <span className="text-[9px] font-bold text-[#B15E2B] uppercase tracking-wider block mt-0.5">
                                            {badgeTag}
                                        </span>
                                    </div>

                                    {logoUrl && (
                                        <div className="overflow-hidden">
                                            <p className="text-xs font-serif font-bold text-[#1C1B17] line-clamp-1">
                                                {brandName}
                                            </p>
                                            <span className="text-[9px] font-bold text-[#B15E2B] uppercase tracking-wider block">
                                                {badgeTag}
                                            </span>
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                </div>

                {/* Distributed Brands Bar */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-[#D5CFCE] mt-6 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-3">
                    <span className="font-bold uppercase tracking-wider text-[#1C1B17] text-[10px]">Distributed Brands:</span>
                    {DISTRIBUTED_BRANDS.map((pb) => (
                        <Link
                            key={pb}
                            to={`/products?brand=${encodeURIComponent(pb)}`}
                            className="font-medium text-slate-700 hover:text-[#B15E2B] transition-colors"
                        >
                            {pb}
                        </Link>
                    ))}
                </div>
            </section>

            {/* ══ 6. SHOWROOMS & WAREHOUSE LOCATION MAP (Brief Requirement) ═══════ */}
            <section className="py-10 bg-white border-t border-[#E5E0D8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-6 space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B15E2B]">
                                CENTRAL WAREHOUSE & SHOWROOM QATAR
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1C1B17]">
                                Visit Our Central Supply Facility in Doha
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                                Conveniently located in Industrial Area Street 5, our warehouse and showroom stock over 10,000+ building material SKUs available for immediate contractor pickup or fleet delivery.
                            </p>

                            <div className="space-y-3 pt-2">
                                <div className="p-3.5 rounded-xl bg-[#F6F4EE] border border-[#E5E0D8] flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-[#B15E2B] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase">Address</p>
                                        <p className="text-xs font-bold text-[#1C1B17]">Al Kassarat Street, Industrial Area, Street 5</p>
                                        <p className="text-[11px] text-slate-600">P.O. Box 31221, Doha, State of Qatar</p>
                                    </div>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#F6F4EE] border border-[#E5E0D8] flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-[#B15E2B] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase">Direct Phone Lines</p>
                                        <p className="text-xs font-bold text-[#1C1B17]">+974 7060 5494 / +974 7408 0005</p>
                                        <p className="text-[11px] text-slate-600">jazatrading@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B15E2B] hover:bg-[#8E4920] text-white font-bold text-xs transition-all shadow-sm"
                                >
                                    <span>Contact & Showroom Directions</span>
                                    <ArrowRight className="w-4 h-4 text-white" />
                                </Link>
                            </div>
                        </div>

                        {/* Visual Map Representation Frame */}
                        <div className="lg:col-span-6 bg-[#ECE8E0] rounded-3xl p-6 text-[#1C1B17] space-y-4 border border-[#E5E0D8] shadow-md relative overflow-hidden">
                            <div className="flex items-center justify-between border-b border-[#D5CFCE] pb-3">
                                <div>
                                    <h3 className="font-serif font-bold text-lg text-[#1C1B17]">Doha Central Warehouse</h3>
                                    <p className="text-[10px] text-slate-600 font-medium">Street 5, Industrial Area, Qatar</p>
                                </div>
                                <span className="text-xs font-bold text-[#B15E2B] flex items-center gap-1.5 uppercase tracking-wider">
                                    <span className="w-2 h-2 rounded-full bg-[#B15E2B] animate-pulse" />
                                    Open for Pickup
                                </span>
                            </div>

                            <div className="h-52 rounded-2xl overflow-hidden relative border border-[#D5CFCE] shadow-xs">
                                <iframe
                                    title="Doha Central Warehouse Location"
                                    src="https://maps.google.com/maps?q=Street%205%2C%20Industrial%20Area%2C%20Doha%2C%20Qatar&t=&z=14&ie=UTF8&iwloc=&output=embed"
                                    className="w-full h-full border-0"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>

                            <div className="flex items-center justify-between text-xs pt-1 font-medium">
                                <span className="text-slate-700 text-[11px]">Working Hours: Sat - Thu (7:00 AM - 7:00 PM)</span>
                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[#B15E2B] hover:underline font-bold text-xs inline-flex items-center gap-1"
                                >
                                    Google Maps <ArrowRight className="w-3.5 h-3.5 text-[#B15E2B]" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;