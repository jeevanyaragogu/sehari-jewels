import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Award, ShieldCheck, Sparkles, Send } from 'lucide-react';

interface FooterProps {
  isDarkMode?: boolean;
}

export default function Footer({ isDarkMode = false }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className={`relative transition-all duration-300 border-t ${
      isDarkMode 
        ? 'bg-stone-950 text-stone-300 border-amber-950/40' 
        : 'bg-[#FAF8F5] text-stone-600 border-stone-200'
    }`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(180,140,50,0.04),transparent_40%)] pointer-events-none"></div>
      
      {/* Newsletter Block */}
      <div className={`relative z-10 border-b ${
        isDarkMode ? 'border-stone-900' : 'border-stone-200/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left space-y-2">
            <span className="text-[10px] text-amber-600 font-bold tracking-[0.3em] uppercase block">
              THE SEHARI SOCIETY
            </span>
            <h3 className={`font-serif text-xl sm:text-2xl tracking-wide ${
              isDarkMode ? 'text-stone-100' : 'text-stone-900'
            }`}>
              Subscribe to Receive Private Previews & Luxury Offers
            </h3>
            <p className={`text-xs font-sans leading-relaxed tracking-wide ${
              isDarkMode ? 'text-stone-400' : 'text-stone-500'
            }`}>
              Join our exclusive registry to be notified of bespoke jewelry launches, secret events in our salons, and priority custom consulting access.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md">
            {subscribed ? (
              <div className="bg-amber-500/10 border border-amber-500/30 text-amber-500 p-3 rounded-xl text-xs font-semibold text-center tracking-wide animate-fade-in">
                Welcome to Sehari Fine Jewels. A confirmation has been sent to your registry inbox.
              </div>
            ) : (
              <div className={`relative flex items-center border rounded-xl p-1 shadow-inner focus-within:border-amber-500/50 transition-colors ${
                isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
              }`}>
                <div className="pl-3 text-stone-400">
                  <Mail className="w-4 h-4 text-amber-600/60" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className={`w-full bg-transparent pl-3 pr-24 py-2 text-xs focus:outline-none ${
                    isDarkMode ? 'text-stone-100 placeholder-stone-500' : 'text-stone-800 placeholder-stone-400'
                  }`}
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 bg-amber-600 hover:bg-amber-500 text-white px-4 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
                >
                  <span>JOIN</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 relative z-10 text-xs leading-relaxed">
        
        {/* Brand Core Column */}
        <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-4">
          <div className="flex flex-col">
            <span className={`font-serif text-2xl tracking-[0.2em] uppercase ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>SEHARI</span>
            <span className="font-sans text-[9px] tracking-[0.35em] text-amber-500 uppercase -mt-1 font-semibold">FINE JEWELS</span>
          </div>
          <p className={`text-xs pr-4 ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            Established in craftsmanship and dedicated to eternal design. Sehari Fine Jewels curated collections showcase the brilliance of ethically sourced GIA-certified solitaire diamonds and BIS-hallmarked pure 22K gold.
          </p>
          <div className={`flex items-center gap-4 pt-2 ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors" aria-label="Sehari on Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors" aria-label="Sehari on Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors" aria-label="Sehari on Twitter">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Column 2: Get To Know Us */}
        <div className="space-y-4">
          <h4 className={`font-serif font-bold uppercase tracking-widest text-[10px] ${
            isDarkMode ? 'text-amber-500' : 'text-amber-700'
          }`}>
            Get To Know Us
          </h4>
          <ul className={`space-y-2.5 ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            <li><a href="#/about" className={`transition-colors ${isDarkMode ? 'hover:text-stone-100' : 'hover:text-stone-950'}`}>Our Heritage</a></li>
            <li><a href="#/craftsmanship" className={`transition-colors ${isDarkMode ? 'hover:text-stone-100' : 'hover:text-stone-950'}`}>Art of Fine Jewels</a></li>
            <li><a href="#/press" className={`transition-colors ${isDarkMode ? 'hover:text-stone-100' : 'hover:text-stone-950'}`}>Press & Media</a></li>
            <li><a href="#/salons" className={`transition-colors ${isDarkMode ? 'hover:text-stone-100' : 'hover:text-stone-950'}`}>Our Luxury Salons</a></li>
            <li><a href="#/careers" className={`transition-colors ${isDarkMode ? 'hover:text-stone-100' : 'hover:text-stone-950'}`}>Join Sehari Team</a></li>
          </ul>
        </div>

        {/* Column 3: Customer Service */}
        <div className="space-y-4">
          <h4 className={`font-serif font-bold uppercase tracking-widest text-[10px] ${
            isDarkMode ? 'text-amber-500' : 'text-amber-700'
          }`}>
            Customer Service
          </h4>
          <ul className={`space-y-2.5 ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            <li><a href="#/contact" className={`transition-colors ${isDarkMode ? 'hover:text-stone-100' : 'hover:text-stone-950'}`}>Contact Us</a></li>
            <li><a href="#/consultation" className={`transition-colors ${isDarkMode ? 'hover:text-stone-100' : 'hover:text-stone-950'}`}>Virtual Concierge</a></li>
            <li><a href="#/orders" className={`transition-colors ${isDarkMode ? 'hover:text-stone-100' : 'hover:text-stone-950'}`}>Track Shipment</a></li>
            <li><a href="#/returns" className={`transition-colors ${isDarkMode ? 'hover:text-stone-100' : 'hover:text-stone-950'}`}>Complimentary Returns</a></li>
            <li><a href="#/care" className={`transition-colors ${isDarkMode ? 'hover:text-stone-100' : 'hover:text-stone-950'}`}>Lifelong Care Guide</a></li>
          </ul>
        </div>

        {/* Column 4: Jewellery Guide */}
        <div className="space-y-4">
          <h4 className={`font-serif font-bold uppercase tracking-widest text-[10px] ${
            isDarkMode ? 'text-amber-500' : 'text-amber-700'
          }`}>
            Jewellery Guides
          </h4>
          <ul className={`space-y-2.5 ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            <li><a href="#/carats" className={`transition-colors ${isDarkMode ? 'hover:text-stone-100' : 'hover:text-stone-950'}`}>The 4Cs of Diamonds</a></li>
            <li><a href="#/ring-size" className={`transition-colors ${isDarkMode ? 'hover:text-stone-100' : 'hover:text-stone-950'}`}>Ring Size Assistant</a></li>
            <li><a href="#/gold-buying" className={`transition-colors ${isDarkMode ? 'hover:text-stone-100' : 'hover:text-stone-950'}`}>Gold Hallmark Guide</a></li>
            <li><a href="#/care" className={`transition-colors ${isDarkMode ? 'hover:text-stone-100' : 'hover:text-stone-950'}`}>Diamond Sparkle Care</a></li>
            <li><a href="#/certifications" className={`transition-colors ${isDarkMode ? 'hover:text-stone-100' : 'hover:text-stone-950'}`}>GIA & IGI Certificates</a></li>
          </ul>
        </div>

        {/* Column 5: Contact Specs */}
        <div className="space-y-4 col-span-2 md:col-span-3 lg:col-span-1">
          <h4 className={`font-serif font-bold uppercase tracking-widest text-[10px] ${
            isDarkMode ? 'text-amber-500' : 'text-amber-700'
          }`}>
            Official Contact
          </h4>
          <ul className={`space-y-3.5 ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            <li className="flex gap-2 items-start">
              <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>Sehari House, Colaba Causeway, Mumbai, MH - 400001</span>
            </li>
            <li className="flex gap-2 items-center">
              <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>1800-419-7388 (Toll Free)</span>
            </li>
            <li className="flex gap-2 items-center">
              <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>concierge@sehari.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Trust credentials strip */}
      <div className={`border-t py-6 transition-all duration-300 ${
        isDarkMode ? 'bg-stone-900/40 border-stone-900 text-stone-500' : 'bg-stone-100/50 border-stone-200/60 text-stone-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-[11px] font-semibold tracking-wide uppercase">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4.5 h-4.5 text-amber-500" />
              <span>100% Insured Shipping Worldwide</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4.5 h-4.5 text-amber-500" />
              <span>BIS Hallmarked Pure Gold</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4.5 h-4.5 text-amber-500" />
              <span>GIA Certified Solitaires</span>
            </span>
          </div>
          <div className="text-right">
            <span>Secure SSL Encrypted Checkout</span>
          </div>
        </div>
      </div>

      {/* Copyright strip */}
      <div className={`py-5 text-center text-[10px] tracking-wider uppercase border-t font-sans transition-all duration-300 ${
        isDarkMode 
          ? 'bg-stone-950 text-stone-600 border-stone-900/60' 
          : 'bg-stone-100 text-stone-400 border-stone-200/80'
      }`}>
        &copy; {new Date().getFullYear()} Sehari Fine Jewels Private Limited. All Rights Reserved. Showcase Demo &copy; Orra Inspired Design Layouts.
      </div>

    </footer>
  );
}
