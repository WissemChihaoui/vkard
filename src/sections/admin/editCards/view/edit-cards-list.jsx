import React, { useEffect, useState } from "react";
import DataTable from "../../../../components/datatables/data-table";
import { createProduct, deleteProduct, updateProduct, useGetProducts } from "../../../../actions/products"; // adapte si besoin
import { toast } from "react-toastify";
import CardsListRow from "../edit-cards-row";
import ConfirmDeleteModal from "../../../../components/delete-confrim-popup/delete-confirm-popup";
import EditAddModal from "../edit-add-modal";

const columns = [
  { label: "Image", key: "image" },
  { label: "Titre", key: "title", searchable: true },
  { label: "Description", key: "description", searchable: true },
  { label: "Prix", key: "price" },
  { label: "Actions", key: "actions" },
];

export default function EditCardListView() {
  const { products } = useGetProducts();
  const [tableData, setTableData] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);

  useEffect(() => {
    if (products.length) {
      const formatted = products.map((card) => ({
        id: card.id,
        title: card.title,
        description: card.description,
        price: `${card.price} $`,
        original: card,
      }));

      setTableData(formatted);
    }
  }, [products]);

  const askDelete = (order) => {
    setOrderToDelete(order);
    setConfirmOpen(true);
  };
  const confirmDelete = async () => {
    toast
      .promise(deleteProduct(orderToDelete.id), {
        loading: "Suppression en cours...",
        success: "Produit supprimé avec succès !",
        error: "Échec de la suppression du produit.",
      })
      .then(() => {
        setTableData((prev) =>
          prev.filter((card) => card.id !== orderToDelete.id)
        );
        setConfirmOpen(false);
      });
  };


  const handleOpenModal = (card = null) => {
  setCardToEdit(card);
  setCardModalOpen(true);
};

  const handleSubmitCard = async (cardData) => {
    console.log("cardData", cardData)
  toast.promise(
    new Promise( (resolve, reject) => {
      try {
        // ici tu choisis entre add et update selon si cardData a un id
        if (cardToEdit?.id) {
            console.log("UPDATING...")
          updateProduct(cardToEdit?.id, cardData);
        } else {
          createProduct(cardData);
            console.log("CREATING...")

        }
        resolve();
      } catch (e) {
        reject(e);
      }
    }),
    {
      loading: cardToEdit?.id ? "Mise à jour en cours..." : "Ajout en cours...",
      success: cardToEdit?.id ? "Produit mis à jour !" : "Produit ajouté !",
      error: "Erreur lors de l'enregistrement.",
    }
  ).then(() => {
    setCardModalOpen(false);
  });
};
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Liste des Cartes</h2>
        <button onClick={() => handleOpenModal()} className="bg-n-5 hover:bg-n-4 text-white text-sm font-medium px-4 py-2 rounded shadow">
          Ajouter un produit
        </button>
      </div>

      <DataTable
        columns={columns}
        data={tableData}
        renderRow={(row) => (
          <CardsListRow
            key={row.id}
            card={row.original}
            askDelete={askDelete}
            askEdit={handleOpenModal}
          />
        )}
      />
      <ConfirmDeleteModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title={orderToDelete?.id}
      />

      <EditAddModal
        open={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
        onSubmit={handleSubmitCard}
        initialData={cardToEdit}
      />
    </div>
  );
}
