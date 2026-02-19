import { useEffect, useState } from 'react';
import axios from 'axios';
import { MessageCircle, Search, X, Phone, Mail, Package, ExternalLink, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SOURCE_LABELS = {
    whatsapp: { label: 'WhatsApp', color: 'bg-green-100 text-green-700 border-green-200' },
    form: { label: 'Quote Form', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    quick_view: { label: 'Quick View', color: 'bg-blue-100 text-blue-700 border-blue-200' },
};

const AdminEnquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sourceFilter, setSourceFilter] = useState('');

    useEffect(() => {
        axios.get('/api/enquiries')
            .then(({ data }) => setEnquiries(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filtered = enquiries.filter(e => {
        const q = search.toLowerCase();
        const matchSearch = !q || [e.productName, e.customerName, e.customerPhone, e.customerEmail, e.SKU]
            .some(v => v && v.toLowerCase().includes(q));
        const matchSource = !sourceFilter || e.source === sourceFilter;
        return matchSearch && matchSource;
    });

    const exportCSV = () => {
        const headers = ['Date', 'Product', 'SKU', 'Source', 'Name', 'Phone', 'Email', 'Message'];
        const rows = filtered.map(e => [
            new Date(e.createdAt).toLocaleDateString('en-IN'),
            `"${e.productName || ''}"`,
            e.SKU || '',
            e.source,
            `"${e.customerName || ''}"`,
            e.customerPhone || '',
            e.customerEmail || '',
            `"${(e.message || '').replace(/"/g, '""')}"`,
        ].join(','));
        const csv = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
    };

    const totalBySource = (src) => enquiries.filter(e => e.source === src).length;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                            <MessageCircle className="w-6 h-6 text-[#F97316]" />
                            Customer Enquiries
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">{enquiries.length} total enquiries</p>
                    </div>
                    <button
                        onClick={exportCSV}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-orange-300 text-gray-700 hover:text-[#F97316] text-sm font-medium rounded-lg transition-all shadow-sm"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                        { label: 'WhatsApp Clicks', count: totalBySource('whatsapp'), color: 'bg-green-50 border-green-200 text-green-700' },
                        { label: 'Quote Requests', count: totalBySource('form'), color: 'bg-orange-50 border-orange-200 text-orange-700' },
                        { label: 'Quick View', count: totalBySource('quick_view'), color: 'bg-blue-50 border-blue-200 text-blue-700' },
                    ].map(({ label, count, color }) => (
                        <div key={label} className={`border rounded-xl p-4 ${color}`}>
                            <p className="text-2xl font-black">{count}</p>
                            <p className="text-xs font-semibold mt-0.5">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Filters row */}
                <div className="flex flex-wrap gap-3 mb-5">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by product, name, phone..."
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 bg-white"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        {search && (
                            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2">
                        {['', 'whatsapp', 'form', 'quick_view'].map(src => (
                            <button
                                key={src}
                                onClick={() => setSourceFilter(src)}
                                className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${sourceFilter === src
                                        ? 'bg-[#F97316] border-[#F97316] text-white'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-orange-300'
                                    }`}
                            >
                                {src === '' ? 'All' : src === 'quick_view' ? 'Quick View' : src === 'form' ? 'Quote Form' : 'WhatsApp'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="text-center py-16 text-gray-400 text-sm">Loading enquiries…</div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16">
                        <MessageCircle className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                        <p className="text-gray-500">No enquiries found.</p>
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        {['Date', 'Product', 'Source', 'Customer', 'Contact', 'Message', ''].map(h => (
                                            <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filtered.map((e, i) => {
                                        const src = SOURCE_LABELS[e.source] || SOURCE_LABELS.form;
                                        return (
                                            <motion.tr
                                                key={e._id}
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.03 }}
                                                className="hover:bg-gray-50 transition-colors"
                                            >
                                                {/* Date */}
                                                <td className="px-4 py-3 whitespace-nowrap text-gray-500 text-xs">
                                                    {new Date(e.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                    <br />
                                                    <span className="text-gray-400">{new Date(e.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                                                </td>

                                                {/* Product */}
                                                <td className="px-4 py-3 max-w-[180px]">
                                                    <p className="font-semibold text-gray-800 line-clamp-2 text-xs">{e.productName || '—'}</p>
                                                    {e.SKU && <span className="text-[10px] font-mono text-gray-400">SKU: {e.SKU}</span>}
                                                </td>

                                                {/* Source */}
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${src.color}`}>
                                                        {src.label}
                                                    </span>
                                                </td>

                                                {/* Customer */}
                                                <td className="px-4 py-3">
                                                    <p className="font-medium text-gray-800 text-xs">{e.customerName || '—'}</p>
                                                </td>

                                                {/* Contact */}
                                                <td className="px-4 py-3 text-xs text-gray-600 space-y-1">
                                                    {e.customerPhone && (
                                                        <a href={`tel:${e.customerPhone}`} className="flex items-center gap-1 hover:text-[#F97316] transition-colors">
                                                            <Phone className="w-3 h-3" />{e.customerPhone}
                                                        </a>
                                                    )}
                                                    {e.customerEmail && (
                                                        <a href={`mailto:${e.customerEmail}`} className="flex items-center gap-1 hover:text-[#F97316] transition-colors">
                                                            <Mail className="w-3 h-3" />{e.customerEmail}
                                                        </a>
                                                    )}
                                                    {!e.customerPhone && !e.customerEmail && '—'}
                                                </td>

                                                {/* Message */}
                                                <td className="px-4 py-3 max-w-[200px]">
                                                    <p className="text-xs text-gray-500 line-clamp-2">{e.message || '—'}</p>
                                                </td>

                                                {/* View product */}
                                                <td className="px-4 py-3">
                                                    {e.productId?._id && (
                                                        <Link
                                                            to={`/product/${e.productId._id}`}
                                                            target="_blank"
                                                            className="text-gray-400 hover:text-[#F97316] transition-colors"
                                                            title="View product"
                                                        >
                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                        </Link>
                                                    )}
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default AdminEnquiries;
