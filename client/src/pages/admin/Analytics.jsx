import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Package, Tag, MessageCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-center gap-4"
    >
        <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center`}>
            <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-3xl font-bold text-white">{value ?? '-'}</p>
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
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-500" />
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <p className="text-red-400">{error}</p>
        </div>
    );

    const viewsData = (data?.topViewedProducts || []).map(item => ({
        name: item.productName?.slice(0, 15) + '...' || 'Unknown',
        views: item.views,
    }));

    const enquiriesData = (data?.topEnquiredProducts || []).map(item => ({
        name: item.productName?.slice(0, 15) + '...' || 'Unknown',
        enquiries: item.enquiries,
    }));

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
                    <p className="text-gray-400 mt-1">Track your platform performance</p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <StatCard title="Total Products" value={data?.totals?.products} icon={Package} color="bg-slate-500" />
                    <StatCard title="Total Categories" value={data?.totals?.categories} icon={Tag} color="bg-blue-500" />
                    <StatCard title="Total Enquiries" value={data?.totals?.enquiries} icon={MessageCircle} color="bg-emerald-500" />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <TrendingUp className="w-5 h-5 text-blue-500" />
                            <h2 className="text-lg font-semibold text-white">Most Viewed Products</h2>
                        </div>
                        {viewsData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={viewsData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                                    <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                    <Bar dataKey="views" fill="#007AFF" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : <p className="text-gray-500 text-center py-10">No view data yet</p>}
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <MessageCircle className="w-5 h-5 text-emerald-400" />
                            <h2 className="text-lg font-semibold text-white">Most Enquired Products</h2>
                        </div>
                        {enquiriesData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={enquiriesData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                                    <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                    <Bar dataKey="enquiries" fill="#10B981" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : <p className="text-gray-500 text-center py-10">No enquiry data yet</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
