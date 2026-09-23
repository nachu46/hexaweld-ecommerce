import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Home, Package, ShieldCheck, PhoneCall, AlertTriangle, ArrowRight } from 'lucide-react';

const NotFound = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="min-h-[75vh] bg-slate-50 flex items-center justify-center px-4 py-16">
            <Helmet>
                <title>404 Page Not Found | Jaza Trading W.L.L</title>
                <meta name="description" content="The page you requested could not be found. Search tools or return to homepage." />
            </Helmet>

            <div className="max-w-2xl w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/80 text-center relative overflow-hidden">
                {/* Background decorative blob */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Badge & Icon */}
                <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>ERROR 404 • PAGE NOT FOUND</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
                    Lost your way?
                </h1>

                <p className="text-slate-600 text-sm sm:text-base font-medium max-w-md mx-auto mb-8 leading-relaxed">
                    The page or product link you are looking for might have been moved, renamed, or is temporarily unavailable.
                </p>

                {/* Product Search Box */}
                <form onSubmit={handleSearch} className="max-w-md mx-auto mb-10 relative">
                    <div className="flex items-center border-2 border-slate-200 rounded-2xl overflow-hidden focus-within:border-[#0B132B] transition-colors shadow-sm bg-slate-50">
                        <input
                            type="text"
                            className="w-full px-5 py-3 text-sm font-medium bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400"
                            placeholder="Search machinery, tools, safety items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-[#0B132B] hover:bg-slate-800 text-white px-6 py-3 font-bold text-xs flex items-center gap-2 transition-colors shrink-0"
                        >
                            <Search className="w-4 h-4" />
                            Search
                        </button>
                    </div>
                </form>

                {/* Quick Navigation Links */}
                <div className="pt-6 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                        Quick Helpful Links
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <Link
                            to="/"
                            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 hover:bg-[#0B132B] hover:text-white border border-slate-200 transition-all text-slate-700 font-bold text-xs gap-1.5 group shadow-sm"
                        >
                            <Home className="w-5 h-5 text-slate-500 group-hover:text-white" />
                            Homepage
                        </Link>
                        <Link
                            to="/products"
                            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 hover:bg-[#0B132B] hover:text-white border border-slate-200 transition-all text-slate-700 font-bold text-xs gap-1.5 group shadow-sm"
                        >
                            <Package className="w-5 h-5 text-slate-500 group-hover:text-white" />
                            Products
                        </Link>
                        <Link
                            to="/brands"
                            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 hover:bg-[#0B132B] hover:text-white border border-slate-200 transition-all text-slate-700 font-bold text-xs gap-1.5 group shadow-sm"
                        >
                            <ShieldCheck className="w-5 h-5 text-slate-500 group-hover:text-white" />
                            Brands
                        </Link>
                        <Link
                            to="/contact"
                            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 hover:bg-[#0B132B] hover:text-white border border-slate-200 transition-all text-slate-700 font-bold text-xs gap-1.5 group shadow-sm"
                        >
                            <PhoneCall className="w-5 h-5 text-slate-500 group-hover:text-white" />
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
