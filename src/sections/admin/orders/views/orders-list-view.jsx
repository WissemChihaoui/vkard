import React, { useState } from 'react'
import ConfirmDeleteModal from '../../../../components/delete-confrim-popup/delete-confirm-popup'
import DataTable from '../../../../components/datatables/data-table'
import OrdersListRow from '../orders-list-row'

const initialOrders = [
    {
      id: 101,
      orderNumber: 'CMD-2024001',
      client: 'John Doe',
      cardsCount: 3,
      status: 'En cours',
      date: '2024-07-01',
    },
    {
      id: 102,
      orderNumber: 'CMD-2024002',
      client: 'Jane Smith',
      cardsCount: 5,
      status: 'Livrée',
      date: '2024-07-02',
    },
  ]
  
  const columns = [
    { label: 'Commande #', key: 'orderNumber', searchable: true, orderable: true },
    { label: 'Client', key: 'client', searchable: true, orderable: true, filterable: true },
    { label: 'Cartes', key: 'cardsCount', orderable: true },
    { label: 'Statut', key: 'status', orderable: true, filterable: true },
    { label: 'Date', key: 'date', orderable: true },
    { label: 'Actions', key: 'actions' },
  ]

export default function OrdersListView() {
  const [orders, setOrders] = useState(initialOrders)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState(null)

  const askDelete = (order) => {
    setOrderToDelete(order)
    setConfirmOpen(true)
  }

  const confirmDelete = () => {
    setOrders((prev) => prev.filter(o => o.id !== orderToDelete.id))
    setConfirmOpen(false)
    setOrderToDelete(null)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-n-1">Liste des commandes</h2>
        
      </div>

      <DataTable
        columns={columns}
        data={orders}
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