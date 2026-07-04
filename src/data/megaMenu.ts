import { MegaMenuCategory } from '../types';

export const CATEGORIES = [
  'Rings',
  'Earrings',
  'Necklaces',
  'Pendants',
  'Bracelets',
  'Bangles',
  'Chains',
  'Diamond Jewellery',
  'Gold Jewellery',
  'New Arrivals'
];

export const MEGA_MENU_DATA: Record<string, MegaMenuCategory> = {
  'Rings': {
    categories: { title: 'Product Categories', items: ['Solitaire Rings', 'Engagement Rings', 'Eternity Bands', 'Cocktail Rings', 'Casual Rings', 'Men\'s Bands'] },
    priceRange: { title: 'Price Range', items: ['Under ₹50,000', '₹50,000 - ₹1,000,000', '₹1,000,000 - ₹2,000,000', 'Above ₹2,000,000'] },
    brands: { title: 'Brands', items: ['Sehari Signature', 'Aura Solitaire', 'Royal Heritage', 'Classic Essentials'] },
    gender: { title: 'Gender', items: ['Women\'s Rings', 'Men\'s Rings', 'Unisex Bands'] },
    metalType: { title: 'Metal Type', items: ['18K Yellow Gold', '18K White Gold', '18K Rose Gold', '950 Platinum', '22K Traditional'] },
    collections: { title: 'Collections', items: ['Aura of Love', 'Royal Heirlooms', 'Celestial Bloom', 'Modern Minimalist', 'Classic Solitaire'] },
    newArrivals: { title: 'New Arrivals', items: ['The Interlocking Duo', 'Princess Cut Solitaires', 'V-Band Stacking'] },
    trendingProducts: { title: 'Trending Products', items: ['Eternity Band 1.5ct', 'Men\'s Matte Platinum Band'] }
  },
  'Earrings': {
    categories: { title: 'Product Categories', items: ['Diamond Studs', 'Gold Jhumkas', 'Rose Gold Hoops', 'Teardrop Danglers', 'Ear Climbers', 'Chandeliers'] },
    priceRange: { title: 'Price Range', items: ['Under ₹50,000', '₹50,000 - ₹1,50,000', '₹1,50,000 - ₹3,00,000', 'Above ₹3,00,000'] },
    brands: { title: 'Brands', items: ['Sehari Signature', 'Celestial Bloom', 'Traditional India'] },
    gender: { title: 'Gender', items: ['Women\'s Earrings', 'Kids\' Studs', 'Men\'s Solitaire Studs'] },
    metalType: { title: 'Metal Type', items: ['18K Gold', '18K White Gold', '18K Rose Gold', '22K Gold'] },
    collections: { title: 'Collections', items: ['Celestial Bloom', 'Royal Heirlooms', 'Modern Minimalist'] },
    newArrivals: { title: 'New Arrivals', items: ['Hexagonal Emerald Studs', 'Asymmetric Gold Climbers'] },
    trendingProducts: { title: 'Trending Products', items: ['Classic 1.0ct Studs', 'Teardrop Sapphire Hanging'] }
  },
  'Necklaces': {
    categories: { title: 'Product Categories', items: ['Diamond Chokers', 'Bridal Sets', 'Traditional Chokers', 'Lariat Chains', 'Collar Necklaces', 'Multi-Layer Chains'] },
    priceRange: { title: 'Price Range', items: ['Under ₹1,50,000', '₹1,50,000 - ₹5,00,000', '₹5,00,000 - ₹10,00,000', 'Above ₹10,00,000'] },
    brands: { title: 'Brands', items: ['Sehari Haute Joaillerie', 'Imperial Solitaires', 'Heritage Gold'] },
    gender: { title: 'Gender', items: ['Women\'s Necklaces', 'Men\'s Chains'] },
    metalType: { title: 'Metal Type', items: ['18K White Gold', '18K Yellow Gold', '22K Heritage Gold', '950 Platinum'] },
    collections: { title: 'Collections', items: ['Celestial Bloom', 'Royal Heirlooms', 'Aura of Love', 'Modern Minimalist'] },
    newArrivals: { title: 'New Arrivals', items: ['Sleek Rose Gold Cable Collar', 'Sapphire Stream Platinum'] },
    trendingProducts: { title: 'Trending Products', items: ['Imperial Diamond Choker', 'Traditional Temple Ruby'] }
  },
  'Pendants': {
    categories: { title: 'Product Categories', items: ['Heart Pendants', 'Floral Pendants', 'Gemstone Halos', 'Sleek Bars', 'Religious & Auspicious', 'Custom Initials'] },
    priceRange: { title: 'Price Range', items: ['Under ₹30,000', '₹30,000 - ₹75,000', '₹75,000 - ₹1,50,000', 'Above ₹1,50,000'] },
    brands: { title: 'Brands', items: ['Aura Collection', 'Classic Essentials', 'Modern Grace'] },
    gender: { title: 'Gender', items: ['Women\'s Pendants', 'Men\'s Designer Pendants', 'Unisex Crosses'] },
    metalType: { title: 'Metal Type', items: ['18K Gold', '18K White Gold', '18K Rose Gold', '950 Platinum'] },
    collections: { title: 'Collections', items: ['Aura of Love', 'Celestial Bloom', 'Modern Minimalist', 'Royal Heirlooms'] },
    newArrivals: { title: 'New Arrivals', items: ['Royal Sapphire Cross', 'Lotus Diamond Pendant'] },
    trendingProducts: { title: 'Trending Products', items: ['Heart Solitaire Pendant', 'Platinum Bar for Men'] }
  },
  'Bracelets': {
    categories: { title: 'Product Categories', items: ['Tennis Bracelets', 'Link Bracelets', 'Charm Bracelets', 'Open Cuffs', 'Gemstone Wraps'] },
    priceRange: { title: 'Price Range', items: ['Under ₹1,00,000', '₹1,00,000 - ₹2,50,000', '₹2,50,000 - ₹5,00,000', 'Above ₹5,00,000'] },
    brands: { title: 'Brands', items: ['Sehari Active', 'Luxury Diamond Co.', 'Sleek Minimalists'] },
    gender: { title: 'Gender', items: ['Women\'s Bracelets', 'Men\'s Link Bracelets', 'Unisex Cuffs'] },
    metalType: { title: 'Metal Type', items: ['18K White Gold', '18K Yellow Gold', '18K Rose Gold', '950 Platinum'] },
    collections: { title: 'Collections', items: ['Classic Solitaire', 'Modern Minimalist', 'Celestial Bloom', 'Aura of Love'] },
    newArrivals: { title: 'New Arrivals', items: ['Emerald Charm Toggle', 'Gold Grid Link Bracelet'] },
    trendingProducts: { title: 'Trending Products', items: ['Eternity Tennis Bracelet', 'Men\'s Platinum Cuff'] }
  },
  'Bangles': {
    categories: { title: 'Product Categories', items: ['Diamond Bangles', 'Traditional Kadas', 'Flexible Bangles', 'Filigree Bangles', 'Sleek Kadas'] },
    priceRange: { title: 'Price Range', items: ['Under ₹1,50,000', '₹1,50,000 - ₹3,00,000', '₹3,00,000 - ₹5,00,000', 'Above ₹5,00,000'] },
    brands: { title: 'Brands', items: ['Heritage Craft', 'Sleek Luxe', 'Aura Collection'] },
    gender: { title: 'Gender', items: ['Women\'s Bangles', 'Unisex Traditional Kadas'] },
    metalType: { title: 'Metal Type', items: ['18K Gold', '22K Traditional Gold', '950 Platinum', '18K Rose Gold'] },
    collections: { title: 'Collections', items: ['Celestial Bloom', 'Royal Heirlooms', 'Modern Minimalist', 'Aura of Love'] },
    newArrivals: { title: 'New Arrivals', items: ['Modern Rose Gold Kada', 'Traditional Ruby Kada'] },
    trendingProducts: { title: 'Trending Products', items: ['Celestial Diamond Eternity Bangle', 'Platinum Flexi Bangle'] }
  },
  'Chains': {
    categories: { title: 'Product Categories', items: ['Heavy Curb Chains', 'Rope Chains', 'Sleek Diamond-Cut', 'Traditional S-Hook', 'Diamond Station Chains'] },
    priceRange: { title: 'Price Range', items: ['Under ₹50,000', '₹50,000 - ₹1,50,000', '₹1,50,000 - ₹3,00,000', 'Above ₹3,00,000'] },
    brands: { title: 'Brands', items: ['Heritage Chains', 'Modern Sleek', 'Aura Luxe'] },
    gender: { title: 'Gender', items: ['Men\'s Heavy Chains', 'Women\'s Dainty Chains', 'Unisex Rope Chains'] },
    metalType: { title: 'Metal Type', items: ['18K Gold', '950 Platinum', '18K Rose Gold', '22K Gold', '18K White Gold'] },
    collections: { title: 'Collections', items: ['Royal Heirlooms', 'Modern Minimalist', 'Aura of Love', 'Classic Solitaire'] },
    newArrivals: { title: 'New Arrivals', items: ['Diamond Station Chain 18K', 'Traditional 22K Solid Link'] },
    trendingProducts: { title: 'Trending Products', items: ['Heavy Curb Chain 18K', 'Platinum Rope Chain'] }
  },
  'Diamond Jewellery': {
    categories: { title: 'Product Categories', items: ['Solitaire Rings', 'Diamond Chokers', 'Tennis Bracelets', 'Diamond Studs', 'Eternity Bangles', 'Solitaire Pendants'] },
    priceRange: { title: 'Price Range', items: ['Under ₹1,00,000', '₹1,00,000 - ₹3,00,000', '₹3,00,000 - ₹6,00,000', 'Above ₹6,00,000'] },
    brands: { title: 'Brands', items: ['Imperial Solitaires', 'Sehari Diamond Lab', 'Celestial Diamonds'] },
    gender: { title: 'Gender', items: ['Women\'s Diamonds', 'Men\'s Diamond Accessories'] },
    metalType: { title: 'Metal Type', items: ['18K White Gold', '950 Platinum', '18K Yellow Gold', '18K Rose Gold'] },
    collections: { title: 'Collections', items: ['Classic Solitaire', 'Celestial Bloom', 'Aura of Love'] },
    newArrivals: { title: 'New Arrivals', items: ['Princess Cut Diamond Drops', 'Bespoke Pear Solitaire'] },
    trendingProducts: { title: 'Trending Products', items: ['Aura Brilliant Solitaire Ring', 'Imperial Diamond Choker'] }
  },
  'Gold Jewellery': {
    categories: { title: 'Product Categories', items: ['Traditional Kadas', 'Gold Jhumkas', 'Temple Chokers', 'Solid Gold Bands', 'Curb Chains', 'Filigree Bangles'] },
    priceRange: { title: 'Price Range', items: ['Under ₹50,000', '₹50,000 - ₹1,50,000', '₹1,50,000 - ₹3,00,000', 'Above ₹3,00,000'] },
    brands: { title: 'Brands', items: ['Traditional India', 'Heritage Gold', 'Modern Essentials'] },
    gender: { title: 'Gender', items: ['Women\'s Gold', 'Men\'s Solid Gold', 'Kids\' First Gold'] },
    metalType: { title: 'Metal Type', items: ['22K Traditional Yellow Gold', '18K Yellow Gold', '18K Rose Gold'] },
    collections: { title: 'Collections', items: ['Royal Heirlooms', 'Aura of Love', 'Modern Minimalist'] },
    newArrivals: { title: 'New Arrivals', items: ['Traditional 22K Link Chain', 'Asymmetric Ear Climbers'] },
    trendingProducts: { title: 'Trending Products', items: ['Traditional Temple Ruby Choker', 'Traditional Royal Ruby Kada'] }
  },
  'New Arrivals': {
    categories: { title: 'Product Categories', items: ['Latest Rings', 'Latest Earrings', 'Latest Necklaces', 'Latest Pendants', 'Latest Bracelets', 'Latest Bangles'] },
    priceRange: { title: 'Price Range', items: ['Under ₹1,00,000', '₹1,00,000 - ₹3,00,000', 'Above ₹3,00,000'] },
    brands: { title: 'Brands', items: ['Sehari Next', 'Aura Solitaire', 'Royal Heritage'] },
    gender: { title: 'Gender', items: ['Women\'s New Lines', 'Men\'s Modern Lines'] },
    metalType: { title: 'Metal Type', items: ['18K Rose Gold', '950 Platinum', '18K White Gold', '18K Gold'] },
    collections: { title: 'Collections', items: ['Modern Minimalist', 'Royal Heirlooms', 'Celestial Bloom', 'Aura of Love'] },
    newArrivals: { title: 'New Arrivals', items: ['Sapphire Symphony Ring', 'Lotus Diamond Pendant'] },
    trendingProducts: { title: 'Trending Products', items: ['Modern Rose Gold Kada', 'Traditional Ruby Kada'] }
  }
};
