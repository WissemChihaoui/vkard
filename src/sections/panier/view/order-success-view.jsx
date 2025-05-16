import React, { useEffect } from 'react';
import { useCheckoutContext } from '../context';
import { mutate } from 'swr';
import { endpoints } from '../../../utils/axios';

export default function OrderSuccessView() {
  const { onUpdate } = useCheckoutContext();

  useEffect(() => {
    // Reset cart on success view load
   onUpdate([{
      
      items: [],
      total: 0,
      subtotal: 0,
      tva: 0,
      discount: 0,
      shipping: 0,
      billing: null,
      totalItems: 0,
    }]);
  }, [onUpdate]);

  // mutate(endpoints.orders.all)

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full rounded-xl shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold text-green-600">Paiement confirmé</h2>
        <p className="mt-4 text-white">
          Merci pour votre commande. Vous recevrez bientôt un e-mail de confirmation.
        </p>
      </div>
    </div>
  );
}
