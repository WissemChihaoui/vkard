import React, { useState } from "react";
import Select from "../../../../components/select/select";
import { chevronLeft, eye } from "../../../../assets/admin";
import { Link } from "react-router-dom";
import { paths } from "../../../../routes/paths";

const client = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+216 55 555 555",
  address: "Ariana, Tunisie",
};

const initialOrder = {
  reference: "#CMD1001",
  date: "2025-05-07",
  status: "Confirmée",
};

const vcards = [
  {
    id: 1,
    name: "Wissem Chihaoui",
    type: "Carte 1",
    amount: "15 DT",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Doe",
    type: "Carte 2",
    amount: "5 DT",
    status: "Expirée",
  },
];

export default function OrdersDetailsView() {
  const [orderStatus, setOrderStatus] = useState(initialOrder.status);

  const totalPrice = vcards.reduce((total, card) => {
    const amount = parseFloat(card.amount.replace(" DT", ""));
    return total + (isNaN(amount) ? 0 : amount);
  }, 0);

  return (
    <div className="p-6">
        <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
        <Link to={paths.admin.orders.root}>
                <img src={chevronLeft} alt="Retour" width={36}/>
            </Link>
            <h2 className="text-xl font-bold text-n-1">Détails de la commande</h2>
        </div>
        <button className="bg-n-5 hover:bg-n-4 text-white text-sm font-medium px-4 py-2 rounded shadow">
            Facture
          </button>
      </div>
     

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:space-x-6">
        {/* Vcards Table */}
        <section className="col-span-2 bg-n-7 h-max p-4 rounded shadow mb-6">
          <h2 className="text-lg font-medium mb-4">Cartes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Id</th>
                  <th className="px-4 py-2 border">Type de cart</th>
                  <th className="px-4 py-2 border">Nom</th>
                  <th className="px-4 py-2 border">Statut</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {vcards.map((card, index) => (
                  <tr key={index} className="hover:bg-n-9">
                    <td className="px-4 py-2 border">{card.id}</td>
                    <td className="px-4 py-2 border">{card.type}</td>
                    <td className="px-4 py-2 border">{card.name}</td>
                    <td className="px-4 py-2 border">{card.status}</td>
                    <td className="px-4 py-2 border">
                      <button>
                        <img src={eye} />
                      </button>
                    </td>
                  </tr>
                ))}
                {vcards.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      Aucune carte disponible.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Total Price */}
            <div className="mt-4 text-right font-medium">
              Total: {totalPrice.toFixed(2)} DT
            </div>
          </div>
        </section>

        <div className="space-y-6">
          {/* Order Info */}
          <section className="p-4 bg-n-7 rounded shadow">
            <h2 className="text-lg font-medium mb-4">Détails de la commande</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="flex flex-col">
                <strong>Référence:</strong> {initialOrder.reference}
              </div>
              <div className="flex flex-col">
                <strong>Date:</strong> {initialOrder.date}
              </div>
              <div className="flex flex-col">
                <strong>Statut:</strong>

                <Select
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  options={[
                    { value: "Confirmée", label: "Confirmée" },
                    { value: "En attente", label: "En attente" },
                    { value: "Annulée", label: "Annulée" },
                    { value: "Expédiée", label: "Expédiée" },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Client Info */}
          <section className="p-4 bg-n-7 rounded shadow">
            <h2 className="text-lg font-medium mb-4">Informations du client</h2>
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div>
                <strong>Nom:</strong> {client.name}
              </div>
              <div>
                <strong>Email:</strong> {client.email}
              </div>
              <div>
                <strong>Téléphone:</strong> {client.phone}
              </div>
              {client.address && (
                <div>
                  <strong>Adresse:</strong> {client.address}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
