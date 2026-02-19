import { useState } from 'react';
import { Eye, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const WHATSAPP_NUMBER = '919061627236';
const SITE_URL = window.location.origin;

const WaIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0">
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
        // Track enquiry click (fire and forget)
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="group card card-hover flex flex-col overflow-hidden cursor-pointer"
        >
            {/* Image zone */}
            <div className="relative overflow-hidden bg-[#F8FAFC]" style={{ height: '200px' }}>
                <img
                    src={imageSrc}
                    alt={product.name}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                />

                {/* Category badge */}
                {product.category?.name && (
                    <span className="absolute top-2.5 left-2.5 badge-orange">
                        {product.category.name}
                    </span>
                )}

                {/* Enquiry Only badge */}
                {product.enquiryOnly && (
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                        Enquire
                    </span>
                )}

                {/* Quick View overlay */}
                {onQuickView && (
                    <button
                        onClick={(e) => { e.preventDefault(); onQuickView(product); }}
                        className="absolute inset-0 bg-[#1E293B]/0 group-hover:bg-[#1E293B]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        title="Quick View"
                    >
                        <span className="flex items-center gap-2 bg-white text-[#1E293B] text-xs font-semibold px-3 py-2 rounded-full shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <Eye className="w-3.5 h-3.5" />
                            Quick View
                        </span>
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-[#0F172A] font-semibold text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-[#F97316] transition-colors duration-200">
                        {product.name}
                    </h3>
                </Link>

                {/* Price or contact-for-price */}
                {showPrice ? (
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-[#F97316] font-bold text-sm">₹{product.price.toLocaleString()}</span>
                        {hasDiscount && (
                            <span className="text-[#94A3B8] line-through text-xs">₹{product.comparePrice.toLocaleString()}</span>
                        )}
                    </div>
                ) : (
                    <p className="text-xs text-blue-600 font-semibold mb-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        Contact for Price
                    </p>
                )}

                {/* Tags preview */}
                {product.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                        {product.tags.slice(0, 3).map(t => (
                            <span key={t} className="inline-flex items-center gap-0.5 text-[10px] bg-orange-50 border border-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full">
                                <Tag className="w-2 h-2" />{t}
                            </span>
                        ))}
                    </div>
                )}

                {/* Features preview */}
                {product.features?.length > 0 && (
                    <p className="text-[#64748B] text-xs line-clamp-1 mb-2">
                        ✓ {product.features[0]}
                    </p>
                )}

                {/* Variants */}
                {product.variants?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {product.variants.slice(0, 3).map((v, i) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded border border-slate-200">
                                {v.value}
                            </span>
                        ))}
                        {product.variants.length > 3 && (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-400 text-[10px] rounded border border-slate-200">
                                +{product.variants.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* WhatsApp CTA */}
                <button
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-md mt-auto"
                >
                    <WaIcon />
                    Enquire on WhatsApp
                </button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
