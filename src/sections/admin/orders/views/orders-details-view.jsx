import React, { useEffect, useState } from "react";
import Select from "../../../../components/select/select";
import { chevronLeft } from "../../../../assets/admin";
import { Link } from "react-router-dom";
import { paths } from "../../../../routes/paths";
import { fDate } from "../../../../utils/format-time";
import { toast } from "react-toastify";
import { ORDER_STATUS } from "../../../../constants";
import { changeStatus } from "../../../../actions/orders";
import InvoiceDownloadButton from "../../../../components/invoice-download/invoice-download";

export default function OrdersDetailsView({ order, vcards }) {
  const [orderStatus, setOrderStatus] = useState("");
  console.log(order);

  useEffect(() => {
    // console.log(orderStatus)
    if (order) {
      setOrderStatus(order?.status);
      console.log(order?.status);
    }
  }, [order]);

  const handleChangeStatus = (e) => {
    toast.promise(changeStatus(order.id, e.target.value), {
      loading: "Changement du statut en cours...",
      success: "Changement de statut avec succès !",
      error: "Échec de changement du statut.",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Link to={paths.admin.orders.root}>
            <img src={chevronLeft} alt="Retour" width={36} />
          </Link>
          <h2 className="text-xl font-bold text-n-1">Détails de la commande</h2>
        </div>
        {/* <button
          onClick={handleDownload}
          disabled={invoiceIsLoading}
          className="bg-n-5 hover:bg-n-4 text-white text-sm font-medium px-4 py-2 rounded shadow"
        >
          Facture
        </button> */}
        <InvoiceDownloadButton ref={order?.ref}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:space-x-6">
        {/* Vcards Table */}
        <section className="col-span-2 bg-n-7 h-max p-4 rounded shadow mb-6">
          <h2 className="text-lg font-medium mb-4">Articles de la commande</h2>
          <div className="overflow-x-auto mb-3">
            <table className="min-w-full text-sm border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Type de carte</th>
                  <th className="px-4 py-2 border">Quantité</th>
                  <th className="px-4 py-2 border">Prix unitaire</th>
                  <th className="px-4 py-2 border">Prix total</th>
                </tr>
              </thead>
              <tbody>
                {order?.order_items?.map((item, index) => (
                  <tr key={index} className="hover:bg-n-9">
                    <td className="px-4 py-2 border">
                      {item.card?.title || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">{item.quantity}</td>
                    <td className="px-4 py-2 border">
                      {parseFloat(item.price).toFixed(2)} DT
                    </td>
                    <td className="px-4 py-2 border">
                      {(parseFloat(item.price) * item.quantity).toFixed(2)} DT
                    </td>
                  </tr>
                ))}
                {order?.order_items?.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      Aucun article trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <h2 className="text-lg font-medium mb-4">Cartes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Id</th>
                  <th className="px-4 py-2 border">Type de cart</th>
                  <th className="px-4 py-2 border">Nom</th>
                  <th className="px-4 py-2 border">Statut</th>
                </tr>
              </thead>
              <tbody>
                {vcards?.map((card, index) => (
                  <tr key={index} className="hover:bg-n-9">
                    <td className="px-4 py-2 border">{card.id}</td>
                    <td className="px-4 py-2 border">{card.cardTitle}</td>{" "}
                    {/* <- FIXED DISPLAY */}
                    <td className="px-4 py-2 border">{card.name}</td>
                    <td className="px-4 py-2 border">{card.status}</td>
                   
                  </tr>
                ))}
                {vcards?.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      Aucune carte disponible.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Total Price */}
            <div className="mt-4 text-right space-y-1 font-medium">
              <div>
                Total HT :{" "}
                {order?.order_items
                  ? order.order_items
                      .reduce(
                        (acc, item) =>
                          acc + parseFloat(item.price) * item.quantity,
                        0
                      )
                      .toFixed(2)
                  : "0.00"}{" "}
                DT
              </div>
              <div>
                Frais de livraison :{" "}
                {parseFloat(order?.shipping || 0).toFixed(2)} DT
              </div>
              <div className="text-lg font-bold">
                Total TTC : {parseFloat(order?.total_price).toFixed(2)} DT
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          {/* Order Info */}
          <section className="p-4 bg-n-7 rounded shadow">
            <h2 className="text-lg font-medium mb-4">Détails de la commande</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="flex flex-col">
                <strong>Référence:</strong> {order?.id}
              </div>
              <div className="flex flex-col">
                <strong>Date:</strong> {fDate(order?.created_at)}
              </div>
              <div className="flex flex-col">
                <strong>Statut:</strong>

                <Select
                  value={orderStatus}
                  onChange={(e) => handleChangeStatus(e)}
                  options={ORDER_STATUS}
                />
              </div>
            </div>
          </section>

          {/* Client Info */}
          <section className="p-4 bg-n-7 rounded shadow">
            <h2 className="text-lg font-medium mb-4">Informations du client</h2>
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div>
                <strong>Nom:</strong>{" "}
                {order?.user.first_name + " " + order?.user.last_name}
              </div>
              <div>
                <strong>Email:</strong> {order?.user.email}
              </div>
              <div>
                <strong>Téléphone:</strong> {order?.user.phone}
              </div>
              {order?.user.city && (
                <div>
                  <strong>Adresse:</strong> {order?.user.city},{" "}
                  {order?.user.street_number}, {order?.user.zip},{" "}
                  {order?.user.country}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      
    </div>
  );
}
