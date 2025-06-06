import React from "react";
import Button from "../../../components/button/Button";
import InvoiceDownloadButton from "../../../components/invoice-download/invoice-download";


export default function OrderDetailsPage({ order, vcards, loading }) {

  console.log(order);

  if (loading) return <p>Loading</p>;
  if (!order) return <p>Commande introuvable.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">
          Détails de la commande #{order.id}
        </h2>
        <InvoiceDownloadButton ref={order?.ref}/>
      </div>
      <div className=" p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Date :</strong>{" "}
            {new Date(order.created_at).toLocaleDateString()}
          </div>
          <div>
            <strong>Statut :</strong> {order.status}
          </div>
          <div>
            <strong>Livraison :</strong> {order.shipping || "Non spécifié"} $ CA
          </div>
          <div>
            <strong>Total :</strong> {order.total_price} $ CA
          </div>
          <div>
            <strong>Référence :</strong> {order.id || "Aucune"}
          </div>
        </div>
      </div>

      <h3 className="text-xl font-medium mb-4">Les produits</h3>
      <div className="overflow-x-auto rounded shadow mb-4">
        {order?.order_items && order?.order_items?.length > 0 ? (
          <table className="min-w-full text-sm text-left table-auto">
            <thead className="bg-n-5 text-n-1">
              <tr>
                <th className="p-3">Nom du produit</th>
                <th className="p-3">Prix unitaire</th>
                <th className="p-3">Quantité</th>
                <th className="p-3">Prix total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {order.order_items?.map((item, index) => (
                <tr key={index}>
                  <td className="p-3">{item.card.title}</td>
                  <td className="p-3">{item.card.price} $ CA</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">
                    {(parseFloat(item.card.price) * item.quantity).toFixed(2)} $
                    CA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>

      <h3 className="text-xl font-medium mb-4">V-Cards associés</h3>
      <div className="overflow-x-auto rounded shadow">
        {vcards && vcards.length > 0 ? (
          <table className="min-w-full text-sm text-left table-auto">
            <thead className="bg-n-5 text-n-1">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Nom</th>
                <th className="p-3">Entreprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vcards.map((card, idx) => (
                <tr key={idx}>
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{card.name}</td>
                  <td className="p-3">{card.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-4">
            <p>Aucun produit trouvé pour cette commande.</p>
          </div>
        )}
      </div>

      <Button className="mt-6" onClick={() => window.history.back()}>
        ← Retour aux commandes
      </Button>
    </div>
  );
}
