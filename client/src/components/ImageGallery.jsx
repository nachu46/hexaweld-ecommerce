import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl } from '../utils/getImageUrl';

const ImageGallery = ({ images = [], mainImage = '' }) => {
    const allImages = [mainImage, ...images.filter((img) => img !== mainImage)].filter(Boolean).map(getImageUrl);
    const [current, setCurrent] = useState(0);
    const [zoomed, setZoomed] = useState(false);
    const [lightbox, setLightbox] = useState(false);

    if (allImages.length === 0) {
        return (
            <div className="h-96 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500">
                No images available
            </div>
        );
    }

    const prev = () => { setZoomed(false); setCurrent((c) => (c === 0 ? allImages.length - 1 : c - 1)); };
    const next = () => { setZoomed(false); setCurrent((c) => (c === allImages.length - 1 ? 0 : c + 1)); };

    return (
        <div className="space-y-3">
            {/* Main Image */}
            <div
                className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 cursor-zoom-in"
                style={{ height: '400px' }}
                onClick={() => setLightbox(true)}
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={current}
                        src={allImages[current]}
                        alt={`Product image ${current + 1}`}
                        className="w-full h-full object-contain p-2"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                    />
                </AnimatePresence>

                {allImages.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm text-white rounded-lg hover:bg-black/60 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); next(); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm text-white rounded-lg hover:bg-black/60 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </>
                )}

                <div className="absolute top-3 right-3 p-1.5 bg-black/30 backdrop-blur-sm text-white/60 rounded-lg">
                    <ZoomIn className="w-4 h-4" />
                </div>

                {allImages.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/40 backdrop-blur-sm text-white text-xs rounded-full">
                        {current + 1} / {allImages.length}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {allImages.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${i === current
                                ? 'border-slate-500 opacity-100'
                                : 'border-white/10 opacity-50 hover:opacity-80'
                                }`}
                        >
                            <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}

            {/* Fullscreen Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => { setLightbox(false); setZoomed(false); }}
                    >
                        <button
                            className="absolute top-4 right-4 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                            onClick={() => { setLightbox(false); setZoomed(false); }}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <motion.img
                            key={current}
                            src={allImages[current]}
                            alt="Full size"
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: zoomed ? 1.6 : 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                            className="max-w-full max-h-[85vh] object-contain rounded-xl cursor-zoom-in select-none"
                            onClick={(e) => { e.stopPropagation(); setZoomed(!zoomed); }}
                        />

                        {allImages.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); prev(); }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); next(); }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}

                        <button
                            onClick={(e) => { e.stopPropagation(); setZoomed(!zoomed); }}
                            className="absolute bottom-4 right-4 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                            title={zoomed ? 'Zoom out' : 'Zoom in'}
                        >
                            {zoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                        </button>

                        {/* Counter */}
                        {allImages.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/10 text-white text-sm rounded-full">
                                {current + 1} / {allImages.length}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ImageGallery;
