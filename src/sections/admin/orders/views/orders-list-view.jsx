import React, { useEffect, useState } from 'react'
import ConfirmDeleteModal from '../../../../components/delete-confrim-popup/delete-confirm-popup'
import DataTable from '../../../../components/datatables/data-table'
import OrdersListRow from '../orders-list-row'
import { deleteOrder, useGetAllOrders } from '../../../../actions/orders'
import { toast } from 'react-toastify'

  const columns = [
    { label: 'Commande #', key: 'orderNumber', searchable: true, orderable: true },
    { label: 'Client', key: 'client', searchable: true, orderable: true, filterable: true },
    { label: 'Livraison', key: 'shipping', orderable: true },
    { label: 'Statut', key: 'status', orderable: true, filterable: true },
    { label: 'Date', key: 'date', orderable: true },
    { label: 'Actions', key: 'actions' },
  ]

export default function OrdersListView() {
  const { orders } = useGetAllOrders()
  console.log(orders)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState(null)
const [tableData, setTableData] = useState([]);

  useEffect(()=> {
    if(orders) setTableData(orders)
  }, [orders])

  const askDelete = (order) => {
    setOrderToDelete(order)
    setConfirmOpen(true)
  }

  const confirmDelete = async (id) => {
      toast.promise(
        deleteOrder(orderToDelete.id),
        {
          loading: "Suppression en cours...",
          success: "Commandes supprimé avec succès !",
          error: "Échec de la suppression du commande.",
        }
      ).then(() => {
        setTableData((prev) => prev.filter((client) => client.id !== id));
        setConfirmOpen(false)
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
        renderRow={(order) => (
          <OrdersListRow key={order.id} order={order} askDelete={askDelete}/>
        )}
      />

      <ConfirmDeleteModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title={orderToDelete?.orderNumber}
      />
    </div>
  )
}