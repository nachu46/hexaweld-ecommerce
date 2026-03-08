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
                        <img src="/whatsapp.png" alt="WhatsApp" className="w-auto h-10 object-contain drop-shadow-md relative z-10" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WhatsAppFloat;
