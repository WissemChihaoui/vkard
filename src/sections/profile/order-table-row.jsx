import React from "react";

export default function OrderTableRow({ order }) {
  return (
    <tr className="hover:bg-n-10">
      <td className="p-3 font-medium">{order.id}</td>
      <td className="p-3">{order.date}</td>
      <td className="p-3">{order.status}</td>
      <td className="p-3">{order.total}</td>

      <td className="p-3">
        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
          Voir
        </button>
      </td>
    </tr>
  );
}
