import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowRight, ChevronRight, Shield, Award, Zap, Headphones, CheckCircle, Star, Package, Clock, Truck, ChevronLeft, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from '../components/ProductCard';
import { SkeletonCard, SkeletonCategory } from '../components/Skeletons';
import QuickPreviewModal from '../components/QuickPreviewModal';

// Hardcoding local backend url for dev to bypass proxy issues
const API_URL = 'http://localhost:5000';

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.07 } } };

const features = [
    { icon: Shield, title: 'Safety Certified', desc: 'ISO & ESMA certified products', color: 'text-slate-500' },
    { icon: Truck, title: 'UAE-Wide Delivery', desc: 'All major emirates covered', color: 'text-blue-500' },
    { icon: Zap, title: 'Instant Enquiry', desc: 'Quick quotes via WhatsApp', color: 'text-emerald-500' },
    { icon: Headphones, title: '24/7 Support', desc: 'Expert technical guidance', color: 'text-purple-500' },
];

const FALLBACK_BANNERS = [
    { label: 'INDUSTRIAL DEAL', title: 'Premium Welding Machines', subtitle: 'Industry-grade equipment for professionals', buttonText: 'Shop Now', buttonLink: '/products', bgGradient: 'from-[#0F172A] to-[#1E3A5F]', accentColor: '#007AFF', image: '' },
    { label: 'NEW ARRIVALS', title: 'Safety Gear Collection', subtitle: 'Protect your crew with certified safety equipment', buttonText: 'Explore', buttonLink: '/products', bgGradient: 'from-[#1a1a2e] to-[#16213e]', accentColor: '#22C55E', image: '' },
    { label: 'TOP RATED', title: 'Electrodes & Consumables', subtitle: 'Trusted by 2,000+ welding professionals', buttonText: 'View Range', buttonLink: '/products', bgGradient: 'from-[#2D1B69] to-[#1a0a3e]', accentColor: '#A78BFA', image: '' },
];

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [catLoading, setCatLoading] = useState(true);
    const [prodLoading, setProdLoading] = useState(true);
    const [banners, setBanners] = useState([]);
    const [bannerLoading, setBannerLoading] = useState(true);
    const [bannerIndex, setBannerIndex] = useState(0);
    const [previewProduct, setPreviewProduct] = useState(null);

    useEffect(() => {
        // Updated axios calls to use proxy
        axios.get(`${API_URL}/api/categories`)
            .then(({ data }) => setCategories(data))
            .finally(() => setCatLoading(false));

        axios.get(`${API_URL}/api/products`)
            .then(({ data }) => setProducts(data))
            .finally(() => setProdLoading(false));

        axios.get(`${API_URL}/api/banners`)
            .then(({ data }) => setBanners(data.length > 0 ? data : FALLBACK_BANNERS))
            .catch(() => setBanners(FALLBACK_BANNERS))
            .finally(() => setBannerLoading(false));
    }, []);

    // Auto-rotate hero banner
    useEffect(() => {
        if (banners.length === 0) return;
        const t = setInterval(() => setBannerIndex(i => (i + 1) % banners.length), 5000);
        return () => clearInterval(t);
    }, [banners.length]);

    const activeBanner = banners[bannerIndex] || FALLBACK_BANNERS[0];
    const featuredProducts = products.slice(0, 8);
    const newArrivals = products.slice(0, 4);

    // Extract "All Products" pseudo-category to use its image, and remove it from standard list
    const allProductsCategory = categories.find(c => c.name.toLowerCase() === 'all products');
    const displayCategories = categories.filter(c => c.name.toLowerCase() !== 'all products');
    const allProductsImage = allProductsCategory?.image || "https://images.unsplash.com/photo-1534398079543-7ae6d016b8bf?q=80&w=800&auto=format&fit=crop";

    // Map API banner fields to display fields
    const banner = {
        label: activeBanner.label || '',
        title: activeBanner.title || '',
        sub: activeBanner.subtitle || '',
        btn: activeBanner.buttonText || 'Shop Now',
        link: activeBanner.buttonLink || '/products',
        color: activeBanner.bgGradient || 'from-[#0F172A] to-[#1E3A5F]',
        accent: activeBanner.accentColor || '#007AFF',
        image: activeBanner.image || '',
    };

    return (
        <div className="flex flex-col bg-[#F5F5F7]">

            {/* ══ HERO BANNER (Udemandme-style Sliding) ════════ */}
            <div className="px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4">
                <section className="relative overflow-hidden w-full h-[320px] sm:h-[420px] bg-black rounded-3xl shadow-xl">
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={bannerIndex}
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.6 }}
                            className={`absolute inset-0 w-full h-full bg-gradient-to-r ${banner.color} flex items-center`}
                        >
                            {banner.image && (
                                <div className="absolute inset-0 z-0">
                                    <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                                </div>
                            )}

                            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full py-10 sm:py-16 relative z-10">
                                <div className="max-w-lg">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest border mb-4 sm:mb-5 backdrop-blur-sm"
                                        style={{ color: banner.accent, borderColor: `${banner.accent}50`, background: `${banner.accent}20` }}>
                                        <span className="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]" style={{ background: banner.accent }} />
                                        {banner.label}
                                    </span>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-3 sm:mb-4 drop-shadow-md">{banner.title}</h1>
                                    <p className="text-slate-100 text-sm sm:text-lg mb-6 sm:mb-8 max-w-md drop-shadow">{banner.sub}</p>
                                    <Link to={banner.link}
                                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 bg-white/10 backdrop-blur-xl border border-white/30 text-white hover:bg-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]">
                                        {banner.btn} <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Slide indicators */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {banners.map((_, i) => (
                            <button key={i} onClick={() => setBannerIndex(i)}
                                className="h-1.5 rounded-full transition-all duration-300"
                                style={{ width: i === bannerIndex ? '28px' : '8px', background: i === bannerIndex ? banner.accent : 'rgba(255,255,255,0.4)' }}
                            />
                        ))}
                    </div>

                    {/* Arrow nav */}
                    <button onClick={() => setBannerIndex(i => (i - 1 + banners.length) % banners.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/25 backdrop-blur rounded-full flex items-center justify-center text-white transition-all z-20">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => setBannerIndex(i => (i + 1) % banners.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/25 backdrop-blur rounded-full flex items-center justify-center text-white transition-all z-20">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </section>
            </div>



            {/* ══ CATEGORY GRID — Full-width immersive ═══════════════ */}
            <section className="py-10 bg-[#F5F5F7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Browse</span>
                            <h2 className="text-2xl font-black text-[#0F172A]">Shop by Category</h2>
                        </div>
                        <Link to="/products" className="text-sm font-bold text-slate-500 hover:underline flex items-center gap-1">
                            View all <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {catLoading ? (
                        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4 lg:grid lg:grid-cols-5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="min-w-[75vw] sm:min-w-[45vw] lg:min-w-0 snap-center h-48 rounded-2xl shimmer shrink-0 lg:shrink" />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
                            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-5 pb-6 lg:grid lg:grid-cols-5 -mx-4 px-4 lg:mx-0 lg:px-0"
                        >
                            {/* "All Products" card */}
                            <motion.div variants={fadeUp} className="min-w-[75vw] sm:min-w-[40vw] lg:min-w-0 snap-center shrink-0 lg:shrink">
                                <Link to="/products" className="group relative flex flex-col justify-end overflow-hidden h-48 sm:h-52 card card-hover">
                                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                        <img src={allProductsImage} alt="All Products Catalog" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/90 via-[#1D1D1F]/40 to-transparent" />
                                    </div>
                                    <div className="relative p-5 z-10 w-full backdrop-blur-sm">
                                        <p className="text-white font-black text-lg leading-tight">All Products</p>
                                        <p className="text-[#D2D2D7] text-xs font-semibold mt-1 flex items-center gap-1 group-hover:text-white transition-colors">Complete Catalog <ArrowRight className="w-3 h-3" /></p>
                                    </div>
                                </Link>
                            </motion.div>

                            {displayCategories.map((cat) => (
                                <motion.div key={cat._id} variants={fadeUp} className="min-w-[75vw] sm:min-w-[40vw] lg:min-w-0 snap-center shrink-0 lg:shrink">
                                    <Link
                                        to={`/products?category=${cat._id}`}
                                        className="group relative flex flex-col justify-end overflow-hidden h-48 sm:h-52 card card-hover"
                                    >
                                        {/* Big image filling card */}
                                        <div className="absolute inset-0 flex items-center justify-center p-6 z-0">
                                            {cat.image ? (
                                                <img
                                                    src={cat.image}
                                                    alt={cat.name}
                                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
                                                />
                                            ) : (
                                                <span className="text-7xl group-hover:scale-110 transition-transform duration-300">🔧</span>
                                            )}
                                        </div>
                                        {/* Name bar at bottom with glass */}
                                        <div className="relative p-4 bg-white/60 backdrop-blur-lg border-t border-white/40 z-10">
                                            <p className="text-[#1D1D1F] font-bold text-sm leading-tight group-hover:text-[#007AFF] transition-colors">{cat.name}</p>
                                            <p className="text-[#86868B] text-xs font-medium mt-0.5">Shop now →</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* ══ FEATURED PRODUCTS (Amazon "Deals" style) ══════════ */}
            <section className="py-10 bg-[#F5F5F7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <span className="section-label text-xs">Top Picks</span>
                            <h2 className="text-2xl font-black text-[#0F172A] -mt-1">Featured Products</h2>
                        </div>
                        <Link to="/products" className="hidden sm:flex items-center gap-1 text-sm font-bold text-slate-500 hover:underline">
                            See all <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {prodLoading ? (
                        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-6">
                            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="min-w-[70vw] sm:min-w-[40vw] lg:min-w-[280px] snap-start shrink-0"><SkeletonCard /></div>)}
                        </div>
                    ) : (
                        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="pb-8">
                            <Swiper
                                modules={[Autoplay, Navigation]}
                                spaceBetween={20}
                                slidesPerView={1.2}
                                navigation
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                breakpoints={{
                                    640: { slidesPerView: 2.2 },
                                    1024: { slidesPerView: 3.5 },
                                    1280: { slidesPerView: 4.5 }
                                }}
                                className="!pb-6 !px-2"
                            >
                                {featuredProducts.map(p => (
                                    <SwiperSlide key={p._id} className="h-auto">
                                        <motion.div variants={fadeUp} className="h-full">
                                            <ProductCard product={p} onQuickView={() => setPreviewProduct(p)} />
                                        </motion.div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </motion.div>
                    )}

                    <div className="text-center mt-8">
                        <Link to="/products" className="btn-dark !px-8 !py-3.5 !rounded-full">
                            View All Products <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ══ PROMO BAND (Mid-page Flipkart-style Banner) ═══════ */}
            <section className="py-4 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="card !rounded-[24px] overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 relative bg-gradient-to-b from-[#F5F5F7]/90 to-[#FFFFFF]/90">
                        <div className="text-[#1D1D1F] max-w-xl text-center md:text-left z-10">
                            <span className="inline-flex items-center gap-1.5 text-[#007AFF] text-xs font-bold uppercase tracking-widest mb-2">
                                <Zap className="w-3.5 h-3.5" /> Special Assistance
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-2">Need Expert Advice?</h2>
                            <p className="text-[#86868B] text-sm sm:text-base">Talk to our welding specialists — get a custom recommendation for your exact requirements within the hour.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto z-10">
                            <a href="https://wa.me/919061627236" target="_blank" rel="noopener noreferrer"
                                className="btn-outline !rounded-xl px-6 py-3.5 text-sm font-bold flex items-center justify-center gap-2">
                                <img src="/whatsapp.png" alt="WhatsApp" className="w-auto h-6 object-contain drop-shadow-sm" /> WhatsApp Now
                            </a>
                            <Link to="/contact" className="btn-outline !rounded-xl">
                                Request Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ NEW ARRIVALS Row ══════════════════════════════════ */}
            {newArrivals.length > 0 && (
                <section className="py-10 bg-white border-t border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <span className="section-label text-xs">Just Added</span>
                                <h2 className="text-2xl font-black text-[#0F172A] -mt-1">New Arrivals</h2>
                            </div>
                            <Link to="/products" className="text-sm font-bold text-slate-500 hover:underline flex items-center gap-1">See all <ChevronRight className="w-4 h-4" /></Link>
                        </div>
                        {prodLoading ? (
                            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-6">
                                {Array.from({ length: 4 }).map((_, i) => <div key={i} className="min-w-[70vw] sm:min-w-[40vw] lg:min-w-[280px] snap-start shrink-0"><SkeletonCard /></div>)}
                            </div>
                        ) : (
                            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="pb-8">
                                <Swiper
                                    modules={[Autoplay, Navigation]}
                                    spaceBetween={20}
                                    slidesPerView={1.2}
                                    navigation
                                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                                    breakpoints={{
                                        640: { slidesPerView: 2.2 },
                                        1024: { slidesPerView: 3.5 },
                                        1280: { slidesPerView: 4.5 }
                                    }}
                                    className="!pb-6 !px-2"
                                >
                                    {newArrivals.map(p => (
                                        <SwiperSlide key={p._id} className="h-auto">
                                            <motion.div variants={fadeUp} className="h-full">
                                                <ProductCard product={p} onQuickView={() => setPreviewProduct(p)} />
                                            </motion.div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </motion.div>
                        )}
                    </div>
                </section>
            )}

            {/* ══ WHY HEXAWELD (Feature cards) ══════════════════════ */}
            <section className="py-12 bg-[#F5F5F7] border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <span className="section-label text-xs">Our Promise</span>
                        <h2 className="text-2xl font-black text-[#1D1D1F]">Why Choose HexaWeld</h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { icon: Shield, title: 'ISO Certified', desc: 'Every product certified for industrial use', color: 'text-slate-500' },
                            { icon: Award, title: 'Verified Brands', desc: 'Only top-tier manufacturer partnerships', color: 'text-blue-500' },
                            { icon: Truck, title: 'Fast Delivery', desc: 'UAE-wide shipping to all emirates', color: 'text-emerald-500' },
                            { icon: Headphones, title: 'Tech Support', desc: 'Dedicated post-purchase assistance', color: 'text-purple-500' },
                        ].map(({ icon: Icon, title, desc, color }) => (
                            <div key={title} className="card card-hover p-6">
                                <Icon className={`w-7 h-7 ${color} mb-3`} />
                                <h3 className="font-bold text-[#1D1D1F] mb-1">{title}</h3>
                                <p className="text-[#86868B] text-xs leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ CTA FOOTER BANNER ══════════════════════════════════ */}
            <section className="py-16 bg-[#0F172A]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <p className="text-blue-500 text-xs font-black uppercase tracking-[0.2em] mb-3">Bulk Orders Welcome</p>
                        <h2 className="text-4xl font-black text-white mb-4">Need a Custom Industrial Solution?</h2>
                        <p className="text-slate-400 text-lg mb-8">Bulk orders, specialised equipment, or technical consultation — our team responds within the hour.</p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#007AFF] text-white font-black hover:bg-blue-500 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-slate-500/30">
                                Contact Us <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white hover:bg-white/10 font-bold rounded-full transition-all">
                                Browse Catalogue
                            </Link>
                        </div>
                    </motion.div>
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