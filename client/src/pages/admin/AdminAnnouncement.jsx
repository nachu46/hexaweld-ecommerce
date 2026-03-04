import { useState, useEffect } from 'react';
import axios from 'axios';
import { Megaphone, Plus, Trash2, Edit2, Loader2, Link as LinkIcon, Eye, EyeOff, Save, List, Package, Tag } from 'lucide-react';

const EMPTY_FORM = {
    badge: 'PROMO',
    message: 'Free shipping on industrial orders over 50,000 AED.',
    linkText: 'Shop Now',
    linkUrl: '/products',
    isActive: true,
    bgColor: '#0F172A',
    textColor: '#ffffff',
    accentColor: '#007AFF'
};

const PRESET_COLORS = [
    { bg: '#0F172A', text: '#ffffff', accent: '#007AFF' }, // Dark Slate + Orange
    { bg: '#2563EB', text: '#ffffff', accent: '#FBBF24' }, // Blue + Yellow
    { bg: '#16A34A', text: '#ffffff', accent: '#FFFFFF' }, // Green + White
    { bg: '#DC2626', text: '#ffffff', accent: '#FFFFFF' }, // Red (Urgent) + White
    { bg: '#007AFF', text: '#ffffff', accent: '#0F172A' }, // Orange + Dark
    { bg: '#F8FAFC', text: '#0F172A', accent: '#2563EB' }, // Light + Blue
];

