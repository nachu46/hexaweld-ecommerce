import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Edit, Trash2, Plus, Download, Upload,
    Package, Search, Tag, AlertCircle, CheckCircle, X
} from 'lucide-react';
import AdminNav from '../../components/AdminNav';

const Toast = ({ message, type, onClose }) => (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-white text-xs font-bold animate-fade-in-up ${type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'}`}>
        {type === 'success' ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-70 transition"><X className="w-3.5 h-3.5" /></button>
    </div>
);

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [importing, setImporting] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [toast, setToast] = useState(null);
    const fileRef = useRef();

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 5000);
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = search ? { keyword: search } : {};
            const { data } = await axios.get('/api/products', { params });
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(fetchProducts, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`/api/products/${id}`);
                showToast('Product deleted successfully');
                fetchProducts();
            } catch (error) {
                showToast(error.response?.data?.message || 'Error deleting product', 'error');
            }
        }
    };

    // ── Export ──────────────────────────────────────────────────────────────
    const handleExport = async () => {
        try {
            setExporting(true);
            const response = await axios.get('/api/products/export', {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'jazatrading-products.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            showToast(`Exported ${products.length} products to Excel`);
        } catch (error) {
            showToast('Export failed: ' + (error.response?.data?.message || error.message), 'error');
        } finally {
            setExporting(false);
        }
    };

    // ── Import ──────────────────────────────────────────────────────────────
    const handleImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImporting(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const { data } = await axios.post('/api/products/import', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            showToast(data.message);
            fetchProducts();
        } catch (error) {
            showToast('Import failed: ' + (error.response?.data?.message || error.message), 'error');
        } finally {
            setImporting(false);
            e.target.value = '';
        }
    };

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.SKU || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-12">
            <AdminNav 
                title="Product Catalog Management" 
                subtitle={`Total ${products.length} products available in store.`}
                actionLink="/admin/product/create"
                actionLabel="Add Product"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                {/* Import / Export & Search Controls */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                    
                    {/* Search bar */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by product name or SKU..."
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-slate-900 bg-slate-50/50"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {/* Import */}
                        <label className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 bg-white text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition shadow-xs ${importing ? 'opacity-60 pointer-events-none' : ''}`}>
                            <Upload className="w-3.5 h-3.5 text-slate-500" />
                            {importing ? 'Importing...' : 'Import Excel'}
                            <input
                                ref={fileRef}
                                type="file"
                                className="hidden"
                                accept=".xlsx,.xls,.csv"
                                onChange={handleImport}
                            />
                        </label>

                        {/* Export */}
                        <button
                            onClick={handleExport}
                            disabled={exporting}
                            className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 bg-white text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition shadow-xs disabled:opacity-60"
                        >
                            <Download className="w-3.5 h-3.5 text-slate-500" />
                            {exporting ? 'Exporting...' : 'Export Excel'}
                        </button>
                    </div>
                </div>

                {/* Import Tip */}
                <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 text-xs text-blue-800 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-[#007AFF] shrink-0 mt-0.5" />
                    <span>
                        <strong>Excel Sync Tip:</strong> Updating an existing SKU overwrites product details; new SKUs create fresh catalog items.
                    </span>
                </div>

                {/* Table Container */}
                <div className="bg-white shadow-xs rounded-2xl border border-slate-200 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                            <p className="text-slate-500 text-xs font-bold">Loading product catalog...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="p-12 text-center text-slate-500">
                            <Package className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                            <p className="font-bold text-slate-900 text-sm">No products found</p>
                            <p className="text-xs text-slate-400 mt-1">Try another search keyword or create a new product.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-100">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-5 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-wider">Product</th>
                                        <th className="px-5 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-wider">SKU</th>
                                        <th className="px-5 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-wider">Category</th>
                                        <th className="px-5 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-wider">Price (QAR)</th>
                                        <th className="px-5 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-wider">Stock</th>
                                        <th className="px-5 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-wider">Tags</th>
                                        <th className="px-5 py-3 text-right text-[10px] font-black text-slate-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100">
                                    {filtered.map((product) => (
                                        <tr key={product._id} className="hover:bg-slate-50/60 transition-colors">
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 flex-shrink-0">
                                                        {(product.image || product.images?.[0]) ? (
                                                            <img
                                                                src={product.image || product.images[0]}
                                                                alt={product.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <Package className="w-5 h-5 text-slate-300 m-auto mt-2.5" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-bold text-slate-900 line-clamp-1 max-w-[200px]">{product.name}</div>
                                                        {product.brand && <div className="text-[10px] font-bold text-slate-400">{product.brand}</div>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                                                    {product.SKU || '—'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                {product.category?.name ? (
                                                    <span className="px-2.5 py-0.5 inline-flex text-[10px] font-bold rounded-full bg-blue-50 text-[#007AFF] border border-blue-100">
                                                        {product.category.name}
                                                    </span>
                                                ) : '—'}
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap text-xs text-slate-800 font-bold">
                                                {product.price > 0 ? (
                                                    <div>
                                                        <span>QAR {product.price.toLocaleString()}</span>
                                                        {product.comparePrice > 0 && (
                                                            <span className="ml-1.5 text-[10px] line-through text-slate-400">QAR {product.comparePrice.toLocaleString()}</span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-400 text-[10px] uppercase font-bold">RFQ / Enquiry</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap text-xs">
                                                {product.trackInventory ? (
                                                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${product.stock > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>
                                                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-400 text-[10px]">In Stock</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-3">
                                                <div className="flex flex-wrap gap-1 max-w-[140px]">
                                                    {(product.tags || []).slice(0, 2).map(t => (
                                                        <span key={t} className="inline-flex items-center gap-0.5 text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                                            <Tag className="w-2.5 h-2.5" />{t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Link
                                                        to={`/admin/product/${product._id}/edit`}
                                                        className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-900 hover:text-white transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteHandler(product._id)}
                                                        className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-rose-600 hover:text-white transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Toast */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

export default ProductList;
