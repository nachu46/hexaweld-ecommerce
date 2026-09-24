import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Layers, ArrowLeft, Package, AlertCircle, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import QuickPreviewModal from '../components/QuickPreviewModal';
import { getImageUrl } from '../utils/getImageUrl';

const API_URL = import.meta.env.VITE_API_URL || '';

const CategoryDetailsPage = () => {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [previewProduct, setPreviewProduct] = useState(null);

    useEffect(() => {
        const fetchCategoryData = async () => {
            setLoading(true);
            setNotFound(false);
            try {
                // Fetch categories
                const { data: catList } = await axios.get(`${API_URL}/api/categories`);
                const param = slug.trim().toLowerCase();
                const matchedCat = catList.find(c =>
                    c._id === slug ||
                    (c.slug && c.slug.toLowerCase() === param) ||
                    (c.name && c.name.toLowerCase() === param)
                );

                if (!matchedCat) {
                    setNotFound(true);
                    return;
                }

                setCategory(matchedCat);

                // Fetch products for category
                const { data: allProducts } = await axios.get(`${API_URL}/api/products`);
                const catProducts = allProducts.filter(p =>
                    p.category?._id === matchedCat._id ||
                    p.category?.name === matchedCat.name ||
                    p.category === matchedCat._id
                );
                setProducts(catProducts);
            } catch (err) {
                console.error('Error loading category page:', err);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryData();
    }, [slug]);

    const filteredProducts = products.filter(p =>
        (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.brand || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-[#0B132B] border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs font-bold text-slate-500">Loading Category Products...</p>
                </div>
            </div>
        );
    }

    if (notFound || !category) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-16">
                <Helmet>
                    <title>Category Not Found | Jaza Trading W.L.L</title>
                </Helmet>
                <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 text-center shadow-lg">
                    <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-black text-slate-900 mb-2">Category Not Found</h1>
                    <p className="text-xs text-slate-600 font-medium mb-6">
                        The category you requested could not be located.
                    </p>
                    <Link
                        to="/categories"
                        className="inline-flex items-center justify-center gap-2 bg-[#B15E2B] hover:bg-[#8E4920] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Explore All Categories
                    </Link>
                </div>
            </div>
        );
    }

    const catImage = getImageUrl(category.image);

    return (
        <div className="bg-[#F6F4EE] min-h-screen py-8 px-4 sm:px-6 lg:px-8 text-[#1C1B17]">
            <Helmet>
                <title>{`${category.name} Range | Jaza Trading W.L.L Qatar`}</title>
                <meta name="description" content={category.description || `Browse quality ${category.name} tools and industrial products at Jaza Trading W.L.L in Qatar.`} />
            </Helmet>

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Back Link */}
                <Link
                    to="/categories"
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#B15E2B] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to All Categories
                </Link>

                {/* Category Banner */}
                <div className="bg-[#ECE8E0] text-[#1C1B17] rounded-3xl p-8 sm:p-12 shadow-md border border-[#E5E0D8] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-3 z-10 max-w-xl">
                        <div className="flex items-center gap-2 text-[#B15E2B] text-xs font-bold uppercase tracking-widest">
                            <Layers className="w-4 h-4 text-[#B15E2B]" />
                            <span>CATEGORY RANGE</span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1C1B17] tracking-tight">{category.name}</h1>
                        <p className="text-slate-700 text-sm font-medium leading-relaxed">
                            {category.description || 'Explore commercial-grade products tested for reliability and safety.'}
                        </p>
                    </div>

                    {catImage && (
                        <div className="w-36 h-36 sm:w-48 sm:h-48 bg-white rounded-2xl p-3 border border-[#E5E0D8] shrink-0 overflow-hidden shadow-sm">
                            <img src={catImage} alt={category.name} className="w-full h-full object-cover rounded-xl" />
                        </div>
                    )}
                </div>

                {/* Filter & Product Count Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E0D8] shadow-xs">
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder={`Search in ${category.name}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#F6F4EE] border border-[#D5CFCE] text-[#1C1B17] rounded-xl text-xs font-medium focus:outline-none focus:border-[#B15E2B]"
                        />
                    </div>

                    <span className="text-xs font-bold text-slate-600">
                        Showing <strong className="text-[#1C1B17]">{filteredProducts.length}</strong> products
                    </span>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((p) => (
                            <ProductCard key={p._id} product={p} onQuickView={setPreviewProduct} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-12 text-center border border-[#E5E0D8] max-w-lg mx-auto">
                        <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <h3 className="text-lg font-serif font-bold text-[#1C1B17] mb-1">No Matching Products</h3>
                        <p className="text-xs text-slate-500 mb-4">No products found matching your search term within this category.</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="bg-[#B15E2B] hover:bg-[#8E4920] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs"
                        >
                            Reset Search
                        </button>
                    </div>
                )}
            </div>

            {/* Quick Preview Modal */}
            {previewProduct && (
                <QuickPreviewModal product={previewProduct} onClose={() => setPreviewProduct(null)} />
            )}
        </div>
    );
};

export default CategoryDetailsPage;
