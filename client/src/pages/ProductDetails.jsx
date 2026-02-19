import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { MessageCircle, ArrowLeft, Check, Tag, ChevronRight, Star, Zap, Package, Send, Phone, Mail, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageGallery from '../components/ImageGallery';
import { SkeletonDetail } from '../components/Skeletons';

const WHATSAPP_NUMBER = '919061627236';
const SITE_URL = window.location.origin;

const WaIcon = ({ size = 6 }) => (
    <svg viewBox="0 0 24 24" className={`w-${size} h-${size} fill-white`}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
        <path d="M12.004 2.003C6.477 2.003 2 6.476 2 12c0 1.77.456 3.497 1.321 5.02L2 22l5.124-1.303C8.611 21.571 10.291 22 12.004 22c5.527 0 10.004-4.477 10.004-10.003S17.531 2.003 12.004 2.003z" />
    </svg>
);

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState(null);

    // Quote form
    const [showQuoteForm, setShowQuoteForm] = useState(false);
    const [quoteForm, setQuoteForm] = useState({ customerName: '', customerPhone: '', customerEmail: '', message: '' });
    const [quoteStatus, setQuoteStatus] = useState('idle'); // idle | sending | sent | error

    useEffect(() => {
        axios.get(`/api/products/${id}`)
            .then(({ data }) => {
                setProduct(data);
                if (data.variants?.length > 0) setSelectedVariant(data.variants[0]);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <SkeletonDetail />;
    if (!product) return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
            <div className="text-center">
                <p className="text-[#64748B] text-xl mb-4">Product not found</p>
                <Link to="/products" className="text-[#F97316] hover:underline">← Back to Products</Link>
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
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-[#64748B]">
                        <Link to="/" className="hover:text-[#F97316] transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link to="/products" className="hover:text-[#F97316] transition-colors">Products</Link>
                        {product.category?.name && (
                            <>
                                <ChevronRight className="w-3 h-3" />
                                <span>{product.category.name}</span>
                            </>
                        )}
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-[#0F172A] font-medium line-clamp-1">{product.name}</span>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <Link to="/products" className="inline-flex items-center gap-1.5 text-[#64748B] hover:text-[#F97316] text-sm mb-6 transition-colors group">
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
                                    <span className="text-2xl font-bold text-[#F97316]">₹{product.price.toLocaleString()}</span>
                                    {hasDiscount && (
                                        <>
                                            <span className="text-base text-[#94A3B8] line-through">₹{product.comparePrice.toLocaleString()}</span>
                                            <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{discountPct}% OFF</span>
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
                                        <span key={t} className="inline-flex items-center gap-1 text-xs bg-orange-50 border border-orange-200 text-orange-600 px-2.5 py-1 rounded-full">
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
                                                    ? 'border-[#F97316] bg-orange-50 text-[#F97316]'
                                                    : 'border-[#E2E8F0] bg-white text-[#64748B] hover:border-orange-300 hover:text-[#F97316]'
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
                                    className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-white text-base font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-200"
                                >
                                    <WaIcon size={6} />
                                    Enquire on WhatsApp
                                </button>

                                {/* Secondary: Request Quote */}
                                <button
                                    onClick={() => setShowQuoteForm(true)}
                                    className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-white border-2 border-[#F97316] text-[#F97316] text-base font-bold rounded-xl transition-all duration-200 hover:bg-orange-50"
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
                                        <span className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                                            <Zap className="w-4 h-4 text-[#F97316]" />
                                        </span>
                                        Key Features
                                    </h2>
                                    <ul className="space-y-3">
                                        {product.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check className="w-3 h-3 text-green-600" />
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
                                    <table className="w-full text-sm">
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
                            )}
                        </motion.div>
                    )}

                    {/* Related Products */}
                    {product.relatedProducts?.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mt-14"
                        >
                            <h2 className="text-xl font-bold text-[#0F172A] mb-6 flex items-center gap-2">
                                <Star className="w-5 h-5 text-[#F97316]" />
                                Related Products
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                {product.relatedProducts.map((rel) => (
                                    <Link
                                        key={rel._id}
                                        to={`/product/${rel._id}`}
                                        className="group bg-white rounded-xl border border-[#E2E8F0] overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-200"
                                    >
                                        <div className="aspect-square bg-gray-100 overflow-hidden">
                                            {(rel.image || rel.images?.[0]) ? (
                                                <img
                                                    src={rel.image || rel.images[0]}
                                                    alt={rel.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Package className="w-8 h-8 text-gray-300" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-3">
                                            <p className="text-xs font-semibold text-[#0F172A] line-clamp-2 leading-snug group-hover:text-[#F97316] transition-colors">
                                                {rel.name}
                                            </p>
                                            <p className="text-xs text-blue-600 font-semibold mt-1">Enquire</p>
                                        </div>
                                    </Link>
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
                                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                        <Check className="w-8 h-8 text-green-600" />
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
                                        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-60"
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
