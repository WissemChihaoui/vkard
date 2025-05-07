import React from "react";
import { eye, link, trash } from "../../../assets/admin";
import { paths } from "../../../routes/paths";
import { toast } from "react-toastify";

export default function CardsListRow({ order, askDelete, onEdit }) {
  const linkUser = `${paths.user}/${order.id}`;

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(linkUser)
      .then(() => {
        toast.dark("Lien copié dans le presse-papiers !");
      })
      .catch((err) => {
        toast.error("Échec de la copie du lien !");
        console.error("Erreur lors de la copie :", err);
      });
  };

  return (
    <tr className="border-b text-sm">
      <td className="px-4 py-3">{order.id}</td>
      <td className="px-4 py-3">{order.client}</td>
      <td className="px-4 py-3">{order.commande}</td>
      <td className="px-4 py-3">{order.status}</td>
      <td className="px-4 py-3">{order.name}</td>
      <td className="px-4 py-3 text-center">
        <div className="flex gap-3">
          <button
            onClick={handleCopyLink}
            className="text-blue-500 hover:text-blue-700"
            title="Copier le lien"
          >
            <img src={link} alt="Copier le lien" />
          </button>
          <button
            onClick={() => onEdit(order)}
            className="text-blue-500 hover:text-blue-700"
            title="Voir"
          >
            <img src={eye} alt="Voir" />
          </button>
          <button
            onClick={() => askDelete(order)}
            className="text-red-600 hover:text-red-800"
            title="Supprimer"
          >
            <img src={trash} alt="Supprimer" />
          </button>
        </div>
      </td>
    </tr>
  );
}
