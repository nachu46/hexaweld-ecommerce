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
        className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-xs"
    >
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shrink-0`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
            <p className="text-xs font-bold text-slate-400">{title}</p>
            <p className="text-2xl font-black text-slate-900">{value ?? '-'}</p>
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
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-slate-900" />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-12">
            <AdminNav 
                title="Catalog & Traffic Analytics" 
                subtitle="Track platform metrics, popular products, and customer interest."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                {error && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                        {error}
                    </div>
                )}

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <StatCard title="Total Catalog Products" value={data?.totals?.products} icon={Package} color="bg-slate-900" />
                    <StatCard title="Total Categories" value={data?.totals?.categories} icon={Tag} color="bg-[#007AFF]" />
                    <StatCard title="Total RFQs & Enquiries" value={data?.totals?.enquiries} icon={MessageCircle} color="bg-emerald-600" />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                        <div className="flex items-center gap-2 mb-6">
                            <TrendingUp className="w-5 h-5 text-[#007AFF]" />
                            <h2 className="text-base font-black text-slate-900">Most Viewed Products</h2>
                        </div>
                        {(data?.topViewedProducts || []).length > 0 ? (
                            <ResponsiveContainer width="100%" height={260}>
                                <BarChart data={(data?.topViewedProducts || []).map(i => ({ name: i.productName?.slice(0, 15) || 'Product', views: i.views }))}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                                    <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 10 }} />
                                    <YAxis tick={{ fill: '#64748B', fontSize: 10 }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                                    <Bar dataKey="views" fill="#007AFF" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : <p className="text-slate-400 text-center py-10 text-xs font-bold">No product view analytics captured yet.</p>}
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                        <div className="flex items-center gap-2 mb-6">
                            <MessageCircle className="w-5 h-5 text-emerald-600" />
                            <h2 className="text-base font-black text-slate-900">Most Enquired Products</h2>
                        </div>
                        {(data?.topEnquiredProducts || []).length > 0 ? (
                            <ResponsiveContainer width="100%" height={260}>
                                <BarChart data={(data?.topEnquiredProducts || []).map(i => ({ name: i.productName?.slice(0, 15) || 'Product', enquiries: i.enquiries }))}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                                    <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 10 }} />
                                    <YAxis tick={{ fill: '#64748B', fontSize: 10 }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                                    <Bar dataKey="enquiries" fill="#059669" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : <p className="text-slate-400 text-center py-10 text-xs font-bold">No RFQ enquiry analytics captured yet.</p>}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Analytics;
