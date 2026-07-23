import { useState, useEffect, useRef } from "react";
import { AllowedPaymentMethods, PaymentSelectionScreen } from "./components/PaymentSelectionScreen";
import { ProcessingScreen } from "./components/ProcessingScreen";
import { SuccessScreen } from "./components/SuccessScreen";
import { CaasInitOption } from "./index.widget";
import './index.css';

interface AppProps {
  options: CaasInitOption;
}

const App: React.FC<AppProps> = ({ options }) => {
  const [selectedPayment, setSelectedPayment] = useState<AllowedPaymentMethods>('GOOGLE_PAY');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [transactionId, setTransactionId] = useState<string | null>(null);

  // Use a ref to store state variables so the setTimeout closure stays fresh
  const stateRef = useRef({ transactionId, selectedPayment });
  stateRef.current = { transactionId, selectedPayment };

  const handlePayNow = async () => {
    if (selectedPayment === 'COD') {
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

  // 1. Constructs URLSearchParams and executes a hard redirection to the returnUrl
  const handleReturnToWebsite = () => {
    // Fallback URL if returnUrl is missing in options
    const baseReturnUrl = options.returnUrl || 'http://localhost:5173/orders';

    // Construct transaction search query parameters
    const params = new URLSearchParams({
      status: 'success',
      amount: options.price,
      currency: options.currency || 'INR',
      paymentMethod: stateRef.current.selectedPayment,
    });

    // Only append transactionId if it's not a COD order
    if (stateRef.current.transactionId && stateRef.current.selectedPayment !== 'COD') {
      params.append('transactionId', stateRef.current.transactionId);
    }

    // Perform the full page browser redirection
    window.history.pushState({}, "", `${baseReturnUrl}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  // 2. Triggers the event dispatch and redirection automatic timer when paymentStatus changes to 'success'
  useEffect(() => {
    if (paymentStatus === 'success') {

      // CREATE AND DISPATCH THE CUSTOM EVENT
      const paymentEvent = new CustomEvent("payment-widget-success", {
        detail: {
          status: "success",
          amount: options.price,
          currency: options.currency || "INR",
          paymentMethod: stateRef.current.selectedPayment,
          transactionId: stateRef.current.transactionId,
        },
      });
      window.dispatchEvent(paymentEvent);

      const redirectTimer = setTimeout(() => {
        handleReturnToWebsite();
      }, 2000); // 2-second visual confirmation window delay

      return () => clearTimeout(redirectTimer);
    }
  }, [paymentStatus, options.price, options.currency]); // Added critical dependency array items

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
