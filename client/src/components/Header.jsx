import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import JtLogo from './JtLogo';
import logo from '../assets/logo.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setIsOpen(false); setShowMobileSearch(false); }, [location.pathname]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
            setShowMobileSearch(false);
        }
    };

    return (
        <>
            {/* Top Info Bar */}
            <div className="bg-[#0F172A] text-slate-300 text-[11px] py-1.5 px-4 border-b border-slate-800">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <span className="font-medium tracking-wide">Building materials • Tools • Industrial supplies</span>
                    <a href="mailto:jazatrading@gmail.com" className="hover:text-white transition-colors font-medium flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-[#007AFF]" />
                        jazatrading@gmail.com
                    </a>
                </div>
            </div>

            {/* Main White Header */}
            <header className={`sticky top-0 w-full z-50 transition-all duration-300 bg-white border-b border-slate-200 ${scrolled ? 'py-2.5 shadow-md' : 'py-3.5'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-4">

                        {/* 1. Logo */}
                        <Link to="/" className="flex items-center shrink-0 py-0.5">
                            <JtLogo dark={false} />
                        </Link>

                        {/* 2. Desktop Navigation Center */}
                        <nav className="hidden md:flex items-center gap-8">
                            <Link to="/" className={`text-xs uppercase font-bold tracking-wider transition-colors ${location.pathname === '/' ? 'text-[#007AFF]' : 'text-slate-700 hover:text-[#007AFF]'}`}>
                                Home
                            </Link>
                            <Link to="/products" className={`text-xs uppercase font-bold tracking-wider transition-colors ${location.pathname === '/products' ? 'text-[#007AFF]' : 'text-slate-700 hover:text-[#007AFF]'}`}>
                                Products
                            </Link>
                            <Link to="/about" className={`text-xs uppercase font-bold tracking-wider transition-colors ${location.pathname === '/about' ? 'text-[#007AFF]' : 'text-slate-700 hover:text-[#007AFF]'}`}>
                                About Us
                            </Link>
                            <Link to="/contact" className={`text-xs uppercase font-bold tracking-wider transition-colors ${location.pathname === '/contact' ? 'text-[#007AFF]' : 'text-slate-700 hover:text-[#007AFF]'}`}>
                                Contact
                            </Link>
                        </nav>

                        {/* 3. Search & Actions Right */}
                        <div className="flex items-center gap-3">
                            {/* Search Button Toggle */}
                            <button
                                onClick={() => setShowMobileSearch(!showMobileSearch)}
                                className="p-2 text-slate-700 hover:text-[#007AFF] hover:bg-slate-100 rounded-full transition-colors"
                                title="Search Products"
                            >
                                <Search className="w-4 h-4" />
                            </button>

                            {/* Request a Quote Blue Pill Button */}
                            <Link
                                to="/contact"
                                className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0066CC] text-white font-bold text-xs tracking-wide transition-all shadow-sm"
                            >
                                Request a Quote
                            </Link>

                            {/* User Account / Admin */}
                            {user && (
                                <Link to={user.isAdmin ? "/admin/dashboard" : "/profile"} className="p-2 text-slate-700 hover:text-[#007AFF] transition-colors">
                                    <User className="w-4 h-4" />
                                </Link>
                            )}

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Search Bar Dropdown */}
                    <AnimatePresence>
                        {showMobileSearch && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden pt-3"
                            >
                                <form onSubmit={handleSearch} className="w-full relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        autoFocus
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-24 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:border-[#007AFF] outline-none"
                                        placeholder="Search for building materials, tools..."
                                    />
                                    <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-[#007AFF] text-white text-xs font-bold">
                                        Search
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 flex flex-col pt-6 pb-8 px-6 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                                <Link to="/" onClick={() => setIsOpen(false)}>
                                    <JtLogo dark={false} />
                                </Link>
                                <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-2 flex-1">
                                {[
                                    { to: '/', label: 'Home' },
                                    { to: '/products', label: 'Products' },
                                    { to: '/about', label: 'About Us' },
                                    { to: '/contact', label: 'Contact' },
                                ].map(({ to, label }) => (
                                    <Link key={to} to={to} className="text-sm font-bold uppercase tracking-wider text-slate-800 py-3 px-4 rounded-xl hover:bg-slate-50 hover:text-[#007AFF] transition-colors">
                                        {label}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-3">
                                <Link to="/contact" className="w-full py-3 rounded-full bg-[#007AFF] text-white text-center font-bold text-xs">
                                    Request a Quote
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
