import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, User, ShoppingBag, Phone, Mail, FileText, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import JtLogo from './JtLogo';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user } = useAuth();
    const { cartCount, setIsCartOpen } = useCart();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setIsOpen(false); }, [location.pathname]);

    return (
        <header className="w-full z-50 sticky top-0 shadow-xs font-sans">
            {/* Main Header Bar */}
            <div className={`w-full bg-[#F6F4EE] border-b border-[#E5E0D8] transition-all duration-300 ${scrolled ? 'py-3 shadow-sm' : 'py-4'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
                    
                    {/* Mobile Menu Button (Left on Mobile) */}
                    <div className="flex items-center md:hidden w-10">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-[#1C1B17] hover:bg-[#EAE6DF] rounded-xl transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Logo - Centered on Mobile, Left on Desktop */}
                    <Link to="/" className="flex items-center justify-center md:justify-start flex-1 md:flex-none">
                        <JtLogo className="h-12 sm:h-12 md:h-12" dark={false} />
                    </Link>

                    {/* Nav Links Center (Desktop) */}
                    <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                        {[
                            { label: 'Home', path: '/' },
                            { label: 'About Us', path: '/about' },
                            { label: 'Products', path: '/products' },
                            { label: 'Categories', path: '/categories' },
                            { label: 'Brands', path: '/brands' },
                            { label: 'Certificates', path: '/certificates' },
                            { label: 'Services', path: '/services' },
                            { label: 'Contact', path: '/contact' },
                        ].map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-xs font-bold tracking-wide transition-colors ${
                                        isActive ? 'text-[#B15E2B] font-extrabold' : 'text-[#1C1B17] hover:text-[#B15E2B]'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Action Icons */}
                    <div className="flex items-center justify-end gap-1.5 sm:gap-3 w-10 md:w-auto">
                        
                        {/* Cart Trigger */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2.5 text-[#1C1B17] hover:text-[#B15E2B] hover:bg-[#EAE6DF] rounded-full transition-colors"
                            title="Shopping Cart"
                        >
                            <ShoppingBag className="w-5 h-5 text-[#1C1B17]" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 bg-[#B15E2B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Admin Portal Shortcut (Hidden for public visitors) */}
                        {user && user.isAdmin && (
                            <Link
                                to="/admin/dashboard"
                                className="p-2.5 text-[#B15E2B] hover:bg-[#EAE6DF] rounded-full transition-colors"
                                title="Admin Portal Dashboard"
                            >
                                <User className="w-5 h-5 text-[#B15E2B]" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-[#1C1B17]/50 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-[#F6F4EE] z-50 flex flex-col pt-6 pb-8 px-6 shadow-2xl border-l border-[#E5E0D8]"
                        >
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E0D8]">
                                <Link to="/" onClick={() => setIsOpen(false)}>
                                    <JtLogo className="h-10" dark={false} />
                                </Link>
                                <button onClick={() => setIsOpen(false)} className="p-2 bg-[#EAE6DF] rounded-full text-[#1C1B17]">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
                                {[
                                    { label: 'Home', path: '/' },
                                    { label: 'About Jaza Trading', path: '/about' },
                                    { label: 'Products Catalog', path: '/products' },
                                    { label: 'Product Categories', path: '/categories' },
                                    { label: 'Our Brands', path: '/brands' },
                                    { label: 'Certificates & Accreditation', path: '/certificates' },
                                    { label: 'Services', path: '/services' },
                                    { label: 'Contact & RFQ', path: '/contact' },
                                ].map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="text-xs font-bold text-[#1C1B17] py-2.5 border-b border-[#E5E0D8] hover:text-[#B15E2B] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
