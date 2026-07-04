import React, { useState } from 'react';
import { Award, Info, Scale, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface CaratGuide {
  carat: string;
  diameter: string;
  occasion: string;
  appearance: string;
  budgetRange: string;
  sizeMultiplier: number; // For visualization
  description: string;
}

interface EducationalSectionProps {
  isDarkMode?: boolean;
}

export default function EducationalSection({ isDarkMode = false }: EducationalSectionProps) {
  const [selectedCarat, setSelectedCarat] = useState<number>(2); // Default to 1.00 Carat

  const caratData: CaratGuide[] = [
    {
      carat: '0.25 Carat',
      diameter: '4.1 mm',
      occasion: 'Everyday Wear, Graduation, Prom',
      appearance: 'Dainty and delicate. Ideal for minimalist stackable rings, simple earrings, or young wearers.',
      budgetRange: '₹25,000 - ₹45,000',
      sizeMultiplier: 0.65,
      description: 'Elegant, subtle, and highly accessible. Perfect for layering with other fine jewellery or as a tasteful everyday accent.'
    },
    {
      carat: '0.50 Carat',
      diameter: '5.1 mm',
      occasion: 'Anniversary, Promise Rings, Work Milestones',
      appearance: 'Noticeable and refined. Strikes a perfect balance between sparkle and functional everyday comfort.',
      budgetRange: '₹55,000 - ₹1,10,000',
      sizeMultiplier: 0.82,
      description: 'A popular choice for promise rings and milestone gifts. It has high visibility but remains highly comfortable for busy, active lifestyles.'
    },
    {
      carat: '1.00 Carat',
      diameter: '6.5 mm',
      occasion: 'Engagement, Wedding, 10th Anniversary',
      appearance: 'Prestigious and brilliant. The quintessential gold standard for bridal and premium diamond solitaires.',
      budgetRange: '₹1,60,000 - ₹3,50,000',
      sizeMultiplier: 1.0,
      description: 'The global benchmark for engagements. Captures spectacular light and makes a profound statement on any hand.'
    },
    {
      carat: '1.50 Carat',
      diameter: '7.4 mm',
      occasion: 'Luxury Weddings, Significant Birthdays',
      appearance: 'Exquisite and substantial. Offers exceptional presence that commands attention with immense fire and brilliance.',
      budgetRange: '₹4,20,000 - ₹7,80,000',
      sizeMultiplier: 1.15,
      description: 'Stunning brilliance. This stone sits prominently on the hand and displays maximum brilliance in halo or classic solitaire prongs.'
    },
    {
      carat: '2.00 Carat',
      diameter: '8.1 mm',
      occasion: 'Silver Jubilee, Luxury Statement, Heirloom',
      appearance: 'Magnificent and majestic. Designed for true connoisseurs who demand outstanding prestige and optical luxury.',
      budgetRange: '₹8,50,000 - ₹15,50,000',
      sizeMultiplier: 1.28,
      description: 'A spectacular treasure. Holds immediate visual presence. Typically selected to become a generational family heirloom.'
    },
    {
      carat: '3.00 Carat',
      diameter: '9.3 mm',
      occasion: 'Red Carpet, High Society Gala, Legacy Milestones',
      appearance: 'Breathtaking and legendary. An extraordinary masterpiece of nature that symbolizes unmatched status and ultimate success.',
      budgetRange: '₹18,00,000+',
      sizeMultiplier: 1.45,
      description: 'A magnificent showstopper. Reserved for the most special collector pieces, offering absolute premium status and ultimate light output.'
    },
  ];

  return (
    <section className={`rounded-3xl overflow-hidden shadow-2xl relative transition-all duration-300 border ${
      isDarkMode 
        ? 'bg-stone-950 text-stone-100 border-amber-950/40' 
        : 'bg-[#faf8f5] text-stone-900 border-amber-100'
    }`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(180,140,50,0.08),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-12 lg:p-16 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto space-y-3.5">
          <div className="flex justify-center items-center gap-1 text-amber-600 text-xs font-semibold tracking-[0.25em] uppercase">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Diamond Buying Guide</span>
          </div>
          <h2 className={`font-serif text-2xl sm:text-4xl tracking-wide ${
            isDarkMode ? 'text-stone-100' : 'text-stone-950 font-bold'
          }`}>
            How to Choose the Right Diamond Size for You
          </h2>
          <p className={`text-xs sm:text-sm font-sans tracking-wide leading-relaxed ${
            isDarkMode ? 'text-stone-400' : 'text-stone-600'
          }`}>
            Understanding carat weight and its actual physical appearance is essential to choosing a stone that complements your lifestyle, finger structure, and budget. Explore our interactive diamond scale below.
          </p>
        </div>

        {/* Interactive Carat Scale Visualization */}
        <div className={`mt-12 border rounded-2xl p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
          isDarkMode 
            ? 'bg-stone-900/60 border-stone-800/80' 
            : 'bg-white border-stone-200 shadow-sm'
        }`}>
          
          {/* Interactive slider / select panel */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className={`font-serif text-lg tracking-wide flex items-center gap-2 ${
              isDarkMode ? 'text-amber-400' : 'text-amber-700'
            }`}>
              <Scale className="w-5 h-5 text-amber-500" />
              <span>Interactive Size Evaluator</span>
            </h3>

            {/* Quick Select Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {caratData.map((item, index) => (
                <button
                  key={item.carat}
                  onClick={() => setSelectedCarat(index)}
                  className={`py-2.5 px-3 rounded-xl border text-center transition-all duration-300 focus:outline-none ${
                    selectedCarat === index
                      ? 'bg-amber-600 border-amber-500 text-white font-semibold shadow-lg shadow-amber-950/20'
                      : isDarkMode
                        ? 'bg-stone-950/40 border-stone-800 text-stone-300 hover:border-amber-500/30'
                        : 'bg-[#faf8f5] border-stone-200 text-stone-700 hover:border-amber-500/30'
                  }`}
                >
                  <span className="block text-[11px] tracking-wider uppercase font-bold">{item.carat.split(' ')[0]}</span>
                  <span className={`block text-[10px] font-mono mt-0.5 ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>{item.diameter}</span>
                </button>
              ))}
            </div>

            {/* Selected Carat Quick Fact Sheet */}
            <motion.div
              key={selectedCarat}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`border rounded-xl p-5 space-y-3.5 ${
                isDarkMode ? 'bg-stone-950/60 border-amber-950/20' : 'bg-stone-50 border-stone-200/60'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className={`text-sm font-serif font-bold ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>{caratData[selectedCarat].carat} Solitaire</span>
                <span className={`text-xs border px-2.5 py-1 rounded-md font-semibold font-mono ${
                  isDarkMode 
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                    : 'bg-amber-600/10 border-amber-600/20 text-amber-850'
                }`}>
                  {caratData[selectedCarat].budgetRange}
                </span>
              </div>
              <p className={`text-xs leading-relaxed font-sans ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                {caratData[selectedCarat].description}
              </p>
              <div className={`text-[10px] space-y-1 ${isDarkMode ? 'text-stone-500' : 'text-stone-500'}`}>
                <p><strong>Actual Face-up Diameter:</strong> {caratData[selectedCarat].diameter}</p>
                <p className="truncate"><strong>Best Suited For:</strong> {caratData[selectedCarat].occasion}</p>
              </div>
            </motion.div>
          </div>

          {/* Graphical rendering of diamond relative size */}
          <div className={`lg:col-span-7 flex flex-col items-center justify-center border rounded-2xl p-6 min-h-[250px] relative overflow-hidden ${
            isDarkMode ? 'bg-stone-950/40 border-stone-800/50' : 'bg-stone-100/30 border-stone-200/60'
          }`}>
            
            {/* Background grids */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.03] pointer-events-none">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className={`border ${isDarkMode ? 'border-stone-100' : 'border-stone-400'}`}></div>
              ))}
            </div>

            {/* Dynamic Scaled Vector Diamond */}
            <div className="relative flex items-center justify-center w-40 h-40">
              <motion.div
                key={selectedCarat}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: caratData[selectedCarat].sizeMultiplier, opacity: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 120 }}
                className="absolute flex items-center justify-center"
              >
                {/* Simulated Diamond Shine Shape */}
                <div className="w-24 h-24 bg-gradient-to-tr from-amber-500/20 via-sky-300/30 to-white/70 rounded-full blur-xl animate-pulse"></div>
                
                {/* SVG faceted diamond vector */}
                <svg
                  viewBox="0 0 100 100"
                  className={`w-20 h-20 drop-shadow-[0_10px_15px_rgba(255,255,255,0.2)] ${isDarkMode ? 'text-stone-100' : 'text-stone-800'}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <polygon points="50,15 80,15 90,40 50,85 10,40 20,15" className={`${isDarkMode ? 'fill-stone-900/80 stroke-stone-300' : 'fill-white/80 stroke-stone-600'}`} />
                  <polygon points="50,15 35,15 25,40 50,40" className={`${isDarkMode ? 'stroke-stone-300/60' : 'stroke-stone-600/60'}`} />
                  <polygon points="50,15 65,15 75,40 50,40" className={`${isDarkMode ? 'stroke-stone-300/60' : 'stroke-stone-600/60'}`} />
                  <polygon points="50,40 25,40 10,40 50,85" className={`${isDarkMode ? 'stroke-stone-300/40' : 'stroke-stone-600/40'}`} />
                  <polygon points="50,40 75,40 90,40 50,85" className={`${isDarkMode ? 'stroke-stone-300/40' : 'stroke-stone-600/40'}`} />
                  <line x1="35" y1="15" x2="25" y2="40" className={isDarkMode ? 'stroke-stone-300' : 'stroke-stone-600'} />
                  <line x1="65" y1="15" x2="75" y2="40" className={isDarkMode ? 'stroke-stone-300' : 'stroke-stone-600'} />
                  <line x1="50" y1="15" x2="50" y2="85" className={isDarkMode ? 'stroke-stone-300' : 'stroke-stone-600'} />
                </svg>
              </motion.div>
            </div>

            {/* Simulated Hand Size Reference Ring */}
            <div className="mt-2 text-center">
              <span className={`text-[10px] font-sans tracking-widest uppercase font-bold ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>
                DIAMOND TO MM SCALE REFERENCE ({caratData[selectedCarat].diameter})
              </span>
              <p className={`text-[11px] mt-1 font-serif italic ${isDarkMode ? 'text-amber-500/80' : 'text-amber-700 font-semibold'}`}>
                “{caratData[selectedCarat].appearance.split('.')[0]}.”
              </p>
            </div>

          </div>
        </div>

        {/* Professional Comparison Grid / Table */}
        <div className={`mt-12 overflow-x-auto rounded-xl border ${isDarkMode ? 'border-stone-800' : 'border-stone-200'}`}>
          <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm">
            <thead>
              <tr className={`border-b ${
                isDarkMode ? 'bg-stone-900 text-amber-500 border-stone-800' : 'bg-stone-100 text-amber-900 border-stone-250'
              }`}>
                <th className="p-4 font-serif tracking-widest uppercase text-[11px] font-bold">Carat Weight</th>
                <th className="p-4 font-serif tracking-widest uppercase text-[11px] font-bold">Physical Diameter</th>
                <th className="p-4 font-serif tracking-widest uppercase text-[11px] font-bold">Appearance Description</th>
                <th className="p-4 font-serif tracking-widest uppercase text-[11px] font-bold">Recommended Occasions</th>
                <th className="p-4 font-serif tracking-widest uppercase text-[11px] font-bold text-right">Budget Guidance</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              isDarkMode ? 'divide-stone-900 text-stone-300' : 'divide-stone-200 text-stone-700'
            }`}>
              {caratData.map((item, index) => (
                <tr
                  key={item.carat}
                  className={`transition-colors cursor-pointer ${
                    isDarkMode 
                      ? `hover:bg-stone-900/50 ${selectedCarat === index ? 'bg-amber-950/20' : ''}`
                      : `hover:bg-stone-100/50 ${selectedCarat === index ? 'bg-amber-600/5' : ''}`
                  }`}
                  onClick={() => setSelectedCarat(index)}
                >
                  <td className={`p-4 font-serif font-bold ${isDarkMode ? 'text-stone-100' : 'text-stone-950'}`}>{item.carat}</td>
                  <td className={`p-4 font-mono font-semibold ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>{item.diameter}</td>
                  <td className={`p-4 text-xs font-sans leading-relaxed max-w-sm ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>{item.appearance}</td>
                  <td className={`p-4 text-xs ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>{item.occasion}</td>
                  <td className={`p-4 font-mono font-semibold text-right ${isDarkMode ? 'text-stone-100' : 'text-stone-950'}`}>{item.budgetRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Education Credentials Footnote */}
        <div className={`mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t text-xs ${
          isDarkMode ? 'border-stone-900 text-stone-500' : 'border-stone-200 text-stone-500'
        }`}>
          <div className="flex gap-3 items-start">
            <ShieldCheck className="w-5 h-5 text-amber-500/70 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className={`font-bold font-sans tracking-wide ${isDarkMode ? 'text-stone-300' : 'text-stone-800'}`}>100% Certified Conflict-Free</h5>
              <p className="mt-1 leading-relaxed">Every Sehari Diamond is GIA-certified, ensuring ethical sourcing and premium conflict-free standards.</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <Award className="w-5 h-5 text-amber-500/70 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className={`font-bold font-sans tracking-wide ${isDarkMode ? 'text-stone-300' : 'text-stone-800'}`}>Bureau of Indian Standards Hallmark</h5>
              <p className="mt-1 leading-relaxed">All gold metals are 100% BIS hallmarked (916 purity for 22K), providing unmatched legal purity validation.</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <Info className="w-5 h-5 text-amber-500/70 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className={`font-bold font-sans tracking-wide ${isDarkMode ? 'text-stone-300' : 'text-stone-800'}`}>Bespoke Jewelry Customizer</h5>
              <p className="mt-1 leading-relaxed">Prefer a custom carat size, metal tint, or special engraving? Speak with our virtual gemologists today.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
