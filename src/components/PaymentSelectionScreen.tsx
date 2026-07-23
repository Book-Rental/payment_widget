import React from "react";
import { CaasInitOption } from "../index.widget";
import { DetailRow } from "./DetailRow";
import { PaymentOption } from "./PaymentOption";

// 1. Updated the type union to match your exact paymentMethods array strings
export type AllowedPaymentMethods = "COD" | "UPI" | "CARD" | "NET_BANKING" | "GOOGLE_PAY" | "PHONE_PE";

interface PaymentSelectionScreenProps {
  options: CaasInitOption;
  selectedPayment: AllowedPaymentMethods;
  onSelectPayment: (method: AllowedPaymentMethods) => void;
  onPayNow: () => void;
}

export const PaymentSelectionScreen: React.FC<PaymentSelectionScreenProps> = ({
  options,
  selectedPayment,
  onSelectPayment,
  onPayNow
}) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 antialiased">
      <div className="w-full  bg-white rounded-3xl shadow-xl p-6 border border-gray-100/80">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-4 border border-blue-100">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Choose Payment Method
          </h1>

          <p className="text-gray-500 mt-1 text-sm">
            Securely complete your payment
          </p>
        </div>

        {/* Payment Options Stack - Values now match the uppercase enum string layout */}
        <div className="flex gap-2">
          <PaymentOption
            label="COD"
            value="COD"
            selected={selectedPayment === "COD"}
            onSelect={() => onSelectPayment("COD")}
            color="#2563eb"
          />

          <PaymentOption
            label="Google Pay"
            value="GOOGLE_PAY"
            selected={selectedPayment === "GOOGLE_PAY"}
            onSelect={() => onSelectPayment("GOOGLE_PAY")}
            color="#2563eb"
          />

          <PaymentOption
            label="PhonePe"
            value="PHONE_PE"
            selected={selectedPayment === "PHONE_PE"}
            onSelect={() => onSelectPayment("PHONE_PE")}
            color="#2563eb"
          />
        </div>

        {/* Summary Details Panel */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 mt-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
            Payment Summary
          </h3>

          <div className="space-y-3">
            <DetailRow
              label="Merchant"
              value={options.merchantName || "Demo Merchant"}
            />

            <DetailRow
              label="Currency"
              value={options.currency || "INR"}
            />

            <div className="border-t border-gray-200/60 pt-3 mt-1">
              <DetailRow
                label="Amount"
                value={`₹${options.price}`}
                highlight
              />
            </div>
          </div>
        </div>

        {/* Primary Dynamic Action CTA */}
        <button
          onClick={onPayNow}
          className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg hover:from-blue-700 hover:to-blue-600 active:scale-[0.99] transform transition-all duration-150 shadow-md shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {selectedPayment === "COD" ? "Confirm Order" : "Proceed to Pay"}
        </button>

        {/* Security Trust Badging Footer */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-400">
          <svg
            className="w-4 h-4 text-emerald-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>

          <span>100% Secure Encrypted Payment</span>
        </div>
      </div>
    </div>
  );
};
