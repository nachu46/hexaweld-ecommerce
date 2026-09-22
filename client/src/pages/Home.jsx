import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    ArrowRight, ChevronRight, Shield, Award,
    Package, Clock, Truck, MapPin, Phone, Mail,
    Send, Building2, Sparkles, CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import QuickPreviewModal from '../components/QuickPreviewModal';

const API_URL = import.meta.env.VITE_API_URL || '';

// Section 2: Hero Banners (Compact Layout)
const HERO_BANNERS = [
    {
        label: 'DIVISION OF SANA GROUP',
        title: 'Serving Qatar Since 2009 in Building Materials & Tools',
        subtitle: 'Quality wholesale supply, competitive distributor pricing, and dependable service across Qatar.',
        buttonText: 'Explore Categories',
        buttonLink: '/products',
        bgGradient: 'from-slate-100 via-white to-slate-50',
        badge: 'SERVING QATAR SINCE 2009',
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80'
    },
    {
        label: 'PROPRIETARY BRANDS',
        title: 'Tork®, Eurex®, Next® & Mark Safety Pro®',
        subtitle: 'Electricals, euro-lock cylinders, precision hand tools, and CE-certified PPE safety gear.',
        buttonText: 'View All Products',
        buttonLink: '/products',
        bgGradient: 'from-white via-slate-50 to-slate-100',
        badge: 'REGISTERED TRADEMARKS',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
    },
    {
        label: 'HEAVY MACHINERY',
        title: 'EDON® & TENZO® Power Machineries',
        subtitle: 'Inverter ARC welding machines, air compressors, power generators, chainsaws, and heavy angle grinders.',
        buttonText: 'Request Wholesale Quote',
        buttonLink: '/contact',
        bgGradient: 'from-slate-50 via-white to-slate-100',
        badge: 'POWER TOOLS & MACHINERY',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    }
];

// Section 4: Statistics
const STATS = [
    { value: '2009', label: 'Serving Qatar Since', sub: 'Established 2009 in Qatar' },
    { value: '6', label: 'Product Categories', sub: 'Building Materials & Tools' },
    { value: '15+', label: 'Brands We Supply', sub: 'Proprietary & Partner Brands' },
    { value: '100%', label: 'Quality Committed', sub: 'Reliable Wholesale Supply' }
];

