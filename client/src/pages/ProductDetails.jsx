import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { MessageCircle, ArrowLeft, Check, Tag, ChevronRight, Star, Package, Send, Phone, Mail, User, X, ArrowRight, ShoppingBag, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageGallery from '../components/ImageGallery';
import { SkeletonDetail } from '../components/Skeletons';
import ProductCard from '../components/ProductCard';

const WHATSAPP_NUMBER = '97470605494';
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
        <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
            <div className="text-center p-8 bg-white border border-[#E5E5E5] rounded max-w-md shadow-sm">
                <p className="text-2xl font-bold text-[#111111] mb-2">Product Not Found</p>
                <p className="text-xs text-neutral-600 mb-6">The product you are looking for may have been updated or moved to another category.</p>
                <Link to="/products" className="inline-block px-6 py-2.5 rounded bg-[#111111] text-white text-xs font-bold hover:bg-[#333333] transition-colors">
                    ← Back to Products Catalog
                </Link>
            </div>
        </div>
    );

    const productUrl = `${SITE_URL}/product/${product._id}`;
    const skuPart = product.SKU ? ` (SKU: ${product.SKU})` : '';
    const variantText = selectedVariant ? ` — ${selectedVariant.name}: ${selectedVariant.value}` : '';

    const handleWhatsApp = () => {
        const message = encodeURIComponent(
            `Hello Jaza Trading W.L.L, I am interested in this product: *${product.name}*${skuPart}${variantText}\n${productUrl}`
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
                <title>{product.seoTitle || product.name} | Jaza Trading W.L.L</title>
                <meta name="description" content={product.seoDescription || product.description} />
                <meta name="keywords" content={product.seoKeywords || (product.tags || []).join(', ')} />
                <meta property="og:title" content={product.seoTitle || product.name} />
                <meta property="og:description" content={product.seoDescription || product.description} />
                {(product.image || product.images?.[0]) && (
                    <meta property="og:image" content={product.image || product.images[0]} />
                )}
            </Helmet>

            <div className="min-h-screen bg-[#F5F5F5] text-[#111111] font-sans">
                {/* Breadcrumb */}
                <div className="bg-white border-b border-[#E5E5E5]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-xs text-neutral-600 overflow-x-auto scrollbar-hide">
                        <Link to="/" className="hover:text-[#111111] transition-colors shrink-0">Home</Link>
                        <ChevronRight className="w-3 h-3 shrink-0" />
                        <Link to="/products" className="hover:text-[#111111] transition-colors shrink-0">Products</Link>
                        {product.category?.name && (
                            <>
                                <ChevronRight className="w-3 h-3 shrink-0" />
                                <span className="shrink-0">{product.category.name}</span>
                            </>
                        )}
                        <ChevronRight className="w-3 h-3 shrink-0" />
                        <span className="text-[#111111] font-bold line-clamp-1">{product.name}</span>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
                    <Link to="/products" className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-[#111111] text-xs font-bold mb-6 transition-colors group">
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
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-[#F5F5F5] text-[#111111] border border-[#E5E5E5] self-start">
                                        <Tag className="w-3 h-3" />{product.category.name}
                                    </span>
                                )}
                                {product.brand && (
                                    <span className="text-xs font-medium text-neutral-600 bg-white border border-[#E5E5E5] px-2.5 py-1 rounded">{product.brand}</span>
                                )}
                                {product.SKU && (
                                    <span className="text-xs font-mono text-neutral-500 bg-white border border-[#E5E5E5] px-2 py-0.5 rounded">SKU: {product.SKU}</span>
                                )}
                            </div>

                            <h1 className="text-2xl lg:text-4xl font-semibold text-[#111111] mb-3 leading-tight">{product.name}</h1>

                            {/* Price / Contact for Price */}
                            {showPrice ? (
                                <div className="flex items-baseline gap-3 mb-4">
                                    <span className="text-2xl font-bold text-[#111111]">QAR {product.price.toLocaleString()}</span>
                                    {hasDiscount && (
                                        <>
                                            <span className="text-base text-neutral-400 line-through">QAR {product.comparePrice.toLocaleString()}</span>
                                            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">{discountPct}% OFF</span>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="inline-flex items-center gap-2 text-sm text-neutral-600">
                                        <MessageCircle className="w-3.5 h-3.5" />
                                        Price on request
                                    </span>
                                </div>
                            )}

                            <div className="h-px bg-[#E5E5E5] mb-4" />
                            <p className="text-neutral-600 text-sm leading-relaxed mb-5">{product.description}</p>

                            {/* Tags */}
                            {product.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    {product.tags.map(t => (
                                        <span key={t} className="inline-flex items-center gap-1 text-[11px] font-medium bg-white border border-[#E5E5E5] text-neutral-700 px-2.5 py-1 rounded">
                                            <Tag className="w-2.5 h-2.5 text-[#111111]" />{t}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Variants */}
                            {product.variants?.length > 0 && (
                                <div className="mb-5">
                                    <p className="text-xs font-bold text-neutral-500 mb-2.5">
                                        {selectedVariant?.name || 'Select Option'}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {product.variants.map((v, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedVariant(v)}
                                                className={`px-4 py-2 rounded text-xs font-bold border transition-all duration-200 ${selectedVariant?.value === v.value
                                                    ? 'border-[#111111] bg-[#111111]/10 text-[#111111]'
                                                    : 'border-[#E5E5E5] bg-white text-neutral-600 hover:border-[#111111]/50 hover:text-[#111111]'
                                                    }`}
                                            >
                                                {v.value}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ── CTA Buttons ── */}
                            <div className="pt-4 border-t border-[#E5E5E5] space-y-3">
                                {/* Primary: WhatsApp */}
                                <button
                                    onClick={handleWhatsApp}
                                    className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-bold rounded transition-all duration-200 shadow-sm group"
                                >
                                    <img src="/whatsapp.png" alt="WhatsApp" className="w-auto h-6 object-contain" />
                                    Enquire on WhatsApp Directly
                                </button>

                                {/* Secondary: Request Quote */}
                                <button
                                    onClick={() => setShowQuoteForm(true)}
                                    className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-white border-2 border-[#111111] text-[#111111] text-sm font-bold rounded transition-all duration-200 hover:bg-[#111111] hover:text-white"
                                >
                                    <Send className="w-4 h-4" />
                                    Request Official Quote (RFQ)
                                </button>

                                <p className="text-xs text-neutral-500 text-center font-medium">
                                    Our Doha commercial team responds within 24 business hours.
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
                                <div className="bg-white rounded-xl border border-[#E5E5E5] p-6">
                                    <h2 className="font-bold text-[#111111] text-xl mb-4 flex items-center gap-2">
                                        Key Features
                                    </h2>
                                    <ul className="space-y-3">
                                        {product.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="w-5 h-5 rounded-full bg-[#111111]/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check className="w-3 h-3 text-[#111111]" />
                                                </span>
                                                <span className="text-neutral-600 text-sm leading-relaxed">{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {specsEntries.length > 0 && (
                                <div className="bg-white rounded-xl border border-[#E5E5E5] p-6">
                                    <h2 className="font-bold text-[#111111] text-xl mb-4 flex items-center gap-2">
                                        Technical Specifications
                                    </h2>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-xs">
                                            <tbody>
                                                {specsEntries.map(([key, val], i) => (
                                                    <tr key={i} className={i % 2 === 0 ? 'bg-[#F5F5F5]/50' : 'bg-white'}>
                                                        <td className="px-3 py-2.5 font-bold text-[#111111] rounded-l-lg w-1/2">{key}</td>
                                                        <td className="px-3 py-2.5 text-neutral-600 rounded-r-lg">{val}</td>
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
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E5E5]">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <h2 className="text-xl font-bold text-[#111111]">You May Also Need</h2>
                                    </div>
                                </div>
                                {product.category?._id && (
                                    <Link
                                        to={`/products?category=${product.category._id}`}
                                        className="hidden sm:flex items-center gap-1 text-xs font-bold text-[#111111] hover:underline"
                                    >
                                        View Full Category <ChevronRight className="w-4 h-4" />
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
                                            className="group flex flex-col bg-white rounded-xl border border-[#E5E5E5] overflow-hidden hover:border-[#111111]/40 hover:-translate-y-0.5 transition-all duration-300"
                                        >
                                            <div className="aspect-square bg-[#F5F5F5]/50 overflow-hidden">
                                                {(rel.image || rel.images?.[0]) ? (
                                                    <img
                                                        src={rel.image || rel.images[0]}
                                                        alt={rel.name}
                                                        className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[#111111]">
                                                        <Wrench className="w-6 h-6 text-[#111111]" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-3 flex flex-col gap-1.5">
                                                <p className="text-xs font-bold text-[#111111] line-clamp-2 leading-snug group-hover:text-[#111111] transition-colors">
                                                    {rel.name}
                                                </p>
                                                {rel.price > 0 && !rel.enquiryOnly ? (
                                                    <p className="text-xs font-bold text-[#111111]">QAR {rel.price.toLocaleString()}</p>
                                                ) : (
                                                    <p className="text-[10px] font-bold text-neutral-500 flex items-center gap-1">
                                                        Price on request
                                                    </p>
                                                )}
                                                <span className="text-[10px] font-bold text-neutral-500 group-hover:text-[#111111] group-hover:underline flex items-center gap-0.5 mt-1">
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
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/60"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 16 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded max-w-md w-full border border-[#E5E5E5] overflow-hidden"
                        >
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5] bg-[#F5F5F5]/50">
                                <div>
                                    <p className="font-bold text-[#111111] text-lg">Request Wholesale Quote (RFQ)</p>
                                    <p className="text-xs text-neutral-500 line-clamp-1">{product.name}</p>
                                </div>
                                <button onClick={() => setShowQuoteForm(false)} className="w-8 h-8 rounded hover:bg-white flex items-center justify-center text-neutral-500 hover:text-[#111111] transition-all">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {quoteStatus === 'sent' ? (
                                <div className="p-10 text-center">
                                    <div className="w-16 h-16 rounded-full bg-[#111111]/10 flex items-center justify-center mx-auto mb-4 border border-[#111111]/20">
                                        <Check className="w-8 h-8 text-[#111111]" />
                                    </div>
                                    <p className="font-bold text-[#111111] text-xl mb-2">Quote Request Received!</p>
                                    <p className="text-neutral-600 text-xs leading-relaxed">Our Doha commercial team will review your quantities and reply with formal quotation pricing within 24 business hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleQuoteSubmit} className="p-6 space-y-4">
                                    <div className="relative">
                                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                        <input
                                            type="text"
                                            placeholder="Your Name *"
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 rounded bg-[#F5F5F5] border border-[#D4D4D4] text-xs text-[#111111] focus:border-[#111111] outline-none"
                                            value={quoteForm.customerName}
                                            onChange={e => setQuoteForm(f => ({ ...f, customerName: e.target.value }))}
                                        />
                                    </div>
                                    <div className="relative">
                                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number (e.g. +974 7060 5494) *"
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 rounded bg-[#F5F5F5] border border-[#D4D4D4] text-xs text-[#111111] focus:border-[#111111] outline-none"
                                            value={quoteForm.customerPhone}
                                            onChange={e => setQuoteForm(f => ({ ...f, customerPhone: e.target.value }))}
                                        />
                                    </div>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                        <input
                                            type="email"
                                            placeholder="Company Email Address"
                                            className="w-full pl-10 pr-4 py-2.5 rounded bg-[#F5F5F5] border border-[#D4D4D4] text-xs text-[#111111] focus:border-[#111111] outline-none"
                                            value={quoteForm.customerEmail}
                                            onChange={e => setQuoteForm(f => ({ ...f, customerEmail: e.target.value }))}
                                        />
                                    </div>
                                    <textarea
                                        placeholder="Requirement Details (quantities, target delivery date, jobsite location...)"
                                        rows={3}
                                        className="w-full px-4 py-2.5 rounded bg-[#F5F5F5] border border-[#D4D4D4] text-xs text-[#111111] focus:border-[#111111] outline-none resize-none"
                                        value={quoteForm.message}
                                        onChange={e => setQuoteForm(f => ({ ...f, message: e.target.value }))}
                                    />

                                    {quoteStatus === 'error' && (
                                        <p className="text-xs text-rose-700 bg-rose-50 border border-rose-200 px-3 py-2 rounded font-medium">
                                            Could not submit quote request. Please connect directly via WhatsApp.
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={quoteStatus === 'sending'}
                                        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#111111] hover:bg-[#333333] text-white text-xs font-bold rounded transition-all duration-200 disabled:opacity-60"
                                    >
                                        <Send className="w-4 h-4" />
                                        {quoteStatus === 'sending' ? 'Submitting...' : 'Send Quote Request'}
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
