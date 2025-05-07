import React, { useState } from 'react'
import ConfirmDeleteModal from '../../../../components/delete-confrim-popup/delete-confirm-popup'
import DataTable from '../../../../components/datatables/data-table'
import CardsListRow from '../cards-list-row'
// import OrdersListRow from '../orders-list-row'

const initialOrders = [
    {
      id: 102 ,
      commande: 'CMD-2024001',
      client: 'John Doe',
      cardsCount: 3,
      status: 'En cours',
      name: 'Wissem Chihaoui',
    },
    {
      id: 101,
      commande: 'CMD-2024001',
      client: 'John Doe',
      cardsCount: 3,
      status: 'Accepté',
      name: 'Wissem Chihaoui',
    },
  ]
  
  const columns = [
    { label: 'Id #', key: 'id', searchable: true, orderable: true },
    { label: 'Gérer par', key: 'client', searchable: true, orderable: true, filterable: true },
    { label: 'Commande', key: 'commande', orderable: true },
    { label: 'Statut', key: 'status', orderable: true, filterable: true },
    { label: 'Nom', key: 'name', orderable: true, filterable: true },
    { label: 'Actions', key: 'actions' },
  ];

export default function CardsListView() {
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
        <button className="bg-n-5 hover:bg-n-4 text-white text-sm font-medium px-4 py-2 rounded shadow">
          Ajouter une commande
        </button>
      </div>

      <DataTable
        columns={columns}
        data={orders}
        renderRow={(order) => (
          <CardsListRow key={order.id} order={order} askDelete={askDelete}/>
        )}
      />

      <ConfirmDeleteModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title={orderToDelete?.id}
      />
    </div>
  )
}