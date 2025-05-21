import React, { useEffect, useState } from "react";
import ConfirmDeleteModal from "../../../../components/delete-confrim-popup/delete-confirm-popup";
import DataTable from "../../../../components/datatables/data-table";
import CardsListRow from "../cards-list-row";
import VkardEditModal from "../../../profile/vkard-edit-modal";
import {
  changeCardStatus,
  deleteCard,
  submitCardData,
  useGetAllCards,
} from "../../../../actions/cards";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { endpoints } from "../../../../utils/axios";
import { paths } from "../../../../routes/paths";
import { QRCodeSVG } from "qrcode.react";
import LinkQrModal from "../../../../components/linkQrModal/link-qr-modal";

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
  const { cards } = useGetAllCards();
  const [tableData, setTableData] = useState([]);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkToShow, setLinkToShow] = useState(null);

  const handleShowLink = (order) => {
    const fullLink = `http://localhost:5173${paths.user(order.id)}`;
    setLinkToShow(fullLink);
    setLinkModalOpen(true);
  };

  
  // 🔄 Flatten cards to prepare for DataTable
  useEffect(() => {
    if (cards) {
      const transformed = cards.map((card) => ({
        id: card.id,
        client: `${card.user?.first_name || ""} ${card.user?.last_name || ""}`,
        commande: card.order_id,
        status: card.status,
        name: card.name,
        original: card, // Keep full card object
      }));
      setTableData(transformed);
    }
  }, [cards]);

  const handleEditClick = (card) => {
    setEditData(card);
    setShowModal(true);
  };

  const handleSave = () => {
    toast
      .promise(submitCardData(editData), {
        loading: "Enregistrement en cours...",
        success: "Carte mise à jour avec succès !",
        error: "Échec de la mise à jour de la carte.",
      })
      .then((res) => {
        if (res) {
          mutate(endpoints.cards.all);
          setShowModal(false);
        }
      });
  };

  const askDelete = (order) => {
    setOrderToDelete(order);
    setConfirmOpen(true);
  };

  const confirmDelete = async (id) => {
    toast
      .promise(deleteCard(orderToDelete.id), {
        loading: "Suppression en cours...",
        success: "V-Card supprimé avec succès !",
        error: "Échec de la suppression du v-card.",
      })
      .then(() => {
        setTableData((prev) => prev.filter((client) => client.id !== id));
        setConfirmOpen(false);
      });
  };

  const handleStatusChange = async (id, newStatus) => {
    toast.promise(changeCardStatus(id, newStatus), {
      loading: "Changement en cours",
      success: "Changement effectué avec succès",
      error: "Changement échoué",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-n-1">Liste des vcards</h2>
      </div>
      <DataTable
        columns={columns}
        data={tableData}
        renderRow={(row) => (
          <CardsListRow
            key={row.id}
            order={row.original}
            askDelete={askDelete}
            onEdit={handleEditClick}
            onStatusChange={handleStatusChange}
            onShowLink={handleShowLink} // 👈 Pass handler
          />
        )}
      />

      <ConfirmDeleteModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => confirmDelete(orderToDelete.id)}
        title={orderToDelete?.id}
      />

      <VkardEditModal
        show={showModal}
        onClose={() => setShowModal(false)}
        data={editData}
        setData={setEditData}
        onSave={handleSave}
      />

      <LinkQrModal
        open={linkModalOpen}
        link={linkToShow}
        onClose={() => setLinkModalOpen(false)}
      />
    </div>
  );
}
