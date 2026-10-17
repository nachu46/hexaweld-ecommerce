import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Package, ArrowRight, Layers } from 'lucide-react';
import { getImageUrl } from '../utils/getImageUrl';

import PageBanner from '../components/PageBanner';
const API_URL = import.meta.env.VITE_API_URL || '';

const CategoryDirectory = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                const [cRes, pRes] = await Promise.all([
                    axios.get('/api/categories'),
                    axios.get('/api/products'),
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
        <div className="bg-white min-h-screen text-[#111111]">
            <Helmet>
                <title>Product Categories | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Browse comprehensive product categories: Welding Machines, Safety Boots, Lock Cylinders, Hand Tools, Sanitary Wares, and Power Tools." />
            </Helmet>
            <PageBanner page="categories" title="Product Categories" subtitle="Browse our full range of building materials, tools, hardware and safety products." />
            <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
{/* Categories Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="h-64 bg-white rounded-xl border border-neutral-200 p-6" />
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
                                    className="bg-white rounded-xl border border-neutral-200 hover:border-[#111111] transition-all duration-300 overflow-hidden flex flex-col group relative"
                                >
                                    {/* Image Top */}
                                    <div className="h-44 w-full bg-neutral-100 relative overflow-hidden">
                                        {catImage ? (
                                            <img
                                                src={catImage}
                                                alt={cat.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-[#EDEDED] flex items-center justify-center">
                                                <Package className="w-12 h-12 text-[#111111]" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Body Content */}
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h2 className="text-xl font-semibold text-neutral-900 group-hover:text-neutral-900 transition-colors mb-2">
                                                {cat.name}
                                            </h2>
                                            <p className="text-xs text-neutral-500 font-medium line-clamp-2 leading-relaxed mb-4">
                                                {cat.description || 'Premium commercial and industrial grade equipment meeting high safety standards.'}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#111111] group-hover:text-neutral-900">
                                            <span>{count} {count === 1 ? 'Product' : 'Products'}</span>
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
        </div>
    );
};

export default CategoryDirectory;
