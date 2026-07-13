
interface PaymentOptionProps {
  label: string;
  value: 'googlepay' | 'phonepay' | 'cod';
  selected: boolean;
  onSelect: () => void;
  color: string;
}

export const PaymentOption: React.FC<PaymentOptionProps> = ({ label, selected, onSelect, color }) => (
  <div
    onClick={onSelect}
    style={{
      flex: 1,
      padding: '16px',
      borderRadius: '12px',
      border: selected ? `2px solid ${color}` : '2px solid #d1d5db',
      background: selected ? `${color}15` : 'white',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.2s',
      boxShadow: selected ? `0 4px 6px -1px ${color}33` : 'none'
    }}
  >
    <div style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>{label}</div>
  </div>
);
