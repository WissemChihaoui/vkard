import React from "react";
import { fDate } from "../../utils/format-time";

export default function OrderTableRow({ order }) {
  return (
    <tr className="hover:bg-n-10">
      <td className="p-3 font-medium">{order.id}</td>
      <td className="p-3">{fDate(order.created_at)}</td>
      <td className="p-3">{order.status}</td>
      <td className="p-3">{order.total_price} €</td>

      <td className="p-3">
        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
          Voir
        </button>
      </td>
    </tr>
  );
}
