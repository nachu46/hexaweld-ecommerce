import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Search, ShieldCheck, Tag, ExternalLink, ArrowRight, Package } from 'lucide-react';
import { getImageUrl } from '../utils/getImageUrl';

const API_URL = import.meta.env.VITE_API_URL || '';

const BrandDirectory = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCat, setSelectedCat] = useState('ALL');

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/brands`);
                setBrands(data);
            } catch (err) {
                console.error('Error loading brand directory:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBrands();
    }, []);

    const categories = ['ALL', ...Array.from(new Set(brands.map(b => b.category).filter(Boolean)))];

    const filteredBrands = brands.filter((b) => {
        const matchSearch = (b.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (b.badgeTag || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (b.description || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchCat = selectedCat === 'ALL' || b.category === selectedCat;
        return matchSearch && matchCat;
    });

    return (
        <div className="bg-[#F6F4EE] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Brands Directory | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Explore our complete directory of authorized industrial brands, tools, PPE safety products, and door locks in Qatar." />
            </Helmet>

            <div className="max-w-7xl mx-auto">
                {/* Header Banner */}
                <div className="bg-[#ECE8E0] text-[#1C1B17] rounded-3xl p-8 sm:p-12 mb-10 shadow-md relative overflow-hidden border border-[#E5E0D8]">
                    <div className="flex items-center gap-2 text-[#B15E2B] text-xs font-bold uppercase tracking-widest mb-3">
                        <ShieldCheck className="w-4 h-4 text-[#B15E2B]" />
                        <span>PROPRIETARY & DISTRIBUTED BRANDS</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight mb-4 leading-tight text-[#1C1B17]">
                        Our World-Class Product Brands
                    </h1>

                    <p className="text-slate-700 text-sm sm:text-base font-medium max-w-2xl">
                        Discover Tork®, Eurex®, NexT®, Mark Safety Pro®, Clexo®, Tenzo®, and our international partner brands in Qatar.
                    </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-[#E5E0D8] mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search Bar */}
                    <div className="relative flex-1 w-full">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2.5 bg-[#F6F4EE] border border-[#D5CFCE] rounded-xl text-xs sm:text-sm font-medium text-[#1C1B17] focus:outline-none focus:border-[#B15E2B] transition-colors"
                            placeholder="Search brand by name, category or tag..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Category Filter Chips */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCat(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                                    selectedCat === cat
                                        ? 'bg-[#B15E2B] text-white shadow-sm'
                                        : 'bg-[#ECE8E0] text-slate-700 hover:bg-[#E5E0D8]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Brand Cards Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="h-64 bg-white rounded-2xl border border-slate-200 animate-pulse p-6" />
                        ))}
                    </div>
                ) : filteredBrands.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBrands.map((b) => {
                            const brandSlug = b.slug || b._id;
                            const logoUrl = getImageUrl(b.logo);
                            const bannerUrl = getImageUrl(b.banner);

                            return (
                                <Link
                                    key={b._id}
                                    to={`/brand/${brandSlug}`}
                                    className="bg-white rounded-2xl border border-slate-200 hover:border-slate-900 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group relative"
                                >
                                    {/* Banner Image Preview */}
                                    <div className="h-32 w-full bg-slate-100 relative overflow-hidden border-b border-slate-100">
                                        {bannerUrl ? (
                                            <img
                                                src={bannerUrl}
                                                alt={b.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-r from-slate-800 to-slate-900 flex items-center justify-center">
                                                <span className="text-white/20 font-black text-2xl uppercase tracking-widest">{b.name}</span>
                                            </div>
                                        )}

                                        {b.isRegistered !== false && (
                                            <span className="absolute top-3 right-3 bg-[#B15E2B] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-xs">
                                                REGISTERED®
                                            </span>
                                        )}
                                    </div>

                                    {/* Brand Content */}
                                    <div className="p-6 flex-1 flex flex-col pt-12 relative">
                                        {/* Logo Badge Overlay */}
                                        <div className="absolute -top-10 left-6 w-20 h-20 bg-white rounded-2xl border-2 border-slate-100 shadow-md p-2 flex items-center justify-center overflow-hidden">
                                            {logoUrl ? (
                                                <img src={logoUrl} alt={b.name} className="max-h-full max-w-full object-contain" />
                                            ) : (
                                                <span className="font-black text-xs text-slate-800 text-center">{b.name}</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between mb-2">
                                            <h2 className="text-xl font-black text-slate-900 group-hover:text-slate-700 transition-colors">
                                                {b.name}
                                            </h2>
                                            {b.category && (
                                                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                                                    {b.category}
                                                </span>
                                            )}
                                        </div>

                                        {b.badgeTag && (
                                            <p className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1">
                                                <Tag className="w-3 h-3 text-slate-500" />
                                                {b.badgeTag}
                                            </p>
                                        )}

                                        <p className="text-xs text-slate-600 line-clamp-2 mb-6 font-medium leading-relaxed">
                                            {b.description || 'Authorized quality product manufacturer and equipment supplier in Qatar.'}
                                        </p>

                                        {/* Bottom Action */}
                                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-slate-700">
                                            <span>View Products & Catalog</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
                        <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No Brands Found</h3>
                        <p className="text-xs text-slate-500 mb-4">No partner brands matching your search criteria.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCat('ALL'); }}
                            className="bg-[#0B132B] text-white px-4 py-2 rounded-xl text-xs font-bold"
                        >
                            Reset Search Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrandDirectory;
