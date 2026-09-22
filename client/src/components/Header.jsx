import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import JtLogo from './JtLogo';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user } = useAuth();
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
                <nav className="hidden md:flex items-center gap-8">
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
                        to="/products"
                        className="text-xs font-bold text-slate-600 hover:text-[#0B132B] tracking-wide transition-colors"
                    >
                        Brands
                    </Link>
                    <Link
                        to="/contact"
                        className={`text-xs font-bold tracking-wide transition-colors ${location.pathname === '/contact' ? 'text-[#0B132B]' : 'text-slate-600 hover:text-[#0B132B]'}`}
                    >
                        Contact
                    </Link>
                </nav>

                {/* 3. Action Circle Button Far Right */}
                <div className="flex items-center gap-3">
                    {user && (
                        <Link to={user.isAdmin ? "/admin/dashboard" : "/profile"} className="p-2 text-slate-700 hover:text-black">
                            <User className="w-4 h-4" />
                        </Link>
                    )}

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
