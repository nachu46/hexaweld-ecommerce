import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Save, Upload, Trash2, Image as ImageIcon, Plus, Link as LinkIcon, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

const BADGE_OPTIONS = [
    'REGISTERED',
    'PRO SERIES',
    'GLOBAL',
    'MACHINERY',
    'JAPAN GRADE',
    'PARTNER'
];

const CATEGORY_OPTIONS = [
    'Electricals, Power Tools & Accessories',
    'Lock Cylinder, Door Handles & Lock Body',
    'Hand Tools & Painting Accessories',
    'Safety Shoes & Safety Products',
    'Sanitary Wares',
    'Power Tools & Machineries'
];

const BrandEdit = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    // Form state
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('');
    const [badgeTag, setBadgeTag] = useState('REGISTERED');
    const [description, setDescription] = useState('');
    const [website, setWebsite] = useState('');
    const [displayOrder, setDisplayOrder] = useState(0);
    const [isRegistered, setIsRegistered] = useState(true);

    // Image states
    const [logo, setLogo] = useState('');
    const [banner, setBanner] = useState('');
    const [images, setImages] = useState([]);

    // UI state
    const [loading, setLoading] = useState(false);
    const [logoUploading, setLogoUploading] = useState(false);
    const [bannerUploading, setBannerUploading] = useState(false);
    const [galleryUploading, setGalleryUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [customUrlInput, setCustomUrlInput] = useState('');

    const logoRef = useRef();
    const bannerRef = useRef();
    const galleryRef = useRef();

    useEffect(() => {
        if (isEdit) {
            setLoading(true);
            axios.get(`/api/brands/${id}`)
                .then(({ data }) => {
                    setName(data.name || '');
                    setSlug(data.slug || '');
                    setCategory(data.category || '');
                    setBadgeTag(data.badgeTag || 'REGISTERED');
                    setDescription(data.description || '');
                    setWebsite(data.website || '');
                    setDisplayOrder(data.displayOrder || 0);
                    setIsRegistered(data.isRegistered !== undefined ? data.isRegistered : true);
                    setLogo(data.logo || '');
                    setBanner(data.banner || '');
                    setImages(Array.isArray(data.images) ? data.images : []);
                })
                .catch((err) => {
                    setError('Failed to load brand details');
                })
                .finally(() => setLoading(false));
        }
    }, [id, isEdit]);

    // File validation helper
    const validateFile = (file) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!allowedTypes.includes(file.type.toLowerCase())) {
            setError('Only PNG, JPG, JPEG, and WEBP formats are supported');
            return false;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB Limit
            setError('File size must be less than 5MB');
            return false;
        }
        return true;
    };

    // Generic upload handler
    const handleUpload = async (file, setUrl, setUploadingState) => {
        if (!validateFile(file)) return;
        setError('');
        const formData = new FormData();
        formData.append('image', file);
        setUploadingState(true);

        try {
            const { data } = await axios.post('/api/upload', formData);
            const fullUrl = data.startsWith('http') ? data : `${API_URL}${data}`;
            setUrl(fullUrl);
            setSuccess('Image uploaded successfully');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Image upload failed. Please try again.');
        } finally {
            setUploadingState(false);
        }
    };

    // Multiple gallery images upload handler
    const handleMultipleGalleryUpload = async (files) => {
        const validFiles = Array.from(files).filter(validateFile);
        if (validFiles.length === 0) return;

        const formData = new FormData();
        validFiles.forEach(f => formData.append('images', f));
        setGalleryUploading(true);
        setError('');

        try {
            const { data } = await axios.post('/api/upload/multiple', formData);
            const newUrls = (data.urls || []).map(u => u.startsWith('http') ? u : `${API_URL}${u}`);
            setImages(prev => [...prev, ...newUrls]);
            setSuccess(`${newUrls.length} images added to brand gallery`);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Gallery upload failed');
        } finally {
            setGalleryUploading(false);
        }
    };

    // Remove single gallery image
    const handleRemoveGalleryImage = (indexToRemove) => {
        setImages(images.filter((_, idx) => idx !== indexToRemove));
    };

    // Manual URL add to gallery
    const handleAddCustomUrl = (e) => {
        e.preventDefault();
        if (customUrlInput.trim()) {
            setImages(prev => [...prev, customUrlInput.trim()]);
            setCustomUrlInput('');
        }
    };

    // Form Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Brand name is required');
            return;
        }

        setLoading(true);
        setError('');

        const payload = {
            name: name.trim(),
            slug: slug.trim() || name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
            category,
            badgeTag,
            description,
            website,
            displayOrder: Number(displayOrder) || 0,
            isRegistered,
            logo,
            banner,
            images,
        };

        try {
            if (isEdit) {
                await axios.put(`/api/brands/${id}`, payload);
                setSuccess('Brand updated successfully!');
            } else {
                await axios.post('/api/brands', payload);
                setSuccess('Brand created successfully!');
            }
            setTimeout(() => navigate('/admin/brands'), 1200);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save brand');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEdit) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#007AFF] animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Back Header */}
            <div className="flex items-center justify-between mb-8">
                <Link to="/admin/brands" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900">
                    <ArrowLeft className="w-4 h-4" /> Back to Brands List
                </Link>
                <h1 className="text-xl font-black text-[#0F172A]">
                    {isEdit ? `Edit Brand: ${name}` : 'Create New Brand'}
                </h1>
            </div>

            {/* Alerts */}
            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </div>
            )}
            {success && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0" /> {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Section 1: Basic Brand Details */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                        Basic Brand Information
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Brand Name *</label>
                            <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    if (!isEdit) setSlug(e.target.value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'));
                                }}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:border-[#007AFF] outline-none"
                                placeholder="e.g. Tork®"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Slug URL</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:border-[#007AFF] outline-none bg-slate-50"
                                placeholder="e.g. tork"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:border-[#007AFF] outline-none bg-white"
                            >
                                <option value="">Select Category...</option>
                                {CATEGORY_OPTIONS.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Badge Tag</label>
                            <select
                                value={badgeTag}
                                onChange={(e) => setBadgeTag(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:border-[#007AFF] outline-none bg-white"
                            >
                                {BADGE_OPTIONS.map(b => (
                                    <option key={b} value={b}>{b}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Display Order</label>
                            <input
                                type="number"
                                value={displayOrder}
                                onChange={(e) => setDisplayOrder(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:border-[#007AFF] outline-none"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs resize-none focus:border-[#007AFF] outline-none"
                            placeholder="Enter short description of brand offerings..."
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Official Website</label>
                            <input
                                type="url"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:border-[#007AFF] outline-none"
                                placeholder="https://..."
                            />
                        </div>

                        <div className="flex items-center gap-3 pt-6">
                            <input
                                type="checkbox"
                                id="isRegistered"
                                checked={isRegistered}
                                onChange={(e) => setIsRegistered(e.target.checked)}
                                className="w-4 h-4 text-[#007AFF] rounded focus:ring-0"
                            />
                            <label htmlFor="isRegistered" className="text-xs font-bold text-slate-800 cursor-pointer">
                                Registered Trademark (IPR Protection)
                            </label>
                        </div>
                    </div>
                </div>

                {/* Section 2: Brand Logo & Banner Images */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                        Brand Logo & Banner Images
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* 1. Brand Logo */}
                        <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                            <label className="block text-xs font-bold text-slate-800 uppercase">Brand Logo</label>
                            
                            <div className="flex items-center gap-4">
                                <div className="w-24 h-24 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden p-2 relative group">
                                    {logo ? (
                                        <>
                                            <img src={logo} alt="Logo Preview" className="w-full h-full object-contain" />
                                            <button
                                                type="button"
                                                onClick={() => setLogo('')}
                                                className="absolute inset-0 bg-red-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold"
                                            >
                                                Remove
                                            </button>
                                        </>
                                    ) : (
                                        <ImageIcon className="w-8 h-8 text-slate-300" />
                                    )}
                                </div>

                                <div className="flex-1 space-y-2">
                                    <input
                                        ref={logoRef}
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        className="hidden"
                                        onChange={(e) => e.target.files[0] && handleUpload(e.target.files[0], setLogo, setLogoUploading)}
                                    />
                                    <button
                                        type="button"
                                        disabled={logoUploading}
                                        onClick={() => logoRef.current.click()}
                                        className="w-full py-2 px-3 rounded-lg border border-slate-300 bg-white hover:border-[#007AFF] text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors shadow-sm"
                                    >
                                        <Upload className="w-3.5 h-3.5" />
                                        {logoUploading ? 'Uploading...' : 'Upload Logo (PNG/JPG)'}
                                    </button>
                                    
                                    <input
                                        type="text"
                                        value={logo}
                                        onChange={(e) => setLogo(e.target.value)}
                                        placeholder="Or enter logo URL..."
                                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 focus:border-[#007AFF] outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Brand Banner */}
                        <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                            <label className="block text-xs font-bold text-slate-800 uppercase">Brand Banner Image</label>
                            
                            <div className="space-y-3">
                                <div className="w-full h-24 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden relative group">
                                    {banner ? (
                                        <>
                                            <img src={banner} alt="Banner Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setBanner('')}
                                                className="absolute inset-0 bg-red-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold"
                                            >
                                                Remove Banner
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-xs text-slate-400 font-medium">No Banner Image</span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        ref={bannerRef}
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        className="hidden"
                                        onChange={(e) => e.target.files[0] && handleUpload(e.target.files[0], setBanner, setBannerUploading)}
                                    />
                                    <button
                                        type="button"
                                        disabled={bannerUploading}
                                        onClick={() => bannerRef.current.click()}
                                        className="flex-1 py-2 px-3 rounded-lg border border-slate-300 bg-white hover:border-[#007AFF] text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors shadow-sm"
                                    >
                                        <Upload className="w-3.5 h-3.5" />
                                        {bannerUploading ? 'Uploading...' : 'Upload Banner File'}
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    value={banner}
                                    onChange={(e) => setBanner(e.target.value)}
                                    placeholder="Or enter banner image URL..."
                                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 focus:border-[#007AFF] outline-none"
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Section 3: Additional Brand Images / Gallery */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                            <h2 className="text-base font-bold text-slate-900">
                                Additional Brand Gallery Images
                            </h2>
                            <p className="text-xs text-slate-500">Upload multiple photos showcasing brand products and certificates</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                ref={galleryRef}
                                type="file"
                                multiple
                                accept="image/png,image/jpeg,image/webp"
                                className="hidden"
                                onChange={(e) => e.target.files.length && handleMultipleGalleryUpload(e.target.files)}
                            />
                            <button
                                type="button"
                                disabled={galleryUploading}
                                onClick={() => galleryRef.current.click()}
                                className="px-4 py-2 rounded-xl bg-[#007AFF] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#0066CC] transition-colors shadow-sm"
                            >
                                <Upload className="w-3.5 h-3.5" />
                                {galleryUploading ? 'Uploading Gallery...' : 'Upload Files'}
                            </button>
                        </div>
                    </div>

                    {/* Manual URL Input */}
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={customUrlInput}
                            onChange={(e) => setCustomUrlInput(e.target.value)}
                            placeholder="Add direct image URL to gallery..."
                            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#007AFF] outline-none"
                        />
                        <button
                            type="button"
                            onClick={handleAddCustomUrl}
                            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                        >
                            Add URL
                        </button>
                    </div>

                    {/* Gallery Thumbnails Grid */}
                    {images.length === 0 ? (
                        <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                            <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <p className="text-xs font-medium text-slate-500">No additional gallery images added yet</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 pt-2">
                            {images.map((imgUrl, idx) => (
                                <div key={idx} className="relative rounded-xl border border-slate-200 bg-slate-50 overflow-hidden h-28 group shadow-sm">
                                    <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveGalleryImage(idx)}
                                        className="absolute top-1.5 right-1.5 p-1.5 rounded-lg bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                        title="Remove photo"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit Action */}
                <div className="flex items-center justify-end gap-3 pt-4">
                    <Link to="/admin/brands" className="px-6 py-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 rounded-xl bg-[#007AFF] hover:bg-[#0066CC] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md"
                    >
                        <Save className="w-4 h-4" />
                        {loading ? 'Saving Brand...' : isEdit ? 'Update Brand & Images' : 'Save Brand'}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default BrandEdit;
