import React, { useEffect, useState } from "react";
import ConfirmDeleteModal from "../../../../components/delete-confrim-popup/delete-confirm-popup";
import DataTable from "../../../../components/datatables/data-table";
import OrdersListRow from "../orders-list-row";
import { deleteOrder, useGetAllOrders } from "../../../../actions/orders";
import { toast } from "react-toastify";
import { ORDER_STATUS } from "../../../../constants";

const columns = [
  {
    label: "Commande #",
    key: "orderNumber",
    searchable: true,
    orderable: true,
  },
  {
    label: "Client",
    key: "client",
    searchable: true,
    orderable: true,
    filterable: true,
  },
  { label: "Livraison", key: "shipping", orderable: true },
  { label: "Statut", key: "status", orderable: true, filterable: true },
  { label: "Date", key: "date", orderable: true },
  { label: "Actions", key: "actions" },
];

export default function OrdersListView({ orders }) {

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [tableData, setTableData] = useState([]);

  const askDelete = (order) => {
    setOrderToDelete(order);
    setConfirmOpen(true);
  };

  useEffect(() => {
    if (orders) {
      const transformed = orders.map((order) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        client: `${order.user.first_name} ${order.user.last_name}`,
        shipping: order.shipping > 0 ? "Xpresspost" : "Poste-lettre",
        status: order.status, // still raw value for filtering
        statusLabel: ORDER_STATUS.find((s) => s.value === order.status)?.label,
        statusObj: ORDER_STATUS.find((s) => s.value === order.status),
        date: order.created_at,
        original: order, // keep original object for full row rendering
      }));
      setTableData(transformed);
    }
  }, [orders]);

  const confirmDelete = async (id) => {
    toast
      .promise(deleteOrder(orderToDelete.id), {
        loading: "Suppression en cours...",
        success: "Commandes supprimé avec succès !",
        error: "Échec de la suppression du commande.",
      })
      .then(() => {
        setTableData((prev) => prev.filter((client) => client.id !== id));
        setConfirmOpen(false);
      });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-n-1">Liste des commandes</h2>
      </div>

      <DataTable
        columns={columns}
        data={tableData}
        renderRow={(row) => (
          <OrdersListRow
            key={row.id}
            order={row.original}
            askDelete={askDelete}
          />
        )}
      />

      <ConfirmDeleteModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title={orderToDelete?.orderNumber}
      />
    </div>
  );
}
