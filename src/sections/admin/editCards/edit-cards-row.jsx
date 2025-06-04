import React from "react";
import { eye, trash } from "../../../assets/admin";

export default function CardsListRow({ card, askDelete, askEdit }) {
  return (
    <tr className="border-b">
      <td className="px-4 py-3">
        <img
          src={card.image}
          alt={card.title}
          className="w-16 h-16 object-cover rounded"
        />
      </td>
      <td className="px-4 py-3 font-semibold">{card.title}</td>
      <td className="px-4 py-3 text-sm text-gray-600 max-w-[200px] truncate">
        {card.description}
      </td>
      <td className="px-4 py-3">{card.price} $</td>
      <td className="px-4 py-3 text-center">
        <div className="flex justify-center gap-3">
          <button
            onClick={()=> askEdit(card)}
            className="text-blue-500 hover:text-blue-700"
          >
            <img src={eye} alt="Voir" />
          </button>
          <button
            onClick={() => askDelete(card)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            <img src={trash} alt="Supprimer" />
          </button>
        </div>
      </td>
    </tr>
  );
}
