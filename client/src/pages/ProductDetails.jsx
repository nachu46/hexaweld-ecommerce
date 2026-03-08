import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { MessageCircle, ArrowLeft, Check, Tag, ChevronRight, Star, Zap, Package, Send, Phone, Mail, User, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageGallery from '../components/ImageGallery';
import { SkeletonDetail } from '../components/Skeletons';
import ProductCard from '../components/ProductCard';

const WHATSAPP_NUMBER = '919061627236';
const SITE_URL = window.location.origin;



const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    // Quote form
    const [showQuoteForm, setShowQuoteForm] = useState(false);
    const [quoteForm, setQuoteForm] = useState({ customerName: '', customerPhone: '', customerEmail: '', message: '' });
    const [quoteStatus, setQuoteStatus] = useState('idle'); // idle | sending | sent | error

    useEffect(() => {
        setLoading(true);
        setRelatedProducts([]);
        axios.get(`/api/products/${id}`)
            .then(({ data }) => {
                setProduct(data);
                if (data.variants?.length > 0) setSelectedVariant(data.variants[0]);
                // Fetch related products from same category
                if (data.category?._id || data.category) {
                    const catId = data.category?._id || data.category;
                    axios.get('/api/products')
                        .then(({ data: allProducts }) => {
                            const related = allProducts
                                .filter(p => (p.category?._id || p.category) === catId && p._id !== id)
                                .slice(0, 6);
                            setRelatedProducts(related);
                        })
                        .catch(() => { });
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <SkeletonDetail />;
    if (!product) return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
            <div className="text-center">
                <p className="text-[#64748B] text-xl mb-4">Product not found</p>
                <Link to="/products" className="text-[#007AFF] hover:underline">← Back to Products</Link>
            </div>
        </div>
    );

    const productUrl = `${SITE_URL}/product/${product._id}`;
    const skuPart = product.SKU ? ` (SKU: ${product.SKU})` : '';
    const variantText = selectedVariant ? ` — ${selectedVariant.name}: ${selectedVariant.value}` : '';

    const handleWhatsApp = () => {
        const message = encodeURIComponent(
            `Hello Hexaweld, I am interested in this product: *${product.name}*${skuPart}${variantText}\n${productUrl}`
        );
        // Track
        axios.post('/api/enquiries', {
            productId: product._id,
            productName: product.name,
            SKU: product.SKU || '',
            productUrl,
            source: 'whatsapp',
        }).catch(() => { });
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    };

    const handleQuoteSubmit = async (e) => {
        e.preventDefault();
        setQuoteStatus('sending');
        try {
            await axios.post('/api/enquiries', {
                productId: product._id,
                productName: product.name,
                SKU: product.SKU || '',
                productUrl,
                ...quoteForm,
                source: 'form',
            });
            setQuoteStatus('sent');
            setQuoteForm({ customerName: '', customerPhone: '', customerEmail: '', message: '' });
            setTimeout(() => setShowQuoteForm(false), 2500);
        } catch {
            setQuoteStatus('error');
        }
    };

    const showPrice = !product.enquiryOnly && product.price > 0;
    const hasDiscount = showPrice && product.comparePrice > 0 && product.comparePrice > product.price;
    const discountPct = hasDiscount ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : 0;

    const specsEntries = product.specifications && typeof product.specifications === 'object' && !Array.isArray(product.specifications)
        ? Object.entries(product.specifications).filter(([k]) => k)
        : [];

    return (
        <>
            <Helmet>
                <title>{product.seoTitle || product.name} | Hexaweld</title>
                <meta name="description" content={product.seoDescription || product.description} />
                <meta name="keywords" content={product.seoKeywords || (product.tags || []).join(', ')} />
                <meta property="og:title" content={product.seoTitle || product.name} />
                <meta property="og:description" content={product.seoDescription || product.description} />
                {(product.image || product.images?.[0]) && (
                    <meta property="og:image" content={product.image || product.images[0]} />
                )}
            </Helmet>

            <div className="min-h-screen bg-[#F8FAFC]">
                {/* Breadcrumb */}
                <div className="bg-white border-b border-[#E2E8F0]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-xs sm:text-sm text-[#64748B] overflow-x-auto scrollbar-hide">
                        <Link to="/" className="hover:text-[#007AFF] transition-colors shrink-0">Home</Link>
                        <ChevronRight className="w-3 h-3 shrink-0" />
                        <Link to="/products" className="hover:text-[#007AFF] transition-colors shrink-0">Products</Link>
                        {product.category?.name && (
                            <>
                                <ChevronRight className="w-3 h-3 shrink-0" />
                                <span className="shrink-0">{product.category.name}</span>
                            </>
                        )}
                        <ChevronRight className="w-3 h-3 shrink-0" />
                        <span className="text-[#0F172A] font-medium line-clamp-1">{product.name}</span>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
                    <Link to="/products" className="inline-flex items-center gap-1.5 text-[#64748B] hover:text-[#007AFF] text-sm mb-6 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back to Products
                    </Link>

                    {/* Main grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Gallery */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                            <ImageGallery mainImage={product.image} images={product.images || []} />
                        </motion.div>

                        {/* Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="flex flex-col"
                        >
                            {/* Badges row */}
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                                {product.category?.name && (
                                    <span className="inline-flex items-center gap-1.5 badge-orange self-start">
                                        <Tag className="w-3 h-3" />{product.category.name}
                                    </span>
                                )}
                                {product.brand && (
                                    <span className="text-xs text-[#64748B] bg-gray-100 px-2 py-0.5 rounded-full">{product.brand}</span>
                                )}
                                {product.SKU && (
                                    <span className="text-xs font-mono text-[#64748B] bg-gray-100 px-2 py-0.5 rounded">SKU: {product.SKU}</span>
                                )}
                                {product.enquiryOnly && (
                                    <span className="text-xs font-bold bg-blue-600 text-white px-2.5 py-0.5 rounded-full">Enquiry Only</span>
                                )}
                            </div>

                            <h1 className="text-2xl lg:text-3xl font-black text-[#0F172A] mb-3 leading-tight">{product.name}</h1>

                            {/* Price / Contact for Price */}
                            {showPrice ? (
                                <div className="flex items-baseline gap-3 mb-4">
                                    <span className="text-2xl font-bold text-[#007AFF]">₹{product.price.toLocaleString()}</span>
                                    {hasDiscount && (
                                        <>
                                            <span className="text-base text-[#94A3B8] line-through">₹{product.comparePrice.toLocaleString()}</span>
                                            <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{discountPct}% OFF</span>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="inline-flex items-center gap-2 text-sm font-bold bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-xl">
                                        <MessageCircle className="w-4 h-4" />
                                        Contact for Price
                                    </span>
                                </div>
                            )}

                            <div className="divider mb-4" />
                            <p className="text-[#64748B] leading-relaxed mb-5">{product.description}</p>

                            {/* Tags */}
                            {product.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    {product.tags.map(t => (
                                        <span key={t} className="inline-flex items-center gap-1 text-xs bg-slate-50 border border-slate-200 text-blue-700 px-2.5 py-1 rounded-full">
                                            <Tag className="w-2.5 h-2.5" />{t}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Variants */}
                            {product.variants?.length > 0 && (
                                <div className="mb-5">
                                    <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2.5">
                                        {selectedVariant?.name || 'Select Option'}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {product.variants.map((v, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedVariant(v)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-200 ${selectedVariant?.value === v.value
                                                    ? 'border-[#007AFF] bg-slate-50 text-[#007AFF]'
                                                    : 'border-[#E2E8F0] bg-white text-[#64748B] hover:border-slate-300 hover:text-[#007AFF]'
                                                    }`}
                                            >
                                                {v.value}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ── CTA Buttons ── */}
                            <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
                                {/* Primary: WhatsApp */}
                                <button
                                    onClick={handleWhatsApp}
                                    className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-white text-base font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-200"
                                >
                                    <img src="/whatsapp.png" alt="WhatsApp" className="w-auto h-7 object-contain drop-shadow-sm" />
                                    Enquire on WhatsApp
                                </button>

                                {/* Secondary: Request Quote */}
                                <button
                                    onClick={() => setShowQuoteForm(true)}
                                    className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-white border-2 border-[#007AFF] text-[#007AFF] text-base font-bold rounded-xl transition-all duration-200 hover:bg-slate-50"
                                >
                                    <Send className="w-4 h-4" />
                                    Request Quote
                                </button>

                                <p className="text-xs text-[#94A3B8] text-center">
                                    Our team responds within 24 hours.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Features + Specs */}
                    {(product.features?.length > 0 || specsEntries.length > 0) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            {product.features?.length > 0 && (
                                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
                                    <h2 className="font-bold text-[#0F172A] text-lg mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                            <Zap className="w-4 h-4 text-[#007AFF]" />
                                        </span>
                                        Key Features
                                    </h2>
                                    <ul className="space-y-3">
                                        {product.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check className="w-3 h-3 text-emerald-600" />
                                                </span>
                                                <span className="text-[#64748B] text-sm leading-relaxed">{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {specsEntries.length > 0 && (
                                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
                                    <h2 className="font-bold text-[#0F172A] text-lg mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                            <Package className="w-4 h-4 text-blue-500" />
                                        </span>
                                        Specifications
                                    </h2>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-sm">
                                            <tbody>
                                                {specsEntries.map(([key, val], i) => (
                                                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                        <td className="px-3 py-2.5 font-medium text-[#0F172A] rounded-l-lg w-1/2">{key}</td>
                                                        <td className="px-3 py-2.5 text-[#64748B] rounded-r-lg">{val}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* ── You May Also Like ── */}
                    {relatedProducts.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mt-16"
                        >
                            {/* Section header */}
                            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-[#007AFF]/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-1 h-8 bg-[#007AFF] rounded-full" />
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">Based on this product</p>
                                        <h2 className="text-xl font-black text-[#0F172A]">You May Also Like</h2>
                                    </div>
                                </div>
                                {product.category?._id && (
                                    <Link
                                        to={`/products?category=${product.category._id}`}
                                        className="hidden sm:flex items-center gap-1 text-sm font-bold text-slate-500 hover:underline"
                                    >
                                        View category <ChevronRight className="w-4 h-4" />
                                    </Link>
                                )}
                            </div>

                            {/* Product scroll grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                                {relatedProducts.map((rel, i) => (
                                    <motion.div
                                        key={rel._id}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.05 }}
                                    >
                                        <Link
                                            to={`/product/${rel._id}`}
                                            className="group flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:border-slate-200 hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-50/30 overflow-hidden">
                                                {(rel.image || rel.images?.[0]) ? (
                                                    <img
                                                        src={rel.image || rel.images[0]}
                                                        alt={rel.name}
                                                        className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-2xl">
                                                        🔧
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-3 flex flex-col gap-1.5">
                                                <p className="text-xs font-bold text-[#0F172A] line-clamp-2 leading-snug group-hover:text-[#007AFF] transition-colors">
                                                    {rel.name}
                                                </p>
                                                {rel.price > 0 && !rel.enquiryOnly ? (
                                                    <p className="text-sm font-black text-slate-500">₹{rel.price.toLocaleString()}</p>
                                                ) : (
                                                    <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Price on Request
                                                    </p>
                                                )}
                                                <span className="text-[10px] font-bold text-slate-500 group-hover:underline flex items-center gap-0.5">
                                                    View Details <ChevronRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* ── Request Quote Modal ── */}
            <AnimatePresence>
                {showQuoteForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => { if (quoteStatus !== 'sending') setShowQuoteForm(false); }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 16 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-[#E2E8F0]"
                        >
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
                                <div>
                                    <p className="font-bold text-[#0F172A]">Request a Quote</p>
                                    <p className="text-xs text-[#64748B] line-clamp-1">{product.name}</p>
                                </div>
                                <button onClick={() => setShowQuoteForm(false)} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-[#64748B] transition-all">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {quoteStatus === 'sent' ? (
                                <div className="p-10 text-center">
                                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                                        <Check className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <p className="font-bold text-[#0F172A] text-lg mb-2">Quote Request Sent!</p>
                                    <p className="text-[#64748B] text-sm">Our team will contact you within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleQuoteSubmit} className="p-6 space-y-4">
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                                        <input
                                            type="text"
                                            placeholder="Your Name *"
                                            required
                                            className="input pl-10"
                                            value={quoteForm.customerName}
                                            onChange={e => setQuoteForm(f => ({ ...f, customerName: e.target.value }))}
                                        />
                                    </div>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number *"
                                            required
                                            className="input pl-10"
                                            value={quoteForm.customerPhone}
                                            onChange={e => setQuoteForm(f => ({ ...f, customerPhone: e.target.value }))}
                                        />
                                    </div>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            className="input pl-10"
                                            value={quoteForm.customerEmail}
                                            onChange={e => setQuoteForm(f => ({ ...f, customerEmail: e.target.value }))}
                                        />
                                    </div>
                                    <textarea
                                        placeholder="Message (quantity, specifications, delivery location...)"
                                        rows={3}
                                        className="input resize-none"
                                        value={quoteForm.message}
                                        onChange={e => setQuoteForm(f => ({ ...f, message: e.target.value }))}
                                    />

                                    {quoteStatus === 'error' && (
                                        <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                                            Something went wrong. Please try again or use WhatsApp.
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={quoteStatus === 'sending'}
                                        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-60"
                                    >
                                        <Send className="w-4 h-4" />
                                        {quoteStatus === 'sending' ? 'Sending...' : 'Send Request'}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProductDetails;
