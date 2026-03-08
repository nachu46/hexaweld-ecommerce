import { useState } from 'react';
import { Eye, Tag, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getImageUrl } from '../utils/getImageUrl';

const WHATSAPP_NUMBER = '919061627236';
const SITE_URL = window.location.origin;



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
        : getImageUrl(product.image || product.images?.[0]) || 'https://placehold.co/400x280/f1f5f9/94a3b8?text=No+Image';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col h-full bg-white rounded-[24px] shadow-sm hover:shadow-xl transition-shadow duration-300 relative p-4"
        >
            {/* Top Badges */}
            <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-10 pointer-events-none">
                {product.category?.name && (
                    <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm flex items-center justify-center max-w-[60%]">
                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest truncate">
                            {product.category.name}
                        </span>
                    </div>
                )}
                {/* We always show Enquire Only for this styling, or conditionally if you prefer. We'll show it if enquiryOnly is true or price is 0 */}
                {(product.enquiryOnly || !product.price) && (
                    <div className="bg-blue-100/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-blue-200/50 shadow-sm flex items-center justify-center shrink-0 ml-auto">
                        <span className="text-[10px] font-bold text-blue-600">
                            Enquire Only
                        </span>
                    </div>
                )}
            </div>

            {/* Image Zone */}
            <Link to={`/product/${product._id}`} className="relative h-[220px] w-full flex flex-col items-center justify-center rounded-2xl mb-4 overflow-hidden">
                <img
                    src={imageSrc}
                    alt={product.name}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />

                {/* Quick View overlay */}
                {onQuickView && (
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(product); }}
                        className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        title="Quick View"
                    >
                        <div className="bg-white/90 backdrop-blur-md text-[#1D1D1F] text-xs font-bold px-5 py-2 rounded-full shadow-lg flex items-center gap-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <Eye className="w-3.5 h-3.5" />
                            Quick View
                        </div>
                    </button>
                )}
            </Link>

            {/* Content Zone */}
            <div className="flex flex-col flex-1 text-left">
                {/* Product Title */}
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-gray-900 font-bold text-sm leading-snug line-clamp-2 hover:text-blue-600 transition-colors duration-200 mb-2">
                        {product.name}
                    </h3>
                </Link>

                {/* Price on Request Indicator */}
                <div className="flex items-center gap-1.5 mb-4 mt-auto">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                    <span className="text-xs font-bold text-[#047857]">Price on Request</span>
                </div>

                {/* Bottom Buttons */}
                <div className="flex items-center gap-2 pt-1">
                    <button
                        onClick={handleWhatsApp}
                        className="flex-1 py-2.5 rounded-[12px] border border-[#a2e9c1] hover:bg-[#ecfdf5] transition-colors flex items-center justify-center group/btn"
                        title="Enquire on WhatsApp"
                    >
                        {/* Using explicit green icon as requested and shown in screenshot */}
                        <img src="/whatsapp.png" alt="WhatsApp" className="h-5 w-auto object-contain group-hover/btn:scale-110 transition-transform" />
                    </button>
                    <Link
                        to={`/product/${product._id}`}
                        className="flex-1 py-2 rounded-[12px] border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 text-xs font-bold text-gray-800"
                    >
                        View <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
