import { Loader2 } from "lucide-react";

interface ProcessingScreenProps {
  price: string;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ price }) => (
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
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Loader2
        size={64}
        style={{
          color: '#7c3aed',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 24px'
        }}
      />
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px', color: '#111827' }}>
        Processing Payment...
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>
        Please wait while we confirm your transaction
      </p>
      <div
        style={{
          background: '#f3f4f6',
          padding: '16px',
          borderRadius: '12px',
          marginTop: '24px'
        }}
      >
        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Amount</div>
        <div style={{ fontSize: '28px', fontWeight: '700', color: '#7c3aed' }}>₹{price}</div>
      </div>
    </div>
    <style>{`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);