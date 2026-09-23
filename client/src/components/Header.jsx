import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, User, ShoppingBag, Layers, ShieldCheck } from 'lucide-react';
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
        <header className={`sticky top-0 w-full z-50 bg-white transition-all duration-300 border-b border-slate-200 ${scrolled ? 'py-3 shadow-sm' : 'py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                
                {/* 1. Logo */}
                <Link to="/" className="flex items-center">
                    <JtLogo dark={false} />
                </Link>

                {/* 2. Nav Menu Right Center */}
                <nav className="hidden md:flex items-center gap-7">
                    <Link
                        to="/about"
                        className={`text-xs font-bold tracking-wide transition-colors ${location.pathname === '/about' ? 'text-[#0B132B]' : 'text-slate-600 hover:text-[#0B132B]'}`}
                    >
                        Company
                    </Link>
                    <Link
                        to="/products"
                        className={`text-xs font-bold tracking-wide transition-colors ${location.pathname === '/products' ? 'text-[#0B132B]' : 'text-slate-600 hover:text-[#0B132B]'}`}
                    >
                        Products
                    </Link>
                    <Link
                        to="/categories"
                        className={`text-xs font-bold tracking-wide transition-colors ${location.pathname === '/categories' ? 'text-[#0B132B]' : 'text-slate-600 hover:text-[#0B132B]'}`}
                    >
                        Categories
                    </Link>
                    <Link
                        to="/brands"
                        className={`text-xs font-bold tracking-wide transition-colors ${location.pathname === '/brands' ? 'text-[#0B132B]' : 'text-slate-600 hover:text-[#0B132B]'}`}
                    >
                        Brands
                    </Link>
                    <Link
                        to="/services"
                        className={`text-xs font-bold tracking-wide transition-colors ${location.pathname === '/services' ? 'text-[#0B132B]' : 'text-slate-600 hover:text-[#0B132B]'}`}
                    >
                        Services
                    </Link>
                    <Link
                        to="/contact"
                        className={`text-xs font-bold tracking-wide transition-colors ${location.pathname === '/contact' ? 'text-[#0B132B]' : 'text-slate-600 hover:text-[#0B132B]'}`}
                    >
                        Contact
                    </Link>
                </nav>

                {/* 3. Action Circle Button Far Right */}
                <div className="flex items-center gap-2.5">
                    {/* Cart Trigger */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2.5 text-slate-700 hover:text-black hover:bg-slate-100 rounded-full transition-colors"
                        title="Shopping Cart"
                    >
                        <ShoppingBag className="w-5 h-5 text-slate-800" />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 bg-[#0B132B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* User Account / Profile */}
                    <Link
                        to={user ? (user.isAdmin ? "/admin/dashboard" : "/account") : "/login"}
                        className="p-2.5 text-slate-700 hover:text-black hover:bg-slate-100 rounded-full transition-colors"
                        title={user ? user.name : "Sign In Account"}
                    >
                        <User className="w-5 h-5 text-slate-800" />
                    </Link>

                    {/* Quick Action RFQ */}
                    <Link
                        to="/contact"
                        className="w-10 h-10 rounded-full bg-[#0B132B] hover:bg-slate-800 text-white flex items-center justify-center transition-transform hover:scale-105 shadow-sm"
                        title="Contact & Request Quote"
                    >
                        <ArrowRight className="w-4 h-4 text-white" />
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white z-50 flex flex-col pt-6 pb-8 px-6 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                                <Link to="/" onClick={() => setIsOpen(false)}>
                                    <JtLogo dark={false} />
                                </Link>
                                <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-3 flex-1">
                                <Link to="/" className="text-sm font-bold text-slate-800 py-2">Home</Link>
                                <Link to="/about" className="text-sm font-bold text-slate-800 py-2">Company</Link>
                                <Link to="/products" className="text-sm font-bold text-slate-800 py-2">Products</Link>
                                <Link to="/contact" className="text-sm font-bold text-slate-800 py-2">Contact</Link>
                            </div>

                            <div className="mt-auto">
                                <Link to="/contact" className="w-full py-3 rounded-full bg-[#0B132B] text-white text-center font-bold text-xs flex items-center justify-center gap-2">
                                    Request a Quote <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
