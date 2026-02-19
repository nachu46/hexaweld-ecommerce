import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft, Upload, X, Plus, Tag,
    ChevronDown, ChevronUp, Image as ImageIcon, Package,
    DollarSign, BarChart2, Layers, FileText, Search
} from 'lucide-react';

// ── Section wrapper ─────────────────────────────────────────────────────────
const Section = ({ icon: Icon, title, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-5">
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition"
            >
                <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-hex-orange" />
                    </span>
                    <span className="font-semibold text-gray-800">{title}</span>
                </div>
                {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {open && <div className="px-6 pb-6 pt-2 border-t border-gray-100">{children}</div>}
        </div>
    );
};

// ── Input component ──────────────────────────────────────────────────────────
const Field = ({ label, hint, children }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {hint && <span className="ml-1 text-xs font-normal text-gray-400">({hint})</span>}
        </label>
        {children}
    </div>
);

const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-hex-orange transition";
const textareaCls = `${inputCls} resize-none`;

// ─────────────────────────────────────────────────────────────────────────────
const ProductEdit = () => {
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();

    // ── Form state ─────────────────────────────────────────────────────────
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [sku, setSku] = useState('');
    const [barcode, setBarcode] = useState('');

    const [price, setPrice] = useState('');
    const [comparePrice, setComparePrice] = useState('');
    const [costPerItem, setCostPerItem] = useState('');

    const [stock, setStock] = useState('');
    const [trackInventory, setTrackInventory] = useState(false);
    const [enquiryOnly, setEnquiryOnly] = useState(true);

    const [images, setImages] = useState([]);           // array of URL strings
    const [dragOver, setDragOver] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [variants, setVariants] = useState([{ name: '', value: '' }]);
    const [features, setFeatures] = useState(['']);
    const [specs, setSpecs] = useState([{ key: '', value: '' }]);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [seoKeywords, setSeoKeywords] = useState('');
    const [slug, setSlug] = useState('');

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // ── Load categories + product (edit mode) ──────────────────────────────
    useEffect(() => {
        axios.get('/api/categories').then(({ data }) => {
            setCategories(data);
            if (data.length > 0 && !category) setCategory(data[0]._id);
        });

        if (isEditMode) {
            axios.get(`/api/products/${id}`).then(({ data }) => {
                setName(data.name || '');
                setDescription(data.description || '');
                setBrand(data.brand || '');
                setCategory(data.category?._id || data.category || '');
                setSku(data.SKU || '');
                setBarcode(data.barcode || '');
                setPrice(data.price ?? '');
                setComparePrice(data.comparePrice ?? '');
                setCostPerItem(data.costPerItem ?? '');
                setStock(data.stock ?? '');
                setTrackInventory(data.trackInventory || false);
                setEnquiryOnly(data.enquiryOnly !== undefined ? data.enquiryOnly : true);
                setImages(data.images?.length ? data.images : (data.image ? [data.image] : []));
                setVariants(data.variants?.length ? data.variants : [{ name: '', value: '' }]);
                setFeatures(data.features?.length ? data.features : ['']);
                const rawSpecs = data.specifications;
                if (rawSpecs && typeof rawSpecs === 'object' && !Array.isArray(rawSpecs)) {
                    setSpecs(Object.entries(rawSpecs).map(([k, v]) => ({ key: k, value: String(v) })));
                } else {
                    setSpecs([{ key: '', value: '' }]);
                }
                setTags(data.tags || []);
                setSeoTitle(data.seoTitle || '');
                setSeoDescription(data.seoDescription || '');
                setSeoKeywords(data.seoKeywords || '');
                setSlug(data.slug || '');
            }).catch(console.error);
        }
    }, [id]);

    // ── Auto-generate slug from name ───────────────────────────────────────
    useEffect(() => {
        if (!isEditMode || !slug) {
            setSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
        }
    }, [name]);

    // ── Image upload (multi) ────────────────────────────────────────────────
    const uploadImages = async (files) => {
        if (!files || files.length === 0) return;
        setUploading(true);
        try {
            const formData = new FormData();
            Array.from(files).forEach(f => formData.append('images', f));
            const { data } = await axios.post('/api/upload/multiple', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setImages(prev => [...prev, ...data.urls]);
        } catch (e) {
            setError('Image upload failed: ' + e.message);
        } finally {
            setUploading(false);
        }
    };

    const handleFilePick = (e) => uploadImages(e.target.files);
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setDragOver(false);
        uploadImages(e.dataTransfer.files);
    }, []);

    const removeImage = (idx) => setImages(prev => prev.filter((_, i) => i !== idx));
    const moveImage = (from, to) => {
        setImages(prev => {
            const arr = [...prev];
            const [item] = arr.splice(from, 1);
            arr.splice(to, 0, item);
            return arr;
        });
    };

    // ── Tag helpers ─────────────────────────────────────────────────────────
    const addTag = (e) => {
        if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
            e.preventDefault();
            const t = tagInput.trim().replace(/,$/, '');
            if (t && !tags.includes(t)) setTags(prev => [...prev, t]);
            setTagInput('');
        }
    };
    const removeTag = (t) => setTags(prev => prev.filter(x => x !== t));

    // ── Variant helpers ─────────────────────────────────────────────────────
    const addVariant = () => setVariants(prev => [...prev, { name: '', value: '' }]);
    const removeVariant = (i) => setVariants(prev => prev.filter((_, idx) => idx !== i));
    const updateVariant = (i, field, val) =>
        setVariants(prev => prev.map((v, idx) => idx === i ? { ...v, [field]: val } : v));

    // ── Feature helpers ─────────────────────────────────────────────────────
    const addFeature = () => setFeatures(prev => [...prev, '']);
    const removeFeature = (i) => setFeatures(prev => prev.filter((_, idx) => idx !== i));
    const updateFeature = (i, val) =>
        setFeatures(prev => prev.map((f, idx) => idx === i ? val : f));

    // ── Spec helpers ────────────────────────────────────────────────────────
    const addSpec = () => setSpecs(prev => [...prev, { key: '', value: '' }]);
    const removeSpec = (i) => setSpecs(prev => prev.filter((_, idx) => idx !== i));
    const updateSpec = (i, field, val) =>
        setSpecs(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s));

    // ── Submit ──────────────────────────────────────────────────────────────
    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        const specsObj = {};
        specs.filter(s => s.key.trim()).forEach(s => { specsObj[s.key.trim()] = s.value.trim(); });

        const productData = {
            name,
            description,
            brand,
            category,
            SKU: sku,
            barcode,
            price: parseFloat(price) || 0,
            comparePrice: parseFloat(comparePrice) || 0,
            costPerItem: parseFloat(costPerItem) || 0,
            stock: parseInt(stock) || 0,
            trackInventory,
            image: images[0] || '',
            images,
            variants: variants.filter(v => v.name && v.value),
            features: features.filter(Boolean),
            specifications: specsObj,
            tags,
            seoTitle: seoTitle || name,
            seoDescription: seoDescription || description,
            seoKeywords,
            slug,
            enquiryOnly,
        };

        try {
            if (isEditMode) {
                await axios.put(`/api/products/${id}`, productData);
            } else {
                await axios.post('/api/products', productData);
            }
            navigate('/admin/products');
        } catch (err) {
            setError(err.response?.data?.message || 'Error saving product');
            setSaving(false);
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Link to="/admin/products" className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 transition">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {isEditMode ? 'Edit Product' : 'Add New Product'}
                            </h1>
                            <p className="text-sm text-gray-500 mt-0.5">
                                {isEditMode ? 'Update product information' : 'Fill in the details below'}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={submitHandler}
                        disabled={saving}
                        className="bg-hex-orange hover:bg-orange-600 text-white font-semibold py-2.5 px-6 rounded-xl transition flex items-center gap-2 shadow-sm disabled:opacity-60"
                    >
                        {saving ? 'Saving...' : (isEditMode ? 'Update Product' : 'Save Product')}
                    </button>
                </div>

                {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={submitHandler} className="space-y-0">
                    {/* ── BASIC INFO ── */}
                    <Section icon={Package} title="Basic Information">
                        <div className="grid grid-cols-1 gap-4 mt-2">
                            <Field label="Product Name" hint="required">
                                <input type="text" required className={inputCls} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. MIG Welding Machine 300A" />
                            </Field>
                            <Field label="Description" hint="required">
                                <textarea required rows={4} className={textareaCls} value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the product..." />
                            </Field>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Brand">
                                    <input type="text" className={inputCls} value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g. Hexaweld" />
                                </Field>
                                <Field label="Category" hint="required">
                                    <select required className={inputCls} value={category} onChange={e => setCategory(e.target.value)}>
                                        <option value="">Select category</option>
                                        {categories.map(c => (
                                            <option key={c._id} value={c._id}>{c.name}</option>
                                        ))}
                                    </select>
                                </Field>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="SKU" hint="unique identifier">
                                    <input type="text" className={inputCls} value={sku} onChange={e => setSku(e.target.value)} placeholder="e.g. HX-MIG-300" />
                                </Field>
                                <Field label="Barcode" hint="optional">
                                    <input type="text" className={inputCls} value={barcode} onChange={e => setBarcode(e.target.value)} placeholder="e.g. 8901234567890" />
                                </Field>
                            </div>
                        </div>
                    </Section>

                    {/* ── IMAGES ── */}
                    <Section icon={ImageIcon} title="Images">
                        {/* Drop zone */}
                        <div
                            className={`mt-2 border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer ${dragOver ? 'border-hex-orange bg-orange-50' : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'}`}
                            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('multi-img-input').click()}
                        >
                            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm font-medium text-gray-600">Drag & drop images or <span className="text-hex-orange">browse</span></p>
                            <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP — up to 10 images</p>
                            <input id="multi-img-input" type="file" className="hidden" multiple accept="image/*" onChange={handleFilePick} />
                        </div>
                        {uploading && <p className="text-sm text-orange-500 mt-2 animate-pulse">Uploading images...</p>}

                        {/* Image grid */}
                        {images.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                {images.map((url, idx) => (
                                    <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                                        <img src={url} alt={`img-${idx}`} className="w-full h-full object-cover" />
                                        {idx === 0 && (
                                            <span className="absolute bottom-0 left-0 right-0 bg-hex-orange text-white text-[10px] font-bold text-center py-0.5">MAIN</span>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1">
                                            {idx > 0 && (
                                                <button type="button" onClick={() => moveImage(idx, idx - 1)}
                                                    className="p-1 bg-white rounded text-gray-700 hover:bg-gray-100 text-xs">◀</button>
                                            )}
                                            <button type="button" onClick={() => removeImage(idx)}
                                                className="p-1 bg-red-500 rounded text-white hover:bg-red-600">
                                                <X className="w-3 h-3" />
                                            </button>
                                            {idx < images.length - 1 && (
                                                <button type="button" onClick={() => moveImage(idx, idx + 1)}
                                                    className="p-1 bg-white rounded text-gray-700 hover:bg-gray-100 text-xs">▶</button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Section>

                    {/* ── PRICING ── */}
                    <Section icon={DollarSign} title="Pricing">
                        <div className="grid grid-cols-3 gap-4 mt-2">
                            <Field label="Price (₹)">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                    <input type="number" min="0" step="0.01" className={`${inputCls} pl-7`} value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" />
                                </div>
                            </Field>
                            <Field label="Compare at Price" hint="original">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                    <input type="number" min="0" step="0.01" className={`${inputCls} pl-7`} value={comparePrice} onChange={e => setComparePrice(e.target.value)} placeholder="0.00" />
                                </div>
                            </Field>
                            <Field label="Cost per Item" hint="internal">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                    <input type="number" min="0" step="0.01" className={`${inputCls} pl-7`} value={costPerItem} onChange={e => setCostPerItem(e.target.value)} placeholder="0.00" />
                                </div>
                            </Field>
                        </div>
                        {comparePrice && price && Number(comparePrice) > Number(price) && (
                            <p className="text-xs text-green-600 mt-2">
                                💰 Margin: {Math.round(((comparePrice - price) / comparePrice) * 100)}% off compare price
                            </p>
                        )}
                    </Section>

                    {/* ── INVENTORY ── */}
                    <Section icon={BarChart2} title="Inventory">
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <Field label="Stock Quantity">
                                <input type="number" min="0" className={inputCls} value={stock} onChange={e => setStock(e.target.value)} placeholder="0" />
                            </Field>
                            <Field label="Track Inventory">
                                <label className="flex items-center gap-3 mt-2 cursor-pointer">
                                    <div
                                        onClick={() => setTrackInventory(v => !v)}
                                        className={`relative w-11 h-6 rounded-full transition-colors ${trackInventory ? 'bg-hex-orange' : 'bg-gray-300'}`}
                                    >
                                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${trackInventory ? 'translate-x-5' : ''}`} />
                                    </div>
                                    <span className="text-sm text-gray-600">{trackInventory ? 'Tracking enabled' : 'Not tracking'}</span>
                                </label>
                            </Field>
                        </div>

                        {/* Enquiry Only toggle */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <label className="flex items-start gap-4 cursor-pointer group">
                                <div
                                    onClick={() => setEnquiryOnly(v => !v)}
                                    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 mt-0.5 ${enquiryOnly ? 'bg-blue-600' : 'bg-gray-300'}`}
                                >
                                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enquiryOnly ? 'translate-x-5' : ''}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                        Enquiry Only Mode
                                        {enquiryOnly && <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">ON</span>}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        When enabled, price is hidden and customers see "Contact for Price" with WhatsApp &amp; Request Quote buttons only.
                                    </p>
                                </div>
                            </label>
                        </div>
                    </Section>


                    {/* ── VARIANTS ── */}
                    <Section icon={Layers} title="Variants" defaultOpen={false}>
                        <p className="text-xs text-gray-500 mb-3 mt-2">e.g. Capacity: 300A, Size: Large, Model: MIG-250</p>
                        <div className="space-y-2">
                            {variants.map((v, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        className={`${inputCls} flex-1`}
                                        placeholder="Name (e.g. Capacity)"
                                        value={v.name}
                                        onChange={e => updateVariant(i, 'name', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className={`${inputCls} flex-1`}
                                        placeholder="Value (e.g. 300A)"
                                        value={v.value}
                                        onChange={e => updateVariant(i, 'value', e.target.value)}
                                    />
                                    <button type="button" onClick={() => removeVariant(i)} className="p-2 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addVariant} className="mt-3 flex items-center gap-1.5 text-sm text-hex-orange hover:text-orange-600 font-medium transition">
                            <Plus className="w-4 h-4" /> Add Variant
                        </button>
                    </Section>

                    {/* ── FEATURES ── */}
                    <Section icon={FileText} title="Features" defaultOpen={false}>
                        <p className="text-xs text-gray-500 mb-3 mt-2">Key selling points shown as bullet points on the product page</p>
                        <div className="space-y-2">
                            {features.map((f, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        className={`${inputCls} flex-1`}
                                        placeholder={`Feature ${i + 1} (e.g. Industrial grade)`}
                                        value={f}
                                        onChange={e => updateFeature(i, e.target.value)}
                                    />
                                    <button type="button" onClick={() => removeFeature(i)} className="p-2 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addFeature} className="mt-3 flex items-center gap-1.5 text-sm text-hex-orange hover:text-orange-600 font-medium transition">
                            <Plus className="w-4 h-4" /> Add Feature
                        </button>
                    </Section>

                    {/* ── SPECIFICATIONS ── */}
                    <Section icon={FileText} title="Specifications" defaultOpen={false}>
                        <p className="text-xs text-gray-500 mb-3 mt-2">Technical specs shown in a table on the product page</p>
                        <div className="space-y-2">
                            {specs.map((s, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        className={`${inputCls} flex-1`}
                                        placeholder="Key (e.g. Power)"
                                        value={s.key}
                                        onChange={e => updateSpec(i, 'key', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className={`${inputCls} flex-1`}
                                        placeholder="Value (e.g. 220V)"
                                        value={s.value}
                                        onChange={e => updateSpec(i, 'value', e.target.value)}
                                    />
                                    <button type="button" onClick={() => removeSpec(i)} className="p-2 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addSpec} className="mt-3 flex items-center gap-1.5 text-sm text-hex-orange hover:text-orange-600 font-medium transition">
                            <Plus className="w-4 h-4" /> Add Specification
                        </button>
                    </Section>

                    {/* ── TAGS ── */}
                    <Section icon={Tag} title="Tags" defaultOpen={false}>
                        <p className="text-xs text-gray-500 mb-3 mt-2">Press Enter or comma to add a tag. Used for search and related products.</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {tags.map(t => (
                                <span key={t} className="flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-700 text-sm px-3 py-1 rounded-full">
                                    {t}
                                    <button type="button" onClick={() => removeTag(t)} className="hover:text-red-500 transition">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            className={inputCls}
                            placeholder='Type a tag and press Enter (e.g. "welding machine")'
                            value={tagInput}
                            onChange={e => setTagInput(e.target.value)}
                            onKeyDown={addTag}
                        />
                    </Section>

                    {/* ── SEO ── */}
                    <Section icon={Search} title="SEO Optimization" defaultOpen={false}>
                        <div className="grid grid-cols-1 gap-4 mt-2">
                            <Field label="SEO Title">
                                <input type="text" className={inputCls} value={seoTitle} onChange={e => setSeoTitle(e.target.value)} placeholder={name || 'Product title for search engines'} />
                                <p className="text-xs text-gray-400 mt-1">{seoTitle.length}/60 characters recommended</p>
                            </Field>
                            <Field label="SEO Description">
                                <textarea rows={3} className={textareaCls} value={seoDescription} onChange={e => setSeoDescription(e.target.value)} placeholder="Brief description for search engine results..." />
                                <p className="text-xs text-gray-400 mt-1">{seoDescription.length}/160 characters recommended</p>
                            </Field>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="SEO Keywords" hint="comma-separated">
                                    <input type="text" className={inputCls} value={seoKeywords} onChange={e => setSeoKeywords(e.target.value)} placeholder="welding machine, MIG, industrial" />
                                </Field>
                                <Field label="URL Slug">
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-300 focus-within:border-hex-orange transition">
                                        <span className="px-3 py-2 bg-gray-50 text-gray-400 text-sm border-r border-gray-300">/product/</span>
                                        <input type="text" className="flex-1 px-3 py-2 text-sm focus:outline-none" value={slug} onChange={e => setSlug(e.target.value)} />
                                    </div>
                                </Field>
                            </div>
                        </div>
                        {/* Preview */}
                        {(seoTitle || name) && (
                            <div className="mt-4 border border-gray-200 rounded-xl p-4 bg-gray-50">
                                <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Search Preview</p>
                                <p className="text-blue-700 text-base font-medium hover:underline cursor-pointer">{seoTitle || name}</p>
                                <p className="text-green-700 text-xs mt-0.5">hexaweld.com/product/{slug}</p>
                                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{seoDescription || description}</p>
                            </div>
                        )}
                    </Section>

                    {/* Save button (bottom) */}
                    <div className="flex justify-end pt-4 pb-8">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-hex-orange hover:bg-orange-600 text-white font-semibold py-3 px-10 rounded-xl transition shadow-md hover:shadow-lg disabled:opacity-60 text-base"
                        >
                            {saving ? 'Saving...' : (isEditMode ? 'Update Product' : 'Create Product')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductEdit;
