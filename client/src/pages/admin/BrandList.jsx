import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit, Trash2, Search, Image as ImageIcon, ExternalLink, Tag, ShieldCheck, RefreshCw } from 'lucide-react';

const BrandList = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchBrands = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/brands');
            setBrands(data);
        } catch (err) {
            setError('Failed to fetch brands');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete brand "${name}"?`)) return;
        try {
            await axios.delete(`/api/brands/${id}`);
            setSuccess(`Brand "${name}" deleted successfully`);
            setBrands(brands.filter(b => b._id !== id));
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete brand');
            setTimeout(() => setError(''), 3000);
        }
    };

    const filteredBrands = brands.filter(b =>
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        (b.category && b.category.toLowerCase().includes(search.toLowerCase())) ||
        (b.badgeTag && b.badgeTag.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-[#0F172A]">Brand Image Management</h1>
                    <p className="text-slate-500 text-xs mt-1">Manage brand logos, banner images, gallery photos, and tags</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchBrands}
                        className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-400 text-slate-600 transition-colors"
                        title="Refresh list"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <Link
                        to="/admin/brands/new"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#007AFF] hover:bg-[#0066CC] text-white font-bold text-xs transition-all shadow-md"
                    >
                        <Plus className="w-4 h-4" /> Add New Brand
                    </Link>
                </div>
            </div>

            {/* Notifications */}
            {error && <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">{error}</div>}
            {success && <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">{success}</div>}

            {/* Search Bar */}
            <div className="mb-6 relative max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search brand by name, category, tag..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:border-[#007AFF] outline-none shadow-sm"
                />
            </div>

            {/* Table / Cards */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-44 bg-slate-200 animate-pulse rounded-2xl" />
                    ))}
                </div>
            ) : filteredBrands.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                    <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-900 mb-1">No Brands Found</h3>
                    <p className="text-slate-500 text-xs mb-4">Add your first brand with logos and gallery images.</p>
                    <Link
                        to="/admin/brands/new"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#007AFF] text-white font-bold text-xs"
                    >
                        <Plus className="w-4 h-4" /> Add New Brand
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBrands.map((brand) => (
                        <div key={brand._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                            
                            {/* Banner / Header Preview */}
                            <div className="h-28 bg-slate-100 relative overflow-hidden flex items-center justify-center border-b border-slate-100">
                                {brand.banner ? (
                                    <img src={brand.banner} alt={brand.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-r from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 text-xs">
                                        No Banner Image
                                    </div>
                                )}

                                {/* Floating Logo */}
                                <div className="absolute left-4 bottom-2 w-14 h-14 rounded-xl bg-white border border-slate-200 shadow-md p-1.5 flex items-center justify-center">
                                    {brand.logo ? (
                                        <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                                    ) : (
                                        <span className="font-black text-slate-700 text-xs">{brand.name.substring(0, 2)}</span>
                                    )}
                                </div>

                                {/* Badge Tag */}
                                <span className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-sm text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                                    {brand.badgeTag || 'REGISTERED'}
                                </span>
                            </div>

                            {/* Content Body */}
                            <div className="p-4 pt-4 space-y-2 flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-black text-slate-900 text-base flex items-center gap-1.5">
                                        {brand.name}
                                        {brand.isRegistered && <ShieldCheck className="w-4 h-4 text-[#007AFF]" title="Registered Trademark" />}
                                    </h3>
                                    <span className="text-[10px] font-bold text-slate-400">Order: #{brand.displayOrder || 0}</span>
                                </div>

                                {brand.category && (
                                    <p className="text-[11px] font-bold text-[#007AFF] flex items-center gap-1">
                                        <Tag className="w-3 h-3" /> {brand.category}
                                    </p>
                                )}

                                {brand.description && (
                                    <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                                        {brand.description}
                                    </p>
                                )}

                                {/* Additional Images Counter */}
                                <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
                                    <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                                    <span>{(brand.images || []).length} gallery images</span>
                                </div>
                            </div>

                            {/* Actions Footer */}
                            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                {brand.website ? (
                                    <a href={brand.website} target="_blank" rel="noreferrer" className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1">
                                        Website <ExternalLink className="w-3 h-3" />
                                    </a>
                                ) : (
                                    <span className="text-[10px] text-slate-400">No URL</span>
                                )}

                                <div className="flex items-center gap-2">
                                    <Link
                                        to={`/admin/brands/${brand._id}/edit`}
                                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#007AFF] hover:border-[#007AFF] transition-colors shadow-sm"
                                        title="Edit brand & images"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(brand._id, brand.name)}
                                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-red-600 hover:border-red-300 transition-colors shadow-sm"
                                        title="Delete brand"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BrandList;
