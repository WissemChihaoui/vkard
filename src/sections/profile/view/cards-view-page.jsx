import React, { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
// import VkardRow from "../VkardRow";
import VkardEditModal from "../vkard-edit-modal";
import VkardRow from "../vkard-row";
import { submitCardData, useGetCards } from "../../../actions/cards";
import { toast } from "react-toastify";

export default function CardsViewPage() {
  const { cards } = useGetCards();

  console.log(cards)
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [cardsData, setCardsData] = useState([])

  useEffect(() => {
    if(cards) {
      setCardsData(cards)
    }
  }, [cards])

  const handleEditClick = (card) => {
    setEditData(card);
    setShowModal(true);
  };

  const handleSave = async (rawData) => {
  // Build FormData
  

  // Now send it
  toast.promise(
    submitCardData(rawData),
    {
      loading: "Enregistrement en cours...",
      success: "Carte mise à jour avec succès !",
      error: "Échec de la mise à jour de la carte.",
    }
  ).then((res) => {
    if (res) {
      setShowModal(false); // Close the modal on success
    }
  });
};


  return (
    <div className="mx-auto space-y-10">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-xl font-semibold">Administrer mes VKARDS</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardsData.map((card) => (
          <VkardRow key={card.id} card={card} onEdit={handleEditClick} />
        ))}
      </div>

      <VkardEditModal
        show={showModal}
        onClose={() => setShowModal(false)}
        data={editData}
        setData={setEditData}
        onSave={(finalData)=>handleSave(finalData)}
      />
    </div>
  );
}
