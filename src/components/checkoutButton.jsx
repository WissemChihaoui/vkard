import { loadStripe } from '@stripe/stripe-js';
import { CONFIG } from '../config-global';

const stripePromise = loadStripe(CONFIG.stripePublicKey);

const CheckoutButton = ({ cartItems }) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch('http://localhost:8000/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartItems,
        // success_url: window.location.origin + '/success',
        // cancel_url: window.location.origin + '/cancel',
      }),
    });

    const data = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <button onClick={handleCheckout} className="px-4 py-2 bg-green-600 text-white rounded">
      Payer avec Stripe
    </button>
  );
};

export default CheckoutButton;
