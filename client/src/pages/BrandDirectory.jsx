import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Search, ShieldCheck, Tag, ArrowRight, Package, Sparkles, Filter, X } from 'lucide-react';
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
                const { data } = await axios.get('/api/brands');
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
        <div className="bg-[#F6F4EE] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <Helmet>
                <title>Our Product Brands | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Explore our complete directory of authorized industrial brands, welding machines, PPE safety products, and door hardware in Qatar." />
            </Helmet>

            <div className="max-w-7xl mx-auto space-y-8">
                {/* ══ 1. HERO BANNER SECTION ══════════════════════════════════ */}
                <div className="pb-8 border-b border-[#E5E0D8] space-y-4">
                    <div className="inline-flex items-center gap-2 text-[#B15E2B] bg-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-[#E5E0D8]">
                        <ShieldCheck className="w-4 h-4 text-[#B15E2B]" />
                        <span>OFFICIAL DISTRIBUTOR & PROPRIETARY BRANDS</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#1C1B17] leading-tight">
                        Our World-Class Product Brands
                    </h1>

                    <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed max-w-3xl">
                        Authorized importer and supplier of premium certified brands including <strong>TORK®</strong>, <strong>EUREX®</strong>, <strong>NEXT®</strong>, <strong>MARK SAFETY PRO®</strong>, <strong>CLEXO®</strong>, <strong>TENZO®</strong>, and international industrial partners in Qatar.
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-[#2E4046]">
                        <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#E5E0D8]">
                            <Sparkles className="w-3.5 h-3.5 text-[#B15E2B]" /> 100% Original Manufacturer Warranties
                        </span>
                        <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#E5E0D8]">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#B15E2B]" /> Qatar Industrial Area Ready Stock
                        </span>
                    </div>
                </div>

                {/* ══ 2. SEARCH & CATEGORY FILTER BAR ══════════════════════════ */}
                <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-xs border border-[#E5E0D8] space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search Input */}
                        <div className="relative flex-1 w-full">
                            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                className="w-full pl-11 pr-10 py-3 bg-[#F6F4EE] border border-[#D5CFCE] rounded-2xl text-xs sm:text-sm font-medium text-[#1C1B17] placeholder:text-slate-400 focus:outline-none focus:border-[#B15E2B] focus:ring-2 focus:ring-[#B15E2B]/20 transition-all"
                                placeholder="Search brand by name, category, or product specification..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-[#1C1B17]">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Category Filter Title / Count */}
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 shrink-0">
                            <Filter className="w-4 h-4 text-[#B15E2B]" />
                            <span>Showing {filteredBrands.length} Brands</span>
                        </div>
                    </div>

                    {/* Category Filter Chips */}
                    {categories.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scrollbar-none pt-2 border-t border-slate-100">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCat(cat)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                                        selectedCat === cat
                                            ? 'bg-[#B15E2B] text-white shadow-xs'
                                            : 'bg-[#F6F4EE] text-[#1C1B17] hover:bg-[#ECE8E0] border border-[#E5E0D8]'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ══ 3. BRAND CARDS GRID ═════════════════════════════════════ */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="h-64 bg-white rounded-3xl border border-[#E5E0D8] animate-pulse p-6" />
                        ))}
                    </div>
                ) : filteredBrands.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBrands.map((b) => {
                            const brandSlug = b.slug || b._id || b.id;
                            const logoUrl = getImageUrl(b.logo);
                            const bannerUrl = getImageUrl(b.banner);

                            return (
                                <Link
                                    key={b._id || b.id || b.name}
                                    to={`/brand/${brandSlug}`}
                                    className="bg-white rounded-3xl border border-[#E5E0D8] hover:border-[#B15E2B] hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group relative"
                                >
                                    {/* Banner Image Preview */}
                                    <div className="h-32 w-full bg-[#ECE8E0] relative overflow-hidden border-b border-[#E5E0D8]">
                                        {bannerUrl ? (
                                            <img
                                                src={bannerUrl}
                                                alt={b.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-r from-[#2E4046] to-[#1C1B17] flex items-center justify-center p-4">
                                                <span className="text-[#ECE8E0]/40 font-serif font-bold text-2xl uppercase tracking-widest">{b.name}</span>
                                            </div>
                                        )}

                                        {b.isOwnerBrand || b.isRegistered !== false ? (
                                            <span className="absolute top-3 right-3 bg-[#B15E2B] text-white text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs">
                                                REGISTERED®
                                            </span>
                                        ) : null}
                                    </div>

                                    {/* Brand Body Content */}
                                    <div className="p-6 flex-1 flex flex-col pt-12 relative">
                                        {/* Logo Container Overlay */}
                                        <div className="absolute -top-10 left-6 w-20 h-20 bg-white rounded-2xl border-2 border-[#E5E0D8] shadow-md p-2 flex items-center justify-center overflow-hidden">
                                            {logoUrl ? (
                                                <img src={logoUrl} alt={b.name} className="max-h-full max-w-full object-contain" />
                                            ) : (
                                                <span className="font-serif font-bold text-sm text-[#1C1B17] text-center">{b.name}</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between mb-2">
                                            <h2 className="text-xl font-serif font-bold text-[#1C1B17] group-hover:text-[#B15E2B] transition-colors">
                                                {b.name}
                                            </h2>
                                            {b.category && (
                                                <span className="text-[10px] font-bold text-[#B15E2B] bg-[#ECE8E0] px-2.5 py-1 rounded-md border border-[#E5E0D8]">
                                                    {b.category}
                                                </span>
                                            )}
                                        </div>

                                        {b.badgeTag && (
                                            <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                                                <Tag className="w-3.5 h-3.5 text-[#B15E2B]" />
                                                <span>{b.badgeTag}</span>
                                            </p>
                                        )}

                                        <p className="text-xs text-slate-600 line-clamp-2 mb-6 font-medium leading-relaxed">
                                            {b.description || 'Authorized industrial equipment manufacturer & certified Qatar product line.'}
                                        </p>

                                        {/* Bottom Card Footer */}
                                        <div className="mt-auto pt-4 border-t border-[#E5E0D8] flex items-center justify-between text-xs font-bold text-[#1C1B17] group-hover:text-[#B15E2B] transition-colors">
                                            <span>Explore {b.name} Products</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#B15E2B]" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl border border-[#E5E0D8] p-12 text-center max-w-md mx-auto shadow-xs space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-[#ECE8E0] border border-[#E5E0D8] flex items-center justify-center mx-auto text-[#B15E2B]">
                            <Package className="w-8 h-8 text-[#B15E2B]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-serif font-bold text-[#1C1B17]">No Brands Found</h3>
                            <p className="text-xs text-slate-500 font-medium mt-1">No partner brands matching "{searchTerm}".</p>
                        </div>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCat('ALL'); }}
                            className="px-5 py-2.5 rounded-xl bg-[#B15E2B] hover:bg-[#8E4920] text-white font-bold text-xs transition-all shadow-xs"
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
