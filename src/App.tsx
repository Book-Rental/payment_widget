import { useState } from "react";
import { PaymentSelectionScreen } from "./components/PaymentSelectionScreen";
import { ProcessingScreen } from "./components/ProcessingScreen";
import { SuccessScreen } from "./components/SuccessScreen";
import { CaasInitOption } from "./index.widget";

interface AppProps {
  options: CaasInitOption;
}

const App: React.FC<AppProps> = ({ options }) => {
  const [selectedPayment, setSelectedPayment] = useState<'googlepay' | 'phonepay' | 'cod'>('googlepay');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const handlePayNow = async () => {
    if (selectedPayment === 'cod') {
      // For COD, skip transaction ID and go directly to success
      setTransactionId(null);
      setPaymentStatus('success');
    } else {
      // For online payments, generate transaction ID and show processing
      const txnId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setTransactionId(txnId);
      setPaymentStatus('processing');
      
      setTimeout(() => {
        setPaymentStatus('success');
      }, 3000);
    }
  };

  const handleReturnToWebsite = () => {
    const returnUrl = options.returnUrl || 'https://merchant-website.com';
    const params = new URLSearchParams({
      status: 'success',
      amount: options.price,
      currency: options.currency || 'INR',
      paymentMethod: selectedPayment === 'cod' ? 'cash' : selectedPayment
    });

    // Only add transaction ID for non-COD payments
    if (transactionId && selectedPayment !== 'cod') {
      params.append('transactionId', transactionId);
    }

    window.location.href = `${returnUrl}?${params.toString()}`;
  };

  if (paymentStatus === 'processing') {
    return <ProcessingScreen price={options.price} />;
  }

  if (paymentStatus === 'success') {
    return (
      <SuccessScreen
        price={options.price}
        transactionId={transactionId}
        paymentMethod={selectedPayment}
        currency={options.currency || 'INR'}
        onReturn={handleReturnToWebsite}
      />
    );
  }

  return (
    <PaymentSelectionScreen
      options={options}
      selectedPayment={selectedPayment}
      onSelectPayment={setSelectedPayment}
      onPayNow={handlePayNow}
    />
  );
};

export default App;