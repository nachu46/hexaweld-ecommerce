import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import logo from '../assets/logo.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    const [currentAnnIndex, setCurrentAnnIndex] = useState(0);

    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Fetch Top Bar Announcements when route changes (so Admin updates reflect)
    useEffect(() => {
        axios.get('/api/announcement')
            .then(({ data }) => setAnnouncements(Array.isArray(data) ? data : []))
            .catch(() => setAnnouncements([]));
    }, [location.pathname]);

    // Slide interval every 3 seconds if there are multiple
    useEffect(() => {
        if (announcements.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentAnnIndex(prev => (prev + 1) % announcements.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [announcements.length]);

    useEffect(() => { setIsOpen(false); setShowMobileSearch(false); }, [location.pathname]);

    const activeAnn = announcements[currentAnnIndex];

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
            {/* Top Promotion Bar with 3s Slider */}
            {activeAnn && (
                <div
                    className="w-full text-white text-xs font-medium py-2 px-4 relative flex min-h-[36px] items-center justify-center overflow-hidden"
                    style={{ backgroundColor: activeAnn.bgColor, color: activeAnn.textColor }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeAnn._id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="w-full px-2 text-center whitespace-normal"
                        >
                            <span className="leading-normal inline-block">
                                <span className="font-bold mr-1" style={{ color: activeAnn.accentColor }}>{activeAnn.badge}:</span>
                                {activeAnn.message}
                                {activeAnn.linkText && (
                                    <Link to={activeAnn.linkUrl} className="underline ml-1.5 transition-colors font-semibold inline-block whitespace-nowrap" style={{ color: activeAnn.accentColor }}>
                                        {activeAnn.linkText}
                                    </Link>
                                )}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}

            {/* Main Header */}
            <header className={`sticky top-0 w-full z-50 transition-all duration-300 glass-navbar ${scrolled ? 'py-2 shadow-sm' : 'py-3'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">

                        {/* 1. Logo */}
                        <Link to="/" className="flex items-center shrink-0 mr-2 group">
                            <img
                                src={logo}
                                alt="HexaWeld Industrial Store"
                                className="h-28 sm:h-32 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                        </Link>

                        {/* 2. Global Search (Desktop only) */}
                        <div className="hidden md:flex flex-1 relative max-w-2xl">
                            <form onSubmit={handleSearch} className="w-full relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input pl-10 pr-28 w-full"
                                    placeholder="Search for welding machines, safety gear..."
                                />
                                <button type="submit" className="absolute inset-y-1.5 right-1.5 btn-primary !py-1 !px-4 !text-xs">
                                    Search
                                </button>
                            </form>
                        </div>

                        {/* 3. Right side actions */}
                        <div className="flex items-center gap-1 sm:gap-2 ml-auto shrink-0">

                            {/* Desktop nav links */}
                            <Link to="/products" className="hidden lg:flex text-slate-600 hover:text-orange-500 font-semibold text-sm transition-colors px-3 py-2">
                                Catalog
                            </Link>
                            <Link to="/contact" className="hidden lg:flex text-slate-600 hover:text-orange-500 font-semibold text-sm transition-colors px-3 py-2">
                                Connect
                            </Link>
                            <div className="w-px h-5 bg-slate-200 hidden lg:block mx-1" />

                            {/* Mobile search icon */}
                            <button
                                onClick={() => setShowMobileSearch(!showMobileSearch)}
                                className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            {/* Quote / Cart Icon */}
                            <a href="https://wa.me/919061627236" target="_blank" rel="noopener noreferrer" className="relative p-2 text-slate-600 hover:text-emerald-500 transition-colors" title="Get Quote via WhatsApp">
                                <img src="/whatsapp.png" alt="WhatsApp" className="w-auto h-7 object-contain drop-shadow-sm opacity-90 hover:opacity-100 transition-opacity" />
                            </a>

                            {/* Account */}
                            {user ? (
                                <div className="relative group hidden sm:block">
                                    <button className="p-2 text-slate-600 hover:text-orange-500 transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                                            <User className="w-4 h-4" />
                                        </div>
                                    </button>
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                                        <div className="p-4 border-b border-slate-50">
                                            <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                                            <p className="text-xs text-slate-500 capitalize">{user.role || 'Admin'} Account</p>
                                        </div>
                                        <div className="p-2">
                                            <Link to={user.isAdmin ? "/admin/dashboard" : "/profile"} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-orange-500 rounded-lg transition-colors">
                                                <LayoutDashboard className="w-4 h-4" /> Dashboard
                                            </Link>
                                            <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left mt-1">
                                                <LogOut className="w-4 h-4" /> Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/admin/login" className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-orange-500 bg-slate-50 rounded-full border border-slate-200 hover:border-orange-200 transition-all">
                                    <User className="w-4 h-4" />
                                    <span className="hidden sm:inline">Sign In</span>
                                </Link>
                            )}

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Bar — drops down under header */}
                    <AnimatePresence>
                        {showMobileSearch && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="md:hidden overflow-hidden"
                            >
                                <form onSubmit={handleSearch} className="w-full relative py-3">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        autoFocus
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="input pl-10 pr-16 w-full"
                                        placeholder="Search products..."
                                    />
                                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 btn-dark !px-3 !py-1.5 !text-xs">
                                        Go
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
                            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-4/5 max-w-sm glass-card !border-y-0 !border-r-0 !rounded-none !rounded-l-[24px] z-50 flex flex-col pt-6 pb-8 px-6 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <Link to="/" onClick={() => setIsOpen(false)}>
                                    <img src={logo} alt="HexaWeld" className="h-20 sm:h-24 w-auto object-contain" />
                                </Link>
                                <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-1 flex-1">
                                {[
                                    { to: '/', label: '  Home' },
                                    { to: '/products', label: '  All Products' },
                                    { to: '/about', label: ' About Us' },
                                    { to: '/contact', label: '  Contact & Support' },
                                ].map(({ to, label }) => (
                                    <Link key={to} to={to} className="text-base font-semibold text-slate-800 py-3.5 px-4 rounded-xl hover:bg-[#007AFF]/10 hover:text-[#007AFF] transition-colors">
                                        {label}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-3">
                                <a href="https://wa.me/919061627236" target="_blank" rel="noopener noreferrer"
                                    className="btn-outline !py-3.5 !px-5 !rounded-xl !text-sm flex items-center justify-center gap-2">
                                    <img src="/whatsapp.png" alt="WhatsApp" className="w-auto h-6 object-contain drop-shadow-sm" /> Get Quote on WhatsApp
                                </a>
                                {user ? (
                                    <>
                                        <Link to={user.isAdmin ? "/admin/dashboard" : "/profile"} className="btn-outline !py-3 !px-5 !rounded-xl !text-sm flex items-center justify-center gap-2">
                                            <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                                        </Link>
                                        <button onClick={logout} className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl border-2 border-red-100 text-red-600 font-semibold text-sm hover:bg-red-50">
                                            <LogOut className="w-4 h-4" /> Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <Link to="/admin/login" className="btn-outline !py-3 !px-5 !rounded-xl !text-sm flex items-center justify-center gap-2">
                                        <User className="w-4 h-4" /> Sign In
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
