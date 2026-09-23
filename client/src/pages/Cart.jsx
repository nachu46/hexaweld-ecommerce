import { useCart } from '../context/CartContext';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { getImageUrl } from '../utils/getImageUrl';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount, cartSubtotal } = useCart();

    return (
        <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Shopping Cart | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="View items in your shopping cart, update quantities, or proceed to RFQ checkout." />
            </Helmet>

            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-8 h-8 text-[#0B132B]" />
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Your Shopping Cart</h1>
                            <p className="text-xs font-bold text-slate-500">{cartCount} items selected</p>
                        </div>
                    </div>
                    {cartItems.length > 0 && (
                        <button
                            onClick={clearCart}
                            className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1"
                        >
                            <Trash2 className="w-3.5 h-3.5" /> Clear All
                        </button>
                    )}
                </div>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                            {cartItems.map((item) => {
                                const itemImg = getImageUrl(item.image || item.images?.[0]);
                                const itemPrice = typeof item.price === 'number' ? item.price : 0;

                                return (
                                    <div
                                        key={item._id}
                                        className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50"
                                    >
                                        <div className="flex items-center gap-4 w-full sm:w-auto">
                                            <div className="w-20 h-20 rounded-xl bg-white border border-slate-200 p-2 shrink-0">
                                                <img src={itemImg} alt={item.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <Link to={`/product/${item._id}`} className="text-sm font-bold text-slate-900 hover:text-blue-600 line-clamp-1">
                                                    {item.name}
                                                </Link>
                                                {item.SKU && <p className="text-[10px] font-mono text-slate-400">SKU: {item.SKU}</p>}
                                                <p className="text-xs font-bold text-[#0B132B] mt-1">
                                                    {itemPrice > 0 ? `QAR ${itemPrice}` : 'Price on Request'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2 bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700"
                                                >
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="text-xs font-bold text-slate-900 w-6 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="text-red-500 hover:bg-red-50 p-2 rounded-xl"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="pt-4">
                                <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900">
                                    <ArrowLeft className="w-4 h-4" /> Continue Browsing Products
                                </Link>
                            </div>
                        </div>

                        {/* Order Summary Box */}
                        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-6">
                            <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-4">
                                Order Summary
                            </h2>

                            <div className="space-y-3 text-xs">
                                <div className="flex justify-between font-medium text-slate-600">
                                    <span>Total Items:</span>
                                    <span className="font-bold text-slate-900">{cartCount}</span>
                                </div>
                                <div className="flex justify-between font-medium text-slate-600">
                                    <span>Estimated Subtotal:</span>
                                    <span className="font-bold text-slate-900">
                                        {cartSubtotal > 0 ? `QAR ${cartSubtotal.toLocaleString()}` : 'RFQ Quote Mode'}
                                    </span>
                                </div>
                                <div className="flex justify-between font-medium text-slate-600">
                                    <span>Delivery across Qatar:</span>
                                    <span className="font-bold text-emerald-600">Fast Site Dispatch</span>
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                className="w-full py-4 rounded-xl bg-[#0B132B] hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                            >
                                Proceed to Checkout <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 max-w-lg mx-auto shadow-sm">
                        <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h2 className="text-xl font-black text-slate-900 mb-2">Your Cart is Currently Empty</h2>
                        <p className="text-xs text-slate-500 font-medium mb-6">
                            Explore our industrial machinery, welding supplies, hand tools, and safety footwear to add items.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 bg-[#0B132B] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm"
                        >
                            Browse Products Directory
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
