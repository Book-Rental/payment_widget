import React from "react";
import { Loader2 } from "lucide-react";

interface ProcessingScreenProps {
  price: string;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ price }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-800 flex items-center justify-center p-4 antialiased">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-center border border-white/20">

        {/* Animated Loading Spinner Container */}
        <div className="flex items-center justify-center mb-6">
          <Loader2
            size={56}
            className="text-purple-600 animate-spin"
          />
        </div>

        {/* Informational Copy Header */}
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">
          Processing Payment...
        </h2>
        <p className="text-gray-400 text-sm max-w-[280px] mx-auto mb-8">
          Please wait while we securely confirm your transaction layout
        </p>

        {/* Quantified Amount Summary Callout Panel */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 transition-colors duration-200">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
            Amount Due
          </div>
          <div className="text-2xl font-black text-purple-600 tracking-tight">
            ₹{price}
          </div>
        </div>

        {/* Security Reassurance Note */}
        <p className="text-[11px] text-gray-400 mt-6 tracking-normal">
          Do not close this window or click your browser's back button.
        </p>

      </div>
    </div>
  );
};
