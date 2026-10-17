import { useState } from 'react';
import { Eye, Tag, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getImageUrl } from '../utils/getImageUrl';

const WHATSAPP_NUMBER = '97470605494';
const SITE_URL = window.location.origin;



const ProductCard = ({ product, onQuickView }) => {
    const [imgError, setImgError] = useState(false);

    const handleWhatsApp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const productUrl = `${SITE_URL}/product/${product._id}`;
        const skuPart = product.SKU ? ` (SKU: ${product.SKU})` : '';
        const msg = encodeURIComponent(
            `Hello Jaza Trading W.L.L, I am interested in this product: *${product.name}*${skuPart}\n${productUrl}`
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="group flex flex-col h-full bg-white rounded-xl border border-[#E5E5E5] hover:border-[#111111] transition-colors duration-200 relative"
        >
            {/* Image Zone */}
            <Link to={`/product/${product._id}`} className="relative h-40 sm:h-[220px] w-full flex flex-col items-center justify-center bg-[#F7F7F7] overflow-hidden">
                <img
                    src={imageSrc}
                    alt={product.name}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-contain mix-blend-multiply p-3 sm:p-4"
                />

                {/* Quick View overlay */}
                {onQuickView && (
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(product); }}
                        className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        title="Quick View"
                    >
                        <div className="bg-[#111111] text-white text-xs font-medium px-4 py-2 rounded flex items-center gap-2">
                            <Eye className="w-3.5 h-3.5" />
                            Quick View
                        </div>
                    </button>
                )}
            </Link>

            {/* Content Zone */}
            <div className="flex flex-col flex-1 text-left p-3 sm:p-4 border-t border-[#E5E5E5]">
                {/* Product Title */}
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-[#111111] font-medium text-[13px] sm:text-sm leading-snug line-clamp-2 hover:underline mb-2">
                        {product.name}
                    </h3>
                </Link>

                {/* Price on Request Indicator */}
                <div className="flex items-center gap-1.5 mb-3 sm:mb-4 mt-auto">
                    <span className="text-xs text-neutral-500">Price on request</span>
                </div>

                {/* Bottom Buttons */}
                <div className="flex items-center gap-2 pt-1">
                    <button
                        onClick={handleWhatsApp}
                        className="flex-1 py-2.5 rounded border border-[#E5E5E5] hover:border-[#25D366] transition-colors flex items-center justify-center group/btn"
                        title="Enquire on WhatsApp"
                    >
                        <img src="/whatsapp.png" alt="WhatsApp" className="h-5 w-auto object-contain" />
                    </button>
                    <Link
                        to={`/product/${product._id}`}
                        className="flex-1 py-2 rounded bg-[#111111] hover:bg-[#333333] transition-colors flex items-center justify-center gap-1.5 text-xs font-medium text-white"
                    >
                        View <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
