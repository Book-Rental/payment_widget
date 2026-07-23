import React from "react";
import { CheckCircle } from "lucide-react";
import { DetailRow } from "./DetailRow";
import { AllowedPaymentMethods } from "./PaymentSelectionScreen";

interface SuccessScreenProps {
  price: string;
  transactionId: string | null;
  paymentMethod: AllowedPaymentMethods;
  currency: string;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  price,
  transactionId,
  paymentMethod,
  currency,
}) => {
  // Utility mapping to show clean text variants on the screen
  const getReadableMethod = (method: AllowedPaymentMethods) => {
    switch (method) {
      case "COD": return "Cash on Delivery";
      case "GOOGLE_PAY": return "Google Pay";
      case "PHONE_PE": return "PhonePe";
      default: return method;
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 antialiased">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 animate-fade-in">
        
        {/* Status Graphic Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto rounded-full  flex items-center justify-center mb-5 shadow-xl shadow-emerald-500/30 ring-4 ring-emerald-100 animate-bounce-short">
            <CheckCircle size={44} className="text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {paymentMethod === "COD" ? "Order Confirmed!" : "Payment Successful!"}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {paymentMethod === "COD"
              ? "Your order has been placed successfully"
              : "Your transaction has been completed"}
          </p>
        </div>

        {/* Dynamic Amount Banner Display */}
        <div className=" p-5 rounded-2xl mb-6 bg-blue-500 text-white">
          <div className="text-xs text-white/80 font-medium tracking-wider uppercase">
            {paymentMethod === "COD" ? "Amount to Pay" : "Amount Paid"}
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black">₹{price}</span>
            <span className="text-xs text-white/60 font-bold uppercase">{currency}</span>
          </div>
        </div>

        {/* Structural Transaction Details Panel */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
            Transaction Details
          </h3>
          <div className="space-y-3">
            {transactionId && (
              <DetailRow label="Transaction ID" value={transactionId} highlight />
            )}
            <DetailRow
              label="Payment Method"
              value={getReadableMethod(paymentMethod)}
            />
            <DetailRow 
              label="Status" 
              value={paymentMethod === "COD" ? "Confirmed" : "Success"} 
            />
          </div>
        </div>

        {/* Automated Visual Redirect Indicator */}
        <div className="flex items-center justify-center gap-2 pt-2 text-xs font-medium text-gray-400">
          <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Syncing details and returning you to website...</span>
        </div>

      </div>
    </div>
  );
};
