import React, { useState } from "react";
import Button from "../../../components/button/Button";
// import VkardRow from "../VkardRow";
import VkardEditModal from "../vkard-edit-modal";
import VkardRow from "../vkard-row";

const cardsList = [
    {
      id: 1,
      name: "Alice Smith",
      company: "Tech Solutions",
      picture: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
      admin: "John Doe",
      contact: { email: "alice.smith@example.com", phone: "+1234567890" },
      cardType: 2,
      socials: {
        linkedin: "https://www.linkedin.com/in/alice-smith",
        facebook: "https://www.facebook.com/alicesmith",
        instagram: "https://www.instagram.com/alicesmith",
      },
      links: [
        { title: "Tech Solutions Website", url: "https://www.techsolutions.com" },
        { title: "GitHub Profile", url: "https://www.github.com/alicesmith" },
      ],
    },
    {
      id: 2,
      name: "Bob Johnson",
      company: "Web Innovations",
      picture: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
      admin: "Jane Doe",
      contact: { email: "bob.johnson@example.com", phone: "+9876543210" },
      cardType: 3,
      socials: {
        linkedin: "https://www.linkedin.com/in/bob-johnson",
        facebook: "https://www.facebook.com/bobjohnson",
        instagram: "https://www.instagram.com/bobjohnson",
      },
      links: [
        { title: "Web Innovations Website", url: "https://www.webinnovations.com" },
        { title: "GitHub Profile", url: "https://www.github.com/bobjohnson" },
      ],
    },
  ];

export default function CardsViewPage() {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEditClick = (card) => {
    setEditData(card);
    setShowModal(true);
  };

  const handleSave = () => {
    console.log("Save logic here", editData);
    setShowModal(false);
  };

  return (
    <div className="mx-auto space-y-10">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-xl font-semibold">Administrer mes VKARDS</h2>
        {/* <Button onClick={() => alert("Fonction d'enregistrement ici.")}>
          Enregistrer
        </Button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardsList.map((card) => (
          <VkardRow key={card.id} card={card} onEdit={handleEditClick} />
        ))}
      </div>

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
