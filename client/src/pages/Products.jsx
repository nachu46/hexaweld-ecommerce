import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Search, SlidersHorizontal, X, ChevronRight, Grid3x3, List, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import QuickPreviewModal from '../components/QuickPreviewModal';
import { SkeletonCard } from '../components/Skeletons';

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [previewProduct, setPreviewProduct] = useState(null);
    const [mobileSidebar, setMobileSidebar] = useState(false);

    useEffect(() => {
        Promise.all([axios.get('/api/products'), axios.get('/api/categories')])
            .then(([pRes, cRes]) => { setProducts(pRes.data); setCategories(cRes.data); })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const cat = searchParams.get('category');
        const search = searchParams.get('search');
        if (cat) setSelectedCategory(cat);
        if (search) setSearchTerm(search);
    }, [searchParams]);

    const handleCategoryClick = (id) => {
        setSelectedCategory(id);
        if (id) setSearchParams({ category: id });
        else setSearchParams({});
        setMobileSidebar(false);
    };

    const filtered = products.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCat = selectedCategory ? p.category?._id === selectedCategory : true;
        return matchSearch && matchCat;
    });

    const selectedCatName = categories.find(c => c._id === selectedCategory)?.name;

    const SidebarContent = () => (
        <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-4">Product Categories</p>
            <button
                onClick={() => handleCategoryClick('')}
                className={`sidebar-link w-full text-left ${!selectedCategory ? 'active' : ''}`}
            >
                <img src="/placeholder-category.png" alt="All Products" className="w-5 h-5 object-cover rounded shrink-0 bg-slate-100" />
                <span className="flex-1">All Products</span>
                {!selectedCategory && <span className="text-[10px] font-bold bg-slate-500 text-white px-2 py-0.5 rounded-full">{products.length}</span>}
            </button>
            {categories.map((cat) => {
                const count = products.filter(p => p.category?._id === cat._id).length;
                return (
                    <button
                        key={cat._id}
                        onClick={() => handleCategoryClick(cat._id)}
                        className={`sidebar-link w-full text-left ${selectedCategory === cat._id ? 'active' : ''}`}
                    >
                        {cat.image ? (
                            <img src={cat.image} alt={cat.name} className="w-5 h-5 object-contain rounded shrink-0" />
                        ) : (
                            <span className="w-4 h-4 shrink-0 text-sm">🔧</span>
                        )}
                        <span className="flex-1 text-left">{cat.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedCategory === cat._id ? 'bg-slate-500 text-white' : 'bg-slate-100 text-slate-500'}`}>{count}</span>
                    </button>
                );
            })}
        </div>
    );

    return (
        <div className="bg-[#F5F5F7] min-h-screen">

            {/* ── Page Header Band ── */}
            <div className="bg-[#0F172A] text-white py-6 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2 flex-wrap">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-white font-semibold">Products</span>
                        {selectedCatName && (
                            <>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-blue-500 font-semibold">{selectedCatName}</span>
                            </>
                        )}
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black">
                        {selectedCatName ? selectedCatName : 'All Products'}
                    </h1>
                    <p className="text-slate-400 mt-1 text-xs md:text-sm">
                        {loading ? 'Loading products...' : `${filtered.length} ${filtered.length === 1 ? 'product' : 'products'} available`}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-7">

                    {/* ── Desktop Sidebar ── */}
                    <aside className="hidden lg:block w-60 flex-shrink-0">
                        <div className="card p-4 sticky top-24">
                            <SidebarContent />
                        </div>
                    </aside>

                    {/* ── Main content ── */}
                    <div className="flex-1 min-w-0">

                        {/* Toolbar */}
                        <div className="flex flex-wrap gap-2 mb-5 items-center">
                            {/* Search — hidden on mobile, header search bar handles it */}
                            <div className="relative flex-1 min-w-0 hidden md:block" style={{ minWidth: '140px' }}>
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="input pl-11 w-full"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Mobile filter button */}
                                <button
                                    onClick={() => setMobileSidebar(true)}
                                    className="lg:hidden btn-outline !px-4 !py-3 !text-sm flex shrink-0"
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Filter
                                    {selectedCategory && (
                                        <span className="w-2 h-2 bg-[#007AFF] rounded-full" />
                                    )}
                                </button>

                                {/* Results count */}
                                <div className="hidden sm:flex items-center gap-1 text-sm text-slate-500 shrink-0">
                                    <span className="font-bold text-[#0F172A]">{filtered.length}</span>{' '}product{filtered.length !== 1 && 's'}
                                </div>
                            </div>
                        </div>

                        {/* Active filter chips */}
                        {(selectedCatName || searchTerm) && (
                            <div className="flex flex-wrap items-center gap-2 mb-5">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Filters:</span>
                                {selectedCatName && (
                                    <button
                                        onClick={() => handleCategoryClick('')}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-800 text-xs font-bold rounded-full hover:bg-slate-200 transition-colors"
                                    >
                                        Category: {selectedCatName} <X className="w-3 h-3" />
                                    </button>
                                )}
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full hover:bg-slate-200 transition-colors"
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
                            </div>
                        ) : filtered.length > 0 ? (
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
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
                                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-4xl">🔍</div>
                                <h3 className="text-xl font-bold text-[#0F172A] mb-2">No products found</h3>
                                <p className="text-slate-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
                                <button
                                    onClick={() => { setSearchTerm(''); handleCategoryClick(''); }}
                                    className="btn-dark !px-6 !py-3 !rounded-full"
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
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setMobileSidebar(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-72 glass-card !border-y-0 !border-l-0 !rounded-none !rounded-r-[24px] z-50 p-5 overflow-y-auto shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-black text-lg text-[#1D1D1F]">Filter Products</h3>
                                <button onClick={() => setMobileSidebar(false)} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200">
                                    <X className="w-5 h-5 text-[#86868B]" />
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
