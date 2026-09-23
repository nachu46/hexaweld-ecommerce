import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, Truck, CheckCircle2, ArrowRight, CreditCard, FileText } from 'lucide-react';
import { getImageUrl } from '../utils/getImageUrl';

const API_URL = import.meta.env.VITE_API_URL || '';

const Checkout = () => {
    const { cartItems, cartCount, cartSubtotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        customerName: '',
        companyName: '',
        customerEmail: '',
        customerPhone: '',
        address: '',
        city: 'Doha',
        notes: '',
        paymentMethod: 'cod', // 'cod' | 'po_rfq' | 'card'
    });

    const [loading, setLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderRef, setOrderRef] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const summaryText = cartItems.map(i => `${i.name} (Qty: ${i.quantity})`).join(', ');
            const { data } = await axios.post(`${API_URL}/api/enquiries`, {
                customerName: form.customerName,
                customerEmail: form.customerEmail,
                customerPhone: form.customerPhone,
                message: `COMPANY: ${form.companyName || 'N/A'}\nADDRESS: ${form.address}, ${form.city}\nPAYMENT METHOD: ${form.paymentMethod}\nNOTES: ${form.notes || 'N/A'}\n\nORDERED ITEMS:\n${summaryText}`,
                source: 'checkout_order_form',
            });

            const refId = data._id || `JT-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
            setOrderRef(refId);
            setOrderPlaced(true);
            clearCart();
        } catch (err) {
            console.error('Checkout error:', err);
            setError('Could not process checkout order. Please verify your details or contact us directly on WhatsApp.');
        } finally {
            setLoading(false);
        }
    };

    if (orderPlaced) {
        return (
            <div className="min-h-[75vh] bg-slate-50 flex items-center justify-center px-4 py-16">
                <Helmet>
                    <title>Order Confirmation | Jaza Trading W.L.L</title>
                </Helmet>
                <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 text-center shadow-xl space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900">Order Received!</h1>
                    <p className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                        Ref: {orderRef}
                    </p>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        Thank you for placing your order with Jaza Trading W.L.L. Our sales team has received your details and will contact you shortly to confirm delivery schedules in Qatar.
                    </p>
                    <div className="pt-4 border-t border-slate-100">
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-[#0B132B] text-white text-xs font-bold shadow-md hover:bg-slate-800"
                        >
                            Return to Products Directory
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Checkout | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Complete your industrial equipment purchase or formal quote request with Jaza Trading W.L.L." />
            </Helmet>

            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="pb-4 border-b border-slate-200">
                    <h1 className="text-3xl font-black text-slate-900">Checkout & Order Submission</h1>
                    <p className="text-xs font-bold text-slate-500">Provide shipping details for site delivery in Qatar</p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
                        <p className="text-sm font-bold text-slate-900 mb-4">No items in your checkout list.</p>
                        <Link to="/products" className="bg-[#0B132B] text-white px-6 py-2.5 rounded-xl font-bold text-xs">
                            Select Products
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Form Inputs */}
                        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                            {error && (
                                <div className="p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-200">
                                    {error}
                                </div>
                            )}

                            <div>
                                <h2 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <Truck className="w-4 h-4 text-[#0B132B]" /> 1. Customer & Delivery Address
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={form.customerName}
                                            onChange={e => setForm({ ...form, customerName: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0B132B]"
                                            placeholder="e.g. Ahmed Al-Mansoori"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
                                        <input
                                            type="text"
                                            value={form.companyName}
                                            onChange={e => setForm({ ...form, companyName: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0B132B]"
                                            placeholder="e.g. Qatar Fabrication W.L.L"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                                        <input
                                            type="email"
                                            required
                                            value={form.customerEmail}
                                            onChange={e => setForm({ ...form, customerEmail: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0B132B]"
                                            placeholder="e.g. ahmed@company.qa"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Qatar Phone / Mobile *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={form.customerPhone}
                                            onChange={e => setForm({ ...form, customerPhone: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0B132B]"
                                            placeholder="e.g. +974 5512 3456"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Address / Project Site *</label>
                                        <textarea
                                            required
                                            rows={2}
                                            value={form.address}
                                            onChange={e => setForm({ ...form, address: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0B132B]"
                                            placeholder="Street, Zone, Building or Site Name in Qatar..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <h2 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-[#0B132B]" /> 2. Preferred Payment Option
                                </h2>
                                <div className="space-y-3">
                                    <label className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${form.paymentMethod === 'cod' ? 'border-[#0B132B] bg-slate-50' : 'border-slate-200'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={form.paymentMethod === 'cod'}
                                            onChange={() => setForm({ ...form, paymentMethod: 'cod' })}
                                        />
                                        <div>
                                            <p className="text-xs font-bold text-slate-900">Cash on Delivery (COD) / Site Delivery Payment</p>
                                            <p className="text-[10px] text-slate-500 font-medium">Pay upon receiving equipment at site in Qatar.</p>
                                        </div>
                                    </label>

                                    <label className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${form.paymentMethod === 'po_rfq' ? 'border-[#0B132B] bg-slate-50' : 'border-slate-200'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={form.paymentMethod === 'po_rfq'}
                                            onChange={() => setForm({ ...form, paymentMethod: 'po_rfq' })}
                                        />
                                        <div>
                                            <p className="text-xs font-bold text-slate-900">Official Purchase Order (LPO) / B2B Invoice</p>
                                            <p className="text-[10px] text-slate-500 font-medium">Invoice issued under verified corporate credit account.</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-xl bg-[#0B132B] hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all"
                            >
                                {loading ? 'Processing Order...' : 'Submit Final Order'} <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                            <h2 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
                                Items in Order ({cartCount})
                            </h2>
                            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                                {cartItems.map(item => (
                                    <div key={item._id} className="flex items-center justify-between text-xs gap-3">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className="w-5 h-5 rounded bg-slate-100 text-slate-800 font-bold text-[10px] flex items-center justify-center shrink-0">
                                                {item.quantity}x
                                            </span>
                                            <span className="font-bold text-slate-800 truncate">{item.name}</span>
                                        </div>
                                        <span className="font-bold text-slate-900 shrink-0">
                                            {typeof item.price === 'number' && item.price > 0 ? `QAR ${item.price * item.quantity}` : 'Quote'}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-slate-100 text-xs space-y-2">
                                <div className="flex justify-between font-bold text-slate-900">
                                    <span>Subtotal:</span>
                                    <span>{cartSubtotal > 0 ? `QAR ${cartSubtotal.toLocaleString()}` : 'B2B Quotation'}</span>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Checkout;
