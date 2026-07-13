
export interface CaasInitOption {
  price: string;
  merchantName?: string;
  currency?: string;
  merchantId?: string;
  returnUrl?: string;
}

interface DetailRowProps {
  label: string;
  value: string;
  highlight?: boolean;
  statusColor?: string;
}

export const DetailRow: React.FC<DetailRowProps> = ({ label, value, highlight, statusColor }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid #e5e7eb'
    }}
  >
    <span style={{ color: '#6b7280', fontSize: '14px' }}>{label}</span>
    <span
      style={{
        fontWeight: highlight ? '600' : '500',
        color: statusColor || (highlight ? '#7c3aed' : '#111827'),
        fontSize: '14px'
      }}
    >
      {value}
    </span>
  </div>
);