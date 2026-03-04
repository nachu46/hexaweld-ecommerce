import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    Plus, Trash2, Edit2, Check, X, Eye, EyeOff,
    Upload, Image, Loader2, ChevronUp, ChevronDown,
    LayoutTemplate, ArrowRight, Link, Package, List, Tag,
} from 'lucide-react';

const GRADIENT_PRESETS = [
    { label: 'Navy → Steel', value: 'from-[#0F172A] to-[#1E3A5F]' },
    { label: 'Dark → Midnight', value: 'from-[#1a1a2e] to-[#16213e]' },
    { label: 'Violet → Deep', value: 'from-[#2D1B69] to-[#1a0a3e]' },
    { label: 'Slate → Dark', value: 'from-slate-800 to-slate-950' },
    { label: 'Orange → Red', value: 'from-blue-700 to-red-700' },
    { label: 'Green → Teal', value: 'from-emerald-700 to-teal-800' },
];

const ACCENT_PRESETS = ['#007AFF', '#22C55E', '#A78BFA', '#3B82F6', '#EF4444', '#F59E0B'];

const EMPTY_FORM = {
    label: '',
    title: '',
    subtitle: '',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    bgGradient: 'from-[#0F172A] to-[#1E3A5F]',
    accentColor: '#007AFF',
    image: '',
    isActive: true,
    order: 0,
};

const token = () => {
    const user = JSON.parse(localStorage.getItem('userInfo') || '{}');
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
};

/* ── Mini live banner preview ── */
const BannerPreview = ({ form }) => (
    <div
        className={`bg-gradient-to-r ${form.bgGradient} rounded-xl p-6 relative overflow-hidden`}
        style={{ minHeight: '140px' }}
    >
        <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20h20v20H20zM0 0h20v20H0z'/%3E%3C/g%3E%3C/svg%3E")` }}
        />
        {form.image && (
            <div className="absolute inset-0">
                <img src={form.image} alt="" className="w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </div>
        )}
        <div className="relative">
            {form.label && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border mb-3"
                    style={{ color: form.accentColor, borderColor: `${form.accentColor}40`, background: `${form.accentColor}15` }}>
                    <span className="w-1 h-1 rounded-full" style={{ background: form.accentColor }} />
                    {form.label || 'BADGE'}
                </span>
            )}
            <h3 className="text-xl font-black text-white mb-1">{form.title || 'Banner Title'}</h3>
            <p className="text-slate-300 text-xs mb-3">{form.subtitle || 'Subtitle goes here…'}</p>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold"
                style={{ background: form.accentColor, color: '#fff' }}>
                {form.buttonText || 'Shop Now'} <ArrowRight className="w-3 h-3" />
            </span>
        </div>
    </div>
);

