import React from "react";
import { eye, link, trash } from "../../../assets/admin";
import { Link } from "react-router-dom";
import { paths } from "../../../routes/paths";

export default function CardsListRow({
  order,
  askDelete,
  onEdit,
  onStatusChange,
  onShowLink, // 👈 New prop
}) {
  const toggleStatus = () => {
    const newStatus = order.status === "actif" ? "inactif" : "actif";
    onStatusChange(order.id, newStatus); // Send ID and new status to parent
  };

  return (
    <tr className="border-b text-sm">
      <td className="px-4 py-3">{order.id}</td>
      <td className="px-4 py-3">
        {order.user.first_name} {order.user.last_name}
      </td>
      <td className="px-4 py-3"><Link to={paths.admin.orders.view(order?.order_item?.order_id)}>{order?.order_item?.order_id}</Link></td>
      <td className="px-4 py-3">
        {/* Status Switch */}
        <label className="inline-flex items-center cursor-pointer relative">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={order.status === "actif"}
            onChange={toggleStatus}
          />
          <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full transition-all duration-300"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
        </label>
      </td>

      <td className="px-4 py-3">{order.name}</td>
      <td className="px-4 py-3 text-center">
        <div className="flex gap-3">
          <button
            onClick={() => onShowLink(order)}
            className="text-blue-500 hover:text-blue-700"
            title="Afficher le lien"
          >
            <img src={link} alt="Afficher le lien" />
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
