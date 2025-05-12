import React from 'react';

export default function OrderSuccessView() {
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
