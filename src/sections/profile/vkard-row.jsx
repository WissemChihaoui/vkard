import React from "react";
import Button from "../../components/button/Button";
import { useAuthContext } from "../../auth/hooks";
import { userIcon } from "../../assets";
import { CONFIG } from "../../config-global";
import { link } from "../../assets/admin";

export default function VkardRow({ card, onEdit, onShowLink }) {
  const { user } = useAuthContext();
  const image = card.picture
    ? `${CONFIG.serverUrl}/storage/${card.picture}`
    : userIcon;
  console.log(image);
  return (
    <>
      <div className="border rounded-lg shadow p-4 flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={image || userIcon}
            alt={card.name || "nom pas défini"}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">
              {card.name || "Nom pas gérer"}
            </h3>
            <p className="text-sm text-gray-500">
              {card.company || "entreprise pas défini"}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Géré par: {user.first_name} {user.last_name}
        </p>
        <div className="flex flex-col lg:flex-row gap-2 mt-auto">
          <Button className="lg:flex-1" onClick={() => onEdit(card)}>
            Modifier
          </Button>
          {card.status === "actif" ? (
            <Button className="" onClick={() => onShowLink(card)}>
              <img src={link} className="hidden lg:block "/>
              <span className="block lg:hidden">Lien</span>
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
