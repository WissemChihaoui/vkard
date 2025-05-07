import React from "react";
import { eye, trash } from "../../../assets/admin";

export default function OrdersListRow({ order, askDelete }) {
  return (
    <tr className="border-b">
      <td className="px-4 py-3">{order.orderNumber}</td>
      <td className="px-4 py-3">{order.client}</td>
      <td className="px-4 py-3">{order.cardsCount}</td>
      <td className="px-4 py-3">{order.status}</td>
      <td className="px-4 py-3">{order.date}</td>
      <td className="px-4 py-3 text-center">
      <div className="flex justify-center gap-3">
                  <button className="text-blue-500 hover:text-blue-700">
                    <img src={eye} />
                  </button>
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
