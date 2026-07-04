import React, { useState } from 'react';
import { X, User, Crown, Star, Calendar, PhoneCall, Gift, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

export default function ProfileModal({ isOpen, onClose, isDarkMode = false }: ProfileModalProps) {
  const [callbackRequest, setCallbackRequest] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!isOpen) return null;

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      setCallbackRequest(true);
      setTimeout(() => {
        setCallbackRequest(false);
        setPhoneNumber('');
        onClose();
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-950/80 backdrop-blur-xs"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl z-10 p-6 space-y-6 border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-stone-900 border-stone-800 text-stone-100' 
              : 'bg-white border-stone-100 text-stone-900'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 p-2 rounded-full transition-colors focus:outline-none ${
              isDarkMode ? 'bg-stone-800 hover:bg-stone-700 text-stone-300' : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
            }`}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* User Profile Title */}
          <div className="text-center space-y-2">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center border ${
              isDarkMode ? 'bg-stone-950 border-amber-500/30' : 'bg-stone-900 border-amber-500/20'
            }`}>
              <User className="w-8 h-8 text-amber-500" />
            </div>
            <div className={`flex justify-center items-center gap-1 border text-[10px] font-bold px-3 py-1 rounded-full tracking-wider w-fit mx-auto ${
              isDarkMode 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                : 'bg-amber-500/10 border-amber-500/20 text-amber-800'
            }`}>
              <Crown className="w-3.5 h-3.5" />
              <span>SEHARI SOVEREIGN CLIENT</span>
            </div>
            <h3 className={`font-serif text-lg font-bold ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Welcome back, Royal Guest</h3>
            <p className="text-[11px] text-stone-400 font-mono">Registry Member #SR-8327-0226</p>
          </div>

          {/* Luxury benefits details */}
          <div className={`rounded-2xl p-4 space-y-3 text-xs border ${
            isDarkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-100'
          }`}>
            <h4 className="font-serif text-[10px] font-bold tracking-widest text-amber-600 uppercase">Your Client Privileges</h4>
            
            <div className={`flex gap-2 items-start ${isDarkMode ? 'text-stone-300' : 'text-stone-600'}`}>
              <Star className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>Complimentary lifelong ultrasonic jewelry cleaning at any Sehari Salon globally.</span>
            </div>
            <div className={`flex gap-2 items-start ${isDarkMode ? 'text-stone-300' : 'text-stone-600'}`}>
              <Gift className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>A private customized physical registry catalog shipped to your home every winter.</span>
            </div>
            <div className={`flex gap-2 items-start ${isDarkMode ? 'text-stone-300' : 'text-stone-600'}`}>
              <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>Exclusive invitations to VIP preview cocktail galas and custom carving trunk shows.</span>
            </div>
          </div>

          {/* Callback scheduling form */}
          <div className="space-y-3 pt-2">
            <h4 className={`font-serif text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 ${
              isDarkMode ? 'text-stone-100' : 'text-stone-900'
            }`}>
              <PhoneCall className="w-4 h-4 text-amber-500" />
              <span>REQUEST CONCIERGE CALL</span>
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed font-sans">
              Would you like our master gemologists to contact you regarding a bespoke diamond or customized sizing request? Let us schedule a private call.
            </p>

            {callbackRequest ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`border p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                  isDarkMode ? 'bg-green-950/20 border-green-800/30 text-green-400' : 'bg-green-50 border-green-200 text-green-800'
                }`}
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Call scheduled! An artisan coordinator will call you within 15 minutes.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="flex gap-2">
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number..."
                  className={`flex-1 text-xs border rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 ${
                    isDarkMode 
                      ? 'bg-stone-950 border-stone-800 text-stone-100' 
                      : 'bg-white border-stone-200 text-stone-800'
                  }`}
                />
                <button
                  type="submit"
                  className={`px-4 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors focus:outline-none cursor-pointer ${
                    isDarkMode 
                      ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                      : 'bg-stone-950 hover:bg-amber-600 text-stone-100 hover:text-white'
                  }`}
                >
                  SCHEDULE
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
