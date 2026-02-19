import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Search, SlidersHorizontal, X, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import QuickPreviewModal from '../components/QuickPreviewModal';
import { SkeletonCard } from '../components/Skeletons';

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [previewProduct, setPreviewProduct] = useState(null);
    const [mobileSidebar, setMobileSidebar] = useState(false);

    useEffect(() => {
        Promise.all([axios.get('/api/products'), axios.get('/api/categories')])
            .then(([pRes, cRes]) => { setProducts(pRes.data); setCategories(cRes.data); })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // Sync category from URL
    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat) setSelectedCategory(cat);
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

    const Sidebar = () => (
        <div className="space-y-2">
            <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider px-4 mb-3">Categories</p>
            <button
                onClick={() => handleCategoryClick('')}
                className={`sidebar-link ${!selectedCategory ? 'active' : ''}`}
            >
                <span>All Products</span>
                {!selectedCategory && <ChevronRight className="w-3 h-3 ml-auto" />}
            </button>
            {categories.map((cat) => (
                <button
                    key={cat._id}
                    onClick={() => handleCategoryClick(cat._id)}
                    className={`sidebar-link ${selectedCategory === cat._id ? 'active' : ''}`}
                >
                    <span>{cat.name}</span>
                    {selectedCategory === cat._id && <ChevronRight className="w-3 h-3 ml-auto" />}
                </button>
            ))}
        </div>
    );

    return (
        <div className="bg-[#F8FAFC] min-h-screen">
            {/* ── Breadcrumb / Page header ── */}
            <div className="bg-white border-b border-[#E2E8F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2 text-sm text-[#64748B]">
                    <span>Home</span>
                    <ChevronRight className="w-3 h-3" />
                    <span>Products</span>
                    {selectedCatName && (
                        <>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-[#F97316] font-medium">{selectedCatName}</span>
                        </>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">

                    {/* ── Desktop Sidebar ── */}
                    <aside className="hidden lg:block w-56 flex-shrink-0">
                        <div className="card rounded-xl p-4 sticky top-20">
                            <Sidebar />
                        </div>
                    </aside>

                    {/* ── Main content ── */}
                    <div className="flex-1 min-w-0">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            {/* Search */}
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="input pl-9"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Mobile filter button */}
                            <button
                                onClick={() => setMobileSidebar(true)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2.5 card border border-[#E2E8F0] rounded-lg text-sm font-medium text-[#64748B] hover:border-orange-300 hover:text-[#F97316] transition-all"
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filter
                                {selectedCategory && (
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                                )}
                            </button>

                            {/* Results count */}
                            <p className="text-sm text-[#64748B] flex items-center ml-auto">
                                <span className="font-semibold text-[#0F172A]">{filtered.length}</span>
                                &nbsp;product{filtered.length !== 1 && 's'} found
                            </p>
                        </div>

                        {/* Active filter chip */}
                        {selectedCatName && (
                            <div className="flex items-center gap-2 mb-5">
                                <span className="text-sm text-[#64748B]">Filtering by:</span>
                                <button
                                    onClick={() => handleCategoryClick('')}
                                    className="flex items-center gap-1.5 badge-orange pr-2 py-1"
                                >
                                    {selectedCatName}
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        )}

                        {/* Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                            </div>
                        ) : filtered.length > 0 ? (
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {filtered.map((p) => (
                                    <ProductCard key={p._id} product={p} onQuickView={setPreviewProduct} />
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-[#64748B] text-lg mb-3">No products found.</p>
                                <button
                                    onClick={() => { setSearchTerm(''); handleCategoryClick(''); }}
                                    className="text-[#F97316] hover:underline text-sm"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Mobile Sidebar Drawer ── */}
            {mobileSidebar && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-[#0F172A]/40" onClick={() => setMobileSidebar(false)} />
                    <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl p-5 overflow-y-auto">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-bold text-[#0F172A]">Filter Products</h3>
                            <button onClick={() => setMobileSidebar(false)} className="p-1 rounded text-[#64748B] hover:text-[#0F172A]">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <Sidebar />
                    </div>
                </div>
            )}

            <QuickPreviewModal product={previewProduct} onClose={() => setPreviewProduct(null)} />
        </div>
    );
};

export default Products;
