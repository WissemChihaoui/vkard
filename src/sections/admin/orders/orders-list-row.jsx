import React from "react";
import { eye, trash } from "../../../assets/admin";
import { Link } from "react-router-dom";
import { paths } from "../../../routes/paths";
import { fDate } from "../../../utils/format-time";
import { ORDER_STATUS } from "../../../constants";

export default function OrdersListRow({ order, askDelete }) {
  const statusObj = ORDER_STATUS.find((s) => s.value === order.status);
  return (
    <tr className="border-b">
      <td className="px-4 py-3">{order.id}</td>
      <td className="px-4 py-3">
        {order.user.first_name + " " + order.user.last_name}
      </td>
      <td className="px-4 py-3">
        {order.shipping > 0 ? "Xpresspost" : "Poste-lettre"}
      </td>
      <td className="px-4 py-3">
        <span
          style={{
            backgroundColor: statusObj?.bgColor,
            color: statusObj?.color,
            padding: "4px 8px",
            borderRadius: "8px",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          {statusObj?.label}
        </span>
      </td>
      <td className="px-4 py-3">{fDate(order.created_at)}</td>
      <td className="px-4 py-3 text-center">
        <div className="flex justify-center gap-3">
          <Link
            to={paths.admin.orders.view(order.id)}
            className="text-blue-500 hover:text-blue-700"
          >
            <img src={eye} />
          </Link>
          <button
            onClick={() => askDelete(order)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            <img src={trash} />
          </button>
        </div>
      </td>
    </tr>
  );
}
