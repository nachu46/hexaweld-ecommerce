import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Search, SlidersHorizontal, X, ChevronRight, Grid3x3, List, Package, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import QuickPreviewModal from '../components/QuickPreviewModal';
import { SkeletonCard } from '../components/Skeletons';

import PageBanner from '../components/PageBanner';
const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '');
    const [previewProduct, setPreviewProduct] = useState(null);
    const [mobileSidebar, setMobileSidebar] = useState(false);


    useEffect(() => {
        Promise.all([
            axios.get('/api/products'),
            axios.get('/api/categories'),
            axios.get('/api/products/brands')
        ])
            .then(([pRes, cRes, bRes]) => {
                setProducts(pRes.data);
                setCategories(cRes.data);
                setBrands(bRes.data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const cat = searchParams.get('category');
        const search = searchParams.get('search');
        const brand = searchParams.get('brand');
        if (cat) setSelectedCategory(cat);
        if (search) setSearchTerm(search);
        if (brand) setSelectedBrand(brand);
    }, [searchParams]);

    const handleCategoryClick = (id) => {
        setSelectedCategory(id);
        const params = {};
        if (id) params.category = id;
        if (selectedBrand) params.brand = selectedBrand;
        if (searchTerm) params.search = searchTerm;
        setSearchParams(params);
        setMobileSidebar(false);
    };

    const handleBrandClick = (b) => {
        setSelectedBrand(b);
        const params = {};
        if (selectedCategory) params.category = selectedCategory;
        if (b) params.brand = b;
        if (searchTerm) params.search = searchTerm;
        setSearchParams(params);
        setMobileSidebar(false);
    };

    const filtered = products.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCat = selectedCategory
            ? (p.category?._id === selectedCategory || p.category?.name === selectedCategory || p.category === selectedCategory)
            : true;
        const matchBrand = selectedBrand ? p.brand?.toLowerCase() === selectedBrand.toLowerCase() : true;
        return matchSearch && matchCat && matchBrand;
    });

    const selectedCatName = categories.find(c => c._id === selectedCategory)?.name;

    const SidebarContent = () => (
        <div className="space-y-6">
            {/* Categories */}
            <div className="space-y-1">
                <p className="text-xs font-bold text-neutral-400 px-3 mb-3">Product Categories</p>
                <button
                    onClick={() => handleCategoryClick('')}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded text-xs transition-all ${
                        !selectedCategory 
                            ? 'bg-[#111111] text-white font-bold ' 
                            : 'text-neutral-700 hover:bg-[#111111]/10 hover:text-[#111111]'
                    }`}
                >
                    <Package className={`w-4 h-4 shrink-0 ${!selectedCategory ? 'text-white' : 'text-[#111111]'}`} />
                    <span className="flex-1 text-left truncate">All Categories</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${!selectedCategory ? 'bg-white/20 text-white' : 'bg-[#EDEDED] text-neutral-700'}`}>
                        {products.length}
                    </span>
                </button>

                {categories.map((cat) => {
                    const count = products.filter(p => p.category?._id === cat._id).length;
                    const isActive = selectedCategory === cat._id;
                    return (
                        <button
                            key={cat._id}
                            onClick={() => handleCategoryClick(cat._id)}
                            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded text-xs transition-all ${
                                isActive 
                                    ? 'bg-[#111111] text-white font-bold ' 
                                    : 'text-neutral-700 hover:bg-[#111111]/10 hover:text-[#111111]'
                            }`}
                        >
                            {cat.image ? (
                                <img src={cat.image} alt={cat.name} className="w-4 h-4 object-cover rounded-md shrink-0" />
                            ) : (
                                <Package className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                            )}
                            <span className="flex-1 text-left truncate">{cat.name}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${isActive ? 'bg-white/20 text-white' : 'bg-[#EDEDED] text-neutral-700'}`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Brands */}
            <div className="space-y-1 pt-4 border-t border-[#E5E5E5]">
                <p className="text-xs font-bold text-neutral-400 px-3 mb-3">Filter by Brand</p>
                <button
                    onClick={() => handleBrandClick('')}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded text-xs transition-all ${
                        !selectedBrand 
                            ? 'bg-[#111111] text-white font-bold ' 
                            : 'text-neutral-700 hover:bg-[#111111]/10 hover:text-[#111111]'
                    }`}
                >
                    <Tag className={`w-4 h-4 shrink-0 ${!selectedBrand ? 'text-white' : 'text-[#111111]'}`} />
                    <span className="flex-1 text-left truncate">All Brands</span>
                </button>
                {brands.map((b) => {
                    const count = products.filter(p => p.brand?.toLowerCase() === b.toLowerCase()).length;
                    const isActive = selectedBrand.toLowerCase() === b.toLowerCase();
                    return (
                        <button
                            key={b}
                            onClick={() => handleBrandClick(b)}
                            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded text-xs transition-all ${
                                isActive 
                                    ? 'bg-[#111111] text-white font-bold ' 
                                    : 'text-neutral-700 hover:bg-[#111111]/10 hover:text-[#111111]'
                            }`}
                        >
                            <Tag className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                            <span className="flex-1 text-left truncate capitalize">{b}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${isActive ? 'bg-white/20 text-white' : 'bg-[#EDEDED] text-neutral-700'}`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );


    return (
        <div className="bg-white min-h-screen">

            <PageBanner page="products"
                title={selectedCatName || 'Our Products'}
                subtitle={loading ? 'Loading products...' : `${filtered.length} ${filtered.length === 1 ? 'product' : 'products'}`}
                crumbs={selectedCatName ? [{ label: 'Products', to: '/products' }, { label: selectedCatName }] : [{ label: 'Products' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-7">

                    {/* ── Desktop Sidebar ── */}
                    <aside className="hidden lg:block w-60 flex-shrink-0">
                        <div className="bg-white border border-[#E5E5E5] rounded p-4 sticky top-24 shadow-sm">
                            <SidebarContent />
                        </div>
                    </aside>

                    {/* ── Main content ── */}
                    <div className="flex-1 min-w-0">

                        {/* Toolbar */}
                        <div className="flex flex-wrap gap-2 mb-5 items-center">
                            {/* Search — hidden on mobile, header search bar handles it */}
                            <div className="relative flex-1 min-w-0 hidden md:block" style={{ minWidth: '140px' }}>
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="input pl-11 w-full !bg-white !border-[#D4D4D4]"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Mobile filter button */}
                                <button
                                    onClick={() => setMobileSidebar(true)}
                                    className="lg:hidden btn-outline !px-4 !py-3 !text-sm flex shrink-0 border-[#D4D4D4]"
                                >
                                    <SlidersHorizontal className="w-4 h-4 text-[#111111]" />
                                    Filter
                                    {selectedCategory && (
                                        <span className="w-2 h-2 bg-[#111111] rounded-full" />
                                    )}
                                </button>

                                {/* Results count */}
                                <div className="hidden sm:flex items-center gap-1 text-sm text-neutral-600 shrink-0">
                                    <span className="font-bold text-[#111111]">{filtered.length}</span> wholesale item{filtered.length !== 1 && 's'}
                                </div>
                            </div>
                        </div>

                        {/* Active filter chips */}
                        {(selectedCatName || searchTerm) && (
                            <div className="flex flex-wrap items-center gap-2 mb-5">
                                <span className="text-xs font-bold text-neutral-500">Active Filters:</span>
                                {selectedCatName && (
                                    <button
                                        onClick={() => handleCategoryClick('')}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111111] text-white text-xs font-bold rounded hover:bg-[#333333] transition-colors"
                                    >
                                        Category: {selectedCatName} <X className="w-3 h-3" />
                                    </button>
                                )}
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 text-neutral-700 text-xs font-bold rounded hover:bg-neutral-200 transition-colors"
                                    >
                                        Search: "{searchTerm}" <X className="w-3 h-3" />
                                    </button>
                                )}
                                <button
                                    onClick={() => { setSearchTerm(''); handleCategoryClick(''); }}
                                    className="text-xs text-red-500 hover:underline font-semibold ml-1"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}

                        {/* Product Grid */}
                        {loading ? (
                            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
                                {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
                            </div>
                        ) : filtered.length > 0 ? (
                            <motion.div
                                className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {filtered.map((p) => (
                                    <ProductCard key={p._id} product={p} onQuickView={setPreviewProduct} />
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center py-24 flex flex-col items-center">
                                <div className="w-16 h-16 rounded bg-[#EDEDED] border border-[#E5E5E5] flex items-center justify-center mb-4 text-[#111111]">
                                    <Search className="w-8 h-8 text-[#111111]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#111111] mb-2">No products found</h3>
                                <p className="text-neutral-600 text-xs font-medium mb-6">Try adjusting your search or filter to find what you're looking for.</p>
                                <button
                                    onClick={() => { setSearchTerm(''); handleCategoryClick(''); }}
                                    className="px-5 py-2.5 rounded bg-[#111111] hover:bg-[#333333] text-white font-bold text-xs transition-all flex items-center gap-2"
                                >
                                    <X className="w-4 h-4" /> Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Mobile Sidebar Drawer ── */}
            <AnimatePresence>
                {mobileSidebar && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-neutral-900/60 z-40 lg:hidden"
                            onClick={() => setMobileSidebar(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-72 glass-card !border-y-0 !border-l-0 !rounded-none !rounded-r-[24px] z-50 p-5 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-semibold text-lg text-[#111111]">Filter Products</h3>
                                <button onClick={() => setMobileSidebar(false)} className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200">
                                    <X className="w-5 h-5 text-[#737373]" />
                                </button>
                            </div>
                            <SidebarContent />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <QuickPreviewModal product={previewProduct} onClose={() => setPreviewProduct(null)} />
        </div>
    );
};

export default Products;
