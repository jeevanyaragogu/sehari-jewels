import React, { useState } from 'react';
import { CATEGORIES, MEGA_MENU_DATA } from '../data/megaMenu';
import { ChevronDown, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectMegaMenuLink: (category: string, filterType: string, value: string) => void;
  isDarkMode: boolean;
}

export default function Navigation({
  activeCategory,
  onSelectCategory,
  onSelectMegaMenuLink,
  isDarkMode,
}: NavigationProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCat, setExpandedMobileCat] = useState<string | null>(null);

  const handleLinkClick = (category: string, blockTitle: string, itemValue: string) => {
    onSelectMegaMenuLink(category, blockTitle, itemValue);
    setHoveredCategory(null);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileCat = (cat: string) => {
    setExpandedMobileCat(expandedMobileCat === cat ? null : cat);
  };

  return (
    <nav className={`relative border-b transition-colors duration-300 z-40 ${
      isDarkMode 
        ? 'bg-stone-900 border-amber-900/10 text-stone-100' 
        : 'bg-stone-50 border-stone-200/80 text-stone-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:justify-center">
          
          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center justify-between w-full">
            <button
              onClick={() => onSelectCategory('All')}
              className={`font-serif tracking-widest text-sm font-semibold uppercase transition-colors duration-300 ${
                isDarkMode ? 'text-stone-300 hover:text-amber-400' : 'text-stone-700 hover:text-amber-600'
              }`}
            >
              Browse All Collections
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors focus:outline-none ${
                isDarkMode ? 'text-stone-300 hover:text-amber-500' : 'text-stone-600 hover:text-amber-600'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center justify-center space-x-1 lg:space-x-4 h-full">
            <button
              onClick={() => onSelectCategory('All')}
              className={`px-3 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                activeCategory === 'All'
                  ? isDarkMode 
                    ? 'text-amber-400 border-b-2 border-amber-500 font-medium'
                    : 'text-amber-700 border-b-2 border-amber-600 font-semibold'
                  : isDarkMode 
                    ? 'text-stone-300 hover:text-amber-300' 
                    : 'text-stone-600 hover:text-amber-700'
              }`}
            >
              All Jewellery
            </button>

            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <div
                  key={cat}
                  className="h-full flex items-center"
                  onMouseEnter={() => setHoveredCategory(cat)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <button
                    onClick={() => onSelectCategory(cat)}
                    className={`px-3 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center gap-1 ${
                      isActive || hoveredCategory === cat
                        ? isDarkMode ? 'text-amber-400 font-medium' : 'text-amber-700 font-semibold'
                        : isDarkMode ? 'text-stone-300 hover:text-amber-300' : 'text-stone-600 hover:text-amber-700'
                    }`}
                  >
                    <span>{cat}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      hoveredCategory === cat 
                        ? 'rotate-180 text-amber-500' 
                        : isDarkMode ? 'text-stone-500' : 'text-stone-400'
                    }`} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {hoveredCategory === cat && MEGA_MENU_DATA[cat] && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className={`absolute left-0 right-0 top-14 backdrop-blur-md border-b shadow-2xl z-50 transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-stone-950/98 border-amber-900/30 text-stone-200' 
                            : 'bg-white/98 border-stone-200 shadow-xl text-stone-800'
                        }`}
                        onMouseEnter={() => setHoveredCategory(cat)}
                        onMouseLeave={() => setHoveredCategory(null)}
                      >
                        <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-4 gap-8">
                          {Object.entries(MEGA_MENU_DATA[cat]).map(([key, block]) => (
                            <div key={key} className="space-y-3.5 group">
                              <h4 className={`font-serif text-[11px] font-bold tracking-[0.2em] uppercase border-b pb-2 ${
                                isDarkMode 
                                  ? 'text-amber-500 border-amber-900/20' 
                                  : 'text-amber-700 border-stone-200/60'
                              }`}>
                                {block.title}
                              </h4>
                              <ul className="space-y-2">
                                {block.items.map((item) => (
                                  <li key={item}>
                                    <button
                                      onClick={() => handleLinkClick(cat, block.title, item)}
                                      className={`text-xs text-left w-full transition-colors duration-200 font-sans tracking-wide hover:translate-x-1 transform inline-flex items-center gap-1 ${
                                        isDarkMode 
                                          ? 'text-stone-400 hover:text-stone-100' 
                                          : 'text-stone-500 hover:text-stone-900'
                                      }`}
                                    >
                                      <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                                        isDarkMode ? 'bg-amber-500/0 hover:bg-amber-500' : 'bg-amber-600/0 hover:bg-amber-600'
                                      }`}></span>
                                      {item}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className={`py-2.5 text-center text-[10px] tracking-[0.25em] font-serif uppercase border-t ${
                          isDarkMode 
                            ? 'bg-gradient-to-r from-amber-950/10 via-amber-900/20 to-amber-950/10 text-amber-400/90 border-amber-900/10' 
                            : 'bg-stone-50 text-amber-800 border-stone-200/40'
                        }`}>
                          <Sparkles className="w-3.5 h-3.5 inline mr-1 -mt-0.5 animate-pulse" /> Custom Bespoke Consultations Available at Sehari Fine Jewels Salon
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Mobile Sidebar Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed inset-y-0 left-0 w-4/5 max-w-sm z-50 p-6 shadow-2xl md:hidden overflow-y-auto ${
                isDarkMode ? 'bg-stone-950 text-stone-100' : 'bg-white text-stone-900'
              }`}
            >
              <div className={`flex items-center justify-between pb-6 border-b ${isDarkMode ? 'border-stone-800' : 'border-stone-100'}`}>
                <div className="flex flex-col">
                  <span className={`font-serif text-xl tracking-[0.2em] uppercase ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Sehari</span>
                  <span className="font-sans text-[8px] tracking-[0.3em] text-amber-500 uppercase -mt-1 font-medium">Fine Jewels</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-1 focus:outline-none ${isDarkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-500 hover:text-stone-900'}`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <button
                  onClick={() => {
                    onSelectCategory('All');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2 text-sm font-semibold uppercase tracking-widest transition-colors ${
                    activeCategory === 'All' 
                      ? 'text-amber-500' 
                      : isDarkMode ? 'text-stone-300' : 'text-stone-600'
                  }`}
                >
                  All Jewellery
                </button>

                {CATEGORIES.map((cat) => (
                  <div key={cat} className="space-y-2">
                    <button
                      onClick={() => toggleMobileCat(cat)}
                      className={`w-full flex items-center justify-between py-2 text-sm font-semibold uppercase tracking-widest transition-colors ${
                        activeCategory === cat || expandedMobileCat === cat 
                          ? 'text-amber-500' 
                          : isDarkMode ? 'text-stone-300' : 'text-stone-600'
                      }`}
                    >
                      <span>{cat}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedMobileCat === cat ? 'rotate-180' : ''}`} />
                    </button>

                    {expandedMobileCat === cat && MEGA_MENU_DATA[cat] && (
                      <div className={`pl-4 border-l py-2 space-y-4 rounded-r-lg p-3 ${
                        isDarkMode ? 'border-amber-950/40 bg-stone-900/40' : 'border-amber-200 bg-stone-50'
                      }`}>
                        {Object.entries(MEGA_MENU_DATA[cat]).map(([key, block]) => (
                          <div key={key} className="space-y-1">
                            <h5 className="font-serif text-[10px] font-bold text-amber-500/80 uppercase tracking-widest">
                              {block.title}
                            </h5>
                            <div className="grid grid-cols-1 gap-1 pl-2">
                              {block.items.map((item) => (
                                <button
                                  key={item}
                                  onClick={() => handleLinkClick(cat, block.title, item)}
                                  className={`text-[11px] text-left py-1 transition-colors ${
                                    isDarkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-500 hover:text-stone-900'
                                  }`}
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
