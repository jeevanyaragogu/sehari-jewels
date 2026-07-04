import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isDarkMode?: boolean;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  isDarkMode = false,
}: WishlistDrawerProps) {
  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
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
            {/* Drawer Header */}
            <div className={`p-5 border-b flex items-center justify-between transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-stone-950 text-stone-100 border-stone-800' 
                : 'bg-[#faf8f5] text-stone-900 border-stone-200'
            }`}>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-amber-500 fill-amber-500" />
                <h2 className={`font-serif text-sm tracking-widest uppercase font-bold ${
                  isDarkMode ? 'text-stone-100' : 'text-stone-900'
                }`}>
                  MY WISHLIST ({wishlist.length})
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

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className={`w-16 h-16 rounded-full border flex items-center justify-center ${
                    isDarkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-100'
                  }`}>
                    <Heart className="w-8 h-8 text-stone-300" />
                  </div>
                  <div>
                    <h3 className={`font-serif text-base font-semibold ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Your Wishlist is Empty</h3>
                    <p className="text-xs text-stone-400 mt-1 max-w-xs leading-relaxed">
                      Add sparkling solitaire rings, elegant necklaces, and beautiful bracelets to save them for your next look.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors focus:outline-none cursor-pointer ${
                      isDarkMode 
                        ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                        : 'bg-stone-900 hover:bg-amber-600 text-stone-100 hover:text-white'
                    }`}
                  >
                    CONTINUE BROWSING
                  </button>
                </div>
              ) : (
                wishlist.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className={`flex gap-4 p-3 border rounded-2xl transition-colors ${
                      isDarkMode 
                        ? 'border-stone-800 hover:border-amber-500/10' 
                        : 'border-stone-100 hover:border-amber-500/10'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`w-20 h-20 object-cover rounded-xl border ${
                        isDarkMode ? 'bg-stone-950 border-stone-950' : 'bg-stone-50 border-stone-50'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[9px] text-stone-400 font-sans tracking-wide uppercase font-bold">
                            {item.subcategory}
                          </span>
                          <button
                            onClick={() => onRemoveFromWishlist(item)}
                            className="text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                            title="Remove from Wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <h4 className={`font-serif text-xs font-bold line-clamp-1 mt-0.5 ${
                          isDarkMode ? 'text-stone-100' : 'text-stone-900'
                        }`}>
                          {item.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className={`font-sans text-xs font-bold ${isDarkMode ? 'text-stone-100' : 'text-stone-950'}`}>
                            {formatINR(item.price)}
                          </span>
                          <span className="text-stone-400 text-[10px] line-through">
                            {formatINR(item.originalPrice)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onAddToCart(item);
                          onRemoveFromWishlist(item);
                        }}
                        className={`w-full mt-2 text-[10px] py-1.5 rounded-lg font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-1 focus:outline-none cursor-pointer ${
                          isDarkMode 
                            ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                            : 'bg-stone-950 hover:bg-amber-600 text-stone-100 hover:text-white'
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>MOVE TO BAG</span>
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {wishlist.length > 0 && (
              <div className={`p-5 border-t transition-colors duration-300 ${
                isDarkMode ? 'border-stone-800 bg-stone-950' : 'border-stone-100 bg-stone-50'
              }`}>
                <button
                  onClick={() => {
                    wishlist.forEach((item) => onAddToCart(item));
                    wishlist.forEach((item) => onRemoveFromWishlist(item));
                    onClose();
                  }}
                  className={`w-full py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 focus:outline-none cursor-pointer ${
                    isDarkMode 
                      ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                      : 'bg-stone-950 hover:bg-amber-600 text-stone-100 hover:text-white'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>MOVE ALL TO SHOPPING BAG</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
