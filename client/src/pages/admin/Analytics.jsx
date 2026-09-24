import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Package, Tag, MessageCircle, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import AdminNav from '../../components/AdminNav';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#E5E0D8] rounded-2xl p-5 flex items-center gap-4 shadow-xs"
    >
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shrink-0`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-serif font-bold text-[#1C1B17]">{value ?? 0}</p>
        </div>
    </motion.div>
);

const Analytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
                const { data: res } = await axios.get('/api/admin/analytics', config);
                setData(res);
            } catch (err) {
                setError('Failed to load analytics. Make sure you have admin access.');
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-[#F6F4EE] flex items-center justify-center font-sans">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#B15E2B]" />
        </div>
    );

    const hasViews = (data?.topViewedProducts || []).some(p => (p.views || 0) > 0);
    const hasEnquiries = (data?.topEnquiredProducts || []).some(p => (p.enquiries || 0) > 0);

    return (
        <div className="min-h-screen bg-[#F6F4EE] text-[#1C1B17] font-sans pb-12">
            <AdminNav 
                title="Catalog & Commercial Analytics" 
                subtitle="Track platform metrics, popular building materials, and customer interest in Qatar."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                {error && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                        {error}
                    </div>
                )}

                {/* Stat Cards - Unified Corporate Palette */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <StatCard title="Total Catalog Products" value={data?.totals?.products} icon={Package} color="bg-[#1C1B17]" />
                    <StatCard title="Total Categories" value={data?.totals?.categories} icon={Tag} color="bg-[#B15E2B]" />
                    <StatCard title="Total RFQs & Enquiries" value={data?.totals?.enquiries} icon={MessageCircle} color="bg-[#8E4920]" />
                </div>

                {/* Charts - Unified Warm Corporate Colors */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs">
                        <div className="flex items-center gap-2 mb-6">
                            <TrendingUp className="w-5 h-5 text-[#B15E2B]" />
                            <h2 className="text-base font-serif font-bold text-[#1C1B17]">Most Viewed Products</h2>
                        </div>
                        {hasViews ? (
                            <ResponsiveContainer width="100%" height={260}>
                                <BarChart data={(data?.topViewedProducts || []).map(i => ({ name: i.name?.slice(0, 18) || i.productName?.slice(0, 18) || 'Product', views: i.views }))}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#F6F4EE" />
                                    <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 10 }} />
                                    <YAxis tick={{ fill: '#64748B', fontSize: 10 }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#1C1B17', border: '1px solid #E5E0D8', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                                    <Bar dataKey="views" fill="#B15E2B" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-center py-14 space-y-2">
                                <Package className="w-8 h-8 text-slate-300 mx-auto" />
                                <p className="text-slate-600 text-xs font-bold">No product views recorded yet</p>
                                <p className="text-slate-400 text-[11px] max-w-xs mx-auto">As visitors browse products on the live website, view counts will appear here.</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs">
                        <div className="flex items-center gap-2 mb-6">
                            <MessageCircle className="w-5 h-5 text-[#B15E2B]" />
                            <h2 className="text-base font-serif font-bold text-[#1C1B17]">Most Enquired Products</h2>
                        </div>
                        {hasEnquiries ? (
                            <ResponsiveContainer width="100%" height={260}>
                                <BarChart data={(data?.topEnquiredProducts || []).map(i => ({ name: i.name?.slice(0, 18) || i.productName?.slice(0, 18) || 'Enquiry', enquiries: i.enquiries }))}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#F6F4EE" />
                                    <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 10 }} />
                                    <YAxis tick={{ fill: '#64748B', fontSize: 10 }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#1C1B17', border: '1px solid #E5E0D8', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                                    <Bar dataKey="enquiries" fill="#8E4920" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-center py-14 space-y-2">
                                <MessageCircle className="w-8 h-8 text-slate-300 mx-auto" />
                                <p className="text-slate-600 text-xs font-bold">No product-specific enquiries yet</p>
                                <p className="text-slate-400 text-[11px] max-w-xs mx-auto">When clients submit quotation requests on specific products, interest levels will show here.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Analytics;
