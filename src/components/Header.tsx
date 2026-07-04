import React, { useState } from 'react';
import { Search, Heart, User, ShoppingBag, Sparkles, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  wishlistCount: number;
  cartCount: number;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenProfile: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  wishlistCount,
  cartCount,
  onOpenWishlist,
  onOpenCart,
  onOpenProfile,
  isDarkMode,
  onToggleTheme,
}: HeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-stone-950 text-stone-100 border-b border-amber-900/30 shadow-xl' 
        : 'bg-white text-stone-900 border-b border-stone-200/80 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
            <div className={`relative flex items-center justify-center w-10 h-10 border rounded-full shadow-inner group-hover:border-amber-400 transition-all duration-300 ${
              isDarkMode 
                ? 'border-amber-500/50 bg-gradient-to-br from-stone-900 to-stone-950' 
                : 'border-amber-500/30 bg-gradient-to-br from-amber-50/20 to-amber-100/30'
            }`}>
              <Sparkles className="w-5 h-5 text-amber-500 group-hover:text-amber-400 group-hover:rotate-12 transition-all duration-500" />
              <div className="absolute -inset-0.5 border border-amber-500/20 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-lg sm:text-2xl tracking-[0.2em] font-light uppercase transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-stone-100 group-hover:text-amber-300' 
                  : 'text-stone-900 group-hover:text-amber-600'
              }`}>
                Sehari
              </span>
              <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.35em] text-amber-500 uppercase -mt-1 font-medium">
                Fine Jewels
              </span>
            </div>
          </div>

          {/* Large Centered Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 sm:mx-8">
            <div className={`relative flex items-center w-full border rounded-full transition-all duration-300 shadow-inner ${
              isDarkMode 
                ? `bg-stone-900 ${isSearchFocused ? 'border-amber-500/80 ring-1 ring-amber-500/30' : 'border-stone-800'}` 
                : `bg-stone-50 ${isSearchFocused ? 'border-amber-500/80 ring-1 ring-amber-500/20' : 'border-stone-200'}`
            }`}>
              <div className="pl-4 text-stone-500">
                <Search className="w-5 h-5 text-amber-500/70" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search for jewellery products..."
                className={`w-full bg-transparent pl-3 pr-4 py-2.5 text-sm focus:outline-none ${
                  isDarkMode 
                    ? 'text-stone-100 placeholder-stone-500' 
                    : 'text-stone-900 placeholder-stone-400'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-4 text-xs font-semibold focus:outline-none transition-colors duration-200 ${
                    isDarkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Action Icons (Theme, Wishlist, Cart, Profile) */}
          <div className="flex items-center gap-1 sm:gap-3.5">
            
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className={`p-2.5 rounded-full transition-all duration-300 hover:scale-105 group ${
                isDarkMode 
                  ? 'text-stone-300 hover:text-amber-400 hover:bg-stone-900' 
                  : 'text-stone-600 hover:text-amber-600 hover:bg-stone-100'
              }`}
              title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Theme Mode"
            >
              {isDarkMode ? (
                <Sun className="w-5.5 h-5.5 text-stone-300 group-hover:text-amber-400 transition-colors duration-300" />
              ) : (
                <Moon className="w-5.5 h-5.5 text-stone-600 group-hover:text-amber-600 transition-colors duration-300" />
              )}
            </button>

            {/* Wishlist Icon */}
            <button
              id="header-wishlist-btn"
              onClick={onOpenWishlist}
              className={`relative p-2.5 transition-all duration-300 hover:scale-105 rounded-full group ${
                isDarkMode 
                  ? 'text-stone-300 hover:text-amber-500 hover:bg-stone-900' 
                  : 'text-stone-600 hover:text-amber-600 hover:bg-stone-100'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5.5 h-5.5 transition-colors duration-300 ${
                isDarkMode ? 'text-stone-300 group-hover:text-amber-500' : 'text-stone-600 group-hover:text-amber-600'
              }`} />
              {wishlistCount > 0 && (
                <span className={`absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center bg-amber-600 text-[10px] font-bold text-white rounded-full border animate-scale-up ${
                  isDarkMode ? 'border-stone-950' : 'border-white'
                }`}>
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className={`relative p-2.5 transition-all duration-300 hover:scale-105 rounded-full group ${
                isDarkMode 
                  ? 'text-stone-300 hover:text-amber-500 hover:bg-stone-900' 
                  : 'text-stone-600 hover:text-amber-600 hover:bg-stone-100'
              }`}
              aria-label="Shopping Bag"
            >
              <ShoppingBag className={`w-5.5 h-5.5 transition-colors duration-300 ${
                isDarkMode ? 'text-stone-300 group-hover:text-amber-500' : 'text-stone-600 group-hover:text-amber-600'
              }`} />
              {cartCount > 0 && (
                <span className={`absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center bg-amber-600 text-[10px] font-bold text-white rounded-full border animate-scale-up ${
                  isDarkMode ? 'border-stone-950' : 'border-white'
                }`}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Icon */}
            <button
              id="header-profile-btn"
              onClick={onOpenProfile}
              className={`p-2.5 transition-all duration-300 hover:scale-105 rounded-full group ${
                isDarkMode 
                  ? 'text-stone-300 hover:text-amber-500 hover:bg-stone-900' 
                  : 'text-stone-600 hover:text-amber-600 hover:bg-stone-100'
              }`}
              aria-label="Profile"
            >
              <User className={`w-5.5 h-5.5 transition-colors duration-300 ${
                isDarkMode ? 'text-stone-300 group-hover:text-amber-500' : 'text-stone-600 group-hover:text-amber-600'
              }`} />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
