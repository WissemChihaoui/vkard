import React from "react";
import { eye, trash } from "../../../assets/admin";

export default function CardsListRow({ order, askDelete }) {
  return (
    <tr className="border-b text-sm">
      <td className="px-4 py-3">{order.id}</td>
      <td className="px-4 py-3">{order.client}</td>
      <td className="px-4 py-3">{order.commande}</td>
      <td className="px-4 py-3">{order.status}</td>
      <td className="px-4 py-3">{order.name}</td>
      <td className="px-4 py-3 text-center">
        <div className="flex justify-center gap-3">
          <button className="text-blue-500 hover:text-blue-700">
            <img src={eye} />
          </button>
          <button
            onClick={() => askDelete(order)}
            className="text-red-600 hover:text-red-800"
          >
            <img src={trash} />
          </button>
        </div>
      </td>
    </tr>
  );
}
