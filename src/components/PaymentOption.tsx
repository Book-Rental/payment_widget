import React from "react";
import { AllowedPaymentMethods } from "./PaymentSelectionScreen";

interface PaymentOptionProps {
  label: string;
  // 1. Linked directly to your centralized AllowedPaymentMethods uppercase type union
  value: AllowedPaymentMethods; 
  selected: boolean;
  onSelect: () => void;
  color?: string; // Made optional since Tailwind handles the thematic color spacing now
}

export const PaymentOption: React.FC<PaymentOptionProps> = ({ 
  label, 
  selected, 
  onSelect 
}) => {
  return (
    <div
      onClick={onSelect}
      className={`flex-1 min-w-[120px] p-4 rounded-xl border-2 text-center cursor-pointer select-none transition-all duration-200 transform active:scale-[0.98] ${
        selected
          ? "border-blue-600 bg-blue-50/50 shadow-md shadow-blue-500/10"
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
      }`}
    >
      <div 
        className={`text-sm sm:text-base font-semibold transition-colors duration-200 ${
          selected ? "text-blue-600" : "text-gray-700"
        }`}
      >
        {label}
      </div>
    </div>
  );
};
