import { useEffect } from 'react';
import { X, Check, ArrowRight, ExternalLink, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const WHATSAPP_NUMBER = '919061627236';
const SITE_URL = window.location.origin;



const QuickPreviewModal = ({ product, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = product ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [product]);

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    const handleWhatsApp = () => {
        const productUrl = `${SITE_URL}/product/${product._id}`;
        const skuPart = product.SKU ? ` (SKU: ${product.SKU})` : '';
        const message = encodeURIComponent(
            `Hello Hexaweld, I am interested in this product: *${product.name}*${skuPart}\n${productUrl}`
        );
        axios.post('/api/enquiries', {
            productId: product._id,
            productName: product.name,
            SKU: product.SKU || '',
            productUrl,
            source: 'quick_view',
        }).catch(() => { });
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    };

    const imageSrc = product?.image || product?.images?.[0] || 'https://placehold.co/500x400/f1f5f9/94a3b8?text=No+Image';

    const showPrice = product && !product.enquiryOnly && product.price > 0;
    const hasDiscount = showPrice && product.comparePrice > 0 && product.comparePrice > product.price;
    const discountPct = hasDiscount ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : 0;

    // Specs as object entries
    const specsEntries = product?.specifications && typeof product.specifications === 'object' && !Array.isArray(product.specifications)
        ? Object.entries(product.specifications).filter(([k]) => k).slice(0, 4)
        : [];

    return (
        <AnimatePresence>
            {product && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/50 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 12 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E2E8F0]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
                            <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Quick View</p>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-[#64748B] hover:text-[#0F172A] transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                            {/* Image */}
                            <div className="bg-[#F8FAFC] flex items-center justify-center p-8 border-r border-[#E2E8F0]" style={{ minHeight: '280px' }}>
                                <img
                                    src={imageSrc}
                                    alt={product.name}
                                    className="max-h-52 w-full object-contain"
                                    onError={(e) => { e.target.src = 'https://placehold.co/500x400/f1f5f9/94a3b8?text=No+Image'; }}
                                />
                            </div>

                            {/* Info */}
                            <div className="p-6 flex flex-col">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {product.category?.name && (
                                        <span className="badge-orange self-start">{product.category.name}</span>
                                    )}
                                    {product.SKU && (
                                        <span className="text-[10px] font-mono text-[#64748B] bg-gray-100 px-2 py-0.5 rounded self-start">
                                            {product.SKU}
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-lg font-black text-[#0F172A] mb-2 leading-tight">
                                    {product.name}
                                </h2>

                                {/* Price or contact for price */}
                                {showPrice ? (
                                    <div className="flex items-baseline gap-2 mb-3">
                                        <span className="text-[#007AFF] font-bold text-lg">₹{product.price.toLocaleString()}</span>
                                        {hasDiscount && (
                                            <>
                                                <span className="text-[#94A3B8] line-through text-sm">₹{product.comparePrice.toLocaleString()}</span>
                                                <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">{discountPct}% OFF</span>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                            Contact for Price
                                        </span>
                                    </div>
                                )}

                                <p className="text-[#64748B] text-sm leading-relaxed mb-3 line-clamp-3">
                                    {product.description}
                                </p>

                                {/* Tags */}
                                {product.tags?.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {product.tags.slice(0, 4).map(t => (
                                            <span key={t} className="inline-flex items-center gap-0.5 text-[10px] bg-slate-50 border border-slate-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                                                <Tag className="w-2 h-2" />{t}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Variants */}
                                {product.variants?.length > 0 && (
                                    <div className="mb-3">
                                        <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Options</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {product.variants.map((v, i) => (
                                                <span key={i} className="px-3 py-1 bg-slate-100 text-[#64748B] text-xs font-medium rounded-lg border border-slate-200">
                                                    {v.value}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Specs preview */}
                                {specsEntries.length > 0 && (
                                    <div className="mb-3 border-t border-[#E2E8F0] pt-3">
                                        <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">Specifications</p>
                                        <ul className="space-y-1">
                                            {specsEntries.map(([k, v], i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-[#64748B] text-xs"><span className="font-medium text-[#0F172A]">{k}:</span> {v}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="mt-auto space-y-2 pt-2">
                                    <button
                                        onClick={handleWhatsApp}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-md"
                                    >
                                        <img src="/whatsapp.png" alt="WhatsApp" className="w-auto h-7 object-contain drop-shadow-sm" />
                                    </button>
                                    <Link
                                        to={`/product/${product._id}`}
                                        onClick={onClose}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border-2 border-[#E2E8F0] hover:border-[#007AFF] text-[#64748B] hover:text-[#007AFF] text-sm font-semibold rounded-xl transition-all duration-200"
                                    >
                                        View Full Details <ExternalLink className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default QuickPreviewModal;
