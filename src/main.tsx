import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { CaasInitOption } from './index.widget'; // Adjust the import path based on where your interface is defined

// 1. Define your static configuration data object
const staticOptions: CaasInitOption = {
  containerElementId: 'root',
  price: '1500.00',
  merchantName: 'RentBook Corp',
  currency: 'INR',
  merchantId: 'MERCH_98231',
  returnUrl: 'http://localhost:5173/orders',
  noForwardingPath: false,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. Pass the static options directly into your App component */}
    <App options={staticOptions} />
  </StrictMode>,
);
