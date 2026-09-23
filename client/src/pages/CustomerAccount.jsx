import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, MapPin, Package, LogOut, ShieldCheck, Phone, Building2 } from 'lucide-react';

const CustomerAccount = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');

    if (!user) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4">
                <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-sm w-full shadow-lg">
                    <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h2 className="text-xl font-black text-slate-900 mb-2">Account Sign In Required</h2>
                    <p className="text-xs text-slate-500 mb-6">Please log in to access your customer dashboard.</p>
                    <Link to="/login" className="block w-full py-3 bg-[#0B132B] text-white font-bold text-xs rounded-xl shadow-md">
                        Sign In Now
                    </Link>
                </div>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>My Account Dashboard | Jaza Trading W.L.L</title>
            </Helmet>

            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="bg-[#0B132B] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-black text-2xl shadow-md shrink-0">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h1 className="text-2xl font-black">{user.name}</h1>
                            <p className="text-xs text-slate-300 font-medium">{user.email}</p>
                            {user.isAdmin && (
                                <span className="inline-block mt-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                                    ADMINISTRATOR PORTAL ACTIVE
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {user.isAdmin && (
                            <Link to="/admin/dashboard" className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md">
                                Open Admin Panel
                            </Link>
                        )}
                        <button
                            onClick={handleLogout}
                            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 border border-slate-700"
                        >
                            <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                    </div>
                </div>

                {/* Dashboard Tabs & Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    {/* Navigation Sidebar */}
                    <div className="md:col-span-4 bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full p-3 rounded-2xl text-left text-xs font-bold flex items-center gap-3 transition-colors ${
                                activeTab === 'profile' ? 'bg-[#0B132B] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
                            }`}
                        >
                            <User className="w-4 h-4" /> Profile Details
                        </button>
                        <button
                            onClick={() => setActiveTab('addresses')}
                            className={`w-full p-3 rounded-2xl text-left text-xs font-bold flex items-center gap-3 transition-colors ${
                                activeTab === 'addresses' ? 'bg-[#0B132B] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
                            }`}
                        >
                            <MapPin className="w-4 h-4" /> Saved Delivery Addresses
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`w-full p-3 rounded-2xl text-left text-xs font-bold flex items-center gap-3 transition-colors ${
                                activeTab === 'history' ? 'bg-[#0B132B] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
                            }`}
                        >
                            <Package className="w-4 h-4" /> Quotation & Order History
                        </button>
                    </div>

                    {/* Main Tab Panel */}
                    <div className="md:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
                                    Account & Profile Information
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Full Name</p>
                                        <p className="font-bold text-slate-900 mt-1">{user.name}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Email Address</p>
                                        <p className="font-bold text-slate-900 mt-1">{user.email}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Role Permission</p>
                                        <p className="font-bold text-slate-900 mt-1 uppercase">{user.role || 'Customer'}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'addresses' && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
                                    Saved Qatar Delivery Locations
                                </h2>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
                                    <div className="flex items-center gap-2 font-bold text-slate-900">
                                        <MapPin className="w-4 h-4 text-amber-600" /> Default Site Address:
                                    </div>
                                    <p className="font-medium">Al Kassarat Street, Industrial Area, Street 5, Doha, Qatar</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
                                    Recent Quotations & Site Orders
                                </h2>
                                <div className="p-8 text-center text-xs text-slate-500 font-medium">
                                    <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                                    No past orders or formal RFQ records attached to this account yet.
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerAccount;
