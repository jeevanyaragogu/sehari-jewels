import React from 'react';
import { Heart, Sparkles, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  key?: string;
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
  onSelectProduct: () => void;
  isDarkMode?: boolean;
}

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  isDarkMode = false,
}: ProductCardProps) {
  // Format prices with standard Indian commas
  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`group relative border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full ${
        isDarkMode 
          ? 'bg-stone-900 border-stone-800 hover:border-amber-500/30' 
          : 'bg-white border-stone-100 hover:border-amber-500/20'
      }`}
    >
      
      {/* Product Image Stage */}
      <div className={`relative overflow-hidden aspect-square border-b ${
        isDarkMode ? 'bg-stone-950 border-stone-950' : 'bg-stone-50 border-stone-50'
      }`}>
        
        {/* Hover Zoom & Pan effect */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
          onClick={onSelectProduct}
        />

        {/* Dark overlay on hover for a sophisticated peek button */}
        <div 
          onClick={onSelectProduct}
          className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
        >
          <div className="bg-stone-900/95 text-stone-100 px-4 py-2 rounded-full border border-amber-500/40 text-xs font-semibold tracking-widest uppercase flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <Eye className="w-4 h-4 text-amber-500" />
            <span>Examine Jewel</span>
          </div>
        </div>

        {/* Offer Ribbon (Luxury Badge) */}
        {product.offerText && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-stone-950/90 text-amber-400 border border-amber-500/30 text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-md shadow-md flex items-center gap-1 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{product.offerText}</span>
            </div>
          </div>
        )}

        {/* Favourite Heart Icon (Toggles Wishlist) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-sm shadow-md text-stone-400 hover:text-red-500 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none ${
            isDarkMode ? 'bg-stone-900/90' : 'bg-white/90'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4.5 h-4.5 transition-colors duration-300 ${
              isWishlisted ? 'fill-red-500 text-red-500' : isDarkMode ? 'text-stone-400 hover:text-red-500' : 'text-stone-600 hover:text-red-500'
            }`}
          />
        </button>

        {/* New / Bestseller Tag */}
        {(product.isNew || product.isBestSeller) && (
          <div className="absolute bottom-4 left-4 z-10 flex gap-1.5">
            {product.isNew && (
              <span className="bg-amber-600 text-white text-[8px] font-bold tracking-widest uppercase px-2 py-1 rounded shadow-sm">
                NEW
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-stone-950 text-amber-400 border border-amber-500/20 text-[8px] font-bold tracking-widest uppercase px-2 py-1 rounded shadow-sm">
                BESTSELLER
              </span>
            )}
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="p-4 flex flex-col flex-1" onClick={onSelectProduct}>
        <div className="flex items-center justify-between gap-2 cursor-pointer">
          <span className={`text-[10px] font-sans tracking-widest uppercase font-bold ${
            isDarkMode ? 'text-stone-400' : 'text-stone-400'
          }`}>
            {product.subcategory}
          </span>
          {product.carat && product.carat !== '0.00 ct' && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
              isDarkMode ? 'text-stone-300 bg-stone-950' : 'text-stone-500 bg-stone-100'
            }`}>
              {product.carat}
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 className={`mt-1.5 font-serif text-sm tracking-wide font-bold line-clamp-1 cursor-pointer transition-colors duration-300 ${
          isDarkMode ? 'text-stone-100 group-hover:text-amber-400' : 'text-stone-900 group-hover:text-amber-800'
        }`}>
          {product.name}
        </h3>

        {/* Short Product Description */}
        <p className={`mt-1 text-xs line-clamp-2 font-sans leading-relaxed tracking-wide ${
          isDarkMode ? 'text-stone-400' : 'text-stone-500'
        }`}>
          {product.description}
        </p>

        {/* Pricing & Cart Panel */}
        <div className={`mt-auto pt-4 flex items-center justify-between border-t ${
          isDarkMode ? 'border-stone-800' : 'border-stone-50'
        }`}>
          <div className="flex flex-col">
            <span className="text-stone-400 text-[10px] line-through font-medium">
              {formatINR(product.originalPrice)}
            </span>
            <span className={`font-sans text-sm sm:text-base font-bold tracking-wide ${
              isDarkMode ? 'text-stone-100' : 'text-stone-950'
            }`}>
              {formatINR(product.price)}
            </span>
          </div>

          {/* Elegant Quick Add to Cart button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 hover:rotate-3 shadow-md focus:outline-none ${
              isDarkMode 
                ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                : 'bg-stone-900 hover:bg-amber-600 text-stone-100 hover:text-white'
            }`}
            title="Add to Luxury Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

    </motion.div>
  );
}
