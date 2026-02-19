import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Package, List, MessageCircle } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({ products: 0, categories: 0, enquiries: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [productsRes, categoriesRes, enquiriesRes] = await Promise.all([
                    axios.get('/api/products'),
                    axios.get('/api/categories'),
                    axios.get('/api/enquiries'),
                ]);
                setStats({
                    products: productsRes.data.length,
                    categories: categoriesRes.data.length,
                    enquiries: enquiriesRes.data.length,
                });
            } catch (error) {
                console.error('Error fetching stats', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Link to="/admin/products" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Products</p>
                            <h2 className="text-3xl font-bold text-gray-900">{stats.products}</h2>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Package className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                </Link>

                <Link to="/admin/categories" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Categories</p>
                            <h2 className="text-3xl font-bold text-gray-900">{stats.categories}</h2>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                            <List className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                </Link>

                <Link to="/admin/enquiries" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Enquiries</p>
                            <h2 className="text-3xl font-bold text-gray-900">{stats.enquiries}</h2>
                        </div>
                        <div className="bg-orange-100 p-3 rounded-full">
                            <MessageCircle className="w-8 h-8 text-[#F97316]" />
                        </div>
                    </div>
                </Link>
            </div>

            <div className="flex flex-wrap gap-3">
                <Link to="/admin/product/create" className="bg-hex-orange text-white px-6 py-3 rounded-md font-bold hover:bg-orange-600 transition">
                    Add New Product
                </Link>
                <Link to="/admin/products" className="bg-hex-dark text-white px-6 py-3 rounded-md font-bold hover:bg-gray-800 transition">
                    Manage Products
                </Link>
                <Link to="/admin/enquiries" className="bg-white border-2 border-[#F97316] text-[#F97316] px-6 py-3 rounded-md font-bold hover:bg-orange-50 transition">
                    View Enquiries
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
