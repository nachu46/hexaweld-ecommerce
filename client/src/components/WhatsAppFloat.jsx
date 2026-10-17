import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = '97470605494';


const WhatsAppFloat = () => {
    const [visible, setVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        const msg = encodeURIComponent('Hi Jaza Trading W.L.L! I would like to enquire about your products.');
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
                >
                    {/* Tooltip */}
                    <AnimatePresence>
                        {showTooltip && (
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="bg-white text-[#262626] text-sm font-semibold px-4 py-2 rounded shadow-card border border-[#E5E5E5] whitespace-nowrap"
                            >
                                WhatsApp Sales

                                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-b border-[#E5E5E5] rotate-[-45deg]" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Button */}
                    <button
                        onClick={handleClick}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] rounded-full flex items-center justify-center text-white transition-colors"
                        aria-label="Chat on WhatsApp"
                    >
                        <img src="/whatsapp.png" alt="WhatsApp" className="w-auto h-10 object-contain relative z-10" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WhatsAppFloat;