const AdminBanners = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(EMPTY_FORM);
    const [editId, setEditId] = useState(null);         // null = add mode, string = edit mode
    const [showForm, setShowForm] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const fileRef = useRef();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [linkTab, setLinkTab] = useState('category'); // 'category' | 'product' | 'custom'

    const flash = (type, msg) => {
        if (type === 'success') { setSuccess(msg); setError(''); }
        else { setError(msg); setSuccess(''); }
        setTimeout(() => { setSuccess(''); setError(''); }, 3500);
    };

    const fetchBanners = async () => {
        try {
            const { data } = await axios.get('/api/banners/all', { headers: token() });
            setBanners(data);
        } catch {
            setError('Could not load banners.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
        // Load categories and products for link picker
        axios.get('/api/categories').then(({ data }) => setCategories(data)).catch(() => { });
        axios.get('/api/products').then(({ data }) => setProducts(data)).catch(() => { });
    }, []);

    /* ── Image upload ── */
    const uploadImage = async (file) => {
        const fd = new FormData();
        fd.append('image', file);
        setUploading(true);
        try {
            const { data } = await axios.post('/api/upload', fd);
            setForm(f => ({ ...f, image: `http://localhost:5000${data}` }));
        } catch {
            flash('error', 'Image upload failed.');
        } finally {
            setUploading(false);
        }
    };

    /* ── Open add form ── */
    const openAdd = () => {
        setForm(EMPTY_FORM);
        setEditId(null);
        setShowForm(true);
    };

    /* ── Open edit form ── */
    const openEdit = (banner) => {
        setForm({
            label: banner.label || '',
            title: banner.title || '',
            subtitle: banner.subtitle || '',
            buttonText: banner.buttonText || 'Shop Now',
            buttonLink: banner.buttonLink || '/products',
            bgGradient: banner.bgGradient || 'from-[#0F172A] to-[#1E3A5F]',
            accentColor: banner.accentColor || '#007AFF',
            image: banner.image || '',
            isActive: banner.isActive,
            order: banner.order ?? 0,
        });
        setEditId(banner._id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /* ── Save (create or update) ── */
    const saveHandler = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) { flash('error', 'Title is required.'); return; }
        setSaving(true);
        try {
            if (editId) {
                await axios.put(`/api/banners/${editId}`, form, { headers: token() });
                flash('success', 'Banner updated!');
            } else {
                await axios.post('/api/banners', form, { headers: token() });
                flash('success', 'Banner created!');
            }
            setShowForm(false);
            setEditId(null);
            setForm(EMPTY_FORM);
            fetchBanners();
        } catch (err) {
            flash('error', err.response?.data?.message || 'Error saving banner.');
        } finally {
            setSaving(false);
        }
    };

    /* ── Toggle active ── */
    const toggleActive = async (banner) => {
        try {
            await axios.put(`/api/banners/${banner._id}`, { isActive: !banner.isActive }, { headers: token() });
            fetchBanners();
        } catch {
            flash('error', 'Could not toggle banner.');
        }
    };

    /* ── Move order ── */
    const moveOrder = async (banner, dir) => {
        try {
            await axios.put(`/api/banners/${banner._id}`, { order: (banner.order ?? 0) + dir }, { headers: token() });
            fetchBanners();
        } catch {
            flash('error', 'Could not reorder banner.');
        }
    };

    /* ── Delete ── */
    const deleteHandler = async (id) => {
        if (!window.confirm('Delete this banner? This cannot be undone.')) return;
        try {
            await axios.delete(`/api/banners/${id}`, { headers: token() });
            flash('success', 'Banner deleted.');
            fetchBanners();
        } catch {
            flash('error', 'Error deleting banner.');
        }
    };

    const field = (key, value) => setForm(f => ({ ...f, [key]: value }));

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {/* Header */}
            <div className="flex items-center justify-between mb-7">
                <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Homepage</span>
                    <h1 className="text-2xl font-black text-[#0F172A]">Manage Banners</h1>
                </div>
                {!showForm && (
                    <button onClick={openAdd}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#007AFF] hover:bg-blue-700 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-slate-200 text-sm">
                        <Plus className="w-4 h-4" /> New Banner
                    </button>
                )}
            </div>

            {/* Alerts */}
            {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
            {success && <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg text-sm">{success}</div>}

            {/* ── Add / Edit Form ── */}
            {showForm && (
                <div className="card rounded-2xl shadow-card-lg p-6 mb-8 border border-slate-100">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                            <LayoutTemplate className="w-4 h-4 text-slate-500" />
                            {editId ? 'Edit Banner' : 'Add New Banner'}
                        </h2>
                        <button onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM); }}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left: Form fields */}
                        <form onSubmit={saveHandler} className="space-y-4">

                            {/* Badge label */}
                            <div>
                                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Badge Label</label>
                                <input type="text" className="input" placeholder="e.g. NEW ARRIVALS"
                                    value={form.label} onChange={e => field('label', e.target.value)} />
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Title <span className="text-red-400">*</span></label>
                                <input type="text" className="input" placeholder="e.g. Premium Welding Machines"
                                    value={form.title} onChange={e => field('title', e.target.value)} />
                            </div>

                            {/* Subtitle */}
                            <div>
                                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Subtitle</label>
                                <input type="text" className="input" placeholder="Short description…"
                                    value={form.subtitle} onChange={e => field('subtitle', e.target.value)} />
                            </div>

                            {/* Button Text */}
                            <div>
                                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Button Text</label>
                                <input type="text" className="input" placeholder="Shop Now"
                                    value={form.buttonText} onChange={e => field('buttonText', e.target.value)} />
                            </div>

                            {/* Button Link — smart picker */}
                            <div>
                                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Button Link</label>

                                {/* Tab row */}
                                <div className="flex gap-1 mb-2 border border-slate-200 rounded-lg p-1 bg-slate-50">
                                    {[
                                        { id: 'category', icon: List, label: 'Category' },
                                        { id: 'product', icon: Package, label: 'Product' },
                                        { id: 'custom', icon: Link, label: 'Custom' },
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
                                        {/* All Products shortcut */}
                                        <button type="button"
                                            onClick={() => field('buttonLink', '/products')}
                                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-left text-xs font-semibold transition-all ${form.buttonLink === '/products'
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
                                                    onClick={() => field('buttonLink', href)}
                                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-left text-xs font-semibold transition-all ${form.buttonLink === href
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
                                                    onClick={() => field('buttonLink', href)}
                                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-left text-xs font-semibold transition-all ${form.buttonLink === href
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
                                        value={form.buttonLink} onChange={e => field('buttonLink', e.target.value)} />
                                )}

                                {/* Always show current value */}
                                <div className="flex items-center gap-1.5 mt-1.5 px-2 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                                    <Link className="w-3 h-3 text-slate-400 shrink-0" />
                                    <span className="text-[11px] text-slate-500 font-mono truncate">{form.buttonLink || '/products'}</span>
                                </div>
                            </div>

                            {/* Gradient */}
                            <div>
                                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Background Gradient</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {GRADIENT_PRESETS.map(p => (
                                        <button key={p.value} type="button"
                                            onClick={() => field('bgGradient', p.value)}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${form.bgGradient === p.value ? 'border-blue-500 text-blue-700 bg-slate-50' : 'border-slate-200 text-slate-500 hover:border-slate-400'}`}>
                                            <span className={`w-4 h-4 rounded bg-gradient-to-r ${p.value} inline-block`} />
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                                <input type="text" className="input text-xs" placeholder="Custom Tailwind classes e.g. from-slate-900 to-blue-900"
                                    value={form.bgGradient} onChange={e => field('bgGradient', e.target.value)} />
                            </div>

                            {/* Accent colour */}
                            <div>
                                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Accent Colour</label>
                                <div className="flex items-center gap-2">
                                    {ACCENT_PRESETS.map(c => (
                                        <button key={c} type="button" onClick={() => field('accentColor', c)}
                                            className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${form.accentColor === c ? 'border-slate-700 scale-110' : 'border-transparent'}`}
                                            style={{ background: c }} />
                                    ))}
                                    <input type="color" className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer"
                                        value={form.accentColor} onChange={e => field('accentColor', e.target.value)} />
                                    <input type="text" className="input text-xs flex-1" placeholder="#007AFF"
                                        value={form.accentColor} onChange={e => field('accentColor', e.target.value)} />
                                </div>
                            </div>

                            {/* Image upload */}
                            <div>
                                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Background Image (optional)</label>
                                <div className="flex items-center gap-3">
                                    <div className="w-16 h-16 rounded-xl bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] flex items-center justify-center overflow-hidden shrink-0">
                                        {form.image
                                            ? <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                                            : <Image className="w-5 h-5 text-[#CBD5E1]" />
                                        }
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <input ref={fileRef} type="file" accept="image/*" className="hidden"
                                            onChange={e => { if (e.target.files[0]) uploadImage(e.target.files[0]); }} />
                                        <button type="button" onClick={() => fileRef.current.click()} disabled={uploading}
                                            className="flex items-center gap-2 px-4 py-2 border-2 border-[#E2E8F0] hover:border-[#007AFF] text-[#64748B] hover:text-[#007AFF] text-xs font-semibold rounded-lg transition-all">
                                            {uploading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading…</> : <><Upload className="w-3.5 h-3.5" /> Upload Image</>}
                                        </button>
                                        <input type="text" className="input text-xs" placeholder="Or paste image URL…"
                                            value={form.image} onChange={e => field('image', e.target.value)} />
                                        {form.image && (
                                            <button type="button" onClick={() => field('image', '')}
                                                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600">
                                                <X className="w-3 h-3" /> Clear image
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Order + Active */}
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Display Order</label>
                                    <input type="number" className="input" min={0}
                                        value={form.order} onChange={e => field('order', Number(e.target.value))} />
                                </div>
                                <div className="flex flex-col items-center gap-1 mt-5">
                                    <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Active</label>
                                    <button type="button" onClick={() => field('isActive', !form.isActive)}
                                        className={`w-12 h-6 rounded-full transition-all duration-300 relative ${form.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${form.isActive ? 'left-7' : 'left-1'}`} />
                                    </button>
                                    <span className={`text-[10px] font-bold ${form.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        {form.isActive ? 'ON' : 'OFF'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={saving}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-[#007AFF] hover:bg-blue-700 text-white font-bold rounded-xl transition-all text-sm disabled:opacity-60">
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                    {saving ? 'Saving…' : (editId ? 'Update Banner' : 'Create Banner')}
                                </button>
                                <button type="button"
                                    onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM); }}
                                    className="px-5 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:border-slate-400 transition-all text-sm">
                                    Cancel
                                </button>
                            </div>
                        </form>

                        {/* Right: Live preview */}
                        <div>
                            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">Live Preview</p>
                            <BannerPreview form={form} />
                            <p className="text-[11px] text-slate-400 mt-2 text-center">This is how your banner will look on the homepage</p>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Banner List ── */}
            {loading ? (
                <div className="text-center py-16 text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
                    <p className="text-sm">Loading banners…</p>
                </div>
            ) : banners.length === 0 ? (
                <div className="card rounded-2xl shadow-card p-12 text-center">
                    <LayoutTemplate className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-semibold mb-1">No banners yet</p>
                    <p className="text-slate-400 text-sm mb-5">Add your first banner to display it on the homepage carousel.</p>
                    <button onClick={openAdd}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#007AFF] text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition-all">
                        <Plus className="w-4 h-4" /> Add First Banner
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    <p className="text-xs text-slate-500 font-semibold">{banners.length} banner{banners.length !== 1 ? 's' : ''} total · {banners.filter(b => b.isActive).length} active</p>
                    {banners.map((banner) => (
                        <div key={banner._id}
                            className={`card rounded-2xl shadow-card p-4 flex flex-col sm:flex-row gap-4 border-l-4 transition-all ${banner.isActive ? 'border-emerald-400' : 'border-slate-200 opacity-60'}`}>

                            {/* Mini preview thumbnail */}
                            <div className={`bg-gradient-to-r ${banner.bgGradient} rounded-xl w-full sm:w-40 shrink-0 flex items-center justify-center p-3 relative overflow-hidden`} style={{ minHeight: '80px' }}>
                                {banner.image && <img src={banner.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />}
                                <div className="relative text-center">
                                    {banner.label && <span className="block text-[8px] font-black uppercase tracking-wider mb-0.5" style={{ color: banner.accentColor }}>{banner.label}</span>}
                                    <p className="text-white text-xs font-black leading-tight">{banner.title}</p>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 flex-wrap">
                                    <div>
                                        <p className="font-black text-[#0F172A] text-sm truncate">{banner.title}</p>
                                        {banner.subtitle && <p className="text-slate-500 text-xs mt-0.5 truncate">{banner.subtitle}</p>}
                                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: banner.accentColor, background: `${banner.accentColor}15` }}>
                                                {banner.label || '(no badge)'}
                                            </span>
                                            <span className="text-[10px] text-slate-400">→ <strong>{banner.buttonText}</strong> ({banner.buttonLink})</span>
                                            <span className="text-[10px] text-slate-400">Order: {banner.order ?? 0}</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${banner.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                                {banner.isActive ? '● Active' : '○ Hidden'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        {/* Toggle on/off */}
                                        <button onClick={() => toggleActive(banner)} title={banner.isActive ? 'Hide banner' : 'Show banner'}
                                            className={`p-2 rounded-xl transition-all ${banner.isActive ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100' : 'text-slate-400 bg-slate-100 hover:bg-slate-200'}`}>
                                            {banner.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                        </button>
                                        {/* Move up/down */}
                                        <button onClick={() => moveOrder(banner, -1)} title="Move up"
                                            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all">
                                            <ChevronUp className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => moveOrder(banner, 1)} title="Move down"
                                            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all">
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                        {/* Edit */}
                                        <button onClick={() => openEdit(banner)} title="Edit"
                                            className="p-2 rounded-xl text-slate-400 hover:text-slate-500 hover:bg-slate-50 transition-all">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        {/* Delete */}
                                        <button onClick={() => deleteHandler(banner._id)} title="Delete"
                                            className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminBanners;
