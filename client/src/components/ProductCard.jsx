import { useState } from 'react';
import { Eye, Tag, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const WHATSAPP_NUMBER = '919061627236';
const SITE_URL = window.location.origin;

const WaIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
        <path d="M12.004 2.003C6.477 2.003 2 6.476 2 12c0 1.77.456 3.497 1.321 5.02L2 22l5.124-1.303C8.611 21.571 10.291 22 12.004 22c5.527 0 10.004-4.477 10.004-10.003S17.531 2.003 12.004 2.003z" />
    </svg>
);

const ProductCard = ({ product, onQuickView }) => {
    const [imgError, setImgError] = useState(false);

    const handleWhatsApp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const productUrl = `${SITE_URL}/product/${product._id}`;
        const skuPart = product.SKU ? ` (SKU: ${product.SKU})` : '';
        const msg = encodeURIComponent(
            `Hello Hexaweld, I am interested in this product: *${product.name}*${skuPart}\n${productUrl}`
        );
        axios.post('/api/enquiries', {
            productId: product._id,
            productName: product.name,
            SKU: product.SKU || '',
            productUrl,
            source: 'whatsapp',
        }).catch(() => { });
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    };

    const imageSrc = imgError
        ? 'https://placehold.co/400x280/f1f5f9/94a3b8?text=No+Image'
        : product.image || product.images?.[0] || 'https://placehold.co/400x280/f1f5f9/94a3b8?text=No+Image';

    const showPrice = !product.enquiryOnly && product.price > 0;
    const hasDiscount = showPrice && product.comparePrice > 0 && product.comparePrice > product.price;
    const discountPct = hasDiscount ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col overflow-hidden card card-hover !p-0"
        >
            {/* Image zone */}
            <div className="relative overflow-hidden bg-white/40" style={{ height: '220px' }}>
                <img
                    src={imageSrc}
                    alt={product.name}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-110"
                />

                {/* Badges bar */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                    {product.category?.name && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black bg-white/60 backdrop-blur-md text-[#1D1D1F] border border-white/40 shadow-sm uppercase tracking-wide">
                            {product.category.name}
                        </span>
                    )}
                    {hasDiscount && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black bg-[#007AFF] text-white ml-auto shadow-sm">
                            -{discountPct}%
                        </span>
                    )}
                    {product.enquiryOnly && !hasDiscount && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black bg-[#007AFF]/10 text-[#007AFF] backdrop-blur-md border border-[#007AFF]/20 ml-auto">
                            Enquire Only
                        </span>
                    )}
                </div>

                {/* Quick View overlay */}
                {onQuickView && (
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(product); }}
                        className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        title="Quick View"
                    >
                        <div className="bg-white/60 backdrop-blur-md text-[#1D1D1F] text-xs font-bold px-5 py-2 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center gap-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-300 border border-white/40">
                            <Eye className="w-3.5 h-3.5" />
                            Quick View
                        </div>
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1 gap-2">
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-[#1D1D1F] font-bold text-sm leading-snug line-clamp-2 group-hover:text-[#007AFF] transition-colors duration-200">
                        {product.name}
                    </h3>
                </Link>

                {product.SKU && (
                    <p className="text-[10px] text-slate-400 font-medium tracking-wide">SKU: {product.SKU}</p>
                )}

                {/* Price */}
                {showPrice ? (
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg text-[#007AFF] font-black">₹{product.price.toLocaleString()}</span>
                        {hasDiscount && (
                            <span className="text-[#86868B] line-through text-xs">₹{product.comparePrice.toLocaleString()}</span>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <p className="text-xs text-emerald-700 font-bold">Price on Request</p>
                    </div>
                )}

                {/* First feature */}
                {product.features?.length > 0 && (
                    <p className="text-[#86868B] text-xs flex items-start gap-1.5">
                        <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{product.features[0]}</span>
                    </p>
                )}

                {/* Variants */}
                {product.variants?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {product.variants.slice(0, 3).map((v, i) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-md border border-slate-200">
                                {v.value}
                            </span>
                        ))}
                        {product.variants.length > 3 && (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-400 text-[10px] rounded-md border border-slate-200">
                                +{product.variants.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-2 mt-auto pt-2">
                    <button
                        onClick={handleWhatsApp}
                        className="flex-1 btn-outline !py-2.5 !px-3 !text-xs !rounded-xl flex items-center justify-center gap-1.5"
                    >
                        <div className="text-[#25D366]"><WaIcon /></div> <span className="text-[#1D1D1F]">WhatsApp</span>
                    </button>
                    <Link
                        to={`/product/${product._id}`}
                        className="flex-1 btn-outline !py-2.5 !px-3 !text-xs !rounded-xl flex items-center justify-center gap-1"
                    >
                        View <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
