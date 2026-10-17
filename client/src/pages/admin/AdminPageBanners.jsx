import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Upload, RotateCcw, Link2, ExternalLink } from 'lucide-react';
import AdminNav from '../../components/AdminNav';
import { PAGE_BANNERS, loadPageBanners } from '../../pageBanners';
import { getImageUrl } from '../../utils/getImageUrl';


const PAGE_PATHS = {
    about: '/about', products: '/products', categories: '/categories', brands: '/brands',
    certificates: '/certificates', services: '/services', industries: '/industries', career: '/career',
    faq: '/faq', contact: '/contact', checkout: '/checkout', policies: '/privacy-policy',
};

const BannerCard = ({ page, current, onSaved }) => {
    const [busy, setBusy] = useState(false);
    const [url, setUrl] = useState('');
    const isCustom = Boolean(current);

    const save = async (image) => {
        setBusy(true);
        try {
            await axios.put(`/api/page-banners/${page.key}`, { image });
            toast.success(image ? `${page.label} banner updated` : `${page.label} banner reset to default`);
            setUrl('');
            onSaved();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Could not save banner');
        } finally {
            setBusy(false);
        }
    };

    const upload = async (e) => {
        const file = e.target.files[0];
        e.target.value = '';
        if (!file) return;
        if (file.size > 8 * 1024 * 1024) {
            toast.error('Image is too large (max 8 MB)');
            return;
        }
        setBusy(true);
        try {
            const fd = new FormData();
            fd.append('image', file);
            const { data } = await axios.post('/api/upload', fd);
            await save(typeof data === 'string' ? data : data.url || data.path);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Upload failed');
            setBusy(false);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden flex flex-col">
            <div className="relative h-40 bg-neutral-900">
                <img src={getImageUrl(current || page.default)} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/30" />
                <p className="absolute left-4 bottom-4 text-white text-lg font-semibold">{page.label}</p>
                <span className={`absolute top-3 right-3 text-[11px] font-semibold px-2 py-0.5 rounded-full ${isCustom ? 'bg-emerald-500 text-white' : 'bg-white/90 text-neutral-700'}`}>
                    {isCustom ? 'Custom' : 'Default'}
                </span>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2">
                    <label className={`cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#111111] text-white text-xs font-semibold hover:bg-[#333333] transition ${busy ? 'opacity-60 pointer-events-none' : ''}`}>
                        <Upload className="w-3.5 h-3.5" />
                        {busy ? 'Saving...' : 'Upload Image'}
                        <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={upload} />
                    </label>
                    {isCustom && (
                        <button
                            onClick={() => save('')}
                            disabled={busy}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-neutral-200 text-neutral-700 text-xs font-semibold hover:bg-neutral-50 disabled:opacity-60"
                        >
                            <RotateCcw className="w-3.5 h-3.5" /> Reset
                        </button>
                    )}
                    <a
                        href={PAGE_PATHS[page.key]}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-neutral-500 text-xs font-semibold hover:text-[#111111]"
                    >
                        View <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                </div>

                <form
                    onSubmit={(e) => { e.preventDefault(); if (url.trim()) save(url.trim()); }}
                    className="flex items-center gap-2 mt-auto"
                >
                    <div className="relative flex-1">
                        <Link2 className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="...or paste an image link"
                            className="w-full pl-8 pr-3 py-2 rounded-lg border border-neutral-200 text-xs focus:outline-none focus:border-[#111111]"
                        />
                    </div>
                    <button type="submit" disabled={busy || !url.trim()} className="px-3 py-2 rounded-lg border border-neutral-200 text-xs font-semibold hover:bg-neutral-50 disabled:opacity-40">
                        Use
                    </button>
                </form>
            </div>
        </div>
    );
};

const AdminPageBanners = () => {
    const [custom, setCustom] = useState({});

    const refresh = () => loadPageBanners(true).then(setCustom);

    useEffect(() => { refresh(); }, []);

    return (
        <div className="min-h-screen bg-neutral-50 font-sans pb-12">
            <AdminNav
                title="Page Banners"
                subtitle="Change the background image at the top of each page. Wide landscape photos work best (at least 1600px wide)."
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {PAGE_BANNERS.map((page) => (
                    <BannerCard key={page.key} page={page} current={custom[page.key]} onSaved={refresh} />
                ))}
            </div>
        </div>
    );
};

export default AdminPageBanners;
