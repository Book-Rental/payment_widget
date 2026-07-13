import { ArrowLeft, CheckCircle } from "lucide-react";
import { DetailRow } from "./DetailRow";

interface SuccessScreenProps {
  price: string;
  transactionId: string | null;
  paymentMethod: string;
  currency: string;
  onReturn: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  price,
  transactionId,
  paymentMethod,
  currency,
  onReturn
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
        padding: '48px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.4)'
          }}
        >
          <CheckCircle size={48} style={{ color: 'white' }} />
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px', color: '#111827' }}>
          {paymentMethod === 'cod' ? 'Order Confirmed!' : 'Payment Successful!'}
        </h2>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          {paymentMethod === 'cod'
            ? 'Your order has been placed successfully'
            : 'Your transaction has been completed'}
        </p>
      </div>

      <div
        style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
          padding: '24px',
          borderRadius: '16px',
          marginBottom: '32px',
          boxShadow: '0 10px 15px -3px rgba(124, 58, 237, 0.3)'
        }}
      >
        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
          {paymentMethod === 'cod' ? 'Amount to Pay' : 'Amount Paid'}
        </div>
        <div style={{ fontSize: '36px', fontWeight: '700', color: 'white' }}>₹{price}</div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
          {currency}
        </div>
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
          Transaction Details
        </h3>
        {transactionId && (
          <DetailRow label="Transaction ID" value={transactionId} highlight />
        )}
        <DetailRow
          label="Payment Method"
          value={paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'googlepay' ? 'Google Pay' : 'PhonePe'}
          statusColor="#10b981"
        />
        <DetailRow label="Status" value={paymentMethod === 'cod' ? 'Confirmed' : 'Success'} statusColor="#10b981" />
      </div>

      <button
        onClick={onReturn}
        style={{
          width: '100%',
          padding: '16px',
          background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0 10px 15px -3px rgba(124, 58, 237, 0.5)',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(124, 58, 237, 0.5)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(124, 58, 237, 0.5)';
        }}
      >
        <ArrowLeft size={20} />
        Return to Website
      </button>
    </div>
  </div>
);
