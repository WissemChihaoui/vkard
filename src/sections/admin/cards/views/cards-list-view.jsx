import React, { useEffect, useState } from "react";
import ConfirmDeleteModal from "../../../../components/delete-confrim-popup/delete-confirm-popup";
import DataTable from "../../../../components/datatables/data-table";
import CardsListRow from "../cards-list-row";
import VkardEditModal from "../../../profile/vkard-edit-modal";
import { deleteCard, submitCardData, useGetAllCards } from "../../../../actions/cards";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { endpoints } from "../../../../utils/axios";


const columns = [
  { label: "Id #", key: "id", searchable: true, orderable: true },
  {
    label: "Gérer par",
    key: "client",
    searchable: true,
    orderable: true,
    filterable: true,
  },
  { label: "Commande", key: "commande", orderable: true },
  { label: "Statut", key: "status", orderable: true, filterable: true },
  { label: "Nom", key: "name", orderable: true },
  { label: "Actions", key: "actions" },
];

export default function CardsListView() {
  const {cards}=useGetAllCards();

  const [orders, setOrders] = useState([]);
  
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);


useEffect(()=> {
  if (cards) setOrders(cards)
}, [cards])

  const handleEditClick = (card) => {
    setEditData(card);
    setShowModal(true);
  };

  const handleSave = () => {
    // console.log("Save logic here", editData);
    // setShowModal(false);
    toast.promise(
        submitCardData(editData),
        {
          loading: "Enregistrement en cours...",
          success: "Carte mise à jour avec succès !",
          error: "Échec de la mise à jour de la carte.",
        }
      ).then((res) => {
        if (res) {
          mutate(endpoints.cards.all)
          setShowModal(false); // Close the modal on success
        }
      });
  };

  const askDelete = (order) => {
    setOrderToDelete(order);
    setConfirmOpen(true);
  };

  const confirmDelete = async (id) => {
        toast.promise(
          deleteCard(orderToDelete.id),
          {
            loading: "Suppression en cours...",
            success: "V-Card supprimé avec succès !",
            error: "Échec de la suppression du v-card.",
          }
        ).then(() => {
          setOrders((prev) => prev.filter((client) => client.id !== id));
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
        data={orders}
        renderRow={(order) => (
          <CardsListRow
            key={order.id}
            order={order}
            askDelete={askDelete}
            onEdit={handleEditClick}
          />
        )}
      />

      <ConfirmDeleteModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title={orderToDelete?.id}
      />

      <VkardEditModal
        show={showModal}
        onClose={() => setShowModal(false)}
        data={editData}
        setData={setEditData}
        onSave={handleSave}
      />
    </div>
  );
}
