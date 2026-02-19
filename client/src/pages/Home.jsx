import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowRight, ChevronRight, Shield, Award, Zap, Headphones, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { SkeletonCard, SkeletonCategory } from '../components/Skeletons';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

const features = [
    { icon: Shield, title: 'Safety First', desc: 'All products meet ISO & BIS safety certifications', color: 'text-orange-500', bg: 'bg-orange-50 border-orange-200' },
    { icon: Award, title: 'Expert Vetted', desc: 'Tested by industry professionals before listing', color: 'text-blue-500', bg: 'bg-blue-50 border-blue-200' },
    { icon: Zap, title: 'Fast Enquiry', desc: 'Connect directly on WhatsApp — instant response', color: 'text-green-500', bg: 'bg-green-50 border-green-200' },
    { icon: Headphones, title: 'Expert Support', desc: 'Technical guidance from welding specialists', color: 'text-purple-500', bg: 'bg-purple-50 border-purple-200' },
];

const STATS = [
    { value: '500+', label: 'Products' },
    { value: '12+', label: 'Yrs Experience' },
    { value: '2K+', label: 'Happy Clients' },
    { value: '24/7', label: 'Support' },
];

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [catLoading, setCatLoading] = useState(true);
    const [prodLoading, setProdLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/categories')
            .then(({ data }) => setCategories(data))
            .catch(console.error)
            .finally(() => setCatLoading(false));

        axios.get('/api/products')
            .then(({ data }) => setProducts(data.slice(0, 8)))
            .catch(console.error)
            .finally(() => setProdLoading(false));
    }, []);

    return (
        <div className="flex flex-col">

            {/* ══ HERO ══════════════════════════════════════════════ */}
            <section className="bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] border-b border-[#E2E8F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left text */}
                        <motion.div
                            variants={stagger} initial="hidden" animate="show"
                            className="space-y-6"
                        >
                            <motion.div variants={fadeUp}>
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                    Industrial Grade Welding Solutions
                                </span>
                            </motion.div>

                            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-[#0F172A]">
                                Premium Welding
                                <span className="text-gradient-orange block">Equipment</span>
                                for Every Industry
                            </motion.h1>

                            <motion.p variants={fadeUp} className="text-[#64748B] text-lg leading-relaxed max-w-lg">
                                Trusted by 2,000+ professionals. Browse our industrial-grade welding machines, safety gear, and accessories — all backed by expert support.
                            </motion.p>

                            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                                <Link to="/products" className="btn-primary">
                                    Browse Products <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link to="/contact" className="btn-outline">
                                    Get a Quote
                                </Link>
                            </motion.div>

                            {/* Trust icons */}
                            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
                                {['ISO Certified', 'BIS Approved', 'Expert Support'].map((t) => (
                                    <span key={t} className="flex items-center gap-1.5 text-sm text-[#64748B]">
                                        <CheckCircle className="w-4 h-4 text-green-500" /> {t}
                                    </span>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right image card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative card shadow-card-lg rounded-2xl overflow-hidden animate-float">
                                <img
                                    src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                                    alt="Welding Professional"
                                    className="w-full h-80 object-cover"
                                />
                                <div className="p-5 border-t border-[#E2E8F0] bg-white flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-[#0F172A]">Enterprise Grade</p>
                                        <p className="text-[#64748B] text-sm">ISO Certified Equipment</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-orange-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating stat card */}
                            <div className="absolute -bottom-4 -left-6 card shadow-card-lg rounded-xl px-5 py-3 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-[#0F172A] text-sm">2,000+ Clients</p>
                                    <p className="text-[#64748B] text-xs">Across industries</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="grid grid-cols-4 gap-4 mt-14 pt-10 border-t border-[#E2E8F0]"
                    >
                        {STATS.map((s) => (
                            <div key={s.label} className="text-center">
                                <p className="text-2xl font-black text-[#F97316]">{s.value}</p>
                                <p className="text-xs text-[#64748B] mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>


            {/* ══ CATEGORY GRID ═════════════════════════════════════ */}
            <section className="py-14 bg-white border-b border-[#E2E8F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="section-label mb-1">Browse by Category</p>
                            <h2 className="text-2xl font-black text-[#0F172A]">Shop by Product Category</h2>
                        </div>
                        <Link to="/products" className="btn-ghost text-sm">
                            View all <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {catLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {Array.from({ length: 6 }).map((_, i) => <SkeletonCategory key={i} />)}
                        </div>
                    ) : (
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
                        >
                            {categories.map((cat) => (
                                <motion.div key={cat._id} variants={fadeUp}>
                                    <Link
                                        to={`/products?category=${cat._id}`}
                                        className="group card card-hover rounded-xl overflow-hidden flex flex-col items-center p-4 text-center block transition-all duration-300"
                                    >
                                        <div className="w-16 h-16 rounded-xl bg-orange-50 flex items-center justify-center mb-3 group-hover:bg-orange-100 transition-colors">
                                            {cat.image ? (
                                                <img src={cat.image} alt={cat.name} className="w-10 h-10 object-contain" />
                                            ) : (
                                                <span className="text-2xl">🔧</span>
                                            )}
                                        </div>
                                        <p className="text-[#0F172A] font-semibold text-sm leading-tight group-hover:text-[#F97316] transition-colors">
                                            {cat.name}
                                        </p>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>


            {/* ══ FEATURED PRODUCTS ═════════════════════════════════ */}
            <section className="py-14 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="section-label mb-1">Top Picks</p>
                            <h2 className="text-2xl font-black text-[#0F172A]">Featured Products</h2>
                        </div>
                        <Link to="/products" className="btn-ghost text-sm">
                            View all <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {prodLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    ) : (
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                        >
                            {products.map((p) => (
                                <motion.div key={p._id} variants={fadeUp}>
                                    <ProductCard product={p} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>


            {/* ══ FEATURE CARDS ═════════════════════════════════════ */}
            <section className="py-14 bg-white border-t border-[#E2E8F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <p className="section-label mb-1">Why Hexaweld</p>
                        <h2 className="text-2xl font-black text-[#0F172A]">Built for <span className="text-gradient-orange">professionals</span></h2>
                    </div>
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                    >
                        {features.map((f) => (
                            <motion.div
                                key={f.title}
                                variants={fadeUp}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.25 }}
                                className={`card rounded-xl p-6 border flex flex-col gap-3 ${f.bg} hover:shadow-card-lg transition-all duration-300`}
                            >
                                <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm`}>
                                    <f.icon className={`w-5 h-5 ${f.color}`} />
                                </div>
                                <h3 className="text-[#0F172A] font-bold">{f.title}</h3>
                                <p className="text-[#64748B] text-sm leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>


            {/* ══ CTA BANNER ════════════════════════════════════════ */}
            <section className="py-16 bg-[#1E293B]">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="section-label mb-3 text-orange-400">Get Started</p>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                            Need a Custom Solution?
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
                            Bulk orders, specialised equipment, or technical consultation — contact our team today.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to="/contact" className="btn-primary">
                                Contact Us <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/20 text-white hover:bg-white/10 font-semibold rounded-lg transition-all duration-200">
                                Browse Catalogue
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default Home;
