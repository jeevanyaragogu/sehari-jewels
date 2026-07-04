import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
  isDarkMode?: boolean;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  isDarkMode = false,
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  const gstRate = 0.03; // 3% GST on jewellery in India
  const subtotal = getSubtotal();
  const gstAmount = subtotal * gstRate;
  const grandTotal = subtotal + gstAmount;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) return;

    // Simulate luxury order creation
    setIsCheckingOut(true);
    setTimeout(() => {
      const generatedOrder = `SEHARI-${Math.floor(100000 + Math.random() * 900000)}-2026`;
      setOrderNumber(generatedOrder);
      setIsCheckingOut(false);
      setOrderSuccess(true);
    }, 1500);
  };

  const handleCloseAndReset = () => {
    onClearCart();
    setOrderSuccess(false);
    setFullName('');
    setPhone('');
    setAddress('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950 z-50 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={`fixed inset-y-0 right-0 w-full max-w-md z-50 shadow-2xl flex flex-col h-full border-l transition-all duration-300 ${
              isDarkMode 
                ? 'bg-stone-900 text-stone-100 border-stone-800' 
                : 'bg-white text-stone-900 border-stone-100'
            }`}
          >
            {/* Header */}
            <div className={`p-5 border-b flex items-center justify-between transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-stone-950 text-stone-100 border-stone-800' 
                : 'bg-[#faf8f5] text-stone-900 border-stone-200'
            }`}>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-500" />
                <h2 className={`font-serif text-sm tracking-widest uppercase font-bold ${
                  isDarkMode ? 'text-stone-100' : 'text-stone-900'
                }`}>
                  SHOPPING BAG ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                </h2>
              </div>
              <button
                onClick={onClose}
                className={`p-1 rounded-full transition-colors focus:outline-none ${
                  isDarkMode 
                    ? 'text-stone-400 hover:text-stone-100 hover:bg-stone-800' 
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Switcher */}
            <div className="flex-1 overflow-y-auto p-5">
              
              {orderSuccess ? (
                /* Order Success View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-5"
                >
                  <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center relative">
                    <Award className="w-10 h-10 text-amber-600 animate-spin-slow" />
                    <div className="absolute -inset-1 border border-amber-500/15 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] bg-stone-950 text-amber-400 border border-amber-500/20 font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                      ORDER SECURED
                    </span>
                    <h3 className={`font-serif text-lg font-bold ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                      Bespoke Jewel Booked Successfully!
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed max-w-xs">
                      Thank you for choosing Sehari Fine Jewels, <strong>{fullName}</strong>. Your luxury pieces are being prepared by our head artisans.
                    </p>
                  </div>

                  {/* Receipt Details card */}
                  <div className={`w-full border rounded-2xl p-4 text-left space-y-3.5 text-xs ${
                    isDarkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-200'
                  }`}>
                    <div className={`flex justify-between pb-2 border-b ${isDarkMode ? 'border-stone-800' : 'border-stone-200'}`}>
                      <span className="text-stone-400">Order ID</span>
                      <span className={`font-mono font-bold ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>{orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Insured Delivery Address</span>
                      <span className={`text-right font-medium max-w-[200px] truncate ${isDarkMode ? 'text-stone-300' : 'text-stone-800'}`}>{address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Valued Payment</span>
                      <span className={`font-bold ${isDarkMode ? 'text-stone-100' : 'text-stone-950'}`}>{formatINR(grandTotal)}</span>
                    </div>
                    <div className={`p-2 rounded-lg border text-[10px] flex items-center gap-1.5 leading-normal ${
                      isDarkMode 
                        ? 'bg-amber-500/5 border-amber-500/20 text-amber-400' 
                        : 'bg-amber-600/5 border-amber-500/20 text-amber-900'
                    }`}>
                      <ShieldCheck className="w-4.5 h-4.5 text-amber-600 flex-shrink-0" />
                      <span>An official GIA certification & BIS Hallmarking dossier will be courier-shipped alongside your jewels.</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCloseAndReset}
                    className={`w-full py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors focus:outline-none cursor-pointer ${
                      isDarkMode 
                        ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                        : 'bg-stone-950 hover:bg-amber-600 text-stone-100 hover:text-white'
                    }`}
                  >
                    CONTINUE SHOPPING
                  </button>
                </motion.div>
              ) : cart.length === 0 ? (
                /* Empty Cart View */
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className={`w-16 h-16 rounded-full border flex items-center justify-center ${
                    isDarkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-100'
                  }`}>
                    <ShoppingBag className="w-8 h-8 text-stone-300" />
                  </div>
                  <div>
                    <h3 className={`font-serif text-base font-semibold ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Your Shopping Bag is Empty</h3>
                    <p className="text-xs text-stone-400 mt-1 max-w-xs leading-relaxed">
                      Select exquisite designs from our categories and experience the luxury of custom handcrafted jewellery.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors focus:outline-none cursor-pointer ${
                      isDarkMode 
                        ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                        : 'bg-stone-900 hover:bg-amber-600 text-stone-100'
                    }`}
                  >
                    DISCOVER COLLECTIONS
                  </button>
                </div>
              ) : (
                /* Item Lists View */
                <div className="space-y-6">
                  
                  {/* Cart Items List */}
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className={`flex gap-4 p-3 border rounded-2xl ${
                          isDarkMode ? 'border-stone-800' : 'border-stone-100'
                        }`}
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className={`w-20 h-20 object-cover rounded-xl border ${
                            isDarkMode ? 'bg-stone-950 border-stone-950' : 'bg-stone-50 border-stone-50'
                          }`}
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 flex flex-col justify-between py-0.5">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-[9px] text-stone-400 font-sans tracking-wide uppercase font-bold">
                                {item.product.subcategory}
                              </span>
                              <button
                                onClick={() => onRemoveFromCart(item.product.id)}
                                className="text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <h4 className={`font-serif text-xs font-bold line-clamp-1 mt-0.5 ${
                              isDarkMode ? 'text-stone-100' : 'text-stone-900'
                            }`}>
                              {item.product.name}
                            </h4>
                            <span className={`font-sans text-xs font-bold mt-1 block ${
                              isDarkMode ? 'text-stone-100' : 'text-stone-950'
                            }`}>
                              {formatINR(item.product.price)}
                            </span>
                          </div>

                          {/* Quantity selector */}
                          <div className="flex items-center justify-between mt-2.5">
                            <span className="text-[10px] text-stone-400 font-sans font-medium">Quantity:</span>
                            <div className={`flex items-center border rounded-lg overflow-hidden ${
                              isDarkMode ? 'border-stone-800 bg-stone-950' : 'border-stone-200 bg-stone-50'
                            }`}>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, -1)}
                                className={`p-1 px-2 text-stone-500 transition-colors focus:outline-none cursor-pointer ${
                                  isDarkMode ? 'hover:bg-stone-900' : 'hover:bg-stone-100'
                                }`}
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className={`px-2 text-xs font-bold font-sans ${isDarkMode ? 'text-stone-100' : 'text-stone-850'}`}>{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, 1)}
                                className={`p-1 px-2 text-stone-500 transition-colors focus:outline-none cursor-pointer ${
                                  isDarkMode ? 'hover:bg-stone-900' : 'hover:bg-stone-100'
                                }`}
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Private Checkout Details panel */}
                  <div className={`border-t pt-5 space-y-4 ${isDarkMode ? 'border-stone-800' : 'border-stone-100'}`}>
                    <h3 className={`font-serif text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 ${
                      isDarkMode ? 'text-stone-100' : 'text-stone-900'
                    }`}>
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>PRIVATE CONCIERGE CHECKOUT</span>
                    </h3>

                    <form onSubmit={handleCheckoutSubmit} className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wide">Client Full Name</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your full name..."
                          className={`w-full text-xs border rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 ${
                            isDarkMode 
                              ? 'bg-stone-950 border-stone-800 text-stone-100' 
                              : 'bg-white border-stone-200 text-stone-800'
                          }`}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wide">Contact Number</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Include country code (e.g. +91)..."
                          className={`w-full text-xs border rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 ${
                            isDarkMode 
                              ? 'bg-stone-950 border-stone-800 text-stone-100' 
                              : 'bg-white border-stone-200 text-stone-800'
                          }`}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wide">Insured Shipping Address</label>
                        <textarea
                          required
                          rows={2}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Full delivery coordinates..."
                          className={`w-full text-xs border rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 resize-none ${
                            isDarkMode 
                              ? 'bg-stone-950 border-stone-800 text-stone-100' 
                              : 'bg-white border-stone-200 text-stone-800'
                          }`}
                        />
                      </div>

                      {/* Display calculations */}
                      <div className={`rounded-2xl p-4 space-y-2.5 text-xs border ${
                        isDarkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-100'
                      }`}>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Luxury Subtotal</span>
                          <span className={`font-medium ${isDarkMode ? 'text-stone-200' : 'text-stone-900'}`}>{formatINR(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Jewellery GST (3% State Levy)</span>
                          <span className={`font-medium ${isDarkMode ? 'text-stone-200' : 'text-stone-900'}`}>{formatINR(gstAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Insured Shipping & Hand Guard</span>
                          <span className="font-semibold text-amber-600 uppercase tracking-wider">COMPLIMENTARY</span>
                        </div>
                        <div className={`border-t pt-2.5 flex justify-between font-serif text-sm font-bold ${
                          isDarkMode ? 'border-stone-800 text-stone-100' : 'border-stone-200 text-stone-950'
                        }`}>
                          <span>Grand Valuation Total</span>
                          <span>{formatINR(grandTotal)}</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isCheckingOut}
                        className={`w-full mt-4 py-3.5 rounded-xl text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 focus:outline-none disabled:opacity-50 cursor-pointer ${
                          isDarkMode 
                            ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                            : 'bg-stone-950 hover:bg-amber-600 text-stone-100 hover:text-white'
                        }`}
                      >
                        {isCheckingOut ? (
                          <>
                            <div className="w-4 h-4 border-2 border-stone-100 border-t-transparent rounded-full animate-spin"></div>
                            <span>SECURING ENCRYPTED GATEWAY...</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-4.5 h-4.5" />
                            <span>PLACE INSURED ORDER</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                </div>
              )}

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
