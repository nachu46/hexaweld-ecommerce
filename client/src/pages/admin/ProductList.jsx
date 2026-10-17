import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Edit, Trash2, Plus, Download, Upload,
    Package, Search, Tag, AlertCircle, CheckCircle, X, Database
} from 'lucide-react';
import AdminNav from '../../components/AdminNav';

const Toast = ({ message, type, onClose }) => (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded  text-white text-xs font-bold animate-fade-in-up ${type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'}`}>
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
    const [demoBusy, setDemoBusy] = useState(false);
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

    // ── Demo products ───────────────────────────────────────────────────────
    const isDemo = (p) => (p.SKU || '').startsWith('DEMO-');
    const demoCount = products.filter(isDemo).length;

    const addDemoHandler = async () => {
        setDemoBusy(true);
        try {
            const { data } = await axios.post('/api/products/demo');
            showToast(data.message);
            fetchProducts();
        } catch (error) {
            showToast(error.response?.data?.message || 'Could not add demo products', 'error');
        } finally {
            setDemoBusy(false);
        }
    };

    const removeDemoHandler = async () => {
        if (!window.confirm(`Delete all ${demoCount} demo products? Your own products will not be touched.`)) return;
        setDemoBusy(true);
        try {
            const { data } = await axios.delete('/api/products/demo');
            showToast(data.message);
            fetchProducts();
        } catch (error) {
            showToast(error.response?.data?.message || 'Could not delete demo products', 'error');
        } finally {
            setDemoBusy(false);
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
        <div className="min-h-screen bg-neutral-50 font-sans pb-12">
            <AdminNav 
                title="Product Catalog Management" 
                subtitle={`Total ${products.length} products available in store.`}
                actionLink="/admin/product/create"
                actionLabel="Add Product"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                {/* Import / Export & Search Controls */}
                <div className="bg-white p-5 rounded border border-neutral-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                    
                    {/* Search bar */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search by product name or SKU..."
                            className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded text-xs font-medium focus:outline-none focus:border-neutral-900 bg-neutral-50/50"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {/* Demo products */}
                        {demoCount > 0 ? (
                            <button
                                onClick={removeDemoHandler}
                                disabled={demoBusy}
                                className="inline-flex items-center gap-2 px-4 py-2.5 border border-rose-200 bg-white text-rose-600 rounded text-xs font-bold hover:bg-rose-50 transition disabled:opacity-60"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                {demoBusy ? 'Deleting...' : `Delete All Demo Products (${demoCount})`}
                            </button>
                        ) : (
                            <button
                                onClick={addDemoHandler}
                                disabled={demoBusy}
                                className="inline-flex items-center gap-2 px-4 py-2.5 border border-neutral-200 bg-white text-neutral-700 rounded text-xs font-bold hover:bg-neutral-50 transition disabled:opacity-60"
                            >
                                <Database className="w-3.5 h-3.5 text-neutral-500" />
                                {demoBusy ? 'Adding...' : 'Load Demo Products'}
                            </button>
                        )}

                        {/* Import */}
                        <label className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 border border-neutral-200 bg-white text-neutral-700 rounded text-xs font-bold hover:bg-neutral-50 transition  ${importing ? 'opacity-60 pointer-events-none' : ''}`}>
                            <Upload className="w-3.5 h-3.5 text-neutral-500" />
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
                            className="inline-flex items-center gap-2 px-4 py-2.5 border border-neutral-200 bg-white text-neutral-700 rounded text-xs font-bold hover:bg-neutral-50 transition disabled:opacity-60"
                        >
                            <Download className="w-3.5 h-3.5 text-neutral-500" />
                            {exporting ? 'Exporting...' : 'Export Excel'}
                        </button>
                    </div>
                </div>

                {/* Import Tip */}
                <div className="bg-neutral-50/70 border border-neutral-100 rounded p-3.5 text-xs text-neutral-900 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                    <span>
                        <strong>Excel Sync Tip:</strong> Updating an existing SKU overwrites product details; new SKUs create fresh catalog items.
                    </span>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded border border-neutral-200 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="w-8 h-8 border-4 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                            <p className="text-neutral-500 text-xs font-bold">Loading product catalog...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="p-12 text-center text-neutral-500">
                            <Package className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
                            <p className="font-bold text-neutral-900 text-sm">No products found</p>
                            <p className="text-xs text-neutral-400 mt-1">Try another search keyword or create a new product.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-neutral-100">
                                <thead className="bg-neutral-50">
                                    <tr>
                                        <th className="px-5 py-3 text-left text-[10px] font-black text-neutral-500 uppercase tracking-wider">Product</th>
                                        <th className="px-5 py-3 text-left text-[10px] font-black text-neutral-500 uppercase tracking-wider">SKU</th>
                                        <th className="px-5 py-3 text-left text-[10px] font-black text-neutral-500 uppercase tracking-wider">Category</th>
                                        <th className="px-5 py-3 text-left text-[10px] font-black text-neutral-500 uppercase tracking-wider">Price (QAR)</th>
                                        <th className="px-5 py-3 text-left text-[10px] font-black text-neutral-500 uppercase tracking-wider">Stock</th>
                                        <th className="px-5 py-3 text-left text-[10px] font-black text-neutral-500 uppercase tracking-wider">Tags</th>
                                        <th className="px-5 py-3 text-right text-[10px] font-black text-neutral-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-neutral-100">
                                    {filtered.map((product) => (
                                        <tr key={product._id} className="hover:bg-neutral-50/60 transition-colors">
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded border border-neutral-200 overflow-hidden bg-neutral-100 flex-shrink-0">
                                                        {(product.image || product.images?.[0]) ? (
                                                            <img
                                                                src={product.image || product.images[0]}
                                                                alt={product.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <Package className="w-5 h-5 text-neutral-300 m-auto mt-2.5" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-bold text-neutral-900 line-clamp-1 max-w-[200px]">
                                                            {product.name}
                                                            {isDemo(product) && <span className="ml-1.5 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">Demo</span>}
                                                        </div>
                                                        {product.brand && <div className="text-[10px] font-bold text-neutral-400">{product.brand}</div>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <span className="text-[10px] font-mono font-bold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
                                                    {product.SKU || '—'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                {product.category?.name ? (
                                                    <span className="px-2.5 py-0.5 inline-flex text-[10px] font-bold rounded-full bg-neutral-50 text-[#111111] border border-neutral-100">
                                                        {product.category.name}
                                                    </span>
                                                ) : '—'}
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap text-xs text-neutral-800 font-bold">
                                                {product.price > 0 ? (
                                                    <div>
                                                        <span>QAR {product.price.toLocaleString()}</span>
                                                        {product.comparePrice > 0 && (
                                                            <span className="ml-1.5 text-[10px] line-through text-neutral-400">QAR {product.comparePrice.toLocaleString()}</span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-neutral-400 text-[10px] uppercase font-bold">RFQ / Enquiry</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap text-xs">
                                                {product.trackInventory ? (
                                                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${product.stock > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>
                                                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                                    </span>
                                                ) : (
                                                    <span className="text-neutral-400 text-[10px]">In Stock</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-3">
                                                <div className="flex flex-wrap gap-1 max-w-[140px]">
                                                    {(product.tags || []).slice(0, 2).map(t => (
                                                        <span key={t} className="inline-flex items-center gap-0.5 text-[9px] font-bold bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded">
                                                            <Tag className="w-2.5 h-2.5" />{t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Link
                                                        to={`/admin/product/${product._id}/edit`}
                                                        className="p-1.5 rounded bg-neutral-100 text-neutral-700 hover:bg-neutral-900 hover:text-white transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteHandler(product._id)}
                                                        className="p-1.5 rounded bg-neutral-100 text-neutral-700 hover:bg-rose-600 hover:text-white transition-colors"
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
