import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw, Filter, Check } from 'lucide-react';
import { FilterState } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onResetFilters: () => void;
  availableCounts: Record<string, number>;
  totalProductsCount: number;
  isDarkMode?: boolean;
}

export default function FilterSidebar({
  filters,
  setFilters,
  onResetFilters,
  availableCounts,
  totalProductsCount,
  isDarkMode = false,
}: FilterSidebarProps) {
  // Accordion open/close states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    productType: true,
    priceRange: true,
    metal: true,
    stone: true,
    gender: true,
    occasion: true,
    collections: true,
    availability: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (
    field: keyof Omit<FilterState, 'category' | 'priceRange' | 'availability'>,
    value: string
  ) => {
    setFilters((prev) => {
      const currentValues = prev[field] as string[];
      const isSelected = currentValues.includes(value);
      const updatedValues = isSelected
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [field]: updatedValues };
    });
  };

  const handlePriceCheckbox = (range: [number, number], label: string) => {
    setFilters((prev) => {
      // Toggle price range. If clicked range is already selected, reset to full range.
      const isAlreadySelected = prev.priceRange[0] === range[0] && prev.priceRange[1] === range[1];
      const newRange: [number, number] = isAlreadySelected ? [0, 2000000] : range;
      return { ...prev, priceRange: newRange };
    });
  };

  const handleAvailabilityChange = (value: string) => {
    setFilters((prev) => ({ ...prev, availability: value }));
  };

  // Filter Categories Lists
  const productTypes = [
    'Diamond Ring', 'Gemstone Ring', 'Eternity Ring', 'Minimal Ring', 'Men Ring',
    'Drop Earrings', 'Jhumkas', 'Studs', 'Hoops', 'Climbers',
    'Choker', 'Bridal Necklace', 'Lariat', 'Traditional',
    'Solitaire Pendant', 'Diamond Pendant', 'Gemstone Pendant', 'Sleek Pendant',
    'Tennis Bracelet', 'Link Bracelet', 'Charm Bracelet', 'Cuff',
    'Diamond Bangle', 'Kada', 'Flexible Bangle', 'Sleek Kada',
    'Curb Chain', 'Rope Chain', 'Sleek Chain'
  ];

  const prices = [
    { label: 'Under ₹50,000', range: [0, 50000] as [number, number] },
    { label: '₹50,000 - ₹1,50,000', range: [50000, 150000] as [number, number] },
    { label: '₹1,50,000 - ₹3,00,000', range: [150000, 300000] as [number, number] },
    { label: '₹3,00,000 - ₹5,00,000', range: [300000, 500000] as [number, number] },
    { label: 'Above ₹5,00,000', range: [500000, 2000000] as [number, number] },
  ];

  const metals = [
    '14K Gold', '18K Gold', '22K Gold', '18K White Gold', '18K Rose Gold', '950 Platinum'
  ];

  const stones = [
    'Diamond', 'Solitaire', 'Ruby', 'Emerald', 'Sapphire', 'None'
  ];

  const genders = ['Women', 'Men', 'Unisex'];

  const occasions = ['Engagement', 'Wedding', 'Casual', 'Festive', 'Work Wear'];

  const collections = [
    'Aura of Love', 'Royal Heirlooms', 'Celestial Bloom', 'Modern Minimalist', 'Classic Solitaire'
  ];

  const isPriceSelected = (range: [number, number]) => {
    return filters.priceRange[0] === range[0] && filters.priceRange[1] === range[1];
  };

  return (
    <aside className={`w-full border rounded-2xl shadow-sm p-5 space-y-6 select-none h-fit transition-all duration-300 ${
      isDarkMode 
        ? 'bg-stone-900 border-stone-800 text-stone-100' 
        : 'bg-white border-stone-100 text-stone-900'
    }`}>
      
      {/* Title & Clear Filters Button */}
      <div className={`flex items-center justify-between pb-4 border-b ${
        isDarkMode ? 'border-stone-800' : 'border-stone-100'
      }`}>
        <div className="flex items-center gap-2">
          <Filter className="w-4.5 h-4.5 text-amber-600" />
          <h3 className={`font-serif text-sm tracking-widest uppercase font-bold ${
            isDarkMode ? 'text-stone-100' : 'text-stone-900'
          }`}>
            REFINE SELECTION
          </h3>
        </div>
        <button
          onClick={onResetFilters}
          className={`text-xs flex items-center gap-1 transition-all focus:outline-none ${
            isDarkMode ? 'text-stone-400 hover:text-amber-400' : 'text-stone-400 hover:text-amber-600'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Selected Category Readout */}
      {filters.category !== 'All' && (
        <div className={`border rounded-xl p-3 flex justify-between items-center ${
          isDarkMode 
            ? 'bg-amber-500/10 border-amber-500/30 text-stone-200' 
            : 'bg-amber-500/5 border-amber-500/15 text-stone-800'
        }`}>
          <div className="flex flex-col">
            <span className={`text-[10px] font-sans tracking-wide uppercase font-semibold ${
              isDarkMode ? 'text-stone-500' : 'text-stone-400'
            }`}>Active Collection</span>
            <span className={`text-xs font-bold tracking-wide ${
              isDarkMode ? 'text-amber-400' : 'text-amber-800'
            }`}>{filters.category}</span>
          </div>
          <button
            onClick={() => setFilters(prev => ({ ...prev, category: 'All' }))}
            className="text-[10px] bg-amber-600 hover:bg-amber-500 text-white px-2.5 py-1.5 rounded-md tracking-wider transition-colors font-medium"
          >
            Show All
          </button>
        </div>
      )}

      {/* Accordion List */}
      <div className={`space-y-4 divide-y ${
        isDarkMode ? 'divide-stone-800' : 'divide-stone-100'
      }`}>
        
        {/* Product Type */}
        <div className="pt-4 first:pt-0">
          <button
            onClick={() => toggleSection('productType')}
            className={`w-full flex justify-between items-center text-xs font-semibold tracking-widest uppercase focus:outline-none ${
              isDarkMode ? 'text-stone-100' : 'text-stone-900'
            }`}
          >
            <span>Product Type</span>
            {openSections.productType ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
          </button>
          {openSections.productType && (
            <div className={`mt-3.5 max-h-48 overflow-y-auto space-y-2.5 pr-2 scrollbar-thin ${
              isDarkMode ? 'scrollbar-thumb-stone-800' : 'scrollbar-thumb-stone-200'
            }`}>
              {productTypes.map((type) => {
                const isChecked = filters.productType.includes(type);
                return (
                  <label key={type} className={`flex items-center text-xs cursor-pointer transition-colors group ${
                    isDarkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-600 hover:text-stone-900'
                  }`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange('productType', type)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 border rounded mr-2.5 flex items-center justify-center transition-all duration-200 ${
                      isChecked 
                        ? 'bg-amber-600 border-amber-600 shadow-inner' 
                        : isDarkMode 
                          ? 'border-stone-700 bg-stone-950 group-hover:border-stone-500' 
                          : 'border-stone-300 bg-stone-50 group-hover:border-stone-400'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                    </div>
                    <span className="flex-1 truncate tracking-wide">{type}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('priceRange')}
            className={`w-full flex justify-between items-center text-xs font-semibold tracking-widest uppercase focus:outline-none ${
              isDarkMode ? 'text-stone-100' : 'text-stone-900'
            }`}
          >
            <span>Price Range</span>
            {openSections.priceRange ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
          </button>
          {openSections.priceRange && (
            <div className="mt-3.5 space-y-2.5">
              {prices.map((p) => {
                const isChecked = isPriceSelected(p.range);
                return (
                  <label key={p.label} className={`flex items-center text-xs cursor-pointer transition-colors group ${
                    isDarkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-600 hover:text-stone-900'
                  }`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handlePriceCheckbox(p.range, p.label)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 border rounded mr-2.5 flex items-center justify-center transition-all duration-200 ${
                      isChecked 
                        ? 'bg-amber-600 border-amber-600 shadow-inner' 
                        : isDarkMode 
                          ? 'border-stone-700 bg-stone-950 group-hover:border-stone-500' 
                          : 'border-stone-300 bg-stone-50 group-hover:border-stone-400'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                    </div>
                    <span className="flex-1 tracking-wide">{p.label}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Metal */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('metal')}
            className={`w-full flex justify-between items-center text-xs font-semibold tracking-widest uppercase focus:outline-none ${
              isDarkMode ? 'text-stone-100' : 'text-stone-900'
            }`}
          >
            <span>Metal Pureness</span>
            {openSections.metal ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
          </button>
          {openSections.metal && (
            <div className="mt-3.5 space-y-2.5">
              {metals.map((metal) => {
                const isChecked = filters.metal.includes(metal);
                return (
                  <label key={metal} className={`flex items-center text-xs cursor-pointer transition-colors group ${
                    isDarkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-600 hover:text-stone-900'
                  }`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange('metal', metal)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 border rounded mr-2.5 flex items-center justify-center transition-all duration-200 ${
                      isChecked 
                        ? 'bg-amber-600 border-amber-600 shadow-inner' 
                        : isDarkMode 
                          ? 'border-stone-700 bg-stone-950 group-hover:border-stone-500' 
                          : 'border-stone-300 bg-stone-50 group-hover:border-stone-400'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                    </div>
                    <span className="flex-1 tracking-wide">{metal}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Stone */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('stone')}
            className={`w-full flex justify-between items-center text-xs font-semibold tracking-widest uppercase focus:outline-none ${
              isDarkMode ? 'text-stone-100' : 'text-stone-900'
            }`}
          >
            <span>Stone Type</span>
            {openSections.stone ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
          </button>
          {openSections.stone && (
            <div className="mt-3.5 space-y-2.5">
              {stones.map((stone) => {
                const isChecked = filters.stone.includes(stone);
                return (
                  <label key={stone} className={`flex items-center text-xs cursor-pointer transition-colors group ${
                    isDarkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-600 hover:text-stone-900'
                  }`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange('stone', stone)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 border rounded mr-2.5 flex items-center justify-center transition-all duration-200 ${
                      isChecked 
                        ? 'bg-amber-600 border-amber-600 shadow-inner' 
                        : isDarkMode 
                          ? 'border-stone-700 bg-stone-950 group-hover:border-stone-500' 
                          : 'border-stone-300 bg-stone-50 group-hover:border-stone-400'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                    </div>
                    <span className="flex-1 tracking-wide">{stone === 'None' ? 'Plain Metal' : stone}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Gender */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('gender')}
            className={`w-full flex justify-between items-center text-xs font-semibold tracking-widest uppercase focus:outline-none ${
              isDarkMode ? 'text-stone-100' : 'text-stone-900'
            }`}
          >
            <span>Gender</span>
            {openSections.gender ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
          </button>
          {openSections.gender && (
            <div className="mt-3.5 space-y-2.5">
              {genders.map((g) => {
                const isChecked = filters.gender.includes(g);
                return (
                  <label key={g} className={`flex items-center text-xs cursor-pointer transition-colors group ${
                    isDarkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-600 hover:text-stone-900'
                  }`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange('gender', g)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 border rounded mr-2.5 flex items-center justify-center transition-all duration-200 ${
                      isChecked 
                        ? 'bg-amber-600 border-amber-600 shadow-inner' 
                        : isDarkMode 
                          ? 'border-stone-700 bg-stone-950 group-hover:border-stone-500' 
                          : 'border-stone-300 bg-stone-50 group-hover:border-stone-400'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                    </div>
                    <span className="flex-1 tracking-wide">{g}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Occasion */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('occasion')}
            className={`w-full flex justify-between items-center text-xs font-semibold tracking-widest uppercase focus:outline-none ${
              isDarkMode ? 'text-stone-100' : 'text-stone-900'
            }`}
          >
            <span>Occasion</span>
            {openSections.occasion ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
          </button>
          {openSections.occasion && (
            <div className="mt-3.5 space-y-2.5">
              {occasions.map((o) => {
                const isChecked = filters.occasion.includes(o);
                return (
                  <label key={o} className={`flex items-center text-xs cursor-pointer transition-colors group ${
                    isDarkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-600 hover:text-stone-900'
                  }`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange('occasion', o)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 border rounded mr-2.5 flex items-center justify-center transition-all duration-200 ${
                      isChecked 
                        ? 'bg-amber-600 border-amber-600 shadow-inner' 
                        : isDarkMode 
                          ? 'border-stone-700 bg-stone-950 group-hover:border-stone-500' 
                          : 'border-stone-300 bg-stone-50 group-hover:border-stone-400'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                    </div>
                    <span className="flex-1 tracking-wide">{o}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Collections */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('collections')}
            className={`w-full flex justify-between items-center text-xs font-semibold tracking-widest uppercase focus:outline-none ${
              isDarkMode ? 'text-stone-100' : 'text-stone-900'
            }`}
          >
            <span>Collections</span>
            {openSections.collections ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
          </button>
          {openSections.collections && (
            <div className="mt-3.5 space-y-2.5">
              {collections.map((col) => {
                const isChecked = filters.collection.includes(col);
                return (
                  <label key={col} className={`flex items-center text-xs cursor-pointer transition-colors group ${
                    isDarkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-600 hover:text-stone-900'
                  }`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange('collection', col)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 border rounded mr-2.5 flex items-center justify-center transition-all duration-200 ${
                      isChecked 
                        ? 'bg-amber-600 border-amber-600 shadow-inner' 
                        : isDarkMode 
                          ? 'border-stone-700 bg-stone-950 group-hover:border-stone-500' 
                          : 'border-stone-300 bg-stone-50 group-hover:border-stone-400'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                    </div>
                    <span className="flex-1 tracking-wide">{col}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Availability */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('availability')}
            className={`w-full flex justify-between items-center text-xs font-semibold tracking-widest uppercase focus:outline-none ${
              isDarkMode ? 'text-stone-100' : 'text-stone-900'
            }`}
          >
            <span>Availability</span>
            {openSections.availability ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
          </button>
          {openSections.availability && (
            <div className="mt-3.5 space-y-3">
              {[
                { label: 'All Products', value: 'all' },
                { label: 'Ready to Ship (Fast)', value: 'ready' },
                { label: 'Exclusively in Salon', value: 'salon' },
              ].map((av) => (
                <label key={av.value} className={`flex items-center text-xs cursor-pointer transition-colors group ${
                  isDarkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-600 hover:text-stone-900'
                }`}>
                  <input
                    type="radio"
                    name="availability"
                    checked={filters.availability === av.value}
                    onChange={() => handleAvailabilityChange(av.value)}
                    className="sr-only"
                  />
                  <div className={`w-4.5 h-4.5 border rounded-full mr-2.5 flex items-center justify-center transition-all duration-200 ${
                    isDarkMode 
                      ? 'border-stone-700 bg-stone-950 group-hover:border-stone-500' 
                      : 'border-stone-300 bg-stone-50 group-hover:border-stone-400'
                  }`}>
                    {filters.availability === av.value && (
                      <div className="w-2.5 h-2.5 bg-amber-600 rounded-full animate-scale-up"></div>
                    )}
                  </div>
                  <span className="flex-1 tracking-wide">{av.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Showing Result Stats */}
      <div className={`pt-4 border-t text-[10px] tracking-wider font-sans text-center uppercase font-semibold ${
        isDarkMode ? 'border-stone-800 text-stone-500' : 'border-stone-100 text-stone-400'
      }`}>
        Showing {totalProductsCount} of {availableCounts.total || 40} Jewels
      </div>

    </aside>
  );
}
