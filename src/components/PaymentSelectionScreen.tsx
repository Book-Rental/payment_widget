import { CaasInitOption } from "../index.widget";
import { DetailRow } from "./DetailRow";
import { PaymentOption } from "./PaymentOption";

interface PaymentSelectionScreenProps {
  options: CaasInitOption;
  selectedPayment: 'googlepay' | 'phonepay' | 'cod';
  onSelectPayment: (method: 'googlepay' | 'phonepay' | 'cod') => void;
  onPayNow: () => void;
}

export const PaymentSelectionScreen: React.FC<PaymentSelectionScreenProps> = ({
  options,
  selectedPayment,
  onSelectPayment,
  onPayNow
}) => (
  <div
    style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}
  >
    <div
      style={{
        background: 'white',
        borderRadius: '24px',
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h1
        style={{
          fontSize: '28px',
          fontWeight: '700',
          marginBottom: '32px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        Choose Payment Method
      </h1>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <PaymentOption
          label="Cash on Delivery"
          value="cod"
          selected={selectedPayment === 'cod'}
          onSelect={() => onSelectPayment('cod')}
          color="#10b981"
        />
        <PaymentOption
          label="Google Pay"
          value="googlepay"
          selected={selectedPayment === 'googlepay'}
          onSelect={() => onSelectPayment('googlepay')}
          color="#3b82f6"
        />
        <PaymentOption
          label="PhonePe"
          value="phonepay"
          selected={selectedPayment === 'phonepay'}
          onSelect={() => onSelectPayment('phonepay')}
          color="#7c3aed"
        />
      </div>

      <div
        style={{
          background: '#f9fafb',
          padding: '24px',
          borderRadius: '16px',
          marginBottom: '32px'
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
          Payment Summary
        </h3>
        <DetailRow label="Merchant" value={options.merchantName || 'Demo Merchant'} />
        <DetailRow label="Currency" value={options.currency || 'INR'} />
        <DetailRow label="Total Amount" value={`₹${options.price}`} highlight />
      </div>

      <button
        onClick={onPayNow}
        style={{
          width: '100%',
          padding: '18px',
          background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 10px 15px -3px rgba(124, 58, 237, 0.5)',
          transition: 'all 0.2s',
          marginBottom: '16px'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(124, 58, 237, 0.5)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(124, 58, 237, 0.5)';
        }}
      >
        {selectedPayment === 'cod' ? 'Confirm Order' : 'Pay Now'}
      </button>

      <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af' }}>
        Secure payment powered by Demo Gateway
      </p>
    </div>
  </div>
);