import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/getImageUrl';

const CartDrawer = () => {
    const { cartItems, removeFromCart, updateQuantity, cartCount, cartSubtotal, isCartOpen, setIsCartOpen } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl border-l border-slate-200"
                    >
                        {/* Drawer Header */}
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-[#0B132B]" />
                                <h2 className="text-lg font-black text-slate-900">Your Cart</h2>
                                <span className="bg-[#0B132B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {cartCount}
                                </span>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => {
                                    const itemImg = getImageUrl(item.image || item.images?.[0]);
                                    const itemPrice = typeof item.price === 'number' ? item.price : 0;

                                    return (
                                        <div
                                            key={item._id}
                                            className="flex gap-4 p-3 rounded-2xl border border-slate-100 bg-slate-50/50 items-center justify-between"
                                        >
                                            <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 p-1 shrink-0 overflow-hidden">
                                                <img src={itemImg} alt={item.name} className="w-full h-full object-contain" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xs font-bold text-slate-900 truncate mb-1">
                                                    {item.name}
                                                </h3>
                                                <p className="text-[10px] text-slate-500 font-bold mb-2">
                                                    {itemPrice > 0 ? `QAR ${itemPrice}` : 'Price on Request'}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                        className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-xs font-bold text-slate-900 w-4 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                        className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                                                title="Remove item"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-16">
                                    <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                    <p className="text-sm font-bold text-slate-900 mb-1">Your cart is empty</p>
                                    <p className="text-xs text-slate-500 mb-4">Browse our industrial catalog to add items.</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="bg-[#0B132B] text-white px-5 py-2 rounded-xl text-xs font-bold"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer Checkout Summary */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium text-slate-600">Subtotal:</span>
                                    <span className="font-black text-slate-900">
                                        {cartSubtotal > 0 ? `QAR ${cartSubtotal.toLocaleString()}` : 'Quote Request Mode'}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <Link
                                        to="/checkout"
                                        onClick={() => setIsCartOpen(false)}
                                        className="w-full py-3.5 rounded-xl bg-[#0B132B] hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                                    >
                                        Proceed to Checkout <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        to="/cart"
                                        onClick={() => setIsCartOpen(false)}
                                        className="w-full py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 font-bold text-xs flex items-center justify-center transition-colors"
                                    >
                                        View Full Cart Page
                                    </Link>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
