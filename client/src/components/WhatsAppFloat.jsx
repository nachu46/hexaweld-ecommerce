import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = '919061627236';

const WhatsAppFloat = () => {
    const [visible, setVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        const msg = encodeURIComponent('Hi Hexaweld! I would like to enquire about your products.');
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ scale: 0, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
                >
                    {/* Tooltip */}
                    <AnimatePresence>
                        {showTooltip && (
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="bg-white text-[#1E293B] text-sm font-semibold px-4 py-2 rounded-xl shadow-card-lg border border-[#E2E8F0] whitespace-nowrap"
                            >
                                💬 Chat with us!
                                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-b border-[#E2E8F0] rotate-[-45deg]" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Button */}
                    <button
                        onClick={handleClick}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        aria-label="Chat on WhatsApp"
                    >
                        {/* Ping ring */}
                        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
                        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white relative z-10">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                            <path d="M12.004 2.003C6.477 2.003 2 6.476 2 12c0 1.77.456 3.497 1.321 5.02L2 22l5.124-1.303C8.611 21.571 10.291 22 12.004 22c5.527 0 10.004-4.477 10.004-10.003S17.531 2.003 12.004 2.003z" />
                        </svg>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WhatsAppFloat;
