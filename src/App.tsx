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
      setTransactionId(null);
      setPaymentStatus('success');
    } else {
      const txnId = `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
      setTransactionId(txnId);
      setPaymentStatus('processing');

      setTimeout(() => {
        setPaymentStatus('success');
      }, 3000);
    }
  };

  // 1. Dispatch custom event to the host instead of using window.location.href
  const handleReturnToWebsite = () => {
    const paymentPayload = {
      status: 'success',
      amount: options.price,
      currency: options.currency || 'INR',
      paymentMethod: selectedPayment === 'cod' ? 'cash' : selectedPayment,
      transactionId: selectedPayment !== 'cod' ? transactionId : null
    };

    // Trigger custom event on the shared window object
    window.dispatchEvent(
      new CustomEvent("payment-widget-success", {
        detail: paymentPayload,
      })
    );
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
