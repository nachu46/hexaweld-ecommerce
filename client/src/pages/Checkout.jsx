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
            <div className="min-h-[75vh] bg-[#F6F4EE] flex items-center justify-center px-4 py-16">
                <Helmet>
                    <title>Order Confirmation | Jaza Trading W.L.L Qatar</title>
                </Helmet>
                <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E5E0D8] text-center shadow-lg space-y-4">
                    <div className="w-16 h-16 bg-[#B15E2B]/10 text-[#B15E2B] rounded-full flex items-center justify-center mx-auto border border-[#B15E2B]/20">
                        <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-[#1C1B17]">Order Received!</h1>
                    <p className="text-xs font-bold text-[#B15E2B] bg-[#B15E2B]/10 px-3 py-1 rounded-full inline-block border border-[#B15E2B]/20">
                        Ref: {orderRef}
                    </p>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        Thank you for placing your order with Jaza Trading W.L.L. Our Doha commercial logistics team will contact you shortly to coordinate delivery to your jobsite in Qatar.
                    </p>
                    <div className="pt-4 border-t border-[#E5E0D8]">
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center w-full py-3 rounded-full bg-[#B15E2B] hover:bg-[#8E4920] text-white text-xs font-bold transition-colors uppercase tracking-wider"
                        >
                            Return to Products Catalog
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#F6F4EE] text-[#1C1B17] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <Helmet>
                <title>Checkout | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Complete your industrial equipment purchase or formal quote request with Jaza Trading W.L.L." />
            </Helmet>

            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="pb-4 border-b border-[#E5E0D8]">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B15E2B]">ORDER CHECKOUT & LPO SUBMISSION</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1B17]">Checkout & Order Submission</h1>
                    <p className="text-xs text-slate-600 mt-1">Provide delivery address details for prompt commercial site delivery in Qatar</p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-[#E5E0D8] max-w-md mx-auto shadow-sm">
                        <p className="text-sm font-bold text-[#1C1B17] mb-4">No items currently in your checkout list.</p>
                        <Link to="/products" className="inline-block bg-[#B15E2B] hover:bg-[#8E4920] text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-colors">
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Form Inputs */}
                        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-xs space-y-6">
                            {error && (
                                <div className="p-3 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl border border-rose-200">
                                    {error}
                                </div>
                            )}

                            <div>
                                <h2 className="text-base font-serif font-bold text-[#1C1B17] mb-4 flex items-center gap-2">
                                    <Truck className="w-4 h-4 text-[#B15E2B]" /> 1. Customer & Delivery Address
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={form.customerName}
                                            onChange={e => setForm({ ...form, customerName: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-[#D5CFCE] rounded-lg text-xs font-medium text-[#1C1B17] focus:outline-none focus:border-[#B15E2B]"
                                            placeholder="e.g. Ahmed Al-Mansoori"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Company Name</label>
                                        <input
                                            type="text"
                                            value={form.companyName}
                                            onChange={e => setForm({ ...form, companyName: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-[#D5CFCE] rounded-lg text-xs font-medium text-[#1C1B17] focus:outline-none focus:border-[#B15E2B]"
                                            placeholder="e.g. Qatar Fabrication W.L.L"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                                        <input
                                            type="email"
                                            required
                                            value={form.customerEmail}
                                            onChange={e => setForm({ ...form, customerEmail: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-[#D5CFCE] rounded-lg text-xs font-medium text-[#1C1B17] focus:outline-none focus:border-[#B15E2B]"
                                            placeholder="e.g. ahmed@company.qa"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Qatar Phone / Mobile *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={form.customerPhone}
                                            onChange={e => setForm({ ...form, customerPhone: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-[#D5CFCE] rounded-lg text-xs font-medium text-[#1C1B17] focus:outline-none focus:border-[#B15E2B]"
                                            placeholder="e.g. +974 5512 3456"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Delivery Address / Project Site *</label>
                                        <textarea
                                            required
                                            rows={2}
                                            value={form.address}
                                            onChange={e => setForm({ ...form, address: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-[#D5CFCE] rounded-lg text-xs font-medium text-[#1C1B17] focus:outline-none focus:border-[#B15E2B]"
                                            placeholder="Street, Zone, Building or Site Name in Qatar..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[#E5E0D8]">
                                <h2 className="text-base font-serif font-bold text-[#1C1B17] mb-4 flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-[#B15E2B]" /> 2. Preferred Payment Option
                                </h2>
                                <div className="space-y-3">
                                    <label className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${form.paymentMethod === 'cod' ? 'border-[#B15E2B] bg-[#B15E2B]/5' : 'border-[#E5E0D8]'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={form.paymentMethod === 'cod'}
                                            onChange={() => setForm({ ...form, paymentMethod: 'cod' })}
                                        />
                                        <div>
                                            <p className="text-xs font-bold text-[#1C1B17]">Cash on Delivery (COD) / Site Delivery Payment</p>
                                            <p className="text-[10px] text-slate-500 font-medium">Pay upon receiving equipment at site in Qatar.</p>
                                        </div>
                                    </label>

                                    <label className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${form.paymentMethod === 'po_rfq' ? 'border-[#B15E2B] bg-[#B15E2B]/5' : 'border-[#E5E0D8]'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={form.paymentMethod === 'po_rfq'}
                                            onChange={() => setForm({ ...form, paymentMethod: 'po_rfq' })}
                                        />
                                        <div>
                                            <p className="text-xs font-bold text-[#1C1B17]">Official Purchase Order (LPO) / B2B Commercial Invoice</p>
                                            <p className="text-[10px] text-slate-500 font-medium">Invoice issued under verified corporate credit account.</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-full bg-[#B15E2B] hover:bg-[#8E4920] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 transition-all"
                            >
                                {loading ? 'Processing Order...' : 'Submit Final Order'} <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E5E0D8] shadow-xs space-y-4">
                            <h2 className="text-base font-serif font-bold text-[#1C1B17] border-b border-[#E5E0D8] pb-3">
                                Items in Order ({cartCount})
                            </h2>
                            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                                {cartItems.map(item => (
                                    <div key={item._id} className="flex items-center justify-between text-xs gap-3">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className="w-5 h-5 rounded bg-[#F6F4EE] border border-[#E5E0D8] text-[#1C1B17] font-bold text-[10px] flex items-center justify-center shrink-0">
                                                {item.quantity}x
                                            </span>
                                            <span className="font-bold text-[#1C1B17] truncate">{item.name}</span>
                                        </div>
                                        <span className="font-bold text-[#B15E2B] shrink-0">
                                            {typeof item.price === 'number' && item.price > 0 ? `QAR ${item.price * item.quantity}` : 'Wholesale Quote'}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-[#E5E0D8] text-xs space-y-2">
                                <div className="flex justify-between font-bold text-[#1C1B17]">
                                    <span>Subtotal:</span>
                                    <span className="text-[#B15E2B]">{cartSubtotal > 0 ? `QAR ${cartSubtotal.toLocaleString()}` : 'B2B Quotation'}</span>
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
