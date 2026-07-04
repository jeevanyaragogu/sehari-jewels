export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  offerText: string;
  metal: '14K Gold' | '18K Gold' | '22K Gold' | '950 Platinum' | '18K White Gold' | '18K Rose Gold';
  stone: 'Diamond' | 'Solitaire' | 'Ruby' | 'Emerald' | 'Sapphire' | 'None';
  gender: 'Women' | 'Men' | 'Unisex';
  occasion: 'Engagement' | 'Wedding' | 'Casual' | 'Festive' | 'Work Wear';
  collection: 'Aura of Love' | 'Royal Heirlooms' | 'Celestial Bloom' | 'Modern Minimalist' | 'Classic Solitaire';
  isNew?: boolean;
  isBestSeller?: boolean;
  carat?: string;
}

export interface FilterState {
  category: string;
  productType: string[];
  priceRange: [number, number];
  metal: string[];
  stone: string[];
  gender: string[];
  occasion: string[];
  collection: string[];
  availability: string;
}

export interface MegaMenuItem {
  title: string;
  items: string[];
}

export interface MegaMenuCategory {
  categories: MegaMenuItem;
  priceRange: MegaMenuItem;
  brands: MegaMenuItem;
  gender: MegaMenuItem;
  metalType: MegaMenuItem;
  collections: MegaMenuItem;
  newArrivals: MegaMenuItem;
  trendingProducts: MegaMenuItem;
}
