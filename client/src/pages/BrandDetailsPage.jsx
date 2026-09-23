import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Tag, ExternalLink, ArrowLeft, Package, AlertCircle } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import QuickPreviewModal from '../components/QuickPreviewModal';
import { getImageUrl } from '../utils/getImageUrl';

const API_URL = import.meta.env.VITE_API_URL || '';

const BrandDetailsPage = () => {
    const { slug } = useParams();
    const [brand, setBrand] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [previewProduct, setPreviewProduct] = useState(null);

    useEffect(() => {
        const fetchBrandAndProducts = async () => {
            setLoading(true);
            setNotFound(false);
            try {
                // 1. Fetch Brand Data
                const { data: brandData } = await axios.get(`${API_URL}/api/brands/${slug}`);
                setBrand(brandData);

                // 2. Fetch Products for Brand
                const { data: allProducts } = await axios.get(`${API_URL}/api/products`);
                const brandProducts = allProducts.filter(p =>
                    p.brand && p.brand.trim().toLowerCase() === brandData.name.trim().toLowerCase()
                );
                setProducts(brandProducts);
            } catch (err) {
                console.error('Brand not found or error loading:', err);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchBrandAndProducts();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-[#0B132B] border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs font-bold text-slate-500">Loading Brand Catalog...</p>
                </div>
            </div>
        );
    }

    if (notFound || !brand) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-16">
                <Helmet>
                    <title>Brand Not Found | Jaza Trading W.L.L</title>
                </Helmet>
                <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 text-center shadow-lg">
                    <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-black text-slate-900 mb-2">Brand Not Found</h1>
                    <p className="text-xs text-slate-600 font-medium mb-6">
                        The requested brand profile could not be found or has been removed from our system.
                    </p>
                    <Link
                        to="/brands"
                        className="inline-flex items-center justify-center gap-2 bg-[#0B132B] text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-slate-800 transition-colors shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        View All Partner Brands
                    </Link>
                </div>
            </div>
        );
    }

    const logoUrl = getImageUrl(brand.logo);
    const bannerUrl = getImageUrl(brand.banner);

    return (
        <div className="bg-slate-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>{`${brand.name} Products & Equipment | Jaza Trading W.L.L Qatar`}</title>
                <meta name="description" content={brand.description || `Browse authorized ${brand.name} products, equipment, and specs available from Jaza Trading W.L.L in Qatar.`} />
                <meta property="og:title" content={`${brand.name} Authorized Products`} />
                <meta property="og:image" content={logoUrl || bannerUrl} />
            </Helmet>

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Back Link */}
                <Link
                    to="/brands"
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to All Brands
                </Link>

                {/* Brand Hero Header */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden relative">
                    {/* Top Banner Image */}
                    <div className="h-48 sm:h-64 w-full bg-slate-900 relative">
                        {bannerUrl ? (
                            <img src={bannerUrl} alt={brand.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                                <span className="text-white/10 font-black text-4xl uppercase tracking-widest">{brand.name}</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Brand Details Bar */}
                    <div className="p-6 sm:p-10 relative pt-16 sm:pt-20">
                        {/* Logo Box */}
                        <div className="absolute -top-16 sm:-top-20 left-6 sm:left-10 w-28 h-28 sm:w-36 sm:h-36 bg-white rounded-3xl border-4 border-white shadow-xl p-3 flex items-center justify-center overflow-hidden">
                            {logoUrl ? (
                                <img src={logoUrl} alt={brand.name} className="max-h-full max-w-full object-contain" />
                            ) : (
                                <span className="font-black text-lg text-slate-900">{brand.name}</span>
                            )}
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                                <div className="flex items-center gap-3 flex-wrap mb-1">
                                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900">{brand.name}</h1>
                                    {brand.isRegistered !== false && (
                                        <span className="bg-amber-100 border border-amber-200 text-amber-900 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                                            REGISTERED TRADEMARK®
                                        </span>
                                    )}
                                </div>
                                {brand.badgeTag && (
                                    <p className="text-sm font-bold text-blue-600 flex items-center gap-1.5">
                                        <Tag className="w-4 h-4" />
                                        {brand.badgeTag}
                                    </p>
                                )}
                            </div>

                            {brand.website && (
                                <a
                                    href={brand.website.startsWith('http') ? brand.website : `https://${brand.website}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2.5 rounded-xl font-bold text-xs transition-colors self-start md:self-auto"
                                >
                                    Official Brand Site <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            )}
                        </div>

                        <p className="text-sm text-slate-600 font-medium max-w-3xl leading-relaxed mb-6">
                            {brand.description || `${brand.name} is a leading global brand of industrial tools and equipment distributed in Qatar by Jaza Trading W.L.L.`}
                        </p>

                        {/* Brand Additional Images / Gallery */}
                        {brand.images && brand.images.length > 0 && (
                            <div className="pt-6 border-t border-slate-100">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Brand Gallery</p>
                                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                                    {brand.images.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={getImageUrl(img)}
                                            alt={`${brand.name} gallery ${idx + 1}`}
                                            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border border-slate-200 shrink-0"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Brand Products Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                            <Package className="w-5 h-5 text-[#0B132B]" />
                            <h2 className="text-xl font-black text-slate-900">
                                Products by {brand.name} ({products.length})
                            </h2>
                        </div>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map((p) => (
                                <ProductCard key={p._id} product={p} onQuickView={setPreviewProduct} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
                            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-slate-900 mb-1">No Dedicated Products Found</h3>
                            <p className="text-xs text-slate-500 mb-4">
                                Specific catalog items for {brand.name} are currently being added. Contact our sales office for inquiries.
                            </p>
                            <Link to="/contact" className="inline-flex items-center gap-2 bg-[#0B132B] text-white px-5 py-2.5 rounded-xl font-bold text-xs">
                                Request Quote for {brand.name}
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Preview Modal */}
            {previewProduct && (
                <QuickPreviewModal product={previewProduct} onClose={() => setPreviewProduct(null)} />
            )}
        </div>
    );
};

export default BrandDetailsPage;
