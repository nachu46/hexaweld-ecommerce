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
            <div className="min-h-[70vh] flex items-center justify-center bg-neutral-50 px-4">
                <div className="bg-white rounded-xl p-8 border border-neutral-200 text-center max-w-sm w-full">
                    <User className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                    <h2 className="text-xl font-semibold text-neutral-900 mb-2">Account Sign In Required</h2>
                    <p className="text-xs text-neutral-500 mb-6">Please log in to access your customer dashboard.</p>
                    <Link to="/login" className="block w-full py-3 bg-[#111111] text-white font-bold text-xs rounded">
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
        <div className="bg-[#F5F5F5] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-[#111111]">
            <Helmet>
                <title>My Account Dashboard | Jaza Trading W.L.L</title>
            </Helmet>

            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="bg-[#EDEDED] text-[#111111] rounded p-8 sm:p-10 border border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded bg-[#111111] text-white flex items-center justify-center font-bold text-2xl shadow-sm shrink-0">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#111111]">{user.name}</h1>
                            <p className="text-xs text-neutral-600 font-medium">{user.email}</p>
                            {user.isAdmin && (
                                <span className="inline-block mt-1 bg-[#111111]/10 text-[#111111] text-[10px] font-bold px-2 py-0.5 rounded border border-[#111111]/20">
                                    Administrator
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {user.isAdmin && (
                            <Link to="/admin/dashboard" className="bg-[#111111] hover:bg-[#333333] text-white px-4 py-2.5 rounded font-bold text-xs transition-colors">
                                Open Admin Panel
                            </Link>
                        )}
                        <button
                            onClick={handleLogout}
                            className="bg-white hover:bg-[#F5F5F5] text-[#111111] px-4 py-2.5 rounded font-bold text-xs flex items-center gap-2 border border-[#D4D4D4] transition-colors"
                        >
                            <LogOut className="w-4 h-4 text-[#111111]" /> Sign Out
                        </button>
                    </div>
                </div>

                {/* Dashboard Tabs & Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    {/* Navigation Sidebar */}
                    <div className="md:col-span-4 bg-white rounded-xl p-4 border border-[#E5E5E5] space-y-1">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full p-3 rounded text-left text-xs font-bold flex items-center gap-3 transition-colors ${
                                activeTab === 'profile' ? 'bg-[#111111] text-white ' : 'text-[#111111] hover:bg-[#EDEDED]'
                            }`}
                        >
                            <User className="w-4 h-4" /> Profile Details
                        </button>
                        <button
                            onClick={() => setActiveTab('addresses')}
                            className={`w-full p-3 rounded text-left text-xs font-bold flex items-center gap-3 transition-colors ${
                                activeTab === 'addresses' ? 'bg-[#111111] text-white ' : 'text-[#111111] hover:bg-[#EDEDED]'
                            }`}
                        >
                            <MapPin className="w-4 h-4" /> Saved Delivery Addresses
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`w-full p-3 rounded text-left text-xs font-bold flex items-center gap-3 transition-colors ${
                                activeTab === 'history' ? 'bg-[#111111] text-white ' : 'text-[#111111] hover:bg-[#EDEDED]'
                            }`}
                        >
                            <Package className="w-4 h-4" /> Quotation & Order History
                        </button>
                    </div>

                    {/* Main Tab Panel */}
                    <div className="md:col-span-8 bg-white rounded-xl p-6 sm:p-8 border border-neutral-200 shadow-sm">
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-neutral-900 pb-3 border-b border-neutral-100">
                                    Account & Profile Information
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                    <div className="p-4 bg-neutral-50 rounded border border-neutral-100">
                                        <p className="text-[10px] font-bold text-neutral-400 uppercase">Full Name</p>
                                        <p className="font-bold text-neutral-900 mt-1">{user.name}</p>
                                    </div>
                                    <div className="p-4 bg-neutral-50 rounded border border-neutral-100">
                                        <p className="text-[10px] font-bold text-neutral-400 uppercase">Email Address</p>
                                        <p className="font-bold text-neutral-900 mt-1">{user.email}</p>
                                    </div>
                                    <div className="p-4 bg-neutral-50 rounded border border-neutral-100">
                                        <p className="text-[10px] font-bold text-neutral-400 uppercase">Role Permission</p>
                                        <p className="font-bold text-neutral-900 mt-1 uppercase">{user.role || 'Customer'}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'addresses' && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-neutral-900 pb-3 border-b border-neutral-100">
                                    Saved Qatar Delivery Locations
                                </h2>
                                <div className="p-6 bg-neutral-50 rounded border border-neutral-200 text-xs text-neutral-600 space-y-2">
                                    <div className="flex items-center gap-2 font-bold text-neutral-900">
                                        <MapPin className="w-4 h-4 text-amber-600" /> Default Site Address:
                                    </div>
                                    <p className="font-medium">Al Kassarat Street, Industrial Area, Street 5, Doha, Qatar</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-neutral-900 pb-3 border-b border-neutral-100">
                                    Recent Quotations & Site Orders
                                </h2>
                                <div className="p-8 text-center text-xs text-neutral-500 font-medium">
                                    <Package className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
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
