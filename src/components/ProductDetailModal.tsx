import React from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Award, RotateCcw, Truck, Star } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
  isDarkMode?: boolean;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  isDarkMode = false,
}: ProductDetailModalProps) {
  if (!product || !isOpen) return null;

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Generate realistic luxury specs based on metadata
  const getSpecs = (p: Product) => {
    return [
      { label: 'Hallmark Certificate', value: p.stone === 'None' ? 'BIS 916 Hallmark Certified' : 'GIA Certified & BIS Hallmarked' },
      { label: 'Metal purity', value: p.metal },
      { label: 'Approximate Metal Weight', value: p.category === 'Necklaces' ? '24.5 grams' : p.category === 'Bangles' ? '18.2 grams' : p.category === 'Bracelets' ? '12.4 grams' : '5.2 grams' },
      { label: 'Diamond Clarity', value: p.stone === 'Diamond' || p.stone === 'Solitaire' ? 'VVS1 Clarity Grade' : 'N/A' },
      { label: 'Diamond Color', value: p.stone === 'Diamond' || p.stone === 'Solitaire' ? 'E-F Color Grade (Immaculate White)' : 'N/A' },
      { label: 'Setting Style', value: p.category === 'Rings' ? 'Classic 4-Prong Comfort Setting' : 'Bespoke Bezel Micro-Pavé' },
      { label: 'Occasion Suitability', value: p.occasion },
      { label: 'Premium Collection', value: p.collection },
    ];
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Animated dark backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-950/85 backdrop-blur-sm"
        />

        {/* Animated modal contents */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className={`relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] overflow-y-auto transition-all duration-300 border ${
            isDarkMode 
              ? 'bg-stone-900 border-stone-800 text-stone-100' 
              : 'bg-white border-stone-100 text-stone-900'
          }`}
        >
          
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 z-20 p-2 rounded-full transition-colors focus:outline-none ${
              isDarkMode ? 'bg-stone-800 hover:bg-stone-700 text-stone-300' : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
            }`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Product Image Stage */}
            <div className={`relative p-6 flex items-center justify-center border-b md:border-b-0 md:border-r ${
              isDarkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-100'
            }`}>
              
              {/* Offer Ribbon */}
              {product.offerText && (
                <span className="absolute top-6 left-6 bg-stone-950 text-amber-400 border border-amber-500/30 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-md">
                  {product.offerText}
                </span>
              )}

              <img
                src={product.image}
                alt={product.name}
                className="w-full max-h-[450px] object-cover rounded-2xl shadow-sm hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Product Info Stage */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              
              <div className="space-y-4">
                
                {/* Category & Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] font-sans font-bold text-amber-600 uppercase">
                    {product.subcategory}
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold font-sans text-stone-400">4.9 (42 reviews)</span>
                  </div>
                </div>

                {/* Name */}
                <h2 className={`font-serif text-xl sm:text-2xl font-bold tracking-wide leading-tight ${
                  isDarkMode ? 'text-stone-100' : 'text-stone-900'
                }`}>
                  {product.name}
                </h2>

                {/* Description */}
                <p className={`text-xs sm:text-sm font-sans leading-relaxed tracking-wide ${
                  isDarkMode ? 'text-stone-400' : 'text-stone-500'
                }`}>
                  {product.description}
                </p>

                {/* Price block */}
                <div className={`rounded-2xl p-4 flex items-center justify-between border ${
                  isDarkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-100'
                }`}>
                  <div>
                    <span className="block text-[10px] text-stone-400 line-through font-medium">
                      MRP: {formatINR(product.originalPrice)}
                    </span>
                    <span className={`font-sans text-lg sm:text-xl font-bold tracking-wide ${
                      isDarkMode ? 'text-stone-100' : 'text-stone-950'
                    }`}>
                      Special Price: {formatINR(product.price)}
                    </span>
                    <span className="block text-[9px] text-amber-600 font-semibold mt-0.5 uppercase tracking-wider">
                      GST Included • Insured Express Delivery
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="bg-amber-600/10 border border-amber-600/30 text-amber-800 text-[10px] font-bold px-2.5 py-1.5 rounded-lg block tracking-wide uppercase">
                      Save {formatINR(product.originalPrice - product.price)}
                    </span>
                  </div>
                </div>

                {/* Specifications Accordion Grid */}
                <div>
                  <h3 className={`font-serif text-[11px] font-bold tracking-widest uppercase border-b pb-2 mb-2.5 ${
                    isDarkMode ? 'text-stone-400 border-stone-800' : 'text-stone-400 border-stone-100'
                  }`}>
                    AUTHENTIC JEWEL SPECIFICATIONS
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] leading-relaxed">
                    {getSpecs(product).map((spec) => (
                      <div key={spec.label} className={`py-1 border-b ${
                        isDarkMode ? 'border-stone-800' : 'border-stone-50'
                      }`}>
                        <span className="text-stone-400 block font-sans tracking-wide">{spec.label}</span>
                        <span className={`font-semibold font-sans ${isDarkMode ? 'text-stone-200' : 'text-stone-800'}`}>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className={`mt-8 pt-4 border-t flex flex-col sm:flex-row gap-3 ${
                isDarkMode ? 'border-stone-800' : 'border-stone-100'
              }`}>
                
                {/* Add to Cart */}
                <button
                  onClick={() => {
                    onAddToCart();
                    onClose();
                  }}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-sans text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 focus:outline-none cursor-pointer ${
                    isDarkMode 
                      ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950/20' 
                      : 'bg-stone-950 hover:bg-amber-600 text-stone-100 hover:text-white'
                  }`}
                >
                  <ShoppingBag className="w-4.5 h-4.5" />
                  <span>ADD TO SHOPPING BAG</span>
                </button>

                {/* Add to Wishlist */}
                <button
                  onClick={onToggleWishlist}
                  className={`py-3.5 px-4 rounded-xl border font-semibold flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none cursor-pointer ${
                    isWishlisted
                      ? 'bg-red-50 border-red-200 text-red-500'
                      : isDarkMode
                        ? 'bg-stone-950 border-stone-800 hover:bg-stone-900 text-stone-300 hover:text-stone-100'
                        : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-600 hover:text-stone-900'
                  }`}
                  title={isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                >
                  <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  <span className="text-[10px] tracking-wider uppercase font-bold sm:hidden md:inline">
                    {isWishlisted ? 'WISHLISTED' : 'ADD TO WISHLIST'}
                  </span>
                </button>

              </div>

              {/* Secure checkout credentials */}
              <div className={`mt-4 flex justify-between items-center text-[9px] text-stone-400 border-t pt-3 ${
                isDarkMode ? 'border-stone-800' : 'border-stone-50'
              }`}>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>Certified Hallmarked</span>
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Free Insured Shipping</span>
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                  <span>Lifetime Exchange</span>
                </span>
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