// Brands Carousel List with Custom Logo Styling
const SLIDING_BRANDS = [
    { name: 'Tork®', cat: 'Electricals & Tools', tag: 'REGISTERED', style: 'bg-red-50 text-red-700 border-red-200' },
    { name: 'Eurex®', cat: 'Lock Cylinder & Handles', tag: 'REGISTERED', style: 'bg-blue-50 text-blue-700 border-blue-200' },
    { name: 'Next®', cat: 'Hand Tools & Painting', tag: 'PRO SERIES', style: 'bg-slate-900 text-white border-slate-800' },
    { name: 'Mark Safety Pro®', cat: 'Safety Boots & PPE', tag: 'REGISTERED', style: 'bg-amber-50 text-amber-800 border-amber-200' },
    { name: 'Clexo®', cat: 'Sanitary Wares', tag: 'REGISTERED', style: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { name: 'EDON®', cat: 'Welders & Compressors', tag: 'MACHINERY', style: 'bg-rose-50 text-rose-800 border-rose-200' },
    { name: 'TENZO®', cat: 'Angle Grinders & Drills', tag: 'REGISTERED', style: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
    { name: 'Makita®', cat: 'Industrial Power Tools', tag: 'GLOBAL', style: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
    { name: 'Jotun®', cat: 'Paints & Coatings', tag: 'GLOBAL', style: 'bg-teal-50 text-teal-800 border-teal-200' },
    { name: 'Vini-Tape®', cat: 'PVC Electrical Tape', tag: 'JAPAN GRADE', style: 'bg-purple-50 text-purple-800 border-purple-200' },
    { name: 'National Paints', cat: 'Decorative Paints', tag: 'PARTNER', style: 'bg-slate-100 text-slate-800 border-slate-300' },
    { name: 'Oryx Paints', cat: 'Architectural Coatings', tag: 'PARTNER', style: 'bg-slate-100 text-slate-800 border-slate-300' },
    { name: 'Tenby', cat: 'Electrical Fittings', tag: 'PARTNER', style: 'bg-slate-100 text-slate-800 border-slate-300' },
    { name: 'Total Tools', cat: 'One-Stop Tools', tag: 'PARTNER', style: 'bg-slate-100 text-slate-800 border-slate-300' },
    { name: 'EBM', cat: 'Paints & Chemicals', tag: 'PARTNER', style: 'bg-slate-100 text-slate-800 border-slate-300' }
];


// Section 9: Core Values
const CORE_VALUES = [
    { icon: Shield, title: 'Quality Assurance', desc: 'Committed to delivering quality products tested for durability and industrial performance.' },
    { icon: Clock, title: 'Reliable Supply', desc: 'Dependable service and prompt wholesale delivery across all Qatar industrial areas.' },
    { icon: Award, title: 'Competitive Value', desc: 'Providing the right products at the right value for contractors and commercial buyers.' },
    { icon: Building2, title: 'Lasting Partnerships', desc: 'Building long-term relationships with customers, suppliers, and business partners.' }
];

// Registered Trademarks (PDF Page 5)
const TRADEMARKS = [
    { name: 'Tork®', detail: 'Electricals, Power Tools & Accessories' },
    { name: 'Clexo®', detail: 'Sanitary Wares & Faucets' },
    { name: 'Eurex®', detail: 'Lock Cylinder, Door Handles & Lock Body' },
    { name: 'Mark Safety Pro®', detail: 'Safety Shoes & Safety Products' },
    { name: 'TENZO®', detail: 'Power Tools & Machineries' }
];

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [catLoading, setCatLoading] = useState(true);
    const [bannerIndex, setBannerIndex] = useState(0);
    const [previewProduct, setPreviewProduct] = useState(null);

    // Form State
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [formLoading, setFormLoading] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        axios.get(`${API_URL}/api/categories`)
            .then(({ data }) => setCategories(data))
            .catch(() => setCategories([]))
            .finally(() => setCatLoading(false));

        axios.get(`${API_URL}/api/products`)
            .then(({ data }) => setProducts(data))
            .catch(() => setProducts([]));
    }, []);

    // Auto rotate hero slider
    useEffect(() => {
        const timer = setInterval(() => {
            setBannerIndex((prev) => (prev + 1) % HERO_BANNERS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormLoading(true);
        try {
            await axios.post(`${API_URL}/api/enquiries`, {
                customerName: form.name,
                customerEmail: form.email,
                customerPhone: form.phone,
                message: `Subject: ${form.subject || 'Homepage RFQ'}\n\n${form.message}`,
                source: 'homepage_rfq_form',
            });
            setFormSuccess(true);
            setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (err) {
            setFormError('Could not send message automatically. Please connect via WhatsApp directly.');
        } finally {
            setFormLoading(false);
        }
    };

    const activeBanner = HERO_BANNERS[bannerIndex];

    return (
        <div className="flex flex-col bg-[#F8FAFC] text-[#0F172A]">

            {/* ══ 2. MAIN BANNER / HERO SLIDER (Compact Height & Spacing) ════════ */}
            <section className="px-4 sm:px-6 lg:px-8 pt-2 pb-4">
                <div className="max-w-7xl mx-auto relative overflow-hidden rounded-2xl shadow-sm border border-slate-200 h-[320px] sm:h-[400px] bg-white">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={bannerIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className={`absolute inset-0 bg-gradient-to-r ${activeBanner.bgGradient} flex items-center`}
                        >
                            {activeBanner.image && (
                                <img
                                    src={activeBanner.image}
                                    alt={activeBanner.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-15"
                                />
                            )}

                            <div className="relative z-10 max-w-3xl px-6 sm:px-10">
                                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider mb-2 shadow-sm">
                                    <Sparkles className="w-3 h-3" />
                                    {activeBanner.label}
                                </span>
                                <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] leading-tight mb-2">
                                    {activeBanner.title}
                                </h1>
                                <p className="text-slate-600 text-xs sm:text-base mb-5 leading-relaxed max-w-xl font-medium">
                                    {activeBanner.subtitle}
                                </p>
                                <div className="flex flex-wrap gap-3 items-center">
                                    <Link
                                        to={activeBanner.buttonLink}
                                        className="px-6 py-2.5 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                                    >
                                        {activeBanner.buttonText} <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <a
                                        href="https://wa.me/97470605494"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-100 text-[#0F172A] font-bold text-xs sm:text-sm border border-slate-300 transition-all shadow-sm"
                                    >
                                        WhatsApp Quote (+974 70605494)
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="absolute bottom-4 right-5 z-20 flex gap-1.5">
                        {HERO_BANNERS.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setBannerIndex(idx)}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === bannerIndex ? 'bg-[#0F172A] w-6' : 'bg-slate-300'}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 3. COMPANY INTRODUCTION (Tighter Spacing) ═══════════════════ */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        <motion.div initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                            <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-white p-2">
                                <img
                                    src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80"
                                    alt="Welcome to Jaza Trading Qatar"
                                    className="w-full h-64 object-cover rounded-xl"
                                />
                                <div className="absolute top-4 right-4 bg-[#0F172A] text-white font-black px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider shadow-sm">
                                    ESTABLISHED IN QATAR IN 2009
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="space-y-3">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Serving Qatar Since 2009</span>
                            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] leading-tight">
                                Welcome to <span className="text-[#0F172A] underline decoration-slate-300 underline-offset-4">Jaza Trading W.L.L</span>
                            </h2>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Established in Qatar in <strong>2009</strong>, <strong>Jaza Trading W.L.L</strong> (Division Of Sana Group) is a leading building materials wholesaler committed to delivering quality products at competitive prices.
                            </p>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Over the years, we have built a strong reputation for reliability, quality, competitive pricing, and excellent customer relationships. We understand our customers’ needs and provide the right products at the right value.
                            </p>
                            <div className="pt-1">
                                <Link to="/about" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0F172A] text-white font-bold text-xs hover:bg-slate-800 transition-all">
                                    Read Full Company Profile <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══ 4. COMPANY STATISTICS (Compact Grid & Padding) ═══════════════ */}
            <section className="py-6 bg-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-4">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Our Business at a Glance</span>
                        <h2 className="text-xl font-black text-[#0F172A]">Wholesale Supply & Performance</h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {STATS.map((s) => (
                            <div key={s.label} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-sm">
                                <div className="text-3xl font-black text-[#0F172A] mb-0.5">{s.value}</div>
                                <div className="font-bold text-[#0F172A] text-xs mb-0.5">{s.label}</div>
                                <div className="text-[11px] text-slate-500">{s.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 5. PRODUCT CATEGORIES (Compact Grid) ═════════════════════════ */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Catalog Categories</span>
                            <h2 className="text-2xl font-black text-[#0F172A]">Explore Our Products</h2>
                        </div>
                        <Link to="/products" className="text-xs font-bold text-slate-900 hover:text-slate-600 flex items-center gap-1">
                            View Full Catalog <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {catLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-36 bg-slate-200 animate-pulse rounded-xl" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categories.map((cat) => {
                                const count = products.filter(p => p.category?._id === cat._id).length;
                                return (
                                    <Link
                                        key={cat._id}
                                        to={`/products?category=${cat._id}`}
                                        className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 bg-white flex flex-col"
                                    >
                                        <div className="h-40 overflow-hidden relative bg-slate-100">
                                            <img
                                                src={cat.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'}
                                                alt={cat.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                                            <div className="absolute top-2.5 right-2.5 bg-white text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                                                {count} {count === 1 ? 'item' : 'items'}
                                            </div>
                                            <div className="absolute bottom-3 left-3 right-3">
                                                <h3 className="text-base font-black text-white group-hover:text-slate-200 transition-colors">
                                                    {cat.name}
                                                </h3>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* ══ 6. BRAND LOGOS & CONTINUOUS SLIDING CAROUSEL (Logo Bank) ══ */}
            <section className="py-8 bg-white border-y border-slate-200 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Official Distributorship & Partners</span>
                        <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] mt-0.5">Brands We Supply</h2>
                        <p className="text-slate-500 text-xs mt-1">Explore our range of 15+ global and proprietary brands available for wholesale order</p>
                    </div>

                    {/* Continuous Logo Bank Slider */}
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={14}
                        slidesPerView={2}
                        loop={true}
                        autoplay={{
                            delay: 2200,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            500: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 5 },
                        }}
                        className="!py-2 mb-6"
                    >
                        {SLIDING_BRANDS.map((b) => (
                            <SwiperSlide key={b.name}>
                                <Link
                                    to={`/products?brand=${encodeURIComponent(b.name.replace('®', ''))}`}
                                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-900 flex flex-col items-center justify-between text-center transition-all duration-200 h-28 shadow-sm group hover:-translate-y-0.5"
                                >
                                    <div className="w-full flex justify-end">
                                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase border ${b.style}`}>
                                            {b.tag}
                                        </span>
                                    </div>
                                    <div className="my-auto">
                                        <span className="font-black text-slate-900 text-base sm:text-lg tracking-tight group-hover:scale-105 transition-transform inline-block">
                                            {b.name}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-semibold text-slate-500 truncate max-w-full">
                                        {b.cat}
                                    </span>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* ══ 7. SHOPPING PROMOTION (Compact Banner) ═════════════════════ */}
            <section className="py-8 bg-white border-b border-slate-200 text-[#0F172A] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
                    <div className="max-w-2xl">
                        <span className="px-3 py-0.5 bg-slate-100 text-slate-800 text-[10px] font-black rounded-full uppercase tracking-wider mb-2 inline-block border border-slate-200">
                            Wholesale & Project Supply
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] mb-1.5">Quality Products. Great Value.</h2>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                            Providing quality building materials, power tools, lock systems, and safety equipment at competitive wholesale prices to contractors across Qatar.
                        </p>
                    </div>
                    <div className="shrink-0 flex flex-col sm:flex-row gap-2.5">
                        <Link to="/contact" className="px-6 py-3 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white font-black text-xs transition-all shadow-sm text-center">
                            Request Wholesale Quote
                        </Link>
                        <a href="https://wa.me/97470605494" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-bold text-xs border border-slate-300 transition-all text-center">
                            WhatsApp (+974 70605494)
                        </a>
                    </div>
                </div>
            </section>

            {/* ══ 8. SHOWROOM FEATURE (Compact Spacing) ═══════════════════════ */}
            <section className="py-8 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Our Qatar Facility</span>
                            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] mt-0.5 mb-3">
                                Explore Our Showroom & Facility
                            </h2>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                                Visit our facility located in Qatar's Industrial Area to explore building materials, power tools, safety products, and door hardware ready for wholesale supply.
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                                    <MapPin className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-xs text-[#0F172A]">Address Location</h4>
                                        <p className="text-[11px] text-slate-500">Al kassarat Street, Industrial Area, street 5, Qatar</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                                    <Phone className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-xs text-[#0F172A]">Direct Contact Numbers</h4>
                                        <p className="text-[11px] text-slate-500">+974 70605494, +974 74080005</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-white p-2">
                            <img
                                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80"
                                alt="Jaza Trading Facility Qatar"
                                className="w-full h-64 object-cover rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 9. COMPANY CORE VALUES & ACCREDITED TRADEMARKS (Compact Grid) ══ */}
            <section className="py-8 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Our Commitment</span>
                        <h2 className="text-2xl font-black text-[#0F172A] mt-0.5">Our Core Values</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {CORE_VALUES.map((cv) => (
                            <div key={cv.title} className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                                <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center mb-3">
                                    <cv.icon className="w-5 h-5 text-slate-900" />
                                </div>
                                <h3 className="font-bold text-[#0F172A] text-sm mb-1">{cv.title}</h3>
                                <p className="text-slate-500 text-[11px] leading-relaxed">{cv.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Registered Trademarks Showcase (Matching Screenshot media_1790071076722.png) */}
                    <div className="p-8 rounded-2xl bg-[#0F172A] text-white border border-slate-800 shadow-xl">
                        <div className="text-center mb-6">
                            <span className="text-[11px] font-black text-[#007AFF] uppercase tracking-widest bg-[#007AFF]/10 px-3 py-1 rounded-full inline-block border border-[#007AFF]/20">
                                INTELLECTUAL PROPERTY PROTECTION
                            </span>
                            <h3 className="text-2xl font-black mt-2.5 text-white">Registered Brand Trademarks</h3>
                            <p className="text-slate-400 text-xs mt-1">Official trademark accreditations under Intellectual Property Rights Protection Department</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                            {TRADEMARKS.map((tm) => (
                                <div key={tm.name} className="p-4 rounded-xl bg-[#182342] border border-slate-700/60 text-center shadow-md hover:border-[#007AFF] transition-all">
                                    <div className="text-lg font-black text-white">{tm.name}</div>
                                    <div className="text-[11px] text-slate-400 mt-1 leading-snug">{tm.detail}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 12. DIRECT ENQUIRY FORM (Matching Screenshot media_1790072155794.png) ════════════════ */}
            <section className="py-10 bg-[#0B132B] border-t border-slate-800">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <span className="text-[11px] font-black text-[#007AFF] uppercase tracking-widest bg-[#007AFF]/10 px-3 py-1 rounded-full inline-block border border-[#007AFF]/20">
                            FAST WHOLESALE QUOTES
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black mt-2.5 text-white">Let’s Discuss Your Requirements</h2>
                        <p className="text-slate-400 text-xs sm:text-sm mt-1">Send us your building material requirements or product list for a competitive quote.</p>
                    </div>

                    <div className="bg-[#101935] p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
                        {formSuccess ? (
                            <div className="text-center py-6">
                                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                                <h3 className="text-lg font-bold text-white mb-1">Enquiry Submitted Successfully!</h3>
                                <p className="text-slate-300 text-xs mb-4">Our Qatar sales team will contact you promptly.</p>
                                <button onClick={() => setFormSuccess(false)} className="px-5 py-2.5 rounded-full bg-[#007AFF] hover:bg-[#0066CC] text-white text-xs font-bold transition-all shadow-sm">
                                    Submit Another Request
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1.5">Name *</label>
                                        <input required name="name" type="text" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg bg-[#1A243F] border border-slate-700 text-white placeholder-slate-400 text-xs focus:border-[#007AFF] outline-none transition-all" placeholder="Your Name" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1.5">Email</label>
                                        <input name="email" type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg bg-[#1A243F] border border-slate-700 text-white placeholder-slate-400 text-xs focus:border-[#007AFF] outline-none transition-all" placeholder="email@company.com" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1.5">Phone *</label>
                                        <input required name="phone" type="tel" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg bg-[#1A243F] border border-slate-700 text-white placeholder-slate-400 text-xs focus:border-[#007AFF] outline-none transition-all" placeholder="+974 70605494" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1.5">Subject</label>
                                        <input name="subject" type="text" value={form.subject} onChange={(e) => setForm(p => ({ ...p, subject: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg bg-[#1A243F] border border-slate-700 text-white placeholder-slate-400 text-xs focus:border-[#007AFF] outline-none transition-all" placeholder="Building Materials Order" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1.5">Message / Requirements *</label>
                                    <textarea required rows={4} value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg bg-[#1A243F] border border-slate-700 text-white placeholder-slate-400 text-xs resize-none focus:border-[#007AFF] outline-none transition-all" placeholder="Enter product names, quantities, or specific project requirements..." />
                                </div>

                                {formError && <p className="text-red-300 text-xs bg-red-950/40 p-3 rounded-lg border border-red-800/60">{formError}</p>}

                                <button
                                    type="submit"
                                    disabled={formLoading}
                                    className="w-full py-3 rounded-xl bg-[#007AFF] hover:bg-[#0066CC] text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
                                >
                                    {formLoading ? 'Submitting...' : <><Send className="w-4 h-4 text-white" /> Send Request for Quote</>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Quick Preview Modal */}
            <QuickPreviewModal
                isOpen={!!previewProduct}
                onClose={() => setPreviewProduct(null)}
                product={previewProduct}
            />

        </div>
    );
};

export default Home;