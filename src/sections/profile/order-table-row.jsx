import React from "react";
import { fDate } from "../../utils/format-time";
import { useRouter } from "../../routes/hooks";
import { paths } from "../../routes/paths";
import { ORDER_STATUS } from "../../constants";

export default function OrderTableRow({ order }) {
  const router = useRouter()
    const statusObj = ORDER_STATUS.find((s) => s.value === order.status);
  
  return (
    <tr className="hover:bg-n-10">
      <td className="p-3 font-medium">{order.id}</td>
      <td className="p-3">{fDate(order.created_at)}</td>
      <td className="p-3">
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
      <td className="p-3">{order.shipping > 0 ? 'Xpresspost' : 'Poste-lettre'}</td>
      <td className="p-3">{order.total_price} $ CA</td>

      <td className="p-3">
        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition" onClick={()=>router.push(paths.profile.viewOrder(order.id))}>
          Voir
        </button>
      </td>
    </tr>
  );
}
