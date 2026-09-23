import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Package, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { getImageUrl } from '../utils/getImageUrl';

const API_URL = import.meta.env.VITE_API_URL || '';

const CategoryDirectory = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                const [cRes, pRes] = await Promise.all([
                    axios.get(`${API_URL}/api/categories`),
                    axios.get(`${API_URL}/api/products`),
                ]);
                setCategories(cRes.data);
                setProducts(pRes.data);
            } catch (err) {
                console.error('Error fetching categories:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategoriesAndProducts();
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Product Categories | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Browse comprehensive product categories: Welding Machines, Safety Boots, Lock Cylinders, Hand Tools, Sanitary Wares, and Power Tools." />
            </Helmet>

            <div className="max-w-7xl mx-auto">
                {/* Header Banner */}
                <div className="bg-[#0B132B] text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
                        <Layers className="w-4 h-4 text-amber-400" />
                        <span>INDUSTRIAL & BUILDING SUPPLIES CATALOG</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 leading-tight">
                        Explore Our Product Categories
                    </h1>

                    <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl">
                        Select from specialized industrial categories engineered for construction sites, fabrication workshops, and infrastructure projects across Qatar.
                    </p>
                </div>

                {/* Categories Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="h-64 bg-white rounded-3xl border border-slate-200 animate-pulse p-6" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((cat) => {
                            const catSlug = cat.slug || cat._id;
                            const catImage = getImageUrl(cat.image);
                            const count = products.filter(p =>
                                p.category?._id === cat._id || p.category?.name === cat.name || p.category === cat._id
                            ).length;

                            return (
                                <Link
                                    key={cat._id}
                                    to={`/category/${catSlug}`}
                                    className="bg-white rounded-3xl border border-slate-200 hover:border-[#0B132B] hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group relative"
                                >
                                    {/* Image Top */}
                                    <div className="h-44 w-full bg-slate-100 relative overflow-hidden">
                                        {catImage ? (
                                            <img
                                                src={catImage}
                                                alt={cat.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                                <Package className="w-12 h-12 text-slate-700" />
                                            </div>
                                        )}
                                        <span className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
                                            {count} Products
                                        </span>
                                    </div>

                                    {/* Body Content */}
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h2 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                                                {cat.name}
                                            </h2>
                                            <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed mb-4">
                                                {cat.description || 'Premium commercial and industrial grade equipment meeting high safety standards.'}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0B132B] group-hover:text-blue-600">
                                            <span>Browse Range</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryDirectory;
