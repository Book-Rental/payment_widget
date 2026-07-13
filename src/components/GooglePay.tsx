import GooglePayButton from '@google-pay/button-react';
import { CaasInitOption } from '../index.widget';

interface AppProps {
  options: CaasInitOption;
}

function GooglePay({ options }: AppProps) {
  return (
    <div style={{ width: '100%' }}> {/* Container takes full width */}
      <GooglePayButton
       style={{width:'100%',height:'100%'}}
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["VISA", "MASTERCARD"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'exampleGatewayMerchantId',
                },
              },
            },
          ],
          merchantInfo: {
            merchantName: options.merchantName || "Demo Merchant",
            merchantId: "BCR2DN7T6HZ2PTKG",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: Number(options.price).toFixed(2),
            currencyCode: options.currency || "INR",
            countryCode: "IN",
          },
        }}
        onLoadPaymentData={(paymentData) => {
          console.log("Payment success:", paymentData);
        }}
        onError={(err) => {
          console.error("Payment error:", err);
          alert("Payment Failed!");
        }}
        buttonColor="black"
        buttonType="pay"
        buttonSizeMode='fill' // <-- Makes the button take the full width of container
      />
    </div>
  )
}

export default GooglePay;