const AdminAnnouncement = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(EMPTY_FORM);
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [linkTab, setLinkTab] = useState('category'); // 'category' | 'product' | 'custom'

    useEffect(() => {
        fetchAnnouncements();
        axios.get('/api/categories').then(({ data }) => setCategories(data)).catch(() => { });
        axios.get('/api/products').then(({ data }) => setProducts(data)).catch(() => { });
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const { data } = await axios.get('/api/announcement/all');
            setAnnouncements(data);
        } catch (err) {
            flash('error', 'Failed to fetch announcements');
        } finally {
            setLoading(false);
        }
    };

    const flash = (type, msg) => {
        if (type === 'error') { setError(msg); setSuccess(''); }
        else { setSuccess(msg); setError(''); }
        setTimeout(() => { setError(''); setSuccess(''); }, 3000);
    };

    const field = (name, val) => setForm(prev => ({ ...prev, [name]: val }));

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editId) {
                await axios.put(`/api/announcement/${editId}`, form);
                flash('success', 'Announcement updated successfully');
            } else {
                await axios.post('/api/announcement', form);
                flash('success', 'Announcement created successfully');
            }
            setShowForm(false);
            fetchAnnouncements();
        } catch (err) {
            flash('error', err.response?.data?.message || 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            await axios.put(`/api/announcement/${id}`, { isActive: !currentStatus });
            setAnnouncements(prev => prev.map(a => a._id === id ? { ...a, isActive: !currentStatus } : a));
            flash('success', `Announcement turned ${currentStatus ? 'OFF' : 'ON'}`);
        } catch (err) {
            flash('error', 'Failed to update status');
        }
    };

    const deleteAnn = async (id) => {
        if (!window.confirm('Are you sure you want to delete this announcement?')) return;
        try {
            await axios.delete(`/api/announcement/${id}`);
            setAnnouncements(prev => prev.filter(a => a._id !== id));
            flash('success', 'Announcement deleted');
        } catch (err) {
            flash('error', 'Failed to delete');
        }
    };

    const renderPreview = (data) => (
        <div style={{ backgroundColor: data.bgColor, color: data.textColor }} className="text-xs font-medium py-3 px-4 text-center rounded-xl shadow-sm border border-black/5 mt-2 transition-colors">
            <span className="font-bold" style={{ color: data.accentColor }}>{data.badge}:</span>{' '}
            {data.message || 'Your announcement message goes here.'}{' '}
            {data.linkText && (
                <span className="underline ml-1 cursor-pointer" style={{ color: data.accentColor }}>
                    {data.linkText}
                </span>
            )}
        </div>
    );

    if (loading) return <div className="p-8 flex justify-center text-slate-400"><Loader2 className="w-8 h-8 animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <Megaphone className="w-7 h-7 text-slate-500 shrink-0" />
                        Manage Promos
                    </h1>
                    <p className="text-sm text-slate-500 mt-1 font-medium">Create and manage top bar announcements</p>
                </div>
                {!showForm && (
                    <button onClick={() => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true); }} className="btn-primary flex items-center justify-center gap-2 py-2.5 w-full sm:w-auto">
                        <Plus className="w-4 h-4" /> Add Promo
                    </button>
                )}
            </div>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 flex items-center gap-2">{error}</div>}
            {success && <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl text-sm font-bold border border-emerald-100 flex items-center gap-2">{success}</div>}

            {showForm ? (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                        <h2 className="text-base font-bold text-slate-900">{editId ? 'Edit Promo' : 'New PromoBar'}</h2>
                        <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">Cancel</button>
                    </div>

                    <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-6">
                        {/* Live Preview */}
                        <div>
                            <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">Live Preview (Desktop scale)</label>
                            {renderPreview(form)}
                        </div>

                        {/* Content Grid */}
                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Badge / Tag</label>
                                <input type="text" className="input" placeholder="PROMO, SALE, ALERT"
                                    value={form.badge} onChange={e => field('badge', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                                    Message <span className="text-[10px] text-slate-400 font-normal">Required</span>
                                </label>
                                <input type="text" className="input" placeholder="Main announcement text" required
                                    value={form.message} onChange={e => field('message', e.target.value)} />
                            </div>

                            {/* Link Fields */}
                            <div>
                                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Link Text</label>
                                <input type="text" className="input" placeholder="Shop Now"
                                    value={form.linkText} onChange={e => field('linkText', e.target.value)} />
                            </div>
                            {/* Link URL — smart picker */}
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Link URL</label>

                                {/* Tab row */}
                                <div className="flex gap-1 mb-2 border border-slate-200 rounded-lg p-1 bg-slate-50">
                                    {[
                                        { id: 'category', icon: List, label: 'Category' },
                                        { id: 'product', icon: Package, label: 'Product' },
                                        { id: 'custom', icon: LinkIcon, label: 'Custom' },
                                    ].map(({ id, icon: Icon, label }) => (
                                        <button key={id} type="button"
                                            onClick={() => setLinkTab(id)}
                                            className={`flex items-center gap-1 flex-1 justify-center py-1.5 rounded-md text-xs font-bold transition-all ${linkTab === id
                                                ? 'bg-white shadow text-[#007AFF]'
                                                : 'text-slate-500 hover:text-slate-700'
                                                }`}>
                                            <Icon className="w-3 h-3" />{label}
                                        </button>
                                    ))}
                                </div>

                                {/* Category picker */}
                                {linkTab === 'category' && (
                                    <div className="space-y-1.5">
                                        <button type="button"
                                            onClick={() => field('linkUrl', '/products')}
                                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-left text-xs font-semibold transition-all ${form.linkUrl === '/products'
                                                ? 'border-blue-500 bg-slate-50 text-slate-800'
                                                : 'border-slate-200 hover:border-slate-400 text-slate-700'
                                                }`}>
                                            <Tag className="w-3.5 h-3.5 shrink-0" />
                                            All Products
                                            <span className="ml-auto text-slate-400 font-mono text-[10px]">/products</span>
                                        </button>
                                        {categories.length === 0 && (
                                            <p className="text-xs text-slate-400 py-2 text-center">No categories found</p>
                                        )}
                                        {categories.map(cat => {
                                            const href = `/products?category=${cat._id}`;
                                            return (
                                                <button key={cat._id} type="button"
                                                    onClick={() => field('linkUrl', href)}
                                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-left text-xs font-semibold transition-all ${form.linkUrl === href
                                                        ? 'border-blue-500 bg-slate-50 text-slate-800'
                                                        : 'border-slate-200 hover:border-slate-400 text-slate-700'
                                                        }`}>
                                                    {cat.image
                                                        ? <img src={cat.image} alt={cat.name} className="w-5 h-5 rounded object-contain shrink-0" />
                                                        : <List className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                                                    }
                                                    {cat.name}
                                                    <span className="ml-auto text-slate-400 font-mono text-[10px] truncate">{href}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Product picker */}
                                {linkTab === 'product' && (
                                    <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                                        {products.length === 0 && (
                                            <p className="text-xs text-slate-400 py-2 text-center">No products found</p>
                                        )}
                                        {products.map(prod => {
                                            const href = `/product/${prod._id}`;
                                            return (
                                                <button key={prod._id} type="button"
                                                    onClick={() => field('linkUrl', href)}
                                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-left text-xs font-semibold transition-all ${form.linkUrl === href
                                                        ? 'border-blue-500 bg-slate-50 text-slate-800'
                                                        : 'border-slate-200 hover:border-slate-400 text-slate-700'
                                                        }`}>
                                                    {prod.images?.[0]
                                                        ? <img src={prod.images[0]} alt={prod.name} className="w-6 h-6 rounded object-contain shrink-0" />
                                                        : <Package className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                                                    }
                                                    <span className="truncate flex-1">{prod.name}</span>
                                                    <span className="ml-auto text-slate-400 font-mono text-[10px] shrink-0">#{prod._id.slice(-6)}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Custom link */}
                                {linkTab === 'custom' && (
                                    <input type="text" className="input" placeholder="e.g. /products or https://…"
                                        value={form.linkUrl} onChange={e => field('linkUrl', e.target.value)} />
                                )}

                                {/* Always show current value */}
                                <div className="flex items-center gap-1.5 mt-1.5 px-2 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                                    <LinkIcon className="w-3 h-3 text-slate-400 shrink-0" />
                                    <span className="text-[11px] text-slate-500 font-mono truncate">{form.linkUrl || '/products'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Appearance / Colors */}
                        <div className="pt-4 border-t border-slate-100">
                            <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">Appearance Presets</label>
                            <div className="flex flex-wrap gap-3 mb-4">
                                {PRESET_COLORS.map((color, idx) => (
                                    <button key={idx} type="button"
                                        onClick={() => { field('bgColor', color.bg); field('textColor', color.text); field('accentColor', color.accent); }}
                                        className={`w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-all ${form.bgColor === color.bg ? 'ring-2 ring-blue-500 ring-offset-2 scale-110' : 'hover:scale-105 border border-black/10'}`}
                                        style={{ backgroundColor: color.bg }}
                                    >
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color.accent }} />
                                    </button>
                                ))}
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Background</label>
                                    <input type="color" value={form.bgColor} onChange={e => field('bgColor', e.target.value)} className="w-full h-10 p-1 rounded-lg border border-slate-200 cursor-pointer" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Text Color</label>
                                    <input type="color" value={form.textColor} onChange={e => field('textColor', e.target.value)} className="w-full h-10 p-1 rounded-lg border border-slate-200 cursor-pointer" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Accent (Badge/Link)</label>
                                    <input type="color" value={form.accentColor} onChange={e => field('accentColor', e.target.value)} className="w-full h-10 p-1 rounded-lg border border-slate-200 cursor-pointer" />
                                </div>
                            </div>
                        </div>

                        {/* Toggles & Save */}
                        <div className="pt-5 flex items-center justify-between border-t border-slate-100">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`relative w-11 h-6 rounded-full transition-colors ${form.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${form.isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                                    <input type="checkbox" className="sr-only" checked={form.isActive} onChange={() => field('isActive', !form.isActive)} />
                                </div>
                                <span className={`text-sm font-bold ${form.isActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                                    {form.isActive ? 'Active (Visible)' : 'Hidden (Draft)'}
                                </span>
                            </label>
                            <button type="submit" disabled={saving} className="btn-primary py-2.5 px-6 flex items-center gap-2">
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {saving ? 'Saving...' : 'Save Promo'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid gap-4">
                    {announcements.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-10 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Megaphone className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">No announcements yet</h3>
                            <p className="text-sm text-slate-500 mt-1 mb-6">Create a top bar promotion to highlight sales or shipping offers.</p>
                            <button onClick={() => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true); }} className="btn-primary inline-flex">
                                Create First Promo
                            </button>
                        </div>
                    ) : (
                        announcements.map(ann => (
                            <div key={ann._id} className={`bg-white rounded-2xl border transition-all ${ann.isActive ? 'border-slate-200 shadow-sm ring-1 ring-slate-500/5' : 'border-slate-200 opacity-60'}`}>
                                <div className="p-4 sm:p-5 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-2">
                                            {ann.isActive ? (
                                                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">Active</span>
                                            ) : (
                                                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">Hidden</span>
                                            )}
                                            <span className="text-xs font-semibold text-slate-500">Updated {new Date(ann.updatedAt).toLocaleDateString()}</span>
                                        </div>
                                        {/* Component Preview inside Card */}
                                        <div className="pointer-events-none rounded-lg overflow-hidden">
                                            {renderPreview(ann)}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 md:pl-4 md:border-l border-slate-100 shrink-0">
                                        <button onClick={() => toggleStatus(ann._id, ann.isActive)}
                                            className={`p-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors ${ann.isActive ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
                                            title={ann.isActive ? 'Hide Announcement' : 'Set as Active'}>
                                            {ann.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            <span className="md:hidden lg:inline">{ann.isActive ? 'Hide' : 'Show'}</span>
                                        </button>
                                        <button onClick={() => { setForm(ann); setEditId(ann._id); setShowForm(true); }}
                                            className="p-2 rounded-lg bg-slate-50 text-blue-700 hover:bg-slate-100 transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => deleteAnn(ann._id)}
                                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminAnnouncement;
