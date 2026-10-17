import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
    Package, Tag, MessageSquare, Image, Megaphone, 
    ShieldCheck, TrendingUp, Users, ArrowUpRight, Plus, Eye
} from 'lucide-react';
import AdminNav from '../../components/AdminNav';

const Dashboard = () => {
    const [stats, setStats] = useState({ 
        products: 0, 
        categories: 0, 
        brands: 0, 
        enquiries: 0, 
        banners: 0, 
        announcements: 0 
    });
    const [recentProducts, setRecentProducts] = useState([]);
    const [recentEnquiries, setRecentEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const [productsRes, categoriesRes, brandsRes, enquiriesRes, bannersRes, annRes] = await Promise.all([
                    axios.get('/api/products'),
                    axios.get('/api/categories'),
                    axios.get('/api/brands'),
                    axios.get('/api/enquiries'),
                    axios.get('/api/banners'),
                    axios.get('/api/announcement/all'),
                ]);
                
                const prods = Array.isArray(productsRes.data) ? productsRes.data : [];
                const enqs = Array.isArray(enquiriesRes.data) ? enquiriesRes.data : [];

                setStats({
                    products: prods.length,
                    categories: Array.isArray(categoriesRes.data) ? categoriesRes.data.length : 0,
                    brands: Array.isArray(brandsRes.data) ? brandsRes.data.length : 0,
                    enquiries: enqs.length,
                    banners: Array.isArray(bannersRes.data) ? bannersRes.data.length : 0,
                    announcements: Array.isArray(annRes.data) ? annRes.data.length : 0,
                });

                setRecentProducts(prods.slice(0, 5));
                setRecentEnquiries(enqs.slice(0, 5));
            } catch (error) {
                console.error('Error fetching admin dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="min-h-screen bg-neutral-50 font-sans pb-12">
            <AdminNav 
                title="Admin Overview" 
                subtitle="Control catalog, brand images, announcements, RFQ enquiries, and site content."
                actionLink="/admin/product/create"
                actionLabel="Add Product"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                {/* ══ 1. METRICS CARDS GRID ════════════════════════════ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    
                    <Link to="/admin/products" className="p-5 rounded bg-white border border-[#E5E5E5] hover:border-[#111111] transition-all group">
                        <div className="flex items-center justify-between">
                            <div className="p-3 rounded bg-[#EDEDED] text-[#111111] border border-[#D4D4D4]">
                                <Package className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-neutral-500 group-hover:text-[#111111] flex items-center gap-1 transition-colors">
                                Manage <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-serif font-bold text-[#111111]">{stats.products}</h3>
                            <p className="text-xs font-bold text-neutral-500 mt-0.5">Total Listed Products</p>
                        </div>
                    </Link>

                    <Link to="/admin/brands" className="p-5 rounded bg-white border border-[#E5E5E5] hover:border-[#111111] transition-all group">
                        <div className="flex items-center justify-between">
                            <div className="p-3 rounded bg-[#EDEDED] text-[#111111] border border-[#D4D4D4]">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-neutral-500 group-hover:text-[#111111] flex items-center gap-1 transition-colors">
                                Brand Studio <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-serif font-bold text-[#111111]">{stats.brands}</h3>
                            <p className="text-xs font-bold text-neutral-500 mt-0.5">Partner & Registered Brands</p>
                        </div>
                    </Link>

                    <Link to="/admin/categories" className="p-5 rounded bg-white border border-[#E5E5E5] hover:border-[#111111] transition-all group">
                        <div className="flex items-center justify-between">
                            <div className="p-3 rounded bg-[#EDEDED] text-[#111111] border border-[#D4D4D4]">
                                <Tag className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-neutral-500 group-hover:text-[#111111] flex items-center gap-1 transition-colors">
                                View <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-serif font-bold text-[#111111]">{stats.categories}</h3>
                            <p className="text-xs font-bold text-neutral-500 mt-0.5">Product Categories</p>
                        </div>
                    </Link>

                    <Link to="/admin/enquiries" className="p-5 rounded bg-white border border-[#E5E5E5] hover:border-[#111111] transition-all group">
                        <div className="flex items-center justify-between">
                            <div className="p-3 rounded bg-[#EDEDED] text-[#111111] border border-[#D4D4D4]">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-neutral-500 group-hover:text-[#111111] flex items-center gap-1 transition-colors">
                                Inbox <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-serif font-bold text-[#111111]">{stats.enquiries}</h3>
                            <p className="text-xs font-bold text-neutral-500 mt-0.5">Customer RFQs & Messages</p>
                        </div>
                    </Link>

                    <Link to="/admin/banners" className="p-5 rounded bg-white border border-[#E5E5E5] hover:border-[#111111] transition-all group">
                        <div className="flex items-center justify-between">
                            <div className="p-3 rounded bg-[#EDEDED] text-[#111111] border border-[#D4D4D4]">
                                <Image className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-neutral-500 group-hover:text-[#111111] flex items-center gap-1 transition-colors">
                                Configure <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-serif font-bold text-[#111111]">{stats.banners}</h3>
                            <p className="text-xs font-bold text-neutral-500 mt-0.5">Active Slider Banners</p>
                        </div>
                    </Link>

                    <Link to="/admin/announcement" className="p-5 rounded bg-white border border-[#E5E5E5] hover:border-[#111111] transition-all group">
                        <div className="flex items-center justify-between">
                            <div className="p-3 rounded bg-[#EDEDED] text-[#111111] border border-[#D4D4D4]">
                                <Megaphone className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-neutral-500 group-hover:text-[#111111] flex items-center gap-1 transition-colors">
                                Edit Promos <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-serif font-bold text-[#111111]">{stats.announcements}</h3>
                            <p className="text-xs font-bold text-neutral-500 mt-0.5">Top Banner Announcements</p>
                        </div>
                    </Link>

                </div>

                {/* ══ 2. QUICK ACTIONS TOOLBAR ════════════════════════ */}
                <div className="p-6 rounded bg-white border border-[#E5E5E5]">
                    <h2 className="text-sm font-serif font-bold text-[#111111] uppercase tracking-wider mb-4">Quick Content Management Actions</h2>
                    <div className="flex flex-wrap gap-2.5">
                        <Link to="/admin/product/create" className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#111111] hover:bg-[#333333] text-white font-bold text-xs transition-colors">
                            <Plus className="w-4 h-4 text-white" /> Add New Product
                        </Link>
                        <Link to="/admin/brands/new" className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#111111] hover:bg-[#333333] text-white font-bold text-xs transition-colors">
                            <Plus className="w-4 h-4 text-white" /> Add New Brand & Images
                        </Link>
                        <Link to="/admin/categories" className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#111111] hover:bg-[#333333] text-white font-bold text-xs transition-colors">
                            <Tag className="w-4 h-4 text-white" /> Manage Categories
                        </Link>
                        <Link to="/admin/banners" className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#111111] hover:bg-[#333333] text-white font-bold text-xs transition-colors">
                            <Image className="w-4 h-4 text-white" /> Upload Banners
                        </Link>
                        <Link to="/admin/announcement" className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#111111] hover:bg-[#333333] text-white font-bold text-xs transition-colors">
                            <Megaphone className="w-4 h-4 text-white" /> Set Promos
                        </Link>
                        <Link to="/admin/admins" className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-white border border-[#D4D4D4] hover:bg-[#EDEDED] text-[#111111] font-bold text-xs transition-colors">
                            <Users className="w-4 h-4 text-[#111111]" /> Manage Admin Accounts
                        </Link>
                    </div>
                </div>

                {/* ══ 3. RECENT ACTIVITY LISTS ════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Recent Products */}
                    <div className="p-6 rounded bg-white border border-neutral-200 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-black text-neutral-900">Recent Products</h3>
                            <Link to="/admin/products" className="text-xs font-bold text-[#111111] hover:underline">View All</Link>
                        </div>
                        {recentProducts.length === 0 ? (
                            <p className="text-xs text-neutral-400 py-4">No products available.</p>
                        ) : (
                            <div className="divide-y divide-neutral-100">
                                {recentProducts.map((p) => (
                                    <div key={p._id} className="py-3 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 overflow-hidden">
                                                {p.image || p.images?.[0] ? (
                                                    <img src={p.image || p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Package className="w-4 h-4 text-neutral-400" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-neutral-900 line-clamp-1">{p.name}</p>
                                                <p className="text-[10px] text-neutral-400 font-mono">SKU: {p.SKU || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <Link to={`/admin/product/${p._id}/edit`} className="p-2 rounded hover:bg-neutral-100 text-neutral-600 transition-colors" title="Edit">
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recent Enquiries */}
                    <div className="p-6 rounded bg-white border border-neutral-200 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-black text-neutral-900">Recent RFQs & Enquiries</h3>
                            <Link to="/admin/enquiries" className="text-xs font-bold text-[#111111] hover:underline">View All</Link>
                        </div>
                        {recentEnquiries.length === 0 ? (
                            <p className="text-xs text-neutral-400 py-4">No recent enquiries.</p>
                        ) : (
                            <div className="divide-y divide-neutral-100">
                                {recentEnquiries.map((e) => (
                                    <div key={e._id} className="py-3 flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-xs font-bold text-neutral-900">{e.customerName || 'Website Visitor'}</p>
                                            <p className="text-[11px] text-neutral-500 line-clamp-1">{e.message || e.customerEmail}</p>
                                        </div>
                                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-neutral-50 text-[#111111] border border-neutral-100 shrink-0">
                                            {e.status || 'NEW'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Dashboard;
