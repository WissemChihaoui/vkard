import React from "react";
import { fDate } from "../../utils/format-time";
import { useRouter } from "../../routes/hooks";
import { paths } from "../../routes/paths";

export default function OrderTableRow({ order }) {
  const router = useRouter()
  return (
    <tr className="hover:bg-n-10">
      <td className="p-3 font-medium">{order.id}</td>
      <td className="p-3">{fDate(order.created_at)}</td>
      <td className="p-3">{order.status}</td>
      <td className="p-3">{order.shipping > 0 ? 'Xpresspost' : 'Poste-lettre'}</td>
      <td className="p-3">{order.total_price} €</td>

      <td className="p-3">
        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition" onClick={()=>router.push(paths.profile.viewOrder(order.id))}>
          Voir
        </button>
      </td>
    </tr>
  );
}
