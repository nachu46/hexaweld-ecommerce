import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Search, ShieldCheck, Tag, ArrowRight, Package, Filter, X } from 'lucide-react';
import { getImageUrl } from '../utils/getImageUrl';

import PageBanner from '../components/PageBanner';
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
        <div className="bg-white min-h-screen text-[#111111]">
            <Helmet>
                <title>Our Product Brands | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Explore our complete directory of authorized industrial brands, welding machines, PPE safety products, and door hardware in Qatar." />
            </Helmet>
            <PageBanner page="brands" title="Our Brands" subtitle="Our own registered trademarks and the leading paint, tool and chemical brands we distribute across Qatar." />
            <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
{/* ══ 2. SEARCH & CATEGORY FILTER BAR ══════════════════════════ */}
                <div className="bg-white p-4 sm:p-6 rounded border border-[#E5E5E5] space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search Input */}
                        <div className="relative flex-1 w-full">
                            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input
                                type="text"
                                className="w-full pl-11 pr-10 py-3 bg-[#F5F5F5] border border-[#D4D4D4] rounded text-xs sm:text-sm font-medium text-[#111111] placeholder:text-neutral-400 focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#111111]/20 transition-all"
                                placeholder="Search brand by name, category, or product specification..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-[#111111]">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Category Filter Title / Count */}
                        <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 shrink-0">
                            <Filter className="w-4 h-4 text-[#111111]" />
                            <span>Showing {filteredBrands.length} Brands</span>
                        </div>
                    </div>

                    {/* Category Filter Chips */}
                    {categories.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scrollbar-none pt-2 border-t border-neutral-100">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCat(cat)}
                                    className={`px-4 py-2 rounded text-xs font-bold whitespace-nowrap transition-all ${
                                        selectedCat === cat
                                            ? 'bg-[#111111] text-white '
                                            : 'bg-[#F5F5F5] text-[#111111] hover:bg-[#EDEDED] border border-[#E5E5E5]'
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
                            <div key={n} className="h-64 bg-white rounded-xl border border-[#E5E5E5] p-6" />
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
                                    className="bg-white rounded-xl border border-[#E5E5E5] hover:border-[#111111] transition-all duration-300 flex flex-col overflow-hidden group relative"
                                >
                                    {/* Banner Image Preview */}
                                    <div className="h-32 w-full bg-[#EDEDED] relative overflow-hidden border-b border-[#E5E5E5]">
                                        {bannerUrl ? (
                                            <img
                                                src={bannerUrl}
                                                alt={b.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-[#111111] flex items-center justify-center p-4">
                                                <span className="text-white/30 font-bold text-2xl uppercase">{b.name}</span>
                                            </div>
                                        )}

                                    </div>

                                    {/* Brand Body Content */}
                                    <div className="p-6 flex-1 flex flex-col pt-12 relative">
                                        {/* Logo Container Overlay */}
                                        <div className="absolute -top-10 left-6 w-20 h-20 bg-white rounded-xl border-2 border-[#E5E5E5] p-2 flex items-center justify-center overflow-hidden">
                                            {logoUrl ? (
                                                <img src={logoUrl} alt={b.name} className="max-h-full max-w-full object-contain" />
                                            ) : (
                                                <span className="font-bold text-sm text-[#111111] text-center">{b.name}</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between mb-2">
                                            <h2 className="text-xl font-bold text-[#111111] group-hover:text-[#111111] transition-colors">
                                                {b.name}
                                            </h2>
                                            {b.category && (
                                                <span className="text-[10px] font-bold text-[#111111] bg-[#EDEDED] px-2.5 py-1 rounded-md border border-[#E5E5E5]">
                                                    {b.category}
                                                </span>
                                            )}
                                        </div>

                                        {b.badgeTag && (
                                            <p className="text-xs font-bold text-neutral-700 mb-2 flex items-center gap-1">
                                                <Tag className="w-3.5 h-3.5 text-[#111111]" />
                                                <span>{b.badgeTag}</span>
                                            </p>
                                        )}

                                        <p className="text-xs text-neutral-600 line-clamp-2 mb-6 font-medium leading-relaxed">
                                            {b.description || 'Authorized industrial equipment manufacturer & certified Qatar product line.'}
                                        </p>

                                        {/* Bottom Card Footer */}
                                        <div className="mt-auto pt-4 border-t border-[#E5E5E5] flex items-center justify-between text-xs font-bold text-[#111111] group-hover:text-[#111111] transition-colors">
                                            <span>Explore {b.name} Products</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#111111]" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-[#E5E5E5] p-12 text-center max-w-md mx-auto space-y-4">
                        <div className="w-16 h-16 rounded bg-[#EDEDED] border border-[#E5E5E5] flex items-center justify-center mx-auto text-[#111111]">
                            <Package className="w-8 h-8 text-[#111111]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#111111]">No Brands Found</h3>
                            <p className="text-xs text-neutral-500 font-medium mt-1">No partner brands matching "{searchTerm}".</p>
                        </div>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCat('ALL'); }}
                            className="px-5 py-2.5 rounded bg-[#111111] hover:bg-[#333333] text-white font-bold text-xs transition-all"
                        >
                            Reset Search Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default BrandDirectory;
