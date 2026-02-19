import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/products?scroll=categories', label: 'Categories' }, // Simple link for now
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => setIsOpen(false), [location.pathname]);

    const isActive = (path) =>
        location.pathname === path || (path.includes('?') && location.search.includes('scroll'))
            ? 'text-[#0F172A] font-semibold bg-white/20'
            : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white/10';

    return (
        <>
            {/* ── Main Navbar Container ── */}
            <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
                <motion.nav
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                    className="w-full max-w-[1200px] rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 relative"
                    style={{
                        background: 'rgba(255, 255, 255, 0.1)', // Glass background
                        backdropFilter: 'blur(20px)',           // Blur effect
                        border: '1px solid rgba(255, 255, 255, 0.2)', // Border
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)', // Soft shadow
                    }}
                >
                    {/* Left: Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#ea580c] flex items-center justify-center shadow-lg group-hover:shadow-orange-500/30 transition-all duration-300 group-hover:scale-110">
                            <span className="text-white font-black text-lg">H</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black text-[#0F172A] leading-none">
                                Hexa<span className="text-[#F97316]">Weld</span>
                            </span>
                            <span className="text-[10px] text-[#64748B] font-medium tracking-wide uppercase mt-0.5">
                                Industrial Solutions
                            </span>
                        </div>
                    </Link>

                    {/* Center: Navigation */}
                    <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-sm">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                to={link.to}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group ${isActive(link.to)}`}
                            >
                                <span className="relative z-10">{link.label}</span>
                                {/* Hover Effect */}
                                <span className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Right: Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* WhatsApp Button */}
                        <a
                            href="https://wa.me/919061627236"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-green-500/10 hover:bg-green-500 text-green-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/20"
                            title="Chat on WhatsApp"
                        >
                            <MessageCircle className="w-5 h-5" />
                        </a>

                        {/* Dashboard / Auth Button */}
                        {user ? (
                            <div className="flex items-center gap-2">
                                <Link
                                    to={user.isAdmin ? "/admin/dashboard" : "/profile"}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F172A] text-white text-sm font-semibold hover:bg-[#1E293B] hover:shadow-lg hover:shadow-slate-500/20 transition-all duration-300 hover:scale-105"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    <span>Dashboard</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="w-10 h-10 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    title="Logout"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/admin/login"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F172A] text-white text-sm font-semibold hover:bg-[#1E293B] hover:shadow-lg hover:shadow-slate-500/20 transition-all duration-300 hover:scale-105"
                            >
                                <span>Login</span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden w-10 h-10 rounded-full bg-white/50 hover:bg-white text-[#0F172A] flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </motion.nav>
            </div>

            {/* ── Mobile Menu Dropdown ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-24 left-4 right-4 z-40 md:hidden rounded-3xl p-4 shadow-2xl border border-white/20 backdrop-blur-3xl"
                        style={{ background: 'rgba(255, 255, 255, 0.9)' }}
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.to}
                                    className={`px-5 py-3.5 rounded-2xl text-base font-semibold transition-all duration-200 ${isActive(link.to).includes('bg-white')
                                            ? 'bg-orange-50 text-[#F97316]'
                                            : 'text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="h-px bg-slate-100 my-2" />

                            <a
                                href="https://wa.me/919061627236"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-green-50 text-green-700 font-semibold"
                            >
                                <MessageCircle className="w-5 h-5" />
                                WhatsApp Support
                            </a>

                            {user ? (
                                <>
                                    <Link
                                        to={user.isAdmin ? "/admin/dashboard" : "/profile"}
                                        className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-50 text-[#0F172A] font-semibold"
                                    >
                                        <LayoutDashboard className="w-5 h-5" />
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-red-50 text-red-600 font-semibold w-full text-left"
                                    >
                                        <X className="w-5 h-5" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/admin/login"
                                    className="flex items-center justify-center px-5 py-3.5 rounded-2xl bg-[#0F172A] text-white font-bold shadow-lg shadow-slate-500/20"
                                >
                                    Login to Dashboard
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer to push content down since navbar is fixed/floating */}
            <div className="h-24" />
        </>
    );
};

export default Header;
