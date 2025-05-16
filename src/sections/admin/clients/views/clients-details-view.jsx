import React from "react";
import { Link } from "react-router-dom";
import { paths } from "../../../../routes/paths";
import { chevronLeft, eye } from "../../../../assets/admin";
import { fDate } from "../../../../utils/format-time";

// type Client = {
//   email: string;
//   firstName: string;
//   lastName: string;
//   company: string;
//   country: string;
//   streetNumber: string;
//   apartment: string;
//   zip: string;
//   city: string;
//   phone: string;
// };

// type Order = {
//   reference: string;
//   date: string;
//   status: string;
// };

// type Props = {
//   client: Client;
//   orders: Order[];
// };

const client={
    email: "sarah@example.com",
    firstName: "Sarah",
    lastName: "Ben Youssef",
    company: "Smart Solutions",
    country: "Tunisie",
    streetNumber: "12",
    apartment: "B12",
    zip: "1002",
    city: "Tunis",
    phone: "+216 22 222 222",
  }
 const orders=[
    { id: 1, reference: "#CMD-203", date: "2025-05-01", status: "Confirmée", cardsCount: 2 },
    { id: 2, reference: "#CMD-202", date: "2025-04-25", status: "Annulée", cardsCount: 2 },
  ]
export default function ClientDetailsView({user}) {
  return (
    <div className="space-y-6 px-4 py-6">
      <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
              <Link to={paths.admin.clients.root}>
                      <img src={chevronLeft} alt="Retour" width={36}/>
                  </Link>
                  <h2 className="text-xl font-bold text-n-1">Détails du client</h2>
              </div>
              {/* <button className="bg-n-5 hover:bg-n-4 text-white text-sm font-medium px-4 py-2 rounded shadow">
                  Facture
                </button> */}
            </div>

      {/* Client Info */}
      <section className="p-4 rounded shadow bg-n-7">
        <h2 className="text-lg font-medium mb-4">Informations personnelles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div><strong>Prénom:</strong> {user.first_name}</div>
          <div><strong>Nom:</strong> {user.last_name}</div>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>Téléphone:</strong> {user.phone}</div>
          <div><strong>Entreprise:</strong> {user.company}</div>
        </div>
      </section>

      <section className="p-4 rounded shadow bg-n-7">
        <h2 className="text-lg font-medium mb-4">Adresse</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div><strong>Numéro:</strong> {user.street_number}</div>
          <div><strong>Appartement:</strong> {user.apartment}</div>
          <div><strong>Code Postal:</strong> {user.zip}</div>
          <div><strong>Ville:</strong> {user.city}</div>
          <div><strong>Pays:</strong> {user.country}</div>
        </div>
      </section>

      {/* Order History */}
      <section className="p-4 rounded shadow bg-n-7">
        <h2 className="text-lg font-medium mb-4">Historique des commandes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="">
              <tr>
                <th className="px-4 py-2 border">Référence</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Statut</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {user?.orders?.map((order, index) => (
                <tr key={index} className="hover:bg-n-6">
                  <td className="px-4 py-2 border"><Link to={paths.admin.orders.view(order.id)}>{order.id}</Link></td>
                  <td className="px-4 py-2 border">{fDate(order.created_at)}</td>
                  <td className="px-4 py-2 border">{order.status}</td>
                  <td className="px-4 py-2 border"><Link to={paths.admin.orders.view(order.id)}>
                    <img src={eye} alt="Voir" />
                  </Link></td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    Aucune commande trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
