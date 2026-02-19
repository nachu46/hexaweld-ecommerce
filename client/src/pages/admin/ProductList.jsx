import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Edit, Trash2, Plus, Download, Upload,
    Package, Search, Tag, AlertCircle, CheckCircle, X
} from 'lucide-react';

const Toast = ({ message, type, onClose }) => (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-white text-sm font-medium animate-fade-in-up ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
        {type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-70 transition"><X className="w-4 h-4" /></button>
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
            link.setAttribute('download', 'hexaweld-products.xlsx');
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
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Package className="w-6 h-6 text-hex-orange" />
                            Products
                            <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                {products.length}
                            </span>
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Manage your product catalog</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {/* Import */}
                        <label className={`cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition ${importing ? 'opacity-60 pointer-events-none' : ''}`}>
                            <Upload className="w-4 h-4" />
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
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition disabled:opacity-60"
                        >
                            <Download className="w-4 h-4" />
                            {exporting ? 'Exporting...' : 'Export Excel'}
                        </button>

                        {/* Add Product */}
                        <Link
                            to="/admin/product/create"
                            className="flex items-center gap-2 px-4 py-2 bg-hex-orange hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition shadow-sm"
                        >
                            <Plus className="w-4 h-4" /> Add Product
                        </Link>
                    </div>
                </div>

                {/* Search bar */}
                <div className="relative mb-5">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or SKU..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-hex-orange bg-white"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                {/* Import tip */}
                <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-xs text-blue-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                        <strong>Excel Import:</strong> If a product's SKU already exists, it will be <strong>updated</strong>. New SKUs will be <strong>created</strong>. Use Export to get the correct file format.
                    </span>
                </div>

                {/* Table */}
                <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="w-8 h-8 border-4 border-hex-orange border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Loading products...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                            <p className="font-medium">No products found</p>
                            <p className="text-sm text-gray-400 mt-1">Try a different search or add a new product</p>
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">SKU</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tags</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filtered.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50 transition">
                                        <td className="px-5 py-3.5 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg border border-gray-200 overflow-hidden bg-gray-100 flex-shrink-0">
                                                    {(product.image || product.images?.[0]) ? (
                                                        <img
                                                            src={product.image || product.images[0]}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <Package className="w-5 h-5 text-gray-300 m-auto mt-2.5" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900 line-clamp-1 max-w-[180px]">{product.name}</div>
                                                    {product.brand && <div className="text-xs text-gray-400">{product.brand}</div>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 whitespace-nowrap">
                                            <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                {product.SKU || '—'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 whitespace-nowrap">
                                            {product.category?.name ? (
                                                <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-50 text-hex-orange">
                                                    {product.category.name}
                                                </span>
                                            ) : '—'}
                                        </td>
                                        <td className="px-5 py-3.5 whitespace-nowrap text-sm text-gray-700">
                                            {product.price > 0 ? (
                                                <div>
                                                    <span className="font-semibold">₹{product.price.toLocaleString()}</span>
                                                    {product.comparePrice > 0 && (
                                                        <span className="ml-1.5 text-xs line-through text-gray-400">₹{product.comparePrice.toLocaleString()}</span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-xs">—</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5 whitespace-nowrap text-sm">
                                            {product.trackInventory ? (
                                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${product.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                                                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 text-xs">—</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex flex-wrap gap-1 max-w-[140px]">
                                                {(product.tags || []).slice(0, 2).map(t => (
                                                    <span key={t} className="inline-flex items-center gap-0.5 text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                                                        <Tag className="w-2.5 h-2.5" />{t}
                                                    </span>
                                                ))}
                                                {(product.tags || []).length > 2 && (
                                                    <span className="text-[10px] text-gray-400">+{product.tags.length - 2}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    to={`/admin/product/${product._id}/edit`}
                                                    className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => deleteHandler(product._id)}
                                                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Toast */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

export default ProductList;
