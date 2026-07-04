import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import FilterSidebar from './components/FilterSidebar';
import ProductCard from './components/ProductCard';
import EducationalSection from './components/EducationalSection';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import WishlistDrawer from './components/WishlistDrawer';
import CartDrawer from './components/CartDrawer';
import ProfileModal from './components/ProfileModal';
import { PRODUCTS } from './data/products';
import { Product, FilterState } from './types';
import { Sparkles, ArrowRight, ShieldCheck, Award, Eye, Menu, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_FILTERS: FilterState = {
  category: 'All',
  productType: [],
  priceRange: [0, 2000000],
  metal: [],
  stone: [],
  gender: [],
  occasion: [],
  collection: [],
  availability: 'all',
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  
  // E-commerce interactive states
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  
  // UI drawers & modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Hero Carousel active slide
  const [activeSlide, setActiveSlide] = useState(0);
  const heroSlides = [
    {
      title: 'AURA OF LOVE',
      subtitle: 'Premium Solitaire Engagement Rings',
      description: 'Handcrafted in 18K Yellow Gold & Platinum, capturing the pure eternal sparkle of certified conflict-free solitaires.',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&h=500&q=80',
      cta: 'Explore Bridal Rings',
      filterAction: () => handleSelectCategory('Rings'),
    },
    {
      title: 'CELESTIAL BLOOM',
      subtitle: 'The Fine Diamond Collection',
      description: 'Symphony of intricate diamond drops and cuffs representing natural floral architecture.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&h=500&q=80',
      cta: 'Explore Diamonds',
      filterAction: () => {
        setFilters({
          ...INITIAL_FILTERS,
          stone: ['Diamond', 'Solitaire'],
        });
      },
    },
    {
      title: 'ROYAL HEIRLOOMS',
      subtitle: 'Pure Heritage Gold Masterpieces',
      description: 'Heavy traditional 22K hallmarked gold sets accented with deep ruby cabochons and natural pearls.',
      image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&h=500&q=80',
      cta: 'Explore Gold Jhumkas & Kadas',
      filterAction: () => {
        setFilters({
          ...INITIAL_FILTERS,
          metal: ['22K Gold'],
        });
      },
    },
  ];

  // Auto transition hero banner
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // --- Handlers ---
  const handleSelectCategory = (category: string) => {
    setFilters((prev) => ({
      ...INITIAL_FILTERS, // Reset others to prioritize clean category viewing
      category: category,
    }));
    // Scroll smoothly to product grid anchor
    document.getElementById('product-grid-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectMegaMenuLink = (category: string, filterType: string, value: string) => {
    const baseFilters: FilterState = {
      ...INITIAL_FILTERS,
      category: category === 'Diamond Jewellery' || category === 'Gold Jewellery' || category === 'New Arrivals' ? 'All' : category,
    };

    // Specific mapping
    if (category === 'Diamond Jewellery') {
      baseFilters.stone = ['Diamond', 'Solitaire'];
    } else if (category === 'Gold Jewellery') {
      baseFilters.metal = ['14K Gold', '18K Gold', '22K Gold', '18K Rose Gold', '18K White Gold'];
    }

    if (filterType === 'Product Categories') {
      if (value.includes('Rings')) baseFilters.productType = ['Diamond Ring', 'Gemstone Ring', 'Eternity Ring', 'Minimal Ring', 'Men Ring'];
      else if (value.includes('Earrings')) baseFilters.productType = ['Drop Earrings', 'Jhumkas', 'Studs', 'Hoops', 'Climbers'];
      else if (value.includes('Necklaces')) baseFilters.productType = ['Choker', 'Bridal Necklace', 'Lariat', 'Traditional'];
      else if (value.includes('Pendants')) baseFilters.productType = ['Solitaire Pendant', 'Diamond Pendant', 'Gemstone Pendant', 'Sleek Pendant'];
      else if (value.includes('Bracelets')) baseFilters.productType = ['Tennis Bracelet', 'Link Bracelet', 'Charm Bracelet', 'Cuff'];
      else if (value.includes('Bangles')) baseFilters.productType = ['Diamond Bangle', 'Kada', 'Flexible Bangle', 'Sleek Kada'];
      else if (value.includes('Chains')) baseFilters.productType = ['Curb Chain', 'Rope Chain', 'Sleek Chain'];
    } else if (filterType === 'Price Range') {
      if (value.includes('Under ₹50,000') || value.includes('Under ₹30,000')) baseFilters.priceRange = [0, 50000];
      else if (value.includes('₹50,000 - ₹1,50,000') || value.includes('₹50,000 - ₹1,00,000') || value.includes('₹30,000 - ₹75,000')) baseFilters.priceRange = [50000, 150000];
      else if (value.includes('₹1,50,000 - ₹3,00,000') || value.includes('₹1,50,000 - ₹5,00,000') || value.includes('₹75,000 - ₹1,50,000')) baseFilters.priceRange = [150000, 300000];
      else if (value.includes('₹3,00,000 - ₹5,00,000') || value.includes('₹2,50,000 - ₹5,00,000')) baseFilters.priceRange = [300000, 500000];
      else baseFilters.priceRange = [500000, 2500000];
    } else if (filterType === 'Gender') {
      if (value.includes('Women')) baseFilters.gender = ['Women'];
      else if (value.includes('Men')) baseFilters.gender = ['Men'];
      else baseFilters.gender = ['Unisex'];
    } else if (filterType === 'Metal Type') {
      if (value.includes('Yellow Gold') || value.includes('22K Gold') || value.includes('18K Gold')) baseFilters.metal = ['14K Gold', '18K Gold', '22K Gold'];
      else if (value.includes('White Gold')) baseFilters.metal = ['18K White Gold'];
      else if (value.includes('Rose Gold')) baseFilters.metal = ['18K Rose Gold'];
      else if (value.includes('Platinum')) baseFilters.metal = ['950 Platinum'];
    } else if (filterType === 'Collections') {
      baseFilters.collection = [value];
    }

    setFilters(baseFilters);
    document.getElementById('product-grid-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchQuery('');
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const index = prev.findIndex((item) => item.product.id === product.id);
      if (index > -1) {
        const updated = [...prev];
        updated[index].quantity += 1;
        return updated;
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
    // Open cart drawer immediately for rich UX feedback
    setIsCartDrawerOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // --- Dynamic Filtering Logic ---
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search Query Match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesSubcat = product.subcategory.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesSubcat) {
          return false;
        }
      }

      // Category Match (All vs Specific Rings, Earrings, etc.)
      if (filters.category !== 'All') {
        if (product.category !== filters.category) return false;
      }

      // Product Type (Subcategory) Match
      if (filters.productType.length > 0) {
        if (!filters.productType.includes(product.subcategory)) return false;
      }

      // Price Range Match
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;

      // Metal Match
      if (filters.metal.length > 0) {
        if (!filters.metal.includes(product.metal)) return false;
      }

      // Stone Match
      if (filters.stone.length > 0) {
        if (!filters.stone.includes(product.stone)) return false;
      }

      // Gender Match
      if (filters.gender.length > 0) {
        if (!filters.gender.includes(product.gender)) return false;
      }

      // Occasion Match
      if (filters.occasion.length > 0) {
        if (!filters.occasion.includes(product.occasion)) return false;
      }

      // Collection Match
      if (filters.collection.length > 0) {
        if (!filters.collection.includes(product.collection)) return false;
      }

      // Availability Match (Ready vs Salon)
      if (filters.availability === 'ready') {
        // Mocking: Best Sellers & New are ready to ship, others are custom Salon pieces
        if (!product.isBestSeller && !product.isNew) return false;
      } else if (filters.availability === 'salon') {
        if (product.isBestSeller || product.isNew) return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  // Available Counts for Stats
  const availableCounts = useMemo(() => {
    return {
      total: PRODUCTS.length,
      filtered: filteredProducts.length,
    };
  }, [filteredProducts]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 selection:bg-amber-100 selection:text-amber-900 ${
      isDarkMode 
        ? 'bg-stone-950 text-stone-100 selection:bg-amber-950/40 selection:text-amber-300' 
        : 'bg-stone-50 text-stone-900 selection:bg-amber-100 selection:text-amber-900'
    }`}>
      
      {/* Sticky Header with Theme Switching */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wishlistCount={wishlist.length}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenWishlist={() => setIsWishlistDrawerOpen(true)}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Horizontal Category Nav & Hover Mega Menus */}
      <Navigation
        activeCategory={filters.category}
        onSelectCategory={handleSelectCategory}
        onSelectMegaMenuLink={handleSelectMegaMenuLink}
        isDarkMode={isDarkMode}
      />

      {/* Hero Carousel */}
      <div className="relative h-[340px] sm:h-[420px] lg:h-[480px] overflow-hidden bg-stone-950 text-stone-100 shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.85 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-transparent z-10" />
            <img
              src={heroSlides[activeSlide].image}
              alt={heroSlides[activeSlide].title}
              className="w-full h-full object-cover object-center scale-102"
              referrerPolicy="no-referrer"
            />
            
            {/* Slide Content */}
            <div className="absolute inset-y-0 left-0 flex items-center z-20 px-6 sm:px-12 lg:px-20 max-w-2xl">
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-amber-500 font-serif tracking-[0.3em] text-[10px] sm:text-xs uppercase font-bold">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span>{heroSlides[activeSlide].title}</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light tracking-wide text-stone-100 leading-tight uppercase">
                  {heroSlides[activeSlide].subtitle}
                </h1>
                <p className="text-xs sm:text-sm text-stone-300 font-sans tracking-wide leading-relaxed">
                  {heroSlides[activeSlide].description}
                </p>
                <div className="pt-2">
                  <button
                    onClick={heroSlides[activeSlide].filterAction}
                    className="group bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold tracking-[0.2em] uppercase py-3.5 px-6 rounded-xl shadow-lg hover:shadow-amber-900/40 transition-all duration-300 flex items-center gap-2"
                  >
                    <span>{heroSlides[activeSlide].cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Dots */}
        <div className="absolute bottom-6 right-8 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeSlide === i ? 'bg-amber-500 w-6' : 'bg-stone-500/50 hover:bg-stone-400'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Layout Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Dynamic Promotional Ribbon */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 rounded-3xl p-6 shadow-sm border transition-all duration-300 ${
          isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'
        }`}>
          <div className="flex gap-4 items-center p-2">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-amber-500/10 text-amber-500' : 'bg-amber-500/5 text-amber-600'
            }`}>
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className={`font-serif text-xs font-bold tracking-wide uppercase ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Lifetime Exchange Privilege</h4>
              <p className={`text-[11px] mt-0.5 leading-normal ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>Upgrade or swap your diamond anytime at 100% current value guarantee.</p>
            </div>
          </div>
          <div className={`flex gap-4 items-center p-2 border-t sm:border-t-0 sm:border-x ${
            isDarkMode ? 'border-stone-800' : 'border-stone-100'
          }`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-amber-500/10 text-amber-500' : 'bg-amber-500/5 text-amber-600'
            }`}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className={`font-serif text-xs font-bold tracking-wide uppercase ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>100% Insured Shipping</h4>
              <p className={`text-[11px] mt-0.5 leading-normal ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>Complimentary secure delivery backed by top-tier international couriers.</p>
            </div>
          </div>
          <div className={`flex gap-4 items-center p-2 border-t sm:border-t-0 ${
            isDarkMode ? 'border-stone-800' : 'border-stone-105'
          }`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-amber-500/10 text-amber-500' : 'bg-amber-500/5 text-amber-600'
            }`}>
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className={`font-serif text-xs font-bold tracking-wide uppercase ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>GIA & BIS Certifications</h4>
              <p className={`text-[11px] mt-0.5 leading-normal ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>Every solitaire is GIA/IGI graded, and every gold item is BIS hallmarked.</p>
            </div>
          </div>
        </div>

        {/* Product Grid Anchor */}
        <div id="product-grid-anchor" className="scroll-mt-24">
          
          {/* Section Header */}
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b ${
            isDarkMode ? 'border-stone-800' : 'border-stone-200'
          }`}>
            <div>
              <span className="text-[10px] text-amber-600 font-bold tracking-[0.25em] uppercase block mb-1">
                SEHARI SALON PREVIEW
              </span>
              <h2 className={`font-serif text-2xl sm:text-3xl tracking-wide ${isDarkMode ? 'text-stone-100' : 'text-stone-950 font-semibold'}`}>
                {filters.category === 'All' ? 'Our Flagship Masterpieces' : `${filters.category} Collection`}
              </h2>
            </div>

            {/* Mobile Filter Toggle Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className={`md:hidden flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase py-3 px-5 rounded-xl shadow focus:outline-none cursor-pointer ${
                  isDarkMode 
                    ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                    : 'bg-stone-900 hover:bg-stone-800 text-stone-100'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              
              <span className="text-xs text-stone-400 font-sans tracking-wide">
                Showing <strong className={isDarkMode ? 'text-stone-100 font-semibold' : 'text-stone-900 font-bold'}>{filteredProducts.length}</strong> stunning jewels
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Desktop Left Filter Sidebar */}
            <div className="hidden md:block lg:col-span-1">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                onResetFilters={handleResetFilters}
                availableCounts={availableCounts}
                totalProductsCount={filteredProducts.length}
                isDarkMode={isDarkMode}
              />
            </div>

            {/* Product Grid Listing (3-4 cards per row desktop) */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className={`border rounded-3xl p-12 text-center space-y-4 ${
                  isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'
                }`}>
                  <p className="text-stone-400 text-sm">
                    No fine jewellery items found matching your current refinement parameters.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors focus:outline-none cursor-pointer ${
                      isDarkMode 
                        ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                        : 'bg-stone-900 hover:bg-amber-600 text-stone-100 hover:text-white'
                    }`}
                  >
                    RESET ALL FILTERS
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isWishlisted={wishlist.some((p) => p.id === product.id)}
                        onToggleWishlist={() => handleToggleWishlist(product)}
                        onAddToCart={() => handleAddToCart(product)}
                        onSelectProduct={() => setSelectedProduct(product)}
                        isDarkMode={isDarkMode}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Educational Size Guide Section */}
        <EducationalSection isDarkMode={isDarkMode} />

      </main>

      {/* Premium Multi-Column Footer */}
      <Footer isDarkMode={isDarkMode} />

      {/* --- Interactive Overlays --- */}

      {/* Product Detail Luxury Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlist.some((p) => p.id === selectedProduct.id) : false}
        onToggleWishlist={() => selectedProduct && handleToggleWishlist(selectedProduct)}
        onAddToCart={() => selectedProduct && handleAddToCart(selectedProduct)}
        isDarkMode={isDarkMode}
      />

      {/* Wishlist Sidebar Drawer */}
      <WishlistDrawer
        isOpen={isWishlistDrawerOpen}
        onClose={() => setIsWishlistDrawerOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        isDarkMode={isDarkMode}
      />

      {/* Cart Sidebar Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={() => setCart([])}
        isDarkMode={isDarkMode}
      />

      {/* Profile / Sovereign Membership VIP Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        isDarkMode={isDarkMode}
      />

      {/* Mobile Drawer Slide Filter Panel */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`fixed inset-y-0 right-0 w-4/5 max-w-sm z-50 p-6 shadow-2xl md:hidden overflow-y-auto border-l transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-stone-900 border-stone-800 text-stone-100' 
                  : 'bg-white border-stone-100 text-stone-900'
              }`}
            >
              <div className={`flex justify-between items-center pb-4 mb-6 border-b ${
                isDarkMode ? 'border-stone-800' : 'border-stone-100'
              }`}>
                <span className={`font-serif text-sm font-bold tracking-widest uppercase ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Filters</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className={`p-1 transition-colors focus:outline-none cursor-pointer ${
                    isDarkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-400 hover:text-stone-900'
                  }`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                onResetFilters={handleResetFilters}
                availableCounts={availableCounts}
                totalProductsCount={filteredProducts.length}
                isDarkMode={isDarkMode}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
