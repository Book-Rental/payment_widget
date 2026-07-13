import React from "react";
import { CaasInitOption } from "../index.widget";

interface PhonePayProps {
  options: CaasInitOption;
}

const PhonePay: React.FC<PhonePayProps> = ({ options }) => {
  const handlePay = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/phonepe/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: options.price,
          merchantId: options.merchantId || "PGTESTPAYUAT",
          transactionId: `TXN_${Date.now()}`,
          callbackUrl: "http://localhost:3000/payment-success",
        }),
      });

      const data = await response.json();

      if (data && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert("Something went wrong initiating payment");
      }
    } catch (err) {
      console.error("PhonePe Payment Error:", err);
      alert("Failed to start PhonePe payment");
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <button
        onClick={handlePay}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#5B2D8C",
          color: "#fff",
          fontWeight: 600,
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          transition: "all 0.2s",
        }}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnyOoxY1k_Hj78I_Vb6S9sP4qV4cL5HkRzsa_7s5_ScOF5FSnIYXSWSwDXOE3xR6KHEu0&usqp=CAU"
          alt="PhonePe"
          style={{ height: 28, marginRight: 10 }}
        />
        Pay with PhonePe
      </button>
    </div>
  );
};

export default PhonePay;
