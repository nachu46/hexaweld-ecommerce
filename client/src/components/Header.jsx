import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ShoppingBag, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import JtLogo from './JtLogo';

const NAV_LINKS = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Categories', path: '/categories' },
    { label: 'Brands', path: '/brands' },
    { label: 'Certificates', path: '/certificates' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user } = useAuth();
    const { cartCount, setIsCartOpen } = useCart();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setIsOpen(false); }, [location.pathname]);

    const renderLink = (link) => {
        const isActive = location.pathname === link.path;
        return (
            <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 text-[13px] font-medium whitespace-nowrap transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-[#111111] after:transition-all ${
                    isActive ? 'text-[#111111] after:w-full' : 'text-neutral-600 hover:text-[#111111] after:w-0 hover:after:w-full'
                }`}
            >
                {link.label}
            </Link>
        );
    };

    return (
        <header className="w-full z-50 sticky top-0 font-sans">
            {/* Contact strip */}
            <div className={`bg-[#111111] text-white text-xs transition-all duration-200 overflow-hidden ${scrolled ? 'max-h-0' : 'max-h-12'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-5">
                        <a href="tel:+97470605494" className="flex items-center gap-1.5 text-neutral-300 hover:text-white">
                            <Phone className="w-3.5 h-3.5" /> +974 7060 5494
                        </a>
                        <a href="mailto:jazatrading@gmail.com" className="hidden sm:flex items-center gap-1.5 text-neutral-300 hover:text-white">
                            <Mail className="w-3.5 h-3.5" /> jazatrading@gmail.com
                        </a>
                    </div>
                    <div className="hidden md:flex items-center gap-1.5 text-neutral-300">
                        <MapPin className="w-3.5 h-3.5" /> Street 5, Industrial Area, Doha
                    </div>
                </div>
            </div>

            {/* Main bar */}
            <div className={`w-full bg-white border-b border-[#E5E5E5] transition-all duration-200 ${scrolled ? 'py-2' : 'py-3'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4">

                    {/* Left: menu button (mobile/tablet) or first half of the links (desktop) */}
                    <div className="flex items-center justify-start">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 -ml-2 text-[#111111]"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
                            {NAV_LINKS.slice(0, 4).map(renderLink)}
                        </nav>
                    </div>

                    {/* Centre: logo */}
                    <Link to="/" className="flex items-center justify-center">
                        <JtLogo className="h-11 sm:h-12" />
                    </Link>

                    {/* Right: second half of the links (desktop) + cart */}
                    <div className="flex items-center justify-end gap-5 xl:gap-7">
                        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
                            {NAV_LINKS.slice(4).map(renderLink)}
                        </nav>
                        <div className="flex items-center gap-1 -mr-2">
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2 text-[#111111]"
                                title="Enquiry Cart"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-[#111111] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {user && user.isAdmin && (
                                <Link to="/admin/dashboard" className="p-2 text-[#111111]" title="Admin">
                                    <User className="w-5 h-5" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.25 }}
                            className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-50 flex flex-col"
                        >
                            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E5E5]">
                                <JtLogo className="h-10" />
                                <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 text-[#111111]" aria-label="Close menu">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <nav className="flex flex-col flex-1 overflow-y-auto">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`px-5 py-3.5 text-sm border-b border-[#F0F0F0] ${
                                            location.pathname === link.path ? 'font-semibold text-[#111111] bg-[#F5F5F5]' : 'text-neutral-700'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            <div className="px-5 py-5 bg-[#111111] text-white text-xs space-y-2">
                                <a href="tel:+97470605494" className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> +974 7060 5494</a>
                                <a href="mailto:jazatrading@gmail.com" className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> jazatrading@gmail.com</a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
